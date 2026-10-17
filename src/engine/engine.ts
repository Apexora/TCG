import { CARDS } from '../data/cards';
import type { Action, Effect, Keyword, State, Unit } from './types';

const o = (i: number) => (1 - i) as 0 | 1;
export function rand(s: { seed: number }): number {
  s.seed = (s.seed + 0x6d2b79f5) | 0; let t = s.seed;
  t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}
function shuffle(s: State, a: string[]) { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rand(s) * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } }
function draw(s: State, i: number, n: number) {
  const p = s.p[i];
  for (let k = 0; k < n; k++) {
    const c = p.deck.pop();
    if (!c) { s.winner = o(i); break; }            // robar de un mazo vacío = derrota
    if (p.hand.length < 10) p.hand.push(c);        // mano llena: la carta se pierde
  }
}
const heal = (s: State, i: number, n: number) => { s.p[i].nexus = Math.min(20, s.p[i].nexus + n); };
export const atkOf = (u: Unit) => Math.max(0, u.atk + u.ta);
export const curHp = (u: Unit) => u.hp + u.th - u.dmg;
const kill = (u: Unit) => { u.dmg = u.hp + u.th + 999; };
const power = (u: Unit) => atkOf(u) * 1e6 + curHp(u) * 1e3 + CARDS[u.card].cost;
const strongest = (l: Unit[]) => l.reduce<Unit | undefined>((b, u) => (!b || power(u) > power(b) ? u : b), undefined);
const weakest = (l: Unit[]) => l.reduce<Unit | undefined>((b, u) => (!b || power(u) < power(b) ? u : b), undefined);
const ENEMY_T = ['dmgEnemy', 'drain', 'destroyEnemy', 'sacDmg', 'frost'], ALLY_T = ['buffAlly', 'giveKw', 'tempBuff', 'healUnit'];
/** Objetivo manual que exige un hechizo (null = sin objetivo). */
export function targetKind(id: string): 'enemy' | 'ally' | null {
  const c = CARDS[id]; if (!c || c.type !== 'spell') return null;
  if (c.fx.some(e => ENEMY_T.includes(e.t))) return 'enemy';
  if (c.fx.some(e => ALLY_T.includes(e.t))) return 'ally';
  return null;
}
/** Elusivo solo lo bloquea un elusivo; Temible solo lo bloquea quien tenga 3+ de poder. */
export function canBlock(a: Unit, b: Unit): boolean {
  if (a.kw.includes('elusivo') && !b.kw.includes('elusivo')) return false;
  if (a.kw.includes('temible') && atkOf(b) < 3) return false;
  return true;
}

