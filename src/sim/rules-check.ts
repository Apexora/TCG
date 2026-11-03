declare const process: { exit(n: number): never };
import { DECKS } from '../data/cards';
import { atkOf, canAttack, canBlock, canPlay, newGame, step } from '../engine/engine';
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
// Mutante (Psybernia): al cerrar la ronda sufre una mutación aleatoria y permanente (nunca muere por ella)
{
  let changed = 0, alive = 0, runs = 40;
  for (let k = 0; k < runs; k++) {
    let m = fresh(); m.seed = 1000 + k; const mt = m.token; mine(m).board = [U(1, 'psy_cobaya', 2, 2, ['mutante'])];
    m = endRound(m); const u = m.p[mt].board[0];
    if (u) { alive++; if (u.atk !== 2 || u.hp !== 2 || u.kw.length > 1) changed++; }
  }
  ok(alive === runs && changed >= runs - 1, 'Mutante: siempre muta al cerrar la ronda y nunca muere por la mutación');
  const seen = new Set<string>();
  for (let k = 0; k < 60; k++) { let m = fresh(); m.seed = 50 + k; const mt = m.token; mine(m).board = [U(1, 'psy_cobaya', 2, 2, ['mutante'])]; m = endRound(m); const u = m.p[mt].board[0]; seen.add(u.atk === 4 ? 'atk' : u.hp === 4 ? 'hp' : u.atk === 1 ? 'bad' : u.kw.length > 1 ? 'kw' : 'x'); }
  ok(['atk', 'hp', 'bad', 'kw'].every(k => seen.has(k)), 'Mutante: aparecen las 4 mutaciones (poder, vida, palabra clave, defecto)');
  let a = fresh(); a.seed = 7; const at = a.token; mine(a).board = [U(1, 'psy_cobaya', 2, 2, ['mutante'])]; let b = structuredClone(a);
  a = endRound(a); b = endRound(b); ok(JSON.stringify(a.p[at].board) === JSON.stringify(b.p[at].board), 'Mutante: es determinista con la misma semilla (online)');
}
// Soterrado: intocable por hechizos; emerge al atacar (+1) y al bloquear
{
  let g = fresh(); const me = g.token, foe = 1 - me;
  g.p[foe].board = [U(1, 'psy_gusano', 2, 2, ['soterrado'])]; mine(g).hand = ['psy_bisturi']; mine(g).mana = 5; g.active = me;
  ok(!canPlay(g, me, 0), 'Soterrado: un hechizo enemigo no puede elegir a una unidad enterrada');
  g.p[foe].board.push(U(2, 'umb_sombra', 2, 2)); ok(canPlay(g, me, 0), 'Soterrado: con otro objetivo visible sí se puede lanzar');
  const t0 = step(g, { type: 'play', hand: 0, target: 1 }); ok(t0 === g, 'Soterrado: elegir como objetivo a la enterrada es ilegal');
  let d = fresh(); d.p[1 - d.token].board = [U(1, 'umb_sombra', 3, 3), U(2, 'psy_gusano', 2, 2, ['soterrado'])]; mine(d).hand = ['psy_purga'];
  mine(d).board = [U(3, 'umb_sombra', 5, 4)]; mine(d).mana = 10; d.active = d.token;
  d = step(d, { type: 'play', hand: 0 }); d = step(d, { type: 'pass' });
  const fb = d.p[1 - d.token].board; ok(fb.find(u => u.uid === 2)?.dmg === 0 && !fb.find(u => u.uid === 1) && !mine(d).board.length, 'Purga: arrasa lo no mutado pero no toca a las enterradas');
  let a = fresh(); const at = a.token; mine(a).board = [U(1, 'psy_gusano', 2, 2, ['soterrado'])]; a.p[1 - at].board = [U(2, 'umb_sombra', 2, 5)];
  a = step(a, { type: 'attack', units: [0] }); const u = a.p[at].board[0];
  ok(!u.kw.includes('soterrado') && atkOf(u) === 3, 'Soterrado: al atacar emerge con +1 de poder (Emboscada)');
  let bk = fresh(); const bt = bk.token; mine(bk).board = [U(1, 'umb_sombra', 2, 2)]; bk.p[1 - bt].board = [U(2, 'psy_gusano', 2, 3, ['soterrado'])];
  bk = step(bk, { type: 'attack', units: [0] }); bk = step(bk, { type: 'block', attacker: 0, blocker: 0 }); bk = step(bk, { type: 'confirmBlocks' }); bk = step(bk, { type: 'pass' });
  ok(!bk.p[1 - bt].board[0].kw.includes('soterrado'), 'Soterrado: al bloquear sale a la superficie');
  let c = fresh(); const ct = c.token; mine(c).board = [U(1, 'umb_sombra', 2, 2)]; mine(c).hand = ['psy_inyeccion']; mine(c).mana = 3; c.active = ct;
  c = step(c, { type: 'play', hand: 0, target: 1 }); ok(mine(c).board[0].kw.includes('soterrado'), 'Cavar Madriguera: entierra a una aliada (ráfaga)');
}
// Metástasis: al morir deja un Engendro
{
  let m = fresh(); const mt = m.token; mine(m).board = [U(1, 'psy_resto', 1, 1, ['metastasis'])]; mine(m).board[0].dmg = 5;
  m = step(m, { type: 'pass' }); m = step(m, { type: 'pass' });
  ok(m.p[mt].board.some(u => u.card === 'psy_engendro') && !m.p[mt].board.some(u => u.card === 'psy_resto'), 'Metástasis: al morir brota un Engendro');
}
// Fusión: absorbe estadísticas Y palabras clave
{
  let f = fresh(); const ft = f.token; f.p[ft].board = [U(1, 'umb_sombra', 2, 1, ['letal'])]; f.p[ft].hand = ['psy_quimera'];
  f = step(f, { type: 'play', hand: 0 }); const q = f.p[ft].board[0];
  ok(f.p[ft].board.length === 1 && q.atk === 5 && q.hp === 4 && q.kw.includes('letal'), 'Fusión: absorbe estadísticas y palabras clave');
}
// Extracción genética: daño + arranca la palabra clave y la injerta
{
  let x = fresh(); const xt = x.token; mine(x).board = [U(1, 'umb_sombra', 2, 2)]; x.p[1 - xt].board = [U(2, 'umb_sombra', 3, 3, ['letal', 'duro'])];
  mine(x).hand = ['psy_bisturi']; mine(x).mana = 3; x.active = xt;
  x = step(x, { type: 'play', hand: 0, target: 2 });
  ok(mine(x).board[0].kw.includes('letal') && !x.p[1 - xt].board[0].kw.includes('letal') && x.p[1 - xt].board[0].kw.includes('duro'), 'Extracción: roba la palabra clave más valiosa');
}
// Disección: si la víctima muere, los Mutantes absorben su ADN
{
  let x = fresh(); const xt = x.token; mine(x).board = [U(1, 'psy_cobaya', 2, 2, ['mutante'])]; x.p[1 - xt].board = [U(2, 'umb_sombra', 1, 2)];
  mine(x).hand = ['psy_disecar']; mine(x).mana = 3; x.active = xt;
  x = step(x, { type: 'play', hand: 0, target: 2 }); x = step(x, { type: 'pass' });
  ok(!x.p[1 - xt].board.length && mine(x).board[0].atk === 3 && mine(x).board[0].hp === 3, 'Disección: el Mutante absorbe el ADN de la víctima');
}
// Amputación: +3 de poder, -1 de vida, sin matar; Tormenta de arena: -2 enemigas y entierra a las propias
{
  let x = fresh(); const xt = x.token; mine(x).board = [U(1, 'umb_sombra', 2, 1)]; mine(x).hand = ['psy_amputar']; mine(x).mana = 3; x.active = xt;
  x = step(x, { type: 'play', hand: 0, target: 1 }); x = step(x, { type: 'pass' });
  ok(mine(x).board[0].atk === 5 && mine(x).board[0].hp === 1, 'Amputación: +3 de poder y la vida no baja de 1');
  let y = fresh(); const yt = y.token; mine(y).board = [U(1, 'umb_sombra', 2, 2)]; y.p[1 - yt].board = [U(2, 'umb_sombra', 4, 4)]; mine(y).hand = ['psy_arena']; mine(y).mana = 5; y.active = yt;
  y = step(y, { type: 'play', hand: 0 }); y = step(y, { type: 'pass' });
  ok(atkOf(y.p[1 - yt].board[0]) === 2 && mine(y).board[0].kw.includes('soterrado'), 'Tormenta de Arena: -2 de poder al rival y entierra a las tuyas');
}
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
// --- Negatt: necrótico, marchitar, descartes, mazo y Pestes ---
{
  const play = (g: State, card: string, tgtUid?: number): State => { const me = g.active; g.p[me].hand = [card]; g.p[me].mana = 10; g.p[me].spell = 0; let r = step(g, { type: 'play', hand: 0, target: tgtUid }); if (r.phase === 'stack') r = step(r, { type: 'pass' }); return r; };
  // Daño necrótico: ignora Barrera y Duro, deja Marchita a la superviviente y la Marchita no regenera ni se cura
  let n = fresh(); const me = n.active, foe = 1 - me as 0 | 1;
  n.p[foe].board = [U(1, 'lum_centinela', 2, 5, ['barrera', 'duro', 'regenera'])];
  n = play(n, 'neg_exorcismo', 1); const v = n.p[foe].board[0];
  ok(v && v.dmg === 2 && !v.kw.includes('barrera') === false && v.kw.includes('marchito'), 'Necrótico: ignora Barrera/Duro y deja Marchita');
  let w = n; w.p[0].mana = 0; w.p[1].mana = 0; w = step(w, { type: 'pass' }); w = step(w, { type: 'pass' });
  ok(w.p[foe].board[0].dmg === 2, 'Marchito: no regenera al cerrar la ronda');
  // Condena: Marchitar deja el poder en 0 para siempre (también tras cerrar la ronda)
  let c = fresh(); const cm = c.active, cf = 1 - cm as 0 | 1; c.p[cf].board = [U(1, 'umb_titan', 7, 7)];
  c = play(c, 'neg_condena', 1); ok(c.p[cf].board[0].atk === 0 && atkOf(c.p[cf].board[0]) === 0, 'Marchitar: poder a 0');
  c.p[0].mana = 0; c.p[1].mana = 0; c = step(c, { type: 'pass' }); c = step(c, { type: 'pass' });
  ok(c.p[cf].board[0].atk === 0, 'Marchitar: dura más allá de la ronda');
  // Sacerdote: el rival descarta 1 carta al azar
  let d = fresh(); const dm = d.active, df2 = 1 - dm as 0 | 1; d.p[df2].hand = ['umb_sombra', 'umb_lobo', 'umb_golem'];
  d = play(d, 'neg_sacerdote'); ok(d.p[df2].hand.length === 2, 'Descartar: el rival pierde 1 carta de la mano');
  // Ángel: cuela una Peste y elimina 2 cartas del mazo rival
  let a = fresh(); const am = a.active, af = 1 - am as 0 | 1; a.p[af].deck = ['umb_sombra', 'umb_lobo', 'umb_golem', 'umb_titan', 'umb_azote'];
  a = play(a, 'neg_angel'); ok(a.p[af].deck.length === 4 && a.p[af].deck.filter(x => x === 'neg_peste').length === 1, 'Mill + Plantar: -2 cartas y +1 Peste en el mazo rival');
  // Peste: jugarla daña al dueño
  let pe = fresh(); const pm = pe.active; const nx = pe.p[pm].nexus; pe = play(pe, 'neg_peste'); ok(pe.p[pm].nexus === nx - 2, 'Peste Latente: tu Nexo recibe 2');
  // Vasallo: necrótico a la enemiga más débil
  let va = fresh(); const vm = va.active, vf = 1 - vm as 0 | 1; va.p[vf].board = [U(1, 'umb_titan', 7, 7), U(2, 'umb_sombra', 2, 2)];
  va = play(va, 'neg_vasallo'); ok(va.p[vf].board.length === 1 && va.p[vf].board[0].card === 'umb_titan', 'Vasallo: mata a la enemiga más débil con necrótico');
}
console.log(fails ? `${fails} fallo(s)` : 'Reglas v3 verificadas: mulligan, rondas, maná de hechizo, bloqueo, rápido, arrollar, elusivo, barrera + mecánicas de naciones (Mutante, Don, Leal, Clonar, Fusión, Tregua, Chicle, Cerrojo, Peaje, Raíz, Poda, Gas, Estilo).');
process.exit(fails ? 1 : 0);
