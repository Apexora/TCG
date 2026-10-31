// Emparejamiento automático: las salas que esperan rival se anuncian en tcgQueue/{códigoDeSala}. Buscar = unirse a una anunciada o crear y anunciar la tuya.
import { collection, deleteDoc, doc, getDocs, orderBy, query, setDoc, updateDoc, where } from 'firebase/firestore';
import { db } from './firebase';

export const FRESCO_MS = 40_000;   // una sala sin latido en este tiempo se considera abandonada

/** Códigos de salas que esperan rival (las más antiguas primero), sin contar las mías. */
export async function buscarSalas(miUid: string): Promise<string[]> {
  const s = await getDocs(query(collection(db, 'tcgQueue'), where('t', '>', Date.now() - FRESCO_MS), orderBy('t')));
  return s.docs.filter(d => d.data().host !== miUid).map(d => d.id);
}
export const publicar = (code: string, uid: string) => setDoc(doc(db, 'tcgQueue', code), { host: uid, t: Date.now() });
export const latido = (code: string) => updateDoc(doc(db, 'tcgQueue', code), { t: Date.now() }).catch(() => {});
export const retirar = (code: string) => deleteDoc(doc(db, 'tcgQueue', code)).catch(() => {});
