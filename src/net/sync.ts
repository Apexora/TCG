// Lógica de sincronización SIN red: perspectiva, validación y aplicación de jugadas.
// Se puede probar con `npm run test:net` sin Firebase.
import { newGame, step } from '../engine/engine';
import { DECKS } from '../data/cards';
import type { Action, State } from '../engine/types';

export type Seat = 0 | 1;
export interface Move { by: string; action: Action; t?: number }

/** Estado inicial común: anfitrión = asiento 0, invitado = asiento 1; cada uno con el mazo que eligió (por defecto Luminarae / Umbra). */
export const initialState = (seed: number, decks: [string[], string[]] = [DECKS.Luminarae, DECKS.Umbra]): State => newGame(decks, seed);

/** Estado real → estado visto desde `me` (tú siempre eres p[0]). Solo para pintar y validar en la UI. */
export function view(g: State, me: Seat): State {
  if (me === 0) return g;
  const f = (x: 0 | 1) => (1 - x) as 0 | 1;
  return {
    ...g, p: [g.p[1], g.p[0]], token: f(g.token), active: f(g.active),
    winner: g.winner === null || g.winner === -1 ? g.winner : f(g.winner),
    tok: [g.tok[1], g.tok[0]], mull: [g.mull[1], g.mull[0]], ward: g.ward ? [g.ward[1], g.ward[0]] : undefined,
    stack: g.stack.map(x => ({ ...x, owner: f(x.owner) })),
  };
}

/** ¿Puede este asiento enviar esta acción ahora? (evita que alguien juegue por el otro) */
export function allowed(g: State, seat: Seat, a: Action): boolean {
  if (!a || typeof a.type !== 'string') return false;
  if (a.type === 'mulligan') return g.phase === 'mulligan' && a.player === seat && !g.mull[seat];
  return g.phase !== 'mulligan' && g.active === seat;
}

/** Aplica una jugada recibida. Determinista: todos los clientes hacen exactamente lo mismo,
 *  incluso con jugadas inválidas (se ignoran). */
export function applyMove(g: State, seatOfBy: Seat | -1, a: Action): State {
  if (seatOfBy === -1 || !allowed(g, seatOfBy, a)) return g;
  try { return step(g, a); } catch { return g; }
}

/** Convierte una acción de la UI (en perspectiva propia) en la acción "de cable" con asiento real. */
export const toWire = (a: Action, me: Seat): Action => (a.type === 'mulligan' ? { ...a, player: me } : a);
/** Y la versión para validar contra el estado en perspectiva (donde yo soy 0). */
export const toView = (a: Action): Action => (a.type === 'mulligan' ? { ...a, player: 0 } : a);
