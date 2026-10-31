# Cartas Alfa

## Multijugador online (Firebase)
1. Firebase Console → Authentication → Sign-in method → activa **Anónimo**.
2. Firestore → Reglas: permite leer/escribir la colección `tcgGames` (y su subcolección `chat`) a usuarios autenticados.
3. Copia `.env.example` a `.env.local` y rellena las claves de tu proyecto Firebase (el juego es independiente: no usa ningún otro servicio).
4. `npm run dev`; 🌐 Online → Crear sala → pasa el código de 4 letras al rival (otro navegador/dispositivo).

Comandos: `npm run dev`, `npm run build`, `npm test`, `npm run test:net`, `npm run sim`.