export function newGame(decks: [string[], string[]], seed: number): State {
  const mk = (d: string[]) => ({ nexus: 20, deck: [...d], hand: [] as string[], board: [] as Unit[], mana: 0, maxMana: 0, spell: 0, played: [] as string[] });
  const s: State = { p: [mk(decks[0]), mk(decks[1])], round: 0, token: 0, active: 0, phase: 'mulligan', passes: 0, winner: null, seed, uid: 0, log: [], stack: [], attackers: [], blocks: {}, forced: [], tok: [false, false], resumePhase: 'main', mull: [false, false] };
  s.p.forEach(p => shuffle(s, p.deck)); draw(s, 0, 4); draw(s, 1, 4);
  s.token = rand(s) < 0.5 ? 0 : 1; // startRound lo invierte
  return s;
}
function mulligan(s: State, i: number, idx: number[]) {
  const p = s.p[i], set = [...new Set(idx)].filter(k => k >= 0 && k < p.hand.length).sort((a, b) => b - a);
  for (const k of set) p.deck.push(p.hand.splice(k, 1)[0]);
  shuffle(s, p.deck); draw(s, i, set.length);
}
function startRound(s: State) {
  s.round++;
  if (s.round > 40) { s.winner = -1; return; }
  s.token = o(s.token); s.active = s.token; s.phase = 'main'; s.passes = 0; s.attackers = []; s.blocks = {}; s.forced = []; s.stack = [];
  s.tok = [false, false]; s.tok[s.token] = true;
  for (const i of [s.token, o(s.token)]) { const p = s.p[i]; p.maxMana = Math.min(10, p.maxMana + 1); p.mana = p.maxMana; draw(s, i, 1); if (s.winner !== null) return; }
  s.log = s.log.slice(-40); s.log.push(`— Ronda ${s.round} (ficha: J${s.token + 1}) —`); checkWin(s);
}
function endRound(s: State) {
  for (const p of s.p) { p.spell = Math.min(3, p.spell + p.mana); p.mana = 0; }
  for (const p of s.p) p.board.forEach(u => { if (u.kw.includes('regenera')) u.dmg = 0; });
  for (const p of s.p) p.board.forEach(u => { if (u.kw.includes('efimero')) kill(u); });
  cleanup(s);
  for (const p of s.p) p.board.forEach(u => { u.ta = 0; u.th = 0; if (u.dmg >= u.hp) u.dmg = u.hp - 1; });
  checkWin(s); if (s.winner === null) startRound(s);
}
function checkWin(s: State) {
  if (s.winner !== null) return;
  const a = s.p[0].nexus <= 0, b = s.p[1].nexus <= 0;
  if (a && b) s.winner = -1; else if (a) s.winner = 1; else if (b) s.winner = 0;
}
function cleanup(s: State) {
  for (let changed = true; changed;) {
    changed = false;
    for (const p of s.p) {
      const dead = p.board.filter(u => curHp(u) <= 0);
      if (!dead.length) continue;
      changed = true; p.board = p.board.filter(u => curHp(u) > 0);
      for (const u of p.board) { const g = CARDS[u.card].grow; if (g) { u.atk += g.a * dead.length; u.hp += g.h * dead.length; } }
    }
  }
}
function dealDamage(s: State, t: Unit, n: number, src?: { u: Unit; owner: number }): number {
  if (n <= 0) return 0;
  const b = t.kw.indexOf('barrera');
  if (b >= 0) { t.kw.splice(b, 1); return 0; }
  if (t.kw.includes('duro')) n = Math.max(0, n - 1);
  if (n <= 0) return 0;
  const dealt = Math.min(n, Math.max(0, curHp(t)));
  t.dmg += n;
  if (src) {
    if (src.u.kw.includes('letal')) kill(t);
    if (src.u.kw.includes('robovida')) heal(s, src.owner, dealt);
  }
  return dealt;
}
function applyFx(s: State, i: number, e: Effect, src?: Unit, tgt?: Unit) {
  const me = s.p[i], foe = s.p[o(i)];
  switch (e.t) {
    case 'healNexus': heal(s, i, e.n); break;
    case 'hurtNexus': me.nexus -= e.n; break;
    case 'dmgNexus': foe.nexus -= e.n; break;
    case 'draw': draw(s, i, e.n); break;
    case 'buffOther': { const t = strongest(me.board.filter(u => u !== src)); if (t) { t.atk += e.a; t.hp += e.h; } break; }
    case 'buffAlly': { const t = tgt ?? strongest(me.board); if (t) { t.atk += e.a; t.hp += e.h; } break; }
    case 'tempBuff': { const t = tgt ?? strongest(me.board); if (t) { t.ta += e.a; t.th += e.h; } break; }
    case 'healUnit': { const t = tgt ?? me.board.find(u => u.dmg > 0); if (t) t.dmg = Math.max(0, t.dmg - e.n); break; }
    case 'tempBuffAll': me.board.forEach(u => { u.ta += e.a; u.th += e.h; }); break;
    case 'buffAll': me.board.forEach(u => { u.atk += e.a; u.hp += e.h; }); break;
    case 'giveKw': { const t = tgt ?? strongest(me.board); if (t && !t.kw.includes(e.kw as Keyword)) t.kw.push(e.kw); break; }
    case 'dmgEnemy': { const t = tgt ?? strongest(foe.board); if (t) dealDamage(s, t, e.n); break; }
    case 'drain': { const t = tgt ?? strongest(foe.board); if (t) heal(s, i, dealDamage(s, t, e.n)); break; }
    case 'dmgAll': foe.board.forEach(u => dealDamage(s, u, e.n)); break;
    case 'frost': { const t = tgt ?? strongest(foe.board); if (t) t.ta -= atkOf(t); break; }
    case 'sacDraw': { const v = weakest(me.board.filter(u => u !== src)); if (v) { kill(v); cleanup(s); draw(s, i, e.n); } break; }
    case 'sacDmg': { const v = weakest(me.board), t = tgt ?? strongest(foe.board); if (v && t) { const a = atkOf(v); kill(v); dealDamage(s, t, a); } break; }
    case 'debuffEnemies': foe.board.forEach(u => { u.atk = Math.max(0, u.atk - e.a); u.hp -= e.h; }); break;
    case 'destroyEnemy': { const t = tgt ?? strongest(foe.board); if (t) kill(t); break; }
  }
  cleanup(s);
}
export function canPlay(s: State, i: number, idx: number): boolean {
  const p = s.p[i], c = CARDS[p.hand[idx]];
  if (!c || s.winner !== null || s.active !== i || s.phase === 'mulligan') return false;
  if (c.type === 'unit') return s.phase === 'main' && !s.stack.length && !s.attackers.length && p.board.length < 6 && c.cost <= p.mana;
  if (c.cost > p.mana + p.spell) return false;
  const sp = c.speed ?? 'fast';
  if ((sp === 'slow' || sp === 'focus') && (s.phase !== 'main' || s.stack.length || s.attackers.length)) return false; // solo como acción original
  const k = targetKind(c.id);
  if ((k === 'enemy' && !s.p[o(i)].board.length) || (k === 'ally' && !p.board.length)) return false;
  if (c.fx.some(e => e.t === 'sacDmg') && !p.board.length) return false;
  return true;
}
/** Tras un hechizo en fase de bloqueo: anula los bloqueos que ya no son legales (p. ej. el atacante ganó Elusivo). */
function fixBlocks(s: State) {
  if (s.phase !== 'block' && !(s.phase === 'stack' && s.resumePhase === 'block')) return;
  const A = s.p[s.token], D = s.p[o(s.token)];
  for (const key of Object.keys(s.blocks)) {
    const a = A.board.find(u => String(u.uid) === key), b = D.board.find(u => u.uid === s.blocks[key]);
    if (a && b && canBlock(a, b)) continue;
    if (a && b) s.log.push(`Bloqueo anulado: {${b.card}} ya no puede bloquear a {${a.card}}`);
    delete s.blocks[key]; s.forced = s.forced.filter(f => String(f) !== key);
  }
}
function resolveTop(s: State) {
  const it = s.stack.pop(); if (!it) return;
  const c = CARDS[it.card], k = targetKind(it.card); let tgt: Unit | undefined;
  if (k) {
    tgt = [...s.p[0].board, ...s.p[1].board].find(u => u.uid === it.target);
    if (!tgt) { s.log.push(`{${it.card}} se disipa: el objetivo ya no existe`); return; }
  }
  s.log.push(`Se resuelve {${it.card}}`);
  c.fx.forEach(e => applyFx(s, it.owner, e, undefined, tgt)); cleanup(s); checkWin(s);
}
function finishStack(s: State) {
  const starter = s.stack[0]?.owner ?? s.active;
  while (s.stack.length && s.winner === null) resolveTop(s);
  if (s.winner !== null) return;
  fixBlocks(s);
  s.phase = s.resumePhase; s.active = o(starter); s.passes = 0;
}
function resolveCombat(s: State) {
  const at = s.token, df = o(at), A = s.p[at], D = s.p[df];
  const pairs = s.attackers.map(uid => A.board.find(u => u.uid === uid)).filter((u): u is Unit => !!u)
    .map(u => ({ u, had: s.blocks[String(u.uid)] !== undefined, b: D.board.find(x => x.uid === s.blocks[String(u.uid)]) }));
  const struck = new Set<number>(), nex = (u: Unit, n: number) => {
    if (n <= 0) return; s.p[df].nexus -= n; if (u.kw.includes('robovida')) heal(s, at, n);
  };
  const hit = (src: Unit, owner: number, t: Unit) => {
    const need = curHp(t) + (t.kw.includes('duro') ? 1 : 0), a = atkOf(src);
    dealDamage(s, t, a, { u: src, owner }); struck.add(src.uid);
    return Math.max(0, a - need);
  };
  // Segmento 1: Ataque rápido golpea antes del bloqueador.
  for (const { u, b } of pairs) if (b && u.kw.includes('rapido') && atkOf(u) > 0) { const ex = hit(u, at, b); if (u.kw.includes('arrollar')) nex(u, ex); if (u.kw.includes('efimero')) kill(u); }
  cleanup(s); checkWin(s); if (s.winner !== null) return;
  // Segmento 2: golpes simultáneos.
  for (const { u, had, b } of pairs) {
    if (curHp(u) <= 0) continue;
    const quick = struck.has(u.uid);
    if (b && curHp(b) > 0) {
      let ex = 0; if (!quick && atkOf(u) > 0) ex = hit(u, at, b);
      if (atkOf(b) > 0) { dealDamage(s, u, atkOf(b), { u: b, owner: df }); }
      if (u.kw.includes('arrollar') && !quick) nex(u, ex);
      if (u.kw.includes('efimero') && !quick) kill(u);
    } else if (had) { if (u.kw.includes('arrollar') && !quick) nex(u, atkOf(u)); }
    else { nex(u, atkOf(u)); if (u.kw.includes('efimero') && atkOf(u) > 0) kill(u); }
  }
  cleanup(s); checkWin(s);
  s.attackers = []; s.blocks = {}; s.forced = [];
  if (s.winner === null) { s.phase = 'main'; s.active = df; s.passes = 0; }
}
/** Función pura: (estado, acción) → estado nuevo. Si la acción es ilegal devuelve el mismo estado. */
export function step(s0: State, a: Action): State {
  if (s0.winner !== null) return s0;
  const s = structuredClone(s0), i = s.active, p = s.p[i], foe = s.p[o(i)];
  if (a.type === 'mulligan') {
    if (s.phase !== 'mulligan') return s0;
    if (a.player !== undefined) { // online: cada jugador hace el suyo; la ronda 1 arranca cuando ambos terminan
      if ((a.player !== 0 && a.player !== 1) || s.mull[a.player] || !Array.isArray(a.idx)) return s0;
      mulligan(s, a.player, a.idx); s.mull[a.player] = true;
      if (s.mull[0] && s.mull[1]) startRound(s);
      return s;
    }
    mulligan(s, 0, a.idx);
    mulligan(s, 1, s.p[1].hand.map((id, k) => (CARDS[id].cost >= 4 ? k : -1)).filter(k => k >= 0)); // la IA cambia cartas caras
    startRound(s); return s;
  }
  if (s.phase === 'mulligan') return s0;
  if (a.type === 'play') {
    if (!canPlay(s, i, a.hand)) return s0;
    const id = p.hand[a.hand], c = CARDS[id], tk = targetKind(id);
    let tgt: Unit | undefined;
    if (tk) { tgt = (tk === 'enemy' ? foe : p).board.find(u => u.uid === a.target); if (!tgt) return s0; }
    if (c.type === 'unit') p.mana -= c.cost; else { const sm = Math.min(p.spell, c.cost); p.spell -= sm; p.mana -= c.cost - sm; }
    p.hand.splice(a.hand, 1); p.played.push(id);
    s.log.push(`J${i + 1} juega {${id}}`);
    if (c.type === 'unit') {
      const u: Unit = { uid: ++s.uid, card: id, atk: c.atk, hp: c.hp, dmg: 0, kw: [...c.kw], ta: 0, th: 0 };
      p.board.push(u); c.fx.forEach(e => applyFx(s, i, e, u)); cleanup(s); checkWin(s); s.active = o(i); s.passes = 0;
    } else {
      const sp = c.speed ?? 'fast';
      if (sp === 'burst' || sp === 'focus') { c.fx.forEach(e => applyFx(s, i, e, undefined, tgt)); cleanup(s); checkWin(s); fixBlocks(s); } // no pasa prioridad
      else { s.resumePhase = s.phase === 'stack' ? s.resumePhase : (s.phase as 'main' | 'block'); s.stack.push({ card: id, owner: i, target: tgt?.uid }); s.phase = 'stack'; s.active = o(i); s.passes = 0; }
    }
  } else if (a.type === 'pass' || a.type === 'confirmBlocks') {
    if (a.type === 'confirmBlocks' && !(s.phase === 'block' && i === o(s.token))) return s0;
    s.log.push(`J${i + 1} pasa prioridad`);
    if (s.phase === 'stack') finishStack(s);
    else if (s.phase === 'block') { if (i === o(s.token)) { s.active = s.token; s.passes = 1; } else resolveCombat(s); }
    else if (++s.passes >= 2) endRound(s); else s.active = o(i);
  } else if (a.type === 'attack') {
    if (s.phase !== 'main' || s.stack.length || s.attackers.length || !s.tok[i]) return s0;
    const atk = [...new Set(a.units)].map(k => p.board[k]).filter((u): u is Unit => !!u);
    if (!atk.length) return s0;
    s.tok[i] = false; s.attackers = atk.map(u => u.uid); s.blocks = {}; s.forced = [];
    const taken = new Set<number>();
    for (const u of atk) if (u.kw.includes('retador')) { // Retador: elige qué enemigo bloquea (aquí: el más débil al que puede matar, si no el de menos vida)
      const pick = a.challenge?.[String(u.uid)], chosen = pick === undefined ? undefined : foe.board.find(x => x.uid === pick && !taken.has(x.uid) && canBlock(u, x));
      const c = chosen ?? foe.board.filter(x => !taken.has(x.uid)).sort((x, y) => (atkOf(u) >= curHp(y) ? 1 : 0) - (atkOf(u) >= curHp(x) ? 1 : 0) || curHp(x) - curHp(y))[0];
      if (c) { s.blocks[String(u.uid)] = c.uid; s.forced.push(u.uid); taken.add(c.uid); }
    }
    s.phase = 'block'; s.active = o(i); s.passes = 0; s.log.push(`J${i + 1} declara ataque con ${atk.length} unidad(es)`);
  } else if (a.type === 'block') {
    if (s.phase !== 'block' || i !== o(s.token)) return s0;
    const attacker = s.p[s.token].board[a.attacker], blocker = p.board[a.blocker];
    if (!attacker || !blocker || !s.attackers.includes(attacker.uid) || s.forced.includes(attacker.uid) || !canBlock(attacker, blocker)) return s0;
    const key = String(attacker.uid);
    if (s.blocks[key] === blocker.uid) delete s.blocks[key];                      // pulsar otra vez = quitar bloqueo
    else { if (Object.values(s.blocks).includes(blocker.uid)) return s0; s.blocks[key] = blocker.uid; }
  }
  return s;
}
