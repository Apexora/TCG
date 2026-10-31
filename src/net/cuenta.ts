// Cuenta y perfil propios. Registro con correo y contraseña (se "asciende" la sesión anónima: se conservan el uid y los puntos del ranking).
// El progreso vive en localStorage y se sincroniza con tcgProfiles/{uid} mientras haya sesión.
import { EmailAuthProvider, linkWithCredential, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db, ensureUser, isConfigured, netErr } from './firebase';

const K = { adv: 'tcgAdv', decks: 'tcgCustomDecks', sel: 'tcgDeck', nick: 'tcgNick', ava: 'tcgAvatar' };
export const AVATARES = ['☀', '☾', '⚔', '🛡', '🔥', '❄', '🌿', '⚡', '🐉', '🦅', '🐺', '👑'];
export interface Perfil { nick?: string; avatar?: string; adv: Record<string, string[]>; decks: { id: string; name: string; cards: string[] }[]; sel?: string }

const rd = (k: string) => { try { return localStorage.getItem(k); } catch { return null; } };
const wr = (k: string, v: string | null) => { try { v === null ? localStorage.removeItem(k) : localStorage.setItem(k, v); } catch { /* sin espacio */ } };
const json = <T,>(k: string, d: T): T => { try { const r = JSON.parse(rd(k) || 'null'); return r ?? d; } catch { return d; } };

export const avatar = () => rd(K.ava) || '';
export const setAvatar = (v: string) => wr(K.ava, v || null);
export const esCuenta = () => !!auth.currentUser && !auth.currentUser.isAnonymous;
export const correo = () => auth.currentUser?.email ?? '';

export function snapshot(): Perfil {
  const adv = json<Record<string, unknown>>(K.adv, {}), out: Record<string, string[]> = {};
  for (const k of Object.keys(adv)) if (Array.isArray(adv[k])) out[k] = (adv[k] as unknown[]).filter((x): x is string => typeof x === 'string');
  const decks = json<unknown[]>(K.decks, []).filter((d: any) => d && typeof d.id === 'string' && Array.isArray(d.cards)) as Perfil['decks'];
  return { nick: rd(K.nick) ?? undefined, avatar: rd(K.ava) ?? undefined, adv: out, decks, sel: rd(K.sel) ?? undefined };
}
/** Une dos perfiles: la Aventura se suma (nunca se pierde un rival vencido). Con unirMazos también los mazos; si no, mandan los de `b`. */
function unir(a: Perfil, b: Perfil, unirMazos: boolean): Perfil {
  const adv: Record<string, string[]> = {};
  for (const k of new Set([...Object.keys(a.adv), ...Object.keys(b.adv)])) adv[k] = [...new Set([...(a.adv[k] ?? []), ...(b.adv[k] ?? [])])];
  const decks = unirMazos ? [...a.decks.filter(d => !b.decks.some(x => x.id === d.id)), ...b.decks] : b.decks;
  return { nick: b.nick || a.nick, avatar: b.avatar ?? a.avatar, adv, decks, sel: b.sel || a.sel };
}
/** Escribe el perfil en el navegador. Devuelve true si algo cambió. */
function aplicar(p: Perfil): boolean {
  const antes = JSON.stringify(snapshot());
  wr(K.adv, JSON.stringify(p.adv)); wr(K.decks, JSON.stringify(p.decks)); wr(K.sel, p.sel ?? null);
  if (p.nick) wr(K.nick, p.nick); wr(K.ava, p.avatar || null);
  return JSON.stringify(snapshot()) !== antes;
}
const limpio = (p: Perfil) => JSON.parse(JSON.stringify(p));   // Firestore no admite undefined

