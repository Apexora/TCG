// Mazos: predeterminados (Luminarae/Umbra) + mazos personalizados guardados en el navegador. Sin DOM: se puede probar con tsx.
import { CARDS, DECKS } from './data/cards';

export const DECK_SIZE = 30;     // los mazos personalizados deben tener exactamente 30 cartas
export const MAX_COPIES = 2;     // copias máximas de una misma carta (como en los mazos predeterminados)
export type Faction = 'Luminarae' | 'Umbra';
export interface CustomDeck { id: string; name: string; cards: string[] }

const has = (o: object, k: string) => Object.prototype.hasOwnProperty.call(o, k);
export const esc = (t: string) => t.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!));

/** null si el mazo es válido; si no, el motivo. */
export function deckError(cards: unknown): string | null {
  if (!Array.isArray(cards)) return 'Mazo inválido';
  if (cards.length !== DECK_SIZE) return `Necesitas exactamente ${DECK_SIZE} cartas (llevas ${cards.length})`;
  const n: Record<string, number> = {};
  for (const id of cards) {
    if (typeof id !== 'string' || !has(CARDS, id)) return 'Hay una carta desconocida';
    if ((n[id] = (n[id] || 0) + 1) > MAX_COPIES) return `Máximo ${MAX_COPIES} copias de ${CARDS[id].name}`;
  }
  return null;
}

// ---------- Persistencia ----------
const KD = 'tcgCustomDecks', KS = 'tcgDeck';
let list: CustomDeck[] = [];
try {
  const r = JSON.parse(localStorage.getItem(KD) || '[]');
  if (Array.isArray(r)) list = r.filter(d => d && typeof d.id === 'string' && typeof d.name === 'string' && !deckError(d.cards));
} catch { /* vacío */ }
const persist = () => { try { localStorage.setItem(KD, JSON.stringify(list)); } catch { /* sin espacio */ } };

export const customDecks = (): CustomDeck[] => list.map(d => ({ ...d, cards: [...d.cards] }));
export const newDeckId = () => 'c' + Date.now().toString(36) + Math.random().toString(36).slice(2, 5);
export function saveCustom(d: CustomDeck) {
  const e = deckError(d.cards); if (e) throw new Error(e);
  const c = { id: d.id, name: d.name.trim().slice(0, 24) || 'Mazo sin nombre', cards: [...d.cards] };
  const i = list.findIndex(x => x.id === d.id); if (i >= 0) list[i] = c; else list.push(c);
  persist();
}
export function removeCustom(id: string) { list = list.filter(d => d.id !== id); persist(); }

// ---------- Mazo elegido ----------
let sel = 'Luminarae';
try { sel = localStorage.getItem(KS) || sel; } catch { /* ignorar */ }
/** Clave del mazo elegido: 'Luminarae', 'Umbra' o el id de un mazo personalizado (si ya no existe, Luminarae). */
export const getDeck = (): string => (has(DECKS, sel) || list.some(d => d.id === sel) ? sel : 'Luminarae');
export function setDeck(k: string) { sel = k; try { localStorage.setItem(KS, k); } catch { /* ignorar */ } }

export function deckCards(key: string): string[] {
  if (has(DECKS, key)) return DECKS[key];
  return list.find(d => d.id === key)?.cards ?? DECKS.Luminarae;
}
export const deckLabel = (key: string) => (has(DECKS, key) ? key : list.find(d => d.id === key)?.name ?? 'Luminarae');
/** Facción "visual" de un mazo (avatar, colores): la que tenga más cartas. */
export const deckFaction = (cards: string[]): Faction => (cards.filter(i => i.startsWith('umb')).length * 2 > cards.length ? 'Umbra' : 'Luminarae');
/** Rival de la IA: el mazo predeterminado de la otra facción. */
export const otherDeck = (key: string): Faction => (deckFaction(deckCards(key)) === 'Umbra' ? 'Luminarae' : 'Umbra');

// ---------- Online ----------
/** Lo que se guarda en la sala: el nombre si es predeterminado; la lista de cartas si es personalizado. */
export const wireDeck = (key: string): string | string[] => (has(DECKS, key) ? key : [...deckCards(key)]);
/** Lo que llega de la sala → lista de cartas. Se valida igual en los dos clientes (si algo no cuadra, mazo predeterminado). */
export function parseWire(v: unknown, fallback: Faction): string[] {
  if (typeof v === 'string' && has(DECKS, v)) return DECKS[v];
  if (Array.isArray(v) && !deckError(v)) return [...v];
  return DECKS[fallback];
}
