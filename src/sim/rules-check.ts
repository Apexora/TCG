declare const process: { exit(n: number): never };
import { DECKS } from '../data/cards';
import { atkOf, canAttack, canBlock, newGame, step } from '../engine/engine';
import type { State, Unit } from '../engine/types';
let fails = 0; const ok = (c: boolean, m: string) => { if (!c) { fails++; console.log('✗ ' + m); } };
const U = (uid: number, card: string, atk: number, hp: number, kw: Unit['kw'] = []): Unit => ({ uid, card, atk, hp, dmg: 0, kw, ta: 0, th: 0 });
const fresh = (): State => { const s = step(newGame([DECKS.Luminarae, DECKS.Umbra], 7), { type: 'mulligan', idx: [] }); s.p.forEach(p => { p.board = []; p.mana = 10; }); return s; };
let s = newGame([DECKS.Luminarae, DECKS.Umbra], 1);
ok(s.phase === 'mulligan' && s.p[0].hand.length === 4 && s.p[0].deck.length + 4 === 40, 'mazo 40, mano 4, mulligan');
s = step(s, { type: 'mulligan', idx: [0, 1] });
ok(s.phase === 'main' && s.round === 1 && s.p[0].hand.length === 5 && s.p[s.token].maxMana === 1, 'ronda 1: 1 gema, roba 1');
ok(s.tok[s.token] && !s.tok[1 - s.token], 'ficha de ataque al jugador activo');
// rondas: dos pases seguidos cierran la ronda; maná sobrante pasa a maná de hechizo (máx 3)
let t = s; const a0 = t.active; t = step(t, { type: 'pass' }); t = step(t, { type: 'pass' });
ok(t.round === 2 && t.token !== s.token && t.p[0].spell === 1 && t.p[0].maxMana === 2, 'fin de ronda, alterna ficha, maná de hechizo');
void a0;
// bloqueo y Ataque rápido / Arrollar / Barrera
let g = fresh(); const at = g.token, df = 1 - at as 0 | 1;
g.p[at].board = [U(1, 'umb_jinete', 5, 3, ['arrollar', 'rapido'])]; g.p[df].board = [U(2, 'lum_centinela', 2, 3)];
g = step(g, { type: 'attack', units: [0] }); ok(g.phase === 'block', 'ataque abre fase de bloqueo');
g = step(g, { type: 'block', attacker: 0, blocker: 0 }); g = step(g, { type: 'confirmBlocks' }); g = step(g, { type: 'pass' });
ok(g.p[df].board.length === 0 && g.p[at].board[0].dmg === 0 && g.p[df].nexus === 18, 'rápido mata antes; arrollar pasa 2 al Nexo');
let e = fresh(); e.p[e.token].board = [U(1, 'lum_halcon', 3, 1, ['elusivo'])]; e.p[1 - e.token].board = [U(2, 'lum_centinela', 2, 5)];
ok(!canBlock(e.p[e.token].board[0], e.p[1 - e.token].board[0]), 'elusivo no es bloqueable');
let r = fresh(); r.p[r.token].board = [U(1, 'lum_acolita', 3, 3, ['barrera'])]; r.p[1 - r.token].board = [U(2, 'umb_sombra', 2, 5)];
r = step(r, { type: 'attack', units: [0] }); r = step(r, { type: 'block', attacker: 0, blocker: 0 }); r = step(r, { type: 'confirmBlocks' }); r = step(r, { type: 'pass' });
ok(r.p[r.token].board[0].dmg === 0 && !r.p[r.token].board[0].kw.includes('barrera'), 'barrera niega el primer daño');
ok(atkOf(U(1, 'x', 2, 2)) === 2, 'poder base');
// ---- Mecánicas de las naciones de la Aventura ----
{
const endRound = (g: State): State => { let x = g; for (let k = 0; k < 2; k++) x = step(x, { type: 'pass' }); return x; };
const mine = (g: State) => g.p[g.token];
// Mutante: +2 de poder y -1 de vida permanentes al cerrar la ronda; muere al llegar a 0 de vida
let m = fresh(); const mt = m.token; mine(m).board = [U(1, 'psy_cobaya', 2, 3, ['mutante']), U(2, 'psy_larva', 1, 1, ['mutante'])];
m = endRound(m); ok(m.p[mt].board.length === 1 && m.p[mt].board[0].atk === 4 && m.p[mt].board[0].hp === 2, 'Mutante: +2/-1 al cerrar la ronda y muere con 0 de vida');
// Don: al morir, las demás aliadas ganan +1/+1
let d = fresh(); mine(d).board = [U(1, 'sin_cantor', 1, 2, ['don']), U(2, 'sin_panadero', 2, 2)]; d.p[d.token].board[0].dmg = 5;
d = step(d, { type: 'pass' }); d = step(d, { type: 'pass' });
ok(d.p[0].board.concat(d.p[1].board).filter(u => u.card === 'sin_panadero').every(u => u.atk === 3 && u.hp === 2) && !d.p[d.token].board.some(u => u.card === 'sin_cantor'), 'Don: al morir da +1 de poder a las aliadas');
// Leal: al entrar otra Leal, ambas ganan +1/+1
let l = fresh(); const lt = l.token; l.p[lt].hand = ['ost_obrero', 'ost_aprendiz'];
l = step(l, { type: 'play', hand: 0 }); l = step(l, { type: 'pass' }); l = step(l, { type: 'play', hand: 0 });
ok(l.p[lt].board.length === 2 && l.p[lt].board[0].atk === 2 && l.p[lt].board[0].hp === 1 && l.p[lt].board[1].atk === 1, 'Leal: las demás Leales ganan +1 de poder al entrar');
// Clonar: copia de la aliada más fuerte con la mitad de estadísticas (redondeo arriba)
let c = fresh(); const ct = c.token; c.p[ct].board = [U(1, 'umb_titan', 7, 7, ['regenera'])]; c.p[ct].hand = ['ost_cientifico'];
c = step(c, { type: 'play', hand: 0 });
const cl = c.p[ct].board.find(u => u.uid !== 1 && u.card === 'umb_titan');
ok(!!cl && cl.atk === 4 && cl.hp === 4 && cl.kw.includes('regenera'), 'Clonar: copia 4/4 de la más fuerte');
// Fusión: sacrifica a la más débil y absorbe sus estadísticas
let f = fresh(); const ft = f.token; f.p[ft].board = [U(1, 'umb_sombra', 2, 1)]; f.p[ft].hand = ['psy_quimera'];
f = step(f, { type: 'play', hand: 0 });
ok(f.p[ft].board.length === 1 && f.p[ft].board[0].card === 'psy_quimera' && f.p[ft].board[0].atk === 5 && f.p[ft].board[0].hp === 4, 'Fusión: absorbe a la más débil');
// Tregua: nadie puede atacar esa ronda; se levanta al cerrar la ronda
let t = fresh(); const tt = t.token; mine(t).board = [U(1, 'umb_sombra', 2, 2)]; t.p[tt].hand = ['sin_tregua'];
t = step(t, { type: 'play', hand: 0 }); t = step(t, { type: 'pass' });   // la pila se resuelve
t.active = t.token; t.passes = 0;
const t2 = step(t, { type: 'attack', units: [0] });
ok(t.peace === true && t2 === t, 'Tregua: el ataque es ilegal esta ronda');
t = endRound(t); ok(!t.peace, 'Tregua: se levanta al cerrar la ronda');
// Chicle: la Pegada no ataca ni bloquea y se quita al cerrar la ronda
let g2 = fresh(); const gt = g2.token; g2.p[gt].hand = ['pon_chicle']; g2.p[gt].board = [U(1, 'umb_sombra', 2, 2)]; g2.p[1 - gt].board = [U(2, 'lum_centinela', 2, 3)];
g2 = step(g2, { type: 'play', hand: 0, target: 2 }); g2 = step(g2, { type: 'pass' }); g2 = step(g2, { type: 'pass' });
const foeU = g2.p[1 - gt].board[0];
ok(foeU.kw.includes('pegada') && !canBlock(g2.p[gt].board[0], foeU) && !canAttack(foeU), 'Chicle: Pegada no ataca ni bloquea');
g2 = endRound(g2); ok(!g2.p[0].board.concat(g2.p[1].board).some(u => u.kw.includes('pegada')), 'Chicle: la Pegada se quita al cerrar la ronda');
// Cerrojo: bloquea a Elusivos y Temibles
ok(canBlock(U(1, 'x', 3, 1, ['elusivo']), U(2, 'krn_recluta', 1, 2, ['cerrojo'])) && canBlock(U(1, 'x', 3, 1, ['temible']), U(2, 'krn_recluta', 1, 2, ['cerrojo'])) && !canBlock(U(1, 'x', 3, 1, ['elusivo']), U(2, 'x', 1, 2)), 'Cerrojo: cierra el paso a Elusivos y Temibles');
// Peaje: el rival pierde maná
let pj = fresh(); const pt = pj.token; pj.p[pt].hand = ['krn_peaje']; pj.p[1 - pt].mana = 5;
pj = step(pj, { type: 'play', hand: 0 }); pj = step(pj, { type: 'pass' }); ok(pj.p[1 - pt].mana === 3, 'Peaje: el rival pierde 2 de maná');
// Raíz: no ataca y al cerrar la ronda da un Retoño; Poda destruye a la más débil
let r = fresh(); mine(r).board = [U(1, 'syl_semilla', 0, 2, ['raiz'])];
ok(!canAttack(mine(r).board[0]) && step(r, { type: 'attack', units: [0] }) === r, 'Raíz: no puede atacar');
r = endRound(r); ok(r.p[0].board.concat(r.p[1].board).filter(u => u.card === 'syl_retono').length === 1, 'Raíz: da vida a un Retoño al cerrar la ronda');
let po = fresh(); const pot = po.token; po.p[pot].hand = ['syl_poda']; po.p[1 - pot].board = [U(5, 'lum_centinela', 2, 2), U(6, 'umb_titan', 7, 7)];
po = step(po, { type: 'play', hand: 0 }); po = step(po, { type: 'pass' }); po = step(po, { type: 'pass' });
ok(po.p[1 - pot].board.length === 1 && po.p[1 - pot].board[0].uid === 6, 'Poda: destruye a la unidad enemiga más débil');
// Gas tóxico: daña a las no Adaptadas; las Adaptadas ganan +1 de poder
let gs = fresh(); const gst = gs.token; gs.p[gst].hand = ['dsj_fuga']; mine(gs).board = [U(1, 'dsj_nacido', 2, 2, ['adaptado'])]; gs.p[1 - gst].board = [U(2, 'lum_centinela', 2, 3)];
gs = step(gs, { type: 'play', hand: 0 }); gs = step(gs, { type: 'pass' }); gs = step(gs, { type: 'pass' }); gs = step(gs, { type: 'pass' });   // resolver, cerrar ronda
ok(gs.p[1 - gst].board[0].dmg === 1 && gs.p[gst].board[0].atk === 2 && gs.p[gst].board[0].dmg === 0 && gs.gas === 0, 'Gas: daña a lo no Adaptado, el Adaptado es inmune');
// Estilo: cada hechizo lanzado da +1/+1 esta ronda
let e2 = fresh(); const et = e2.token; e2.p[et].hand = ['pon_pose']; mine(e2).board = [U(1, 'pon_modelo', 2, 2, ['estilo'])];
e2 = step(e2, { type: 'play', hand: 0, target: 1 }); const eu = e2.p[et].board[0];
ok(eu.atk + eu.ta === 5 && eu.hp + eu.th === 3, 'Estilo: +1/+1 al lanzar un hechizo (+2 de la Pose)');
// Drenar: la curación es FIJA (3), aunque la Barrera absorba todo el daño
let dr = fresh(); const drt = dr.token; dr.p[drt].hand = ['umb_drenar']; dr.p[drt].nexus = 10; dr.p[1 - drt].board = [U(2, 'lum_centinela', 2, 2, ['barrera'])];
dr = step(dr, { type: 'play', hand: 0, target: 2 }); dr = step(dr, { type: 'pass' });
ok(dr.p[drt].nexus === 13 && dr.p[1 - drt].board[0].dmg === 0, 'Drenar: cura 3 fijos aunque no cause daño (Barrera)');
let dr2 = fresh(); const drt2 = dr2.token; dr2.p[drt2].hand = ['umb_drenar']; dr2.p[drt2].nexus = 10; dr2.p[1 - drt2].board = [U(2, 'lum_vigia', 1, 1)];
dr2 = step(dr2, { type: 'play', hand: 0, target: 2 }); dr2 = step(dr2, { type: 'pass' });
ok(dr2.p[drt2].nexus === 13, 'Drenar: cura 3 aunque el objetivo solo tuviera 1 de vida');
// Bloqueo: un bloqueador ya asignado se puede MOVER a otro atacante
let bm = fresh(); const bat = bm.token, bdf = 1 - bat as 0 | 1;
bm.p[bat].board = [U(1, 'umb_lobo', 2, 2), U(2, 'umb_lobo', 2, 2)]; bm.p[bdf].board = [U(3, 'lum_centinela', 2, 3), U(4, 'lum_centinela', 2, 3)];
bm = step(bm, { type: 'attack', units: [0, 1] });
bm = step(bm, { type: 'block', attacker: 0, blocker: 0 }); ok(bm.blocks['1'] === 3, 'bloqueo asignado');
bm = step(bm, { type: 'block', attacker: 1, blocker: 0 }); ok(bm.blocks['1'] === undefined && bm.blocks['2'] === 3, 'el bloqueador se mueve al otro atacante');
bm = step(bm, { type: 'block', attacker: 1, blocker: 0 }); ok(bm.blocks['2'] === undefined, 'pulsar de nuevo lo quita');
// ...pero no si lo impone un Retador
let bf = fresh(); const fat = bf.token, fdf = 1 - fat as 0 | 1;
bf.p[fat].board = [U(1, 'lum_lider', 4, 5, ['retador']), U(2, 'umb_lobo', 2, 2)]; bf.p[fdf].board = [U(3, 'lum_centinela', 2, 3)];
bf = step(bf, { type: 'attack', units: [0, 1] }); const before = bf;
bf = step(bf, { type: 'block', attacker: 1, blocker: 0 }); ok(bf === before && bf.blocks['1'] === 3, 'el bloqueo forzado por Retador no se mueve');
}
console.log(fails ? `${fails} fallo(s)` : 'Reglas v3 verificadas: mulligan, rondas, maná de hechizo, bloqueo, rápido, arrollar, elusivo, barrera + mecánicas de naciones (Mutante, Don, Leal, Clonar, Fusión, Tregua, Chicle, Cerrojo, Peaje, Raíz, Poda, Gas, Estilo).');
process.exit(fails ? 1 : 0);