async function leerNube(uid: string): Promise<Perfil | null> {
  const d = (await getDoc(doc(db, 'tcgProfiles', uid))).data();
  return d ? { nick: d.nick, avatar: d.avatar, adv: d.adv ?? {}, decks: d.decks ?? [], sel: d.sel } : null;
}
export async function guardar() {
  if (!isConfigured || !esCuenta()) return;
  const uid = auth.currentUser!.uid, p = snapshot();
  await setDoc(doc(db, 'tcgProfiles', uid), { ...limpio(p), updatedAt: Date.now() });
  // el ranking muestra el nombre y el avatar actuales (solo si ya tienes ficha)
  getDoc(doc(db, 'tcgPlayers', uid)).then(async s => { if (s.exists()) await setDoc(doc(db, 'tcgPlayers', uid), { name: p.nick || 'Jugador', avatar: p.avatar || '' }, { merge: true }); }).catch(() => {});
}
let t: ReturnType<typeof setTimeout> | undefined;
const guardarPronto = () => { clearTimeout(t); t = setTimeout(() => guardar().catch(() => {}), 1500); };

/** Al abrir el juego: con sesión iniciada trae el perfil de la nube y, si cambió algo, recarga una vez. */
export async function iniciarCuenta() {
  if (!isConfigured) return;
  document.addEventListener('tcg:progreso', guardarPronto); document.addEventListener('tcg:guardar', guardarPronto);
  try {
    await auth.authStateReady(); if (!esCuenta()) return;
    const nube = await leerNube(auth.currentUser!.uid);
    if (!nube) { await guardar(); return; }
    const cambio = aplicar(unir(snapshot(), nube, false));
    let ya = false; try { ya = sessionStorage.getItem('tcgSync') === '1'; sessionStorage.setItem('tcgSync', '1'); } catch { /* ignorar */ }
    if (cambio && !ya) location.reload();
    else if (cambio) document.dispatchEvent(new Event('tcg:progreso'));
  } catch { /* sin conexión: se sigue con lo local */ }
}

const msg = (e: unknown) => {
  const c = String((e as { code?: string })?.code ?? '');
  if (c.includes('email-already-in-use')) return 'Ese correo ya tiene cuenta: usa «Iniciar sesión».';
  if (c.includes('invalid-email')) return 'El correo no es válido.';
  if (c.includes('weak-password')) return 'La contraseña es muy corta (mínimo 6 caracteres).';
  if (c.includes('invalid-credential') || c.includes('wrong-password') || c.includes('user-not-found')) return 'Correo o contraseña incorrectos.';
  if (c.includes('operation-not-allowed')) return 'Falta activar «Correo/contraseña» en Firebase → Authentication → Método de acceso.';
  if (c.includes('too-many-requests')) return 'Demasiados intentos; espera un momento.';
  return netErr(e);
};
const run = async <T,>(f: () => Promise<T>) => { try { return await f(); } catch (e) { throw new Error(msg(e)); } };

/** Crea la cuenta con el progreso actual del navegador (migración): conserva el uid anónimo y por tanto los puntos del ranking. */
export const registrar = (email: string, pass: string) => run(async () => {
  const u = await ensureUser();
  await linkWithCredential(u, EmailAuthProvider.credential(email.trim(), pass));
  await guardar();
});
/** Entra en una cuenta existente: el progreso de este navegador se suma al de la cuenta (no se pierde nada). */
export const entrar = (email: string, pass: string) => run(async () => {
  const local = snapshot();
  await signInWithEmailAndPassword(auth, email.trim(), pass);
  const nube = await leerNube(auth.currentUser!.uid);
  aplicar(nube ? unir(local, nube, true) : local);
  await guardar();
  try { sessionStorage.setItem('tcgSync', '1'); } catch { /* ignorar */ }
  location.reload();
});
export const olvide = (email: string) => run(() => sendPasswordResetEmail(auth, email.trim()));
/** Cierra sesión: primero sube el progreso (si falla, no cierra) y borra el progreso local para que el siguiente en este equipo empiece limpio. */
export const salir = () => run(async () => {
  await guardar(); await signOut(auth);
  for (const k of [K.adv, K.decks, K.sel, K.ava]) wr(k, null);
  location.reload();
});
export const guardarPerfil = (nick: string, ava: string) => {
  wr(K.nick, nick.replace(/[<>]/g, '').trim().slice(0, 14) || rd(K.nick) || 'Jugador'); setAvatar(ava);
  return guardar();
};
