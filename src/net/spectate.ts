// Modo espectador: la partida es determinista (semilla + mazos + jugadas), así que un espectador solo LEE la sala
// (tcgGames/{código} y su subcolección moves) y reproduce las jugadas con el mismo motor. Nunca escribe en la partida.
import { collection, doc, getDoc, getDocs, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { db, ensureUser, isConfigured, netErr } from './firebase';
import { applyMove, initialState, type Seat } from './sync';
import { DECKS } from '../data/cards';
import { parseWire } from '../decks';
import type { Action, State } from '../engine/types';

export const LIVE_FRESCO_MS = 40_000;   // una partida sin latido en este tiempo ya no se lista
export interface LiveRow { code: string; hostNick: string; f0: string; f1: string; round: number; n0: number; n1: number }

/** Partidas en curso anunciadas por su anfitrión en tcgLive/{código}. */
export async function listarLive(): Promise<LiveRow[]> {
  if (!isConfigured) throw new Error(netErr(null));
  try {
    await ensureUser();
    const s = await getDocs(query(collection(db, 'tcgLive'), where('t', '>', Date.now() - LIVE_FRESCO_MS), orderBy('t', 'desc')));
    return s.docs.filter(d => !d.data().over).slice(0, 12).map(d => { const x = d.data(); return { code: d.id, hostNick: String(x.hostNick || 'Jugador'), f0: String(x.f0 || '?'), f1: String(x.f1 || '?'), round: Number(x.round) || 0, n0: Number(x.n0) || 0, n1: Number(x.n1) || 0 }; });
  } catch (e) { throw new Error(netErr(e)); }
}

export interface SpecHandlers {
  onMoves(g: State, fresh: { before: State; action: Action; seat: Seat }[], replay: boolean): void;
  onStatus(msg: string): void;
  onReady(): void;
}

export class Spectator {
  code = ''; g!: State;
  decks: [string[], string[]] = [DECKS.Luminarae, DECKS.Umbra];
  private host = ''; private guest = ''; private applied = 0; private pulled = false; private unsubs: (() => void)[] = [];
  constructor(private h: SpecHandlers) {}

  async watch(codeRaw: string) {
    if (!isConfigured) throw new Error(netErr(null));
    const code = codeRaw.trim().toUpperCase();
    if (code.length !== 4) throw new Error('El código tiene 4 caracteres');
    let d;
    try { await ensureUser(); const snap = await getDoc(doc(db, 'tcgGames', code)); if (!snap.exists()) throw new Error('Esa sala no existe'); d = snap.data()!; }
    catch (e) { const m = (e as Error).message ?? ''; throw new Error(m.startsWith('Esa sala') ? m : /permission|insufficient/i.test(m) ? 'No tienes permiso para ver esa sala (las reglas de Firestore deben permitir leer tcgGames a usuarios autenticados).' : netErr(e)); }
    if (!d.guest) throw new Error('Esa sala aún espera rival: no hay partida que ver');
    this.host = d.host; this.guest = d.guest; this.code = code;
    this.decks = [parseWire(d.hostDeck, 'Luminarae'), parseWire(d.guestDeck, 'Umbra')];
    this.g = initialState(d.seed, this.decks); this.applied = 0; this.pulled = false;
    this.h.onReady();
    this.unsubs.push(onSnapshot(collection(doc(db, 'tcgGames', code), 'moves'), ms => this.pull(ms.docs), e => this.h.onStatus(netErr(e))));
  }

  private pull(docs: { id: string; data(): any }[]) {
    const byN = new Map<number, any>(); for (const d of docs) byN.set(Number(d.id), d.data());
    const replay = !this.pulled; this.pulled = true;
    const fresh: { before: State; action: Action; seat: Seat }[] = [], start = this.applied;
    while (byN.has(this.applied)) {
      const m = byN.get(this.applied), seat: Seat | -1 = m.by === this.host ? 0 : m.by === this.guest ? 1 : -1;
      const before = this.g, after = applyMove(before, seat, m.action);
      if (after !== before && seat !== -1) fresh.push({ before, action: m.action, seat });
      this.g = after; this.applied++;
    }
    if (this.applied === start && !replay) return;
    this.h.onMoves(this.g, fresh, replay || fresh.length > 3);
  }

  close() { this.unsubs.forEach(u => u()); this.unsubs = []; }
}
