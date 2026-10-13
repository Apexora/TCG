import { addDoc, collection, doc, getDoc, onSnapshot, orderBy, query, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import { db, ensureUser, isConfigured, netErr } from './firebase';
import { allowed, applyMove, initialState, toWire, type Seat } from './sync';
import { DECKS } from '../data/cards';
import { parseWire } from '../decks';
import type { Action, State } from '../engine/types';

const ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // sin 0/O/1/I
const newCode = () => Array.from({ length: 4 }, () => ALPHABET[Math.floor(Math.random() * ALPHABET.length)]).join('');
const KEY = 'tcgRoom';

export interface OnlineHandlers {
  /** Cambió el estado real. `fresh` = jugadas nuevas con el estado previo a cada una. `replay` = primera carga (reconexión): pintar el estado final sin animar. */
  onMoves(g: State, fresh: { before: State; action: Action; seat: Seat }[], replay: boolean): void;
  onStatus(msg: string): void;       // "Esperando rival…", errores…
  onReady(): void;                    // ambos dentro: empieza la partida
  onChat?(m: { id: string; mine: boolean; text: string }): void;  // mensaje del chat entre jugadores
  onSettled(): void;                  // mi jugada volvió confirmada (por si el motor la ignoró y no hay cambio que pintar)
}

export class Online {
  code = ''; seat: Seat = 0; uid = '';
  /** Cartas del mazo de cada asiento (host, invitado), validadas igual en ambos clientes. */
  decks: [string[], string[]] = [DECKS.Luminarae, DECKS.Umbra];
  g!: State;
  private host = ''; private guest = ''; private seed = 0;
  private applied = 0; private sending = false; private sentAt = -1; private unsubs: (() => void)[] = [];
  private chatSeen = new Set<string>();
  private ready = false; private pulled = false; private waiters: (() => void)[] = [];
  constructor(private h: OnlineHandlers) {}

  static savedCode() { try { return localStorage.getItem(KEY); } catch { return null; } }
  private save() { try { localStorage.setItem(KEY, this.code); } catch { /* ignorar */ } }
  static clearSaved() { try { localStorage.removeItem(KEY); } catch { /* ignorar */ } }

  async create(deck: string | string[] = 'Luminarae') {
    if (!isConfigured) throw new Error(netErr(null));
    try {
      const u = await ensureUser(); this.uid = u.uid; this.seat = 0;
      this.seed = Math.floor(Math.random() * 2 ** 31);
      for (let tries = 0; tries < 8; tries++) {
        const code = newCode();
        if ((await getDoc(doc(db, 'tcgGames', code))).exists()) continue;
        await setDoc(doc(db, 'tcgGames', code), { host: u.uid, guest: null, hostDeck: deck, seed: this.seed, status: 'waiting', createdAt: serverTimestamp() });
        this.code = code; this.save(); this.h.onStatus(`Sala ${code}: esperando rival…`); this.listen(); return code;
      }
    } catch (e) { throw new Error(netErr(e)); }
    throw new Error('No se pudo crear la sala, inténtalo de nuevo');
  }

  async join(codeRaw: string, deck: string | string[] = 'Umbra') {
    if (!isConfigured) throw new Error(netErr(null));
    const code = codeRaw.trim().toUpperCase();
    if (code.length !== 4) throw new Error('El código tiene 4 caracteres');
    try {
      const u = await ensureUser(); this.uid = u.uid;
      const ref = doc(db, 'tcgGames', code), snap = await getDoc(ref);
      if (!snap.exists()) throw new Error('Esa sala no existe');
      const d = snap.data()!;
      if (d.host === u.uid) this.seat = 0;
      else if (d.guest === u.uid) this.seat = 1;
      else if (d.guest) throw new Error('La sala ya está llena');
      else {
        // Si las reglas de la sala no admiten el campo guestDeck, se entra igualmente (con el mazo por defecto).
        try { await updateDoc(ref, { guest: u.uid, guestDeck: deck, status: 'playing' }); }
        catch { await updateDoc(ref, { guest: u.uid, status: 'playing' }); }
        this.seat = 1;
      }
      this.code = code; this.save(); this.listen();
    } catch (e) { throw new Error((e as Error).message?.startsWith('Esa sala') || (e as Error).message?.startsWith('La sala') ? (e as Error).message : netErr(e)); }
  }

  /** Volver a una sala guardada tras recargar. */
  /** Solo se reanuda una sala con la partida en marcha. Una sala que quedó "esperando rival" (o que ya no existe)
   *  se descarta: si no, la app arrancaba en modo online sin partida y el mulligan contra la IA no avanzaba. */
  async resume(code: string) {
    try {
      const u = await ensureUser(), snap = await getDoc(doc(db, 'tcgGames', code.trim().toUpperCase())), d = snap.data();
      if (!snap.exists() || d?.status !== 'playing' || (d.host !== u.uid && d.guest !== u.uid)) { Online.clearSaved(); throw new Error('Sala no disponible'); }
    } catch (e) { Online.clearSaved(); throw e; }
    await this.join(code);
  }

  private listen() {
    const gref = doc(db, 'tcgGames', this.code);
    this.unsubs.push(onSnapshot(gref, s => {
      const d = s.data(); if (!d) return;
      this.host = d.host; this.guest = d.guest ?? ''; this.seed = d.seed;
      this.decks = [parseWire(d.hostDeck, 'Luminarae'), parseWire(d.guestDeck, 'Umbra')];
      if (d.status === 'playing' && this.guest && !this.ready) {
        this.ready = true; this.g = initialState(this.seed, this.decks); this.applied = 0; this.pulled = false;
        this.h.onReady(); this.h.onStatus(`Sala ${this.code}: ¡partida en marcha!`);
        // solo se escuchan las jugadas cuando ya hay dos jugadores (así las reglas dejan leer)
        this.unsubs.push(onSnapshot(query(collection(gref, 'chat'), orderBy('t')), cs => cs.docChanges().forEach(c => {
          if (c.type !== 'added' || this.chatSeen.has(c.doc.id)) return; this.chatSeen.add(c.doc.id);
          const m = c.doc.data(); this.h.onChat?.({ id: c.doc.id, mine: m.by === this.uid, text: String(m.text ?? '') });
        }), e => this.h.onStatus('Chat: ' + netErr(e))));
        this.unsubs.push(onSnapshot(collection(gref, 'moves'), { includeMetadataChanges: true }, ms => this.pull(ms.docs), e => this.h.onStatus(netErr(e))));
      }
    }, e => this.h.onStatus(netErr(e))));
  }

  /** Aplica en orden las jugadas ya CONFIRMADAS por el servidor (nunca las pendientes locales). */
  private pull(docs: { id: string; data(): any; metadata: { hasPendingWrites: boolean } }[]) {
    const byN = new Map<number, any>();
    for (const d of docs) if (!d.metadata.hasPendingWrites) byN.set(Number(d.id), d.data());
    const replay = !this.pulled; this.pulled = true;
    const fresh: { before: State; action: Action; seat: Seat }[] = [], start = this.applied; let settled = false;
    while (byN.has(this.applied)) {
      const k = this.applied, m = byN.get(k), seat: Seat | -1 = m.by === this.host ? 0 : m.by === this.guest ? 1 : -1;
      const before = this.g, after = applyMove(before, seat, m.action);
      if (after !== before && seat !== -1) fresh.push({ before, action: m.action, seat });
      this.g = after; this.applied++;
      if (this.sending && m.by === this.uid && k === this.sentAt) { this.sending = false; settled = true; }
    }
    if (this.applied === start && !replay) return;
    this.h.onMoves(this.g, fresh, replay || fresh.length > 3);
    if (settled) this.h.onSettled();
    this.waiters.splice(0).forEach(f => f());
  }

  private waitAdvance(n: number, ms: number) {
    return new Promise<boolean>(res => {
      if (this.applied > n) return res(true);
      const t = setTimeout(() => res(false), ms);
      this.waiters.push(() => { clearTimeout(t); res(this.applied > n); });
    });
  }

  /** Envía una jugada (formato de la UI). Si choca con la del rival (mismo nº, p. ej. los dos mulligans a la vez),
   *  espera a recibir la suya y reintenta mientras siga siendo legal. Devuelve false si no se pudo enviar. */
  async send(a: Action): Promise<boolean> {
    if (this.sending || !this.ready) return false;
    this.sending = true;
    for (let attempt = 0; attempt < 3; attempt++) {
      const n = this.applied, wire = JSON.parse(JSON.stringify(toWire(a, this.seat))) as Action; this.sentAt = n;
      try {
        await setDoc(doc(db, 'tcgGames', this.code, 'moves', String(n)), { by: this.uid, action: wire, t: Date.now() });
        return true;
      } catch {
        const advanced = await this.waitAdvance(n, 4000);
        if (!advanced || !allowed(this.g, this.seat, wire)) break;
      }
    }
    this.sending = false;
    this.h.onStatus('No se pudo enviar la jugada; revisa el tablero y repítela.');
    return false;
  }
  /** Envía un mensaje al chat de la sala (solo con la partida en marcha). */
  async sendChat(text: string) {
    if (!this.ready) throw new Error('El chat se activa cuando entra el rival.');
    try { await addDoc(collection(db, 'tcgGames', this.code, 'chat'), { by: this.uid, text: text.slice(0, 140), t: Date.now() }); }
    catch (e) { throw new Error(netErr(e)); }
  }
  get busy() { return this.sending; }
  get isReady() { return this.ready; }

  close() { this.unsubs.forEach(u => u()); this.unsubs = []; this.waiters = []; Online.clearSaved(); }
}
