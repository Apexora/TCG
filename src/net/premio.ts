import { doc, getDoc } from 'firebase/firestore';
import { auth, db, premiar, sumarStat, desbloquearLogro, obtenerPerfil, registrarActividad } from './firebase';

// Nombre del rival (para el feed del Portal). Si algo falla, devuelve '' y el feed dice "un rival".
async function nombreRival(partida: string): Promise<string> {
  try {
    const g = (await getDoc(doc(db, 'tcgGames', partida))).data();
    const yo = auth.currentUser!.uid, otro = g?.host === yo ? g?.guest : g?.host;
    if (!otro) return '';
    const p = await getDoc(doc(db, 'apexora_profiles', otro));
    return p.exists() ? String(p.data().name ?? '') : '';
  } catch { return ''; }
}

// Llamar UNA vez cuando termina una partida.
// "partida" = el id de la sala; "gane" = true si el jugador ganó.
export async function darPremio(partida: string, gane: boolean) {
  const clave = 'premiado:' + partida;
  if (localStorage.getItem(clave)) return null;   // ya se premió esta partida
  localStorage.setItem(clave, '1');

  const r = await premiar(gane ? 20 : 5, gane ? 0.02 : 0);

  if (gane) {
    // Solo el ganador lo registra, así cada duelo aparece una vez en el feed
    nombreRival(partida).then((rival) => registrarActividad('tcg', 'duelo', { rival })).catch(() => {});
    await sumarStat('tcg', 'victorias');
    const p = await obtenerPerfil();
    const v = p?.stats?.tcg?.victorias ?? 0;
    if (v >= 1)  await desbloquearLogro('tcg_primera_victoria');
    if (v >= 10) await desbloquearLogro('tcg_10_victorias');
  }
  return r;   // r.comun = azules ganadas, r.rara = negras ganadas
}

// Partida contra la IA: premio chico (sin negra ni logros) para no abrir una granja de esencias.
// El tope diario del núcleo (300 azules) igualmente aplica.
export async function darPremioIA(gane: boolean) {
  const r = await premiar(gane ? 8 : 2, 0);
  if (gane) { registrarActividad('tcg', 'duelo', { ia: true }).catch(() => {}); await sumarStat('tcg', 'victorias_ia'); }
  return r;
}
