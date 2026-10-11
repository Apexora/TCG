export {
  app, auth, db,
  requerirUsuario as ensureUser,
  premiar, sumarStat, desbloquearLogro, obtenerPerfil, registrarActividad,
} from '../apexora-core.js';

export const isConfigured = true;

export function netErr(e: unknown): string {
  const x = e as { code?: string; message?: string }, c = String(x?.code ?? '');
  if (c.includes('permission-denied')) return 'Firebase rechazó la operación (¿sala llena, ya empezada, sesión inválida o reglas sin publicar?).';
  if (c.includes('unavailable') || c.includes('network')) return 'Sin conexión con Firebase.';
  return x?.message ?? 'Error de conexión';
}