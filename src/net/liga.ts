// Ranking propio de Cartas Alfa. Puntos (PT): solo cambian al terminar una partida ONLINE. Datos en tcgPlayers/{uid}.
import { collection, doc, getDoc, getDocs, limit, orderBy, query, runTransaction } from 'firebase/firestore';
import { auth, db, ensureUser } from './firebase';

export const PT_GANA = 10, PT_PIERDE = 5, PT_MARGEN_MAX = 20;
/** Victoria = +10 + diferencia de vidas; derrota = -(5 + diferencia de vidas). Máx. margen 20. */
export function deltaPT(gane: boolean, vidasGanador: number, vidasPerdedor: number): number {
  const margen = Math.min(PT_MARGEN_MAX, Math.max(0, vidasGanador - Math.max(0, vidasPerdedor)));
  return gane ? PT_GANA + margen : -(PT_PIERDE + margen);
}

const KN = 'tcgNick';
export const nick = (): string => {
  try { let n = localStorage.getItem(KN); if (!n) { n = 'Jugador' + Math.floor(1000 + Math.random() * 9000); localStorage.setItem(KN, n); } return n; } catch { return 'Jugador'; }
};
export const setNick = (v: string) => { try { localStorage.setItem(KN, v.replace(/[<>]/g, '').trim().slice(0, 14) || nick()); } catch { /* ignorar */ } };

/** Anota el resultado de una sala (una sola vez por sala). Devuelve el cambio y los puntos actuales, o null si ya estaba anotada. */
export async function registrarResultado(room: string, gane: boolean, vidasMias: number, vidasRival: number) {
  const u = await ensureUser(), ref = doc(db, 'tcgPlayers', u.uid);
  const delta = gane ? deltaPT(true, vidasMias, vidasRival) : deltaPT(false, vidasRival, vidasMias);
  return runTransaction(db, async tx => {
    const d = (await tx.get(ref)).data() ?? {};
    if (d.lastRoom === room) return null;
    const antes = Math.max(0, Math.floor(Number(d.pt) || 0)), despues = Math.max(0, antes + delta);
    tx.set(ref, { name: nick(), pt: despues, wins: (d.wins | 0) + (gane ? 1 : 0), losses: (d.losses | 0) + (gane ? 0 : 1), lastRoom: room, updatedAt: Date.now() });
    return { delta: despues - antes, despues };
  });
}

export async function misPuntos() {
  const u = await ensureUser(), d = (await getDoc(doc(db, 'tcgPlayers', u.uid))).data();
  return { pt: Math.max(0, Math.floor(Number(d?.pt) || 0)), wins: (d?.wins | 0), losses: (d?.losses | 0) };
}
export async function rankingTop(n = 50) {
  const s = await getDocs(query(collection(db, 'tcgPlayers'), orderBy('pt', 'desc'), limit(n)));
  return s.docs.map(x => ({ uid: x.id, name: String(x.data().name || 'Jugador'), pt: x.data().pt | 0, wins: x.data().wins | 0, losses: x.data().losses | 0, mine: x.id === auth.currentUser?.uid }));
}
