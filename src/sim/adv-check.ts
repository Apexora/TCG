// Comprueba los mazos de la Aventura y mide su dureza (IA nivel del rival vs. IA al máximo con mazos de serie).
declare const process: { exit(n: number): never; env: Record<string, string | undefined> };
import { NATIONS, DECK_LEN, MAX_COPIES, edgeOf } from '../adventure/rivals';
import { CARDS, DECKS } from '../data/cards';
import { aiAction } from '../ai/ai';
import { applyEdge, newGame, step } from '../engine/engine';
let bad = 0; const ok = (c: boolean, m: string) => { if (!c) { console.log('✗', m); bad++; } };
for (const n of Object.values(NATIONS)) for (const r of n.rivals) {
  ok(r.deck.length === DECK_LEN, `${r.name}: ${r.deck.length} cartas`);
  const cnt: Record<string, number> = {}; r.deck.forEach(id => { ok(!!CARDS[id], `${r.name}: carta desconocida ${id}`); cnt[id] = (cnt[id] ?? 0) + 1; });
  ok(Object.values(cnt).every(c => c <= MAX_COPIES), `${r.name}: >${MAX_COPIES} copias`);
  ok(r.deck.length === 40, 'tamaño');
}
const N = +(process.env.N ?? 150), ONLY = (process.env.ONLY ?? '').split(',').filter(Boolean);
for (const n of Object.values(NATIONS)) for (const r of n.rivals) for (const mine of ['Luminarae', 'Umbra']) {
  if (ONLY.length && !ONLY.includes(n.id)) continue;
  let w = 0, st = 0;
  for (let g = 0; g < N; g++) {
    let s = applyEdge(newGame([DECKS[mine], r.deck], g + 1), 1, edgeOf(r));
    for (let t = 0; t < 3000 && s.winner === null; t++) {
      const a = s.active === 0 ? aiAction(s, 5) : aiAction(s, r.level);
      const nx = step(s, a); if (nx === s && a.type !== 'pass') { s = step(s, { type: 'pass' }); } else s = nx; if (nx === s && a.type === 'pass') { /* nada */ }
    }
    if (s.winner === 0) w++; if (s.winner === null) st++;
  }
  console.log(`${n.name.padEnd(16)} ${r.name.padEnd(12)} nivel ${r.level}  mazo ${mine.padEnd(9)} gana el jugador ${(100 * w / N).toFixed(0)}%${st ? '  ATASCADAS ' + st : ''}`);
}
console.log(bad ? `FALLOS: ${bad}` : 'Mazos de la Aventura válidos.'); if (bad) process.exit(1);
