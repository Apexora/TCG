# Cartas Alfa

## Multijugador online (Firebase)
1. Firebase Console → Authentication → Sign-in method → activa **Anónimo**.
2. Firestore → Reglas: publica las de `firestore.rules` (salas, emparejamiento y ranking). El emparejamiento necesita un índice simple sobre `tcgQueue.t` (automático) y el ranking sobre `tcgPlayers.pt` (automático).
3. Copia `.env.example` a `.env.local` y rellena las claves de tu proyecto Firebase (el juego es independiente: no usa ningún otro servicio).
4. `npm run dev`; 🌐 Online → Crear sala → pasa el código de 4 letras al rival (otro navegador/dispositivo).

Comandos: `npm run dev`, `npm run build`, `npm test`, `npm run test:net`, `npm run sim`.


**Online:** 🔎 *Buscar partida* empareja automáticamente; *Crear sala* sirve para jugar con un amigo. **Ranking** propio por puntos (PT): victoria +10 más la diferencia de vidas, derrota −5 menos la diferencia.
