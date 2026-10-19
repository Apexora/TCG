import { newGame, step, canBlock } from '../engine/engine';
import { aiAction } from '../ai/ai';
import { DECKS, CARDS } from '../data/cards';
import { atkOf, curHp } from '../engine/engine';
let seedv = 12345; const R = () => { seedv = (seedv * 1664525 + 1013904223) >>> 0; return seedv / 4294967296; };
const ri = (n: number) => Math.floor(R() * n);
const decks = Object.values(DECKS) as string[][];
let bad = 0, games = 0, stuck = 0, steps = 0; const issues = new Map<string, number>();
const note = (m: string) => { issues.set(m, (issues.get(m) ?? 0) + 1); bad++; };
for (let gI = 0; gI < 1500; gI++) {
  let s: any = newGame([decks[ri(decks.length)], decks[ri(decks.length)]], gI + 1); games++;
  for (let t = 0; t < 4000 && s.winner === null; t++) {
    let a: any = aiAction(s);
    const r = R();
    if (r < 0.25) { // acción caótica
      const P = s.p[s.active];
      const pick = ri(6);
      if (pick === 0) a = { type: 'attack', units: [ri(7), ri(7), ri(7)], challenge: Object.fromEntries(s.p[0].board.concat(s.p[1].board).map((u: any) => [String(u.uid), s.p[0].board.concat(s.p[1].board)[ri(12)]?.uid ?? 99])) };
      else if (pick === 1) a = { type: 'block', attacker: ri(7), blocker: ri(7) };
      else if (pick === 2) a = { type: 'play', hand: ri(11), target: ri(40) };
      else if (pick === 3) a = { type: 'confirmBlocks' };
      else if (pick === 4) a = { type: 'attack', units: s.p[s.active].board.map((_: any, k: number) => k), challenge: 'x' };
      else a = { type: 'pass' };
    }
    const prevS = s; let n: any; try { n = step(s, a); } catch (e: any) { note('EXC ' + a.type + ' ' + e.message); break; }
    steps++; s = n;
    for (const p of s.p) {
      if (p.board.length > 6) note('board>6'); if (p.hand.length > 10) note('hand>10'); if (p.nexus > 20) note('nexus>20');
      if (p.mana < 0 || p.mana > 10 || p.spell < 0 || p.spell > 3) note('mana/spell fuera de rango ' + p.mana + '/' + p.spell);
      for (const u of p.board) { if (curHp(u) <= 0 && s.winner === null) note('unidad muerta en mesa'); if (Number.isNaN(u.atk + u.hp)) note('NaN'); }
    }
    const uids = s.p.flatMap((p: any) => p.board.map((u: any) => u.uid)); if (new Set(uids).size !== uids.length) note('uid duplicado');
    if (s.phase === 'block') {
      for (const [k, v] of Object.entries(s.blocks) as any) {
        const at = s.p[s.token].board.find((u: any) => String(u.uid) === k), bl = s.p[1 - s.token].board.find((u: any) => u.uid === v);
        if (!at || !bl) { note('bloqueo huérfano'); if (issues.get('bloqueo huérfano')===1) console.log('LOG',JSON.stringify(s.log.slice(-6)),'ACCION',JSON.stringify(a),'\nPREV',JSON.stringify({b1:prevS.p[1].board.map((u:any)=>[u.uid,u.card,curHp(u)]),act:prevS.active,tok:prevS.token,ph:prevS.phase,bl:prevS.blocks,att:prevS.attackers,f:prevS.forced,stack:prevS.stack}),'\nNOW',JSON.stringify({ph:s.phase,bl:s.blocks,att:s.attackers,f:s.forced,stack:s.stack,b0:s.p[0].board.map((u:any)=>[u.uid,u.card,curHp(u)]),b1:s.p[1].board.map((u:any)=>[u.uid,u.card,curHp(u)])})); } else if (!canBlock(at, bl)) note('bloqueo ilegal');
      }
      const vals = Object.values(s.blocks); if (new Set(vals).size !== vals.length) note('bloqueador repetido');
      for (const f of s.forced) if (!(String(f) in s.blocks)) note('forced sin bloqueo');
    } else if (s.attackers.length && s.phase === 'main') note('atacantes fuera de combate');
  }
  if (s.winner === null) stuck++;
}
console.log({ games, steps, bad, stuck }); console.log([...issues]);
