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
const heal = (s: State, i: number, n: number) => { s.p[i].nexus = Math.min(s.cap?.[i] ?? 20, s.p[i].nexus + n); };
export const atkOf = (u: Unit) => Math.max(0, u.atk + u.ta);
export const curHp = (u: Unit) => u.hp + u.th + (u.fb ?? 0) - u.dmg;
const kill = (u: Unit) => { u.dmg = u.hp + u.th + 999; };
const power = (u: Unit) => atkOf(u) * 1e6 + curHp(u) * 1e3 + CARDS[u.card].cost;
const strongest = (l: Unit[]) => l.reduce<Unit | undefined>((b, u) => (!b || power(u) > power(b) ? u : b), undefined);
const weakest = (l: Unit[]) => l.reduce<Unit | undefined>((b, u) => (!b || power(u) < power(b) ? u : b), undefined);
const ENEMY_T = ['dmgEnemy', 'certero', 'drain', 'destroyEnemy', 'sacDmg', 'frost', 'silence', 'chicle', 'virus'], ALLY_T = ['buffAlly', 'giveKw', 'tempBuff', 'healUnit'];
/** Objetivo manual que exige un hechizo (null = sin objetivo). */
export function targetKind(id: string): 'enemy' | 'ally' | null {
  const c = CARDS[id]; if (!c || c.type !== 'spell') return null;
  if (c.fx.some(e => ENEMY_T.includes(e.t))) return 'enemy';
  if (c.fx.some(e => ALLY_T.includes(e.t))) return 'ally';
  return null;
}
/** Elusivo solo lo bloquea un elusivo; Temible solo lo bloquea quien tenga 3+ de poder.
 *  Cerrojo (Krahn) cierra el paso: bloquea también a Elusivos y Temibles. Pegada (Pongí) no puede bloquear. */
export function canBlock(a: Unit, b: Unit): boolean {
  if (b.kw.includes('pegada')) return false;
  const lock = b.kw.includes('cerrojo');
  if (a.kw.includes('elusivo') && !b.kw.includes('elusivo') && !lock) return false;
  if (a.kw.includes('temible') && atkOf(b) < 3 && !lock) return false;
  return true;
}
/** Raíz (Sylvaris) y Pegada (Pongí) no pueden atacar. */
export const canAttack = (u: Unit): boolean => !u.kw.includes('raiz') && !u.kw.includes('pegada');

/** Invoca `n` copias de una carta (ficha) respetando el límite de 6 unidades. */
function spawn(s: State, i: number, id: string, n: number) {
  const c = CARDS[id], me = s.p[i];
  for (let k = 0; c && k < n && me.board.length < 6; k++) {
    const u: Unit = { uid: ++s.uid, card: c.id, atk: c.atk, hp: c.hp, dmg: 0, kw: [...c.kw], ta: 0, th: 0 };
    me.board.push(u); arrive(s, i, u);
  }
}
/** Markivton: Doblón (moneda de botín; vive en la mano) y Marea (rondas impares = Pleamar, pares = Bajamar). */
const DOBLON = 'mkv_doblon';
export const tideOf = (s: State): 'pleamar' | 'bajamar' => (s.round % 2 === 1 ? 'pleamar' : 'bajamar');
function loot(s: State, i: number, n: number) { const h = s.p[i].hand; for (let k = 0; k < n && h.length < 10; k++) h.push(DOBLON); }
/** Marea: Pleamar +2 de poder, Bajamar +2 de vida (solo hasta el final de la ronda). */
function tideBuff(s: State, u: Unit) { if (!u.kw.includes('marea')) return; if (tideOf(s) === 'pleamar') u.ta += 2; else u.th += 2; }
/** Lealtad (Ostraca): al entrar una unidad Leal, las demás Leales aliadas ganan +1 de poder. */
function arrive(s: State, i: number, u: Unit) {
  tideBuff(s, u);
  if (!u.kw.includes('leal')) return;
  const mates = s.p[i].board.filter(x => x !== u && x.kw.includes('leal'));
  if (!mates.length) return;
  mates.forEach(x => { x.atk += 1; });
}

