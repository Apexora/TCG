// Capa visual: nombres e imágenes editables. El motor NO depende de este archivo.
import { CARDS } from '../data/cards';
type Skin = { name?: string; image?: string };
/** Cambios permanentes en código. Ej: lum_acolita: { name: 'Mi nombre', image: import.meta.env.BASE_URL + 'img/mia.webp' } */
export const DEFAULT_SKINS: Record<string, Skin> = {};
const KEY = 'cartas-skins';
let user: Record<string, Skin> = {};
try { user = JSON.parse(localStorage.getItem(KEY) || '{}'); } catch { /* vacío */ }
const save = () => { try { localStorage.setItem(KEY, JSON.stringify(user)); } catch { alert('No hay espacio para guardar esa imagen.'); } };
export const nameOf = (id: string) => user[id]?.name || DEFAULT_SKINS[id]?.name || CARDS[id].name;
export const imageOf = (id: string) =>
  user[id]?.image ||
  DEFAULT_SKINS[id]?.image ||
  `${import.meta.env.BASE_URL}img/${id}.webp?v=${__IMG_V__}`;
export const setSkin = (id: string, p: Skin) => { user[id] = { ...user[id], ...p }; save(); };
export const resetSkins = () => { user = {}; save(); };
