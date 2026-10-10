import { premiar, sumarStat, desbloquearLogro, obtenerPerfil } from './firebase';

// Llamar UNA vez cuando termina una partida.
// "partida" = el id de la sala; "gane" = true si el jugador ganó.
export async function darPremio(partida: string, gane: boolean) {
  const clave = 'premiado:' + partida;
  if (localStorage.getItem(clave)) return null;   // ya se premió esta partida
  localStorage.setItem(clave, '1');

  const r = await premiar(gane ? 20 : 5, gane ? 0.02 : 0);

  if (gane) {
    await sumarStat('tcg', 'victorias');
    const p = await obtenerPerfil();
    const v = p?.stats?.tcg?.victorias ?? 0;
    if (v >= 1)  await desbloquearLogro('tcg_primera_victoria');
    if (v >= 10) await desbloquearLogro('tcg_10_victorias');
  }
  return r;   // r.comun = azules ganadas, r.rara = negras ganadas
}