export function newGame(decks: [string[], string[]], seed: number): State {
  const mk = (d: string[]) => ({ nexus: 20, deck: [...d], hand: [] as string[], board: [] as Unit[], mana: 0, maxMana: 0, spell: 0, played: [] as string[] });
  const s: State = { p: [mk(decks[0]), mk(decks[1])], round: 0, token: 0, active: 0, phase: 'mulligan', passes: 0, winner: null, seed, uid: 0, log: [], stack: [], attackers: [], blocks: {}, forced: [], tok: [false, false], resumePhase: 'main', mull: [false, false] };
  s.p.forEach(p => shuffle(s, p.deck)); draw(s, 0, 4); draw(s, 1, 4);
  s.token = rand(s) < 0.5 ? 0 : 1; // startRound lo invierte
  return s;
}
/** Ventaja de un rival (Aventura): Nexo inicial extra, maná inicial extra y cartas extra por ronda. Solo para partidas contra la IA. */
export interface Edge { nexus?: number; mana?: number; draw?: number }
export function applyEdge(s: State, i: 0 | 1, e: Edge | undefined): State {
  if (!e) return s;
  const p = s.p[i]; p.nexus += e.nexus ?? 0; p.maxMana += e.mana ?? 0;
  s.cap = s.cap ?? [20, 20]; s.cap[i] = Math.max(20, p.nexus);
  if (e.draw) { s.extraDraw = s.extraDraw ?? [0, 0]; s.extraDraw[i] = e.draw; }
  return s;
}
function mulligan(s: State, i: number, idx: number[]) {
  const p = s.p[i], set = [...new Set(idx)].filter(k => k >= 0 && k < p.hand.length).sort((a, b) => b - a);
  for (const k of set) p.deck.push(p.hand.splice(k, 1)[0]);
  shuffle(s, p.deck); draw(s, i, set.length);
}
const MALWARE = 'bor_malware';
/** Mueve una unidad de un bando a otro (Boro: hackeo, soborno, trueque). */
function defect(s: State, from: number, to: number, u: Unit) {
  s.p[from].board = s.p[from].board.filter(x => x !== u); s.p[to].board.push(u); arrive(s, to, u);
}
function startRound(s: State) {
  s.round++;
  if (s.round > 40) { s.winner = -1; return; }
  s.token = o(s.token); s.active = s.token; s.phase = 'main'; s.passes = 0; s.attackers = []; s.blocks = {}; s.forced = []; s.stack = [];
  s.tok = [false, false]; s.tok[s.token] = true; s.peace = false; s.apagon = [false, false]; s.atkd = [];
  for (const i of [s.token, o(s.token)]) { const p = s.p[i]; p.maxMana = Math.min(10, p.maxMana + 1); p.mana = Math.max(0, p.maxMana - (s.debt?.[i] ?? 0)); if (s.debt) s.debt[i] = 0; draw(s, i, 1 + (s.extraDraw?.[i] ?? 0)); if (s.winner !== null) return; }
  s.log = s.log.slice(-40); s.log.push(`— Ronda ${s.round} (ficha: J${s.token + 1}) —`);
  // Marea (Markivton): solo se anuncia si alguna carta de mareas anda por la partida
  const tidal = (id: string) => CARDS[id].kw.includes('marea') || CARDS[id].fx.some(e => e.t === 'tide');
  if (s.p.some(p => [...p.deck, ...p.hand, ...p.board.map(u => u.card)].some(tidal))) s.log.push(tideOf(s) === 'pleamar' ? '🌊 Pleamar: las unidades con Marea ganan +2 de poder' : '🌊 Bajamar: las unidades con Marea ganan +2 de vida');
  for (const p of s.p) p.board.forEach(u => tideBuff(s, u));
  checkWin(s);
}
function endRound(s: State) {
  for (const p of s.p) { p.spell = Math.min(3, p.spell + p.mana); p.mana = 0; }
  // Andanada (Markivton): cada barco que se quedó en puerto (no atacó) cañonea a la unidad enemiga más fuerte; sin unidades, al Nexo
  for (const i of [0, 1] as const) {
    const guns = s.p[i].board.filter(u => u.kw.includes('andanada') && !(s.atkd ?? []).includes(u.uid));
    for (const g of guns) { const t = strongest(s.p[o(i)].board.filter(x => curHp(x) > 0)); if (t) dealDamage(s, t, 1, { u: g, owner: i }); else s.p[o(i)].nexus -= 1; }
    if (guns.length) s.log.push(`💥 Andanada: J${i + 1} cañonea con ${guns.length} barco(s)`);
  }
  cleanup(s); checkWin(s);
  if (s.winner !== null) return;
  if ((s.gas ?? 0) > 0) {   // Gas tóxico (Disnjav): daña 1 a toda unidad sin Adaptado; los Adaptados se alimentan de él (+1 de poder)
    let hit = 0;
    for (const p of s.p) p.board.forEach(u => { if (u.kw.includes('adaptado')) { /* inmune */ } else { u.dmg += 1; hit++; } });
    s.gas = (s.gas ?? 0) - 1; s.log.push(`☣ El gas tóxico envenena a ${hit} unidad(es)${s.gas ? ` · quedan ${s.gas} ronda(s)` : ' · se disipa'}`);
  }
  // Virus (Boro): la unidad infectada recibe 1 de daño y el virus salta a otra unidad de su bando (si no hay otra, se queda)
  for (const p of s.p) {
    const hosts = p.board.filter(u => u.kw.includes('virus'));
    for (const h of hosts) {
      h.dmg += 1;
      const next = p.board.filter(x => x !== h && !x.kw.includes('virus'));
      if (next.length) { const t = next[Math.floor(rand(s) * next.length)]; h.kw = h.kw.filter(k => k !== 'virus'); t.kw.push('virus'); }
    }
    if (hosts.length) s.log.push(`🦠 El virus daña a ${hosts.length} unidad(es) y salta`);
  }
  // Usura (Boro): los intereses cobran al Nexo y van bajando (3, 2, 1...)
  if (s.usura) for (const i of [0, 1]) if (s.usura[i] > 0) { s.p[i].nexus -= s.usura[i]; s.log.push(`💸 Intereses: J${i + 1} paga ${s.usura[i]} de Nexo`); s.usura[i]--; }
  // Malware (Boro): cada Malware sin purgar en la mano sangra 1 de Nexo
  for (const i of [0, 1]) { const n = s.p[i].hand.filter(c => c === MALWARE).length; if (n) { s.p[i].nexus -= n; s.log.push(`🦠 Malware: J${i + 1} pierde ${n} de Nexo`); } }
  for (const p of s.p) p.board.forEach(u => { if (u.kw.includes('regenera') && !u.kw.includes('marchito')) u.dmg = 0; });
  for (const p of s.p) p.board.forEach(u => { if (u.kw.includes('efimero')) kill(u); });
  cleanup(s);
  for (const p of s.p) p.board.forEach(u => { u.ta = 0; u.th = 0; const cap = u.hp + (u.fb ?? 0); if (u.dmg >= cap) u.dmg = cap - 1; u.kw = u.kw.filter(k => k !== 'pegada'); });
  s.peace = false;
  // Mutante (Psybernia): +2 de poder y -1 de vida permanentes al cerrar la ronda (su cuerpo se deteriora)
  for (const p of s.p) p.board.forEach(u => { if (u.kw.includes('mutante')) { u.atk += 2; u.hp -= 1; } });
  cleanup(s);
  // Raíz (Sylvaris): cada Raíz da vida a un Retoño al cerrar la ronda
  for (const i of [0, 1]) { const n = s.p[i].board.filter(u => u.kw.includes('raiz')).length; if (n) spawn(s, i, 'syl_retono', n); }
  checkWin(s); if (s.winner === null) startRound(s);
}
function checkWin(s: State) {
  if (s.winner !== null) return;
  const a = s.p[0].nexus <= 0, b = s.p[1].nexus <= 0;
  if (a && b) s.winner = -1; else if (a) s.winner = 1; else if (b) s.winner = 0;
}
/** Falange (Skaldrum): aura de formación (muro de escudos). Cada unidad con Falange gana +1 de vida por cada OTRA aliada con Falange (máx +2).
 *  No es permanente: se recalcula tras cada cambio del campo y se pierde si las compañeras caen o pierden la palabra clave. */
