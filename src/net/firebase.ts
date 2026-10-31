// Backend propio del juego (solo para las salas online). Sin cuentas ni perfil: cada jugador entra con sesión anónima.
// Rellena tu proyecto en un archivo .env.local (ver .env.example). Sin configuración, el modo Online avisa y el resto del juego funciona igual.
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const env = import.meta.env;
const cfg = {
  apiKey: env.VITE_FIREBASE_API_KEY as string | undefined,
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN as string | undefined,
  projectId: env.VITE_FIREBASE_PROJECT_ID as string | undefined,
  appId: env.VITE_FIREBASE_APP_ID as string | undefined,
};

export const isConfigured = !!(cfg.apiKey && cfg.projectId && cfg.appId);
export const app = initializeApp(isConfigured ? cfg : { apiKey: 'x', projectId: 'unconfigured', appId: 'x' });
export const auth = getAuth(app);
export const db = getFirestore(app);

/** Sesión anónima (identifica al jugador solo dentro de una sala). */
export async function ensureUser() {
  if (!isConfigured) throw new Error(netErr(null));
  await auth.authStateReady();   // espera a que se restaure la sesión guardada (si no, se crearía una anónima nueva)
  if (!auth.currentUser) await signInAnonymously(auth);
  return auth.currentUser!;
}

export function netErr(e: unknown): string {
  if (!isConfigured) return 'El modo Online no está configurado (faltan las claves de Firebase en .env.local).';
  const x = e as { code?: string; message?: string }, c = String(x?.code ?? '');
  if (c.includes('permission-denied')) return 'Firebase rechazó la operación (¿sala llena, ya empezada, sesión inválida o reglas sin publicar?).';
  if (c.includes('unavailable') || c.includes('network')) return 'Sin conexión con Firebase.';
  return x?.message ?? 'Error de conexión';
}
