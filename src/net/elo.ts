// NE (Nivel Espiritual): puntaje de ranking. Solo cambia al terminar una partida ONLINE (ganar sube, perder baja).
import { collection, getDoc, getDocs, limit, orderBy, query, doc, runTransaction } from 'firebase/firestore';
import { auth, db } from './firebase';

export const DIVISIONES = [
  { id: 'roca', name: 'Roca', min: 0, icon: '🪨', color: '#b9b2a6' },
  { id: 'sinfalita', name: 'Sinfalita', min: 300, icon: '💠', color: '#5fd8ff' },
  { id: 'odita', name: 'Odita', min: 700, icon: '🔮', color: '#c58bff' },
] as const;

export const divisionDe = (ne: number) => [...DIVISIONES].reverse().find(d => ne >= d.min) ?? DIVISIONES[0];
/** NE que faltan para la siguiente división (null si ya es Odita). */
export function siguiente(ne: number) { const i = DIVISIONES.findIndex(d => d.id === divisionDe(ne).id), n = DIVISIONES[i + 1]; return n ? { name: n.name, falta: n.min - ne } : null; }

export const NE_GANA = 10, NE_PIERDE = 5, NE_MARGEN_MAX = 20;
/** Cambio de NE: victoria = +10 + diferencia de vidas; derrota = -(5 + diferencia de vidas). Empate = 0.
 *  Diferencia = vidas del ganador − vidas del perdedor (la del perdedor cuenta como 0 si quedó bajo cero). */
export function deltaNE(gane: boolean, vidasGanador: number, vidasPerdedor: number): number {
  const margen = Math.min(NE_MARGEN_MAX, Math.max(0, vidasGanador - Math.max(0, vidasPerdedor)));
  return gane ? NE_GANA + margen : -(NE_PIERDE + margen);
}

const mio = () => doc(db, 'apexora_players', auth.currentUser!.uid);
const neDe = (d: any): number => Math.max(0, Math.floor(Number(d?.stats?.tcg?.ne) || 0));

/** Cada victoria online anterior al sistema vale esto al importarla (no se guardó el margen ni las derrotas). */
export const NE_POR_VICTORIA_PREVIA = 10;

/** Importación única: si el jugador aún no tiene NE, se le acreditan sus victorias online pasadas (stats.tcg.victorias;
 *  las victorias contra la IA van aparte en victorias_ia y NO cuentan). Devuelve el NE actual. */
export async function miNE(): Promise<number> {
  try {
    if (!auth.currentUser) return 0;
    return await runTransaction(db, async tx => {
      const ref = mio(), s = await tx.get(ref);
      if (!s.exists()) return 0;
      const t = s.data()?.stats?.tcg;
      if (typeof t?.ne === 'number') return neDe(s.data());
      const v = Math.max(0, Math.floor(Number(t?.victorias) || 0)), ne = v * NE_POR_VICTORIA_PREVIA;
      tx.update(ref, { 'stats.tcg.ne': ne, 'stats.tcg.neImport': v });
      return ne;
    });
  } catch {
    try { return neDe((await getDoc(mio())).data()); } catch { return 0; }
  }
}

/** Aplica el resultado de UNA partida online. Devuelve { antes, despues, delta } o null si ya estaba aplicada / falló. */
export async function aplicarNE(partida: string, gane: boolean, misVidas: number, vidasRival: number) {
  const clave = 'ne:' + partida;
  try { if (localStorage.getItem(clave)) return null; localStorage.setItem(clave, '1'); } catch { /* sigue */ }
  if (!auth.currentUser) return null;
  await miNE();   // asegura la importación de victorias previas antes de sumar
  const delta = gane ? deltaNE(true, misVidas, vidasRival) : deltaNE(false, vidasRival, misVidas);
  try {
    const r = await runTransaction(db, async tx => {
      const ref = mio(), antes = neDe((await tx.get(ref)).data()), despues = Math.max(0, antes + delta);
      tx.update(ref, { 'stats.tcg.ne': despues });
      return { antes, despues, delta: despues - antes };
    });
    document.dispatchEvent(new CustomEvent('ne:cambio', { detail: r }));
    return r;
  } catch { try { localStorage.removeItem(clave); } catch { /* */ } return null; }
}

export interface FilaRanking { uid: string; nombre: string; ne: number }
export async function rankingNE(n = 50): Promise<FilaRanking[]> {
  const q = query(collection(db, 'apexora_players'), orderBy('stats.tcg.ne', 'desc'), limit(n));
  return (await getDocs(q)).docs.map(d => ({ uid: d.id, nombre: String(d.data().nombre ?? 'Jugador'), ne: neDe(d.data()) }));
}