const FALANGE_MAX = 2;
function syncAuras(s: State) {
  for (const p of s.p) {
    const n = p.board.filter(u => u.kw.includes('falange')).length;
    for (const u of p.board) {
      const f = u.kw.includes('falange') ? Math.min(FALANGE_MAX, n - 1) : 0;
      if (f) u.fb = f; else delete u.fb;
    }
  }
}
function cleanup(s: State) {
  for (let changed = true; changed;) {
    changed = false; syncAuras(s);
    for (const p of s.p) {
      const dead = p.board.filter(u => curHp(u) <= 0);
      if (!dead.length) continue;
      changed = true; p.board = p.board.filter(u => curHp(u) > 0);
      for (const u of p.board) { const g = CARDS[u.card].grow; if (g) { u.atk += g.a * dead.length; u.hp += g.h * dead.length; } }
      const gifts = dead.filter(u => u.kw.includes('don')).length;   // Don (Sinfalía): al morir, tus unidades ganan +1 de poder
      if (gifts) for (const u of p.board) u.atk += gifts;
    }
  }
}
/** Daño necrótico (Negatt): ignora Barrera y Duro, y si la víctima sobrevive queda Marchita (no puede curarse ni regenerar). */
function necroDamage(s: State, t: Unit, n: number): number {
  if (n <= 0) return 0;
  const dealt = Math.min(n, Math.max(0, curHp(t)));
  t.dmg += n;
  if (curHp(t) > 0 && !t.kw.includes('marchito')) t.kw.push('marchito');
  return dealt;
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
    if (src.u.kw.includes('veneno') && dealt > 0 && curHp(t) > 0) { t.hp -= 1; t.atk = Math.max(0, t.atk - 1); }  // Veneno: la víctima pierde 1/1 para siempre
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
    case 'healUnit': { const t = tgt ?? me.board.find(u => u.dmg > 0 && !u.kw.includes('marchito')); if (t && !t.kw.includes('marchito')) t.dmg = Math.max(0, t.dmg - e.n); break; }
    case 'tempBuffAll': me.board.forEach(u => { u.ta += e.a; u.th += e.h; }); break;
    case 'buffAll': me.board.forEach(u => { u.atk += e.a; u.hp += e.h; }); break;
    case 'giveKw': { const t = tgt ?? strongest(me.board); if (t && !t.kw.includes(e.kw as Keyword)) t.kw.push(e.kw); break; }
    case 'dmgEnemy': { const t = tgt ?? strongest(foe.board); if (t) { if (e.necro) necroDamage(s, t, e.n); else dealDamage(s, t, e.n); } break; }
    case 'drain': { const t = tgt ?? strongest(foe.board); if (t) { if (e.necro) necroDamage(s, t, e.n); else dealDamage(s, t, e.n); heal(s, i, e.heal ?? e.n); } break; }   // Drenar: la curación es FIJA (no depende del daño realmente infligido)
    case 'dmgAll': foe.board.forEach(u => { if (e.necro) necroDamage(s, u, e.n); else dealDamage(s, u, e.n); }); break;
    case 'frost': { const t = tgt ?? strongest(foe.board); if (t) t.ta -= atkOf(t); break; }
    case 'sacDraw': { const v = weakest(me.board.filter(u => u !== src)); if (v) { kill(v); cleanup(s); draw(s, i, e.n); } break; }
    case 'sacDmg': { const v = weakest(me.board), t = tgt ?? strongest(foe.board); if (v && t) { const a = atkOf(v); kill(v); if (e.necro) necroDamage(s, t, a); else dealDamage(s, t, a); } break; }
    case 'debuffEnemies': foe.board.forEach(u => { u.atk = Math.max(0, u.atk - e.a); u.hp -= e.h; }); break;
    case 'summon': spawn(s, i, e.card, e.n); break;
    case 'fuse': { // Fusión (Psybernia): sacrifica a tu aliada más débil y la unidad absorbe sus estadísticas
      const v = weakest(me.board.filter(u => u !== src)), t = src ?? strongest(me.board.filter(u => u !== v));
      if (v && t && v !== t) { t.atk += v.atk; t.hp += Math.max(1, curHp(v)); kill(v); }
      break;
    }
    case 'clone': { // Clonar (Ostraca): copia de tu aliada más fuerte con la mitad de sus estadísticas (redondeo arriba)
      const t = strongest(me.board.filter(u => u !== src));
      if (t && me.board.length < 6) { const u: Unit = { uid: ++s.uid, card: t.card, atk: Math.max(1, Math.ceil(t.atk / 2)), hp: Math.max(1, Math.ceil(t.hp / 2)), dmg: 0, kw: [...t.kw], ta: 0, th: 0 }; me.board.push(u); arrive(s, i, u); }
      break;
    }
    case 'tregua': s.peace = true; s.log.push('☮ Tregua: esta ronda nadie puede atacar'); break;
    case 'chicle': { const t = tgt ?? strongest(foe.board); if (t && !t.kw.includes('pegada')) t.kw.push('pegada'); break; }
    case 'peaje': foe.mana = Math.max(0, foe.mana - e.n); break;
    case 'poda': { const t = weakest(foe.board); if (t) kill(t); break; }
    case 'gas': s.gas = Math.max(s.gas ?? 0, e.n); s.log.push(`☣ Gas tóxico: ${s.gas} ronda(s)`); break;
    case 'necroWeak': { const t = weakest(foe.board); if (t) necroDamage(s, t, e.n); break; }
    case 'necroStrong': { const t = strongest(foe.board); if (t) necroDamage(s, t, e.n); break; }
    case 'wither': { const t = tgt ?? strongest(foe.board); if (t) { t.atk = 0; t.ta = Math.min(0, t.ta); s.log.push(`☠ {${t.card}} se marchita: su poder queda en 0`); } break; }
    case 'discard': { const f = s.p[o(i)]; for (let k = 0; k < e.n && f.hand.length; k++) { const [c] = f.hand.splice(Math.floor(rand(s) * f.hand.length), 1); s.log.push(`☠ J${o(i) + 1} descarta {${c}}`); } break; }
    case 'mill': { const f = s.p[o(i)]; const n = Math.min(e.n, f.deck.length); if (n) { f.deck.splice(f.deck.length - n, n); s.log.push(`☠ Se eliminan ${n} carta(s) del mazo de J${o(i) + 1}`); } break; }
    case 'plant': { const f = s.p[o(i)]; for (let k = 0; k < e.n; k++) f.deck.splice(Math.floor(rand(s) * (f.deck.length + 1)), 0, e.card); s.log.push(`☠ Se cuela ${e.n > 1 ? e.n + ' veces ' : ''}{${e.card}} en el mazo de J${o(i) + 1}`); break; }
    case 'malware': for (let k = 0; k < e.n && foe.hand.length < 10; k++) foe.hand.push(MALWARE); s.log.push('🦠 Malware en la mano del rival'); break;
    case 'virus': { const t = tgt ?? strongest(foe.board.filter(u => !u.kw.includes('virus'))); if (t && !t.kw.includes('virus')) t.kw.push('virus'); break; }
    case 'arco': { // Cortocircuito en cadena: salta entre unidades enemigas distintas, con 1 menos de daño en cada salto
      const hit = new Set<Unit>(); let t: Unit | undefined = tgt ?? strongest(foe.board);
      for (let d = e.n; d > 0 && t; d--) {
        hit.add(t); dealDamage(s, t, d);
        const rest = foe.board.filter(u => !hit.has(u) && curHp(u) > 0); t = rest.length ? rest[Math.floor(rand(s) * rest.length)] : undefined;
      }
      s.log.push(`⚡ Cortocircuito: salta por ${hit.size} unidad(es)`); break;
    }
    case 'hack': { // Hackeo: controlas a la enemiga más fuerte hasta el final de la ronda (Efímera: se quema al golpear o al cerrar)
      const t = strongest(foe.board);
      if (t && me.board.length < 6) { if (!t.kw.includes('efimero')) t.kw.push('efimero'); defect(s, o(i), i, t); s.log.push('💻 Hackeo: una unidad enemiga cambia de bando'); }
      break;
    }
    case 'soborno': { const t = weakest(foe.board); if (t && me.board.length < 6) { defect(s, o(i), i, t); s.log.push('💰 Soborno: una unidad enemiga se pasa a tu bando'); } break; }
    case 'trueque': { // Traición: tu unidad más débil y la más débil del rival intercambian de bando
      const a = weakest(me.board), b = weakest(foe.board);
      if (a && b) { defect(s, i, o(i), a); defect(s, o(i), i, b); s.log.push('🗡 Traición: dos unidades cambian de bando'); }
      break;
    }
    case 'prestamo': me.mana = Math.min(10, me.mana + e.n); s.debt = s.debt ?? [0, 0]; s.debt[i] += e.d; s.log.push(`💵 Préstamo: +${e.n} de maná ahora, −${e.d} al empezar la próxima ronda`); break;
    case 'usura': s.usura = s.usura ?? [0, 0]; s.usura[o(i)] = Math.min(3, s.usura[o(i)] + e.n); s.log.push('💸 El Nexo rival entra en usura'); break;
    case 'cobro': { const n = Math.min(e.n, me.board.length); if (n > 0) foe.nexus -= n; break; }   // cada unidad tuya cobra 1 de Nexo al rival
    case 'tributo': { const n = Math.min(e.n, me.board.filter(u => u.card === 'bor_maton').length); me.mana = Math.min(10, me.mana + n); break; }   // cada Matón paga 1 de maná
    case 'overclock': me.board.forEach(u => { u.ta += e.a; const d = Math.min(e.n, curHp(u) - 1); if (d > 0) dealDamage(s, u, d); }); break;   // sobrecarga: +poder y daño sin matar
    case 'apagon': s.apagon = s.apagon ?? [false, false]; s.apagon[o(i)] = true; foe.spell = 0; s.log.push('🌑 Apagón: el rival no puede lanzar hechizos esta ronda'); break;
    case 'copia': if (foe.hand.length && me.hand.length < 10) me.hand.push(foe.hand[Math.floor(rand(s) * foe.hand.length)]); break;   // robo de datos
    case 'certero': { // Tiro certero (Skaldrum): si el disparo destruye a la unidad, robas 1
      const t = tgt ?? strongest(foe.board);
      if (t) { const alive = curHp(t) > 0; dealDamage(s, t, e.n); if (alive && curHp(t) <= 0) { draw(s, i, 1); s.log.push('🎯 Tiro certero: la unidad cae y robas 1'); } }
      break;
    }
    case 'augurio': { // Augurio (Skaldrum): mira las n cartas superiores; robas la de mayor coste y el resto va al fondo (determinista)
      const k = Math.min(e.n, me.deck.length); if (!k) break;
      const top = me.deck.splice(me.deck.length - k, k);
      let b = 0; top.forEach((c, idx) => { if (CARDS[c].cost >= CARDS[top[b]].cost) b = idx; });
      const [pick] = top.splice(b, 1);
      me.deck.unshift(...top);
      if (me.hand.length < 10) me.hand.push(pick);
      s.log.push(`🔮 Augurio: J${i + 1} examina ${k} carta(s) y se queda con una`); break;
    }
    case 'dom': // Dominio (Skaldrum): solo si controlas más unidades que el rival
      if (me.board.length > foe.board.length) { s.log.push('🏛 Dominio: controlas el campo'); e.fx.forEach(f => applyFx(s, i, f, src, tgt)); }
      break;
    case 'doblon': loot(s, i, e.unit ? Math.min(e.n, me.board.length) : e.n); break;
    case 'tide': { const pl = tideOf(s) === 'pleamar'; s.log.push(pl ? '🌊 Pleamar' : '🌊 Bajamar'); (pl ? e.pleamar : e.bajamar).forEach(f => applyFx(s, i, f, src, tgt)); break; }
    case 'paga': { // paga con Doblones de tu mano; si no te alcanzan, no pasa nada
      const idx = me.hand.map((c, k) => (c === DOBLON ? k : -1)).filter(k => k >= 0);
      if (idx.length >= e.n) { for (const k of idx.slice(0, e.n).reverse()) me.hand.splice(k, 1); s.log.push(`🪙 J${i + 1} paga ${e.n} Doblón(es)`); e.fx.forEach(f => applyFx(s, i, f, src, tgt)); }
      break;
    }
    case 'frostAll': foe.board.forEach(u => { u.ta -= atkOf(u); }); break;
    case 'silence': { const t = tgt ?? strongest(foe.board); if (t) t.kw = []; break; }
    case 'gainMana': me.mana = Math.min(10, me.mana + e.n); break;
    case 'destroyEnemy': { const t = tgt ?? strongest(foe.board); if (t) kill(t); break; }
  }
  cleanup(s);
}
export function canPlay(s: State, i: number, idx: number): boolean {
  const p = s.p[i], c = CARDS[p.hand[idx]];
  if (!c || s.winner !== null || s.active !== i || s.phase === 'mulligan') return false;
  if (c.type === 'spell' && s.apagon?.[i]) return false;   // Apagón (Boro): sin hechizos esta ronda
  if (c.type === 'unit') return s.phase === 'main' && !s.stack.length && !s.attackers.length && p.board.length < 6 && c.cost <= p.mana;
  if (c.cost > p.mana + p.spell) return false;
  const sp = c.speed ?? 'fast';
  if ((sp === 'slow' || sp === 'focus') && (s.phase !== 'main' || s.stack.length || s.attackers.length)) return false; // solo como acción original
  const k = targetKind(c.id);
  if ((k === 'enemy' && !s.p[o(i)].board.length) || (k === 'ally' && !p.board.length)) return false;
  if (c.fx.some(e => e.t === 'sacDmg') && !p.board.length) return false;
  if (c.fx.some(e => e.t === 'trueque') && (!p.board.length || !s.p[o(i)].board.length)) return false;
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
    if (u.kw.includes('saqueo')) { loot(s, at, 1); s.log.push('🪙 Saqueo: un Doblón a la mano de J' + (at + 1)); }
  };
  const hit = (src: Unit, owner: number, t: Unit) => {
    const need = curHp(t) + (t.kw.includes('duro') ? 1 : 0), a = atkOf(src);
    dealDamage(s, t, a, { u: src, owner }); struck.add(src.uid);
    return Math.max(0, a - need);
  };
  // Segmento 1: Ataque rápido golpea antes del bloqueador.
  for (const { u, b } of pairs) if (b && u.kw.includes('rapido') && atkOf(u) > 0) { const ex = hit(u, at, b); if (u.kw.includes('arrollar')) nex(u, ex); if (u.kw.includes('efimero')) kill(u); }
  cleanup(s); checkWin(s);
  if (s.winner !== null) { s.attackers = []; s.blocks = {}; s.forced = []; return; }  // partida decidida: cerrar el combate igualmente
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
    if (c.type === 'spell') p.board.forEach(u => { if (u.kw.includes('estilo')) { u.ta += 1; u.th += 1; } });   // Estilo (Pongí): cada hechizo que lanzas la hace brillar
    if (c.type === 'unit') {
      const u: Unit = { uid: ++s.uid, card: id, atk: c.atk, hp: c.hp, dmg: 0, kw: [...c.kw], ta: 0, th: 0 };
      p.board.push(u); arrive(s, i, u); c.fx.forEach(e => applyFx(s, i, e, u)); cleanup(s); checkWin(s); s.active = o(i); s.passes = 0;
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
    if (s.phase !== 'main' || s.stack.length || s.attackers.length || !s.tok[i] || s.peace) return s0;
    const atk = [...new Set(a.units)].map(k => p.board[k]).filter((u): u is Unit => !!u && canAttack(u));
    if (!atk.length) return s0;
    s.tok[i] = false; s.attackers = atk.map(u => u.uid); s.atkd = [...(s.atkd ?? []), ...s.attackers]; s.blocks = {}; s.forced = [];
    const taken = new Set<number>();
    const force = (u: Unit, c: Unit) => { s.blocks[String(u.uid)] = c.uid; s.forced.push(u.uid); taken.add(c.uid); };
    const ret = atk.filter(u => u.kw.includes('retador'));
    for (const u of ret) { // Retador (1.ª pasada): respeta la elección del jugador
      const pick = a.challenge?.[String(u.uid)], c = pick === undefined ? undefined : foe.board.find(x => x.uid === pick && !taken.has(x.uid) && canBlock(u, x));
      if (c) force(u, c);
    }
    for (const u of ret) if (!s.forced.includes(u.uid)) { // 2.ª pasada: automático (el más débil al que puede matar, si no el de menos vida)
      const c = foe.board.filter(x => !taken.has(x.uid) && canBlock(u, x)).sort((x, y) => (atkOf(u) >= curHp(y) ? 1 : 0) - (atkOf(u) >= curHp(x) ? 1 : 0) || curHp(x) - curHp(y))[0];
      if (c) force(u, c);
    }
    // Mando (Skaldrum): cada oficial que ataca da +1 de poder (esta ronda) al resto del asalto
    const officers = atk.filter(u => u.kw.includes('mando'));
    if (officers.length && atk.length > 1) { for (const m of officers) for (const x of atk) if (x !== m) x.ta += 1; s.log.push(`🎖 Mando: el asalto gana +${officers.length} de poder`); }
    s.phase = 'block'; s.active = o(i); s.passes = 0; s.log.push(`J${i + 1} declara ataque con ${atk.length} unidad(es)`);
  } else if (a.type === 'block') {
    if (s.phase !== 'block' || i !== o(s.token)) return s0;
    const attacker = s.p[s.token].board[a.attacker], blocker = p.board[a.blocker];
    if (!attacker || !blocker || !s.attackers.includes(attacker.uid) || s.forced.includes(attacker.uid) || !canBlock(attacker, blocker)) return s0;
    const key = String(attacker.uid);
    if (s.blocks[key] === blocker.uid) delete s.blocks[key];                      // pulsar otra vez = quitar bloqueo
    else {
      // Un bloqueador ya asignado se puede MOVER a otro atacante (salvo que lo fuerce un Retador).
      const prev = Object.keys(s.blocks).find(k => s.blocks[k] === blocker.uid);
      if (prev !== undefined) { if (s.forced.includes(Number(prev))) return s0; delete s.blocks[prev]; }
      s.blocks[key] = blocker.uid;
    }
  }
  return s;
}
