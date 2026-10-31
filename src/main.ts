import './style.css';
import './fx.css';
import './v3.css';
import './theme.css';
import './nations.css';
import './boss.css';
import { hideMenu, initFx, showMenu } from './ui/fx';
import { deckCards, deckFaction, deckLabel, getDeck, otherDeck, wireDeck } from './decks';
import { CARDS, DECKS } from './data/cards';
import { aiAction } from './ai/ai';
import { applyEdge, atkOf, canAttack, canBlock, canPlay, curHp, newGame, step, targetKind } from './engine/engine';
import type { Action, Keyword, Player, SpellSpeed, State, Unit } from './engine/types';
import { imageOf, nameOf } from './ui/skins';
import { KWD, KWI, KWN, SPD, SPN } from './ui/keywords';
import { epicEntrance, isFlagship } from './ui/epic';
import { clashFx, trailFx } from './ui/combatfx';
import { gsap } from 'gsap';
import { motionPlay, motionSnapshot } from './ui/motion';
import { LocalChannel } from './ui/chat';
import { isMuted, setBoss, setTension, sfx, sfxCard, startMusic, toggleMute } from './ui/sound';
import { Online } from './net/online';
import { applyMove, toView, view, type Seat } from './net/sync';
import { closeMenu, menuStatus, openOnlineMenu, setRoomTag } from './net/onlineUi';
import { openAdventure, closeAdventure, rivalImg } from './adventure/adventure';
import { NATIONS, PLAYABLE, beaten, faction, markWon, nextRival, progress, edgeOf, type Rival } from './adventure/rivals';

const app = document.getElementById('app')!;
const pv = document.createElement('div'); pv.className = 'preview'; document.body.append(pv);
const esc = (t: string) => t.replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]!));
let curDeck = getDeck(), curSig = deckCards(curDeck).join();   // mazo con el que se juega ahora (contra la IA)
let adv: { nation: string; rival: Rival; free?: boolean } | null = null;   // duelo de la Aventura en curso (null = partida normal contra la IA)
const newS = () => { curDeck = getDeck(); curSig = deckCards(curDeck).join(); return applyEdge(newGame([deckCards(curDeck), adv ? adv.rival.deck : DECKS[otherDeck(curDeck)]], Date.now()), 1, adv ? edgeOf(adv.rival) : undefined); };
let s: State = newS();
let duel: { atk: number; blk: number | null; strike: boolean; def: number; cap: string; fly?: boolean } | null = null, dueling = false;
let sel = new Set<number>(), mulSel = new Set<number>(), chatOpen = false, busy = false, ended = false, gameId = 0;
let tgt: { hand: number; kind: 'enemy' | 'ally' } | null = null, selAtk: number | null = null, heldBlk: number | null = null, pend: { side: number; idx: number[] } | null = null;
let prev = [20, 20], seen = new Set<number>(), prevPlayed = [0, 0], lastRound = 0, prevHp = new Map<number, [number, number]>(), lastBoard: number[][] = [[], []], prevS: State = s;
let ghostCache = new Map<number, { id: string; u: Unit }>();   // unidades del render anterior (para pintar la carta que muere)
let enraged = false, reading = false, readT = 0, aiTimer = 0, drawUntil = 0, prevActive: number = -1, prevSpell = 0;
// ---------- Online ----------
let online: Online | null = null, ME: Seat = 0;
const seatCards = (): [string[], string[]] => (online ? online.decks : [deckCards(curDeck), DECKS[otherDeck(curDeck)]]);   // mazo de cada asiento real
const fac = (i: number) => (deckFaction(seatCards()[(i + ME) % 2]) === 'Umbra' ? 1 : 0);   // 0 = Luminarae, 1 = Umbra (según las cartas del mazo)
const facName = (i: number) => (i === 0 ? deckLabel(curDeck) : adv ? adv.rival.name : fac(i) ? 'Umbra' : 'Luminarae');
const react = (k: 'cast' | 'win' | 'lose' | 'start') => { if (!online) chat.react(k); };  // las reacciones del chat son de la IA

function vfx(cls: string, text = '') { const d = document.createElement('div'); d.className = 'vfx ' + cls; d.textContent = text; document.body.append(d); setTimeout(() => d.remove(), 1400); }
function toast(t: string) { document.querySelectorAll('.toast').forEach(e => e.remove()); const d = document.createElement('div'); d.className = 'vfx toast'; d.textContent = t; document.body.append(d); setTimeout(() => d.remove(), 1800); }

// ---------- Chat / registro ----------
const chat = new LocalChannel();
// El que responde en el chat es el rival real del duelo (Aventura o partida rápida), no siempre Umbra.
chat.personaFn = () => adv
  ? { name: adv.rival.name, side: faction(adv.rival) === 'Umbra' ? 'umb' : 'lum', nation: adv.nation, boss: adv.rival.boss }
  : { name: otherDeck(curDeck), side: otherDeck(curDeck) === 'Umbra' ? 'umb' : 'lum' };
const chatEl = document.createElement('aside'); chatEl.className = 'chat';
chatEl.innerHTML = `<div class="tabs"><button data-t="chat" class="on">Chat</button><button data-t="log">Registro</button></div>
  <div class="msgs" id="msgs"></div><div class="logv" id="logv" hidden></div>
  <div class="inp"><input id="chat-in" maxlength="140" placeholder="Escribe un mensaje…" autocomplete="off"><button id="chat-send">➤</button></div>`;
document.body.append(chatEl);
const msgs = chatEl.querySelector<HTMLElement>('#msgs')!, logv = chatEl.querySelector<HTMLElement>('#logv')!, inp = chatEl.querySelector<HTMLInputElement>('#chat-in')!;
chat.onMessage(m => {
  const d = document.createElement('div'); d.className = 'msg ' + m.side;
  if (m.side === 'sys') d.textContent = m.text; else { const b = document.createElement('b'); b.textContent = m.from + ':'; d.append(b, document.createTextNode(m.text)); }
  msgs.append(d); msgs.scrollTop = msgs.scrollHeight; if (m.side === 'foe') sfx('msg');
});
const sendChat = () => { const v = inp.value.trim(); if (!v) return; inp.value = '';
  if (online) online.sendChat(v).catch(e => chat.sys(e?.message ?? 'No se pudo enviar el mensaje')); else chat.send(v); };
chatEl.querySelector('#chat-send')!.addEventListener('click', sendChat);
inp.addEventListener('keydown', e => { if (e.key === 'Enter') sendChat(); e.stopPropagation(); });
chatEl.querySelectorAll<HTMLElement>('.tabs button').forEach(b => b.addEventListener('click', () => {
  const isLog = b.dataset.t === 'log'; logv.hidden = !isLog; msgs.hidden = isLog; chatEl.querySelector<HTMLElement>('.inp')!.hidden = isLog;
  chatEl.querySelectorAll('.tabs button').forEach(x => x.classList.toggle('on', x === b));
}));
chat.sys('Chat local: escribe y el rival te responderá. Más adelante puede conectarse a Firebase.');

// ---------- Tarjetas ----------
function rules(id: string, kws: Keyword[], hand = -1): string {
  const c = CARDS[id], r = kws.map(k => `<p><b>${KWN[k]}:</b> ${KWD[k]}</p>`), tk = targetKind(id);
  if (c.type === 'spell') { const sm = Math.min(s.p[0].spell, c.cost); r.push(`<p>✦ ${SPD[c.speed ?? 'fast']}</p><p>💎 Se paga primero con la reserva de hechizo: ${sm} de reserva + ${c.cost - sm} de maná.</p>`); } else r.push('<p>Puede atacar nada más jugarla. Solo el jugador con la ficha de ataque puede atacar.</p>');
  if (tk) r.push(`<p>🎯 Eliges tú el objetivo (${tk === 'enemy' ? 'unidad enemiga' : 'unidad aliada'}). Si desaparece antes de resolverse, el hechizo se disipa.</p>`);
  if (c.fx.some(e => e.t === 'sacDraw' || e.t === 'sacDmg' || e.t === 'fuse')) r.push('<p>⚠ Sacrifica a tu unidad más débil.</p>');
  if (hand >= 0 && !canPlay(s, 0, hand)) {
    const pl = s.p[0], avail = c.type === 'spell' ? pl.mana + pl.spell : pl.mana;
    r.push(`<p>⛔ ${c.cost > avail ? `Maná insuficiente: cuesta ${c.cost}, tienes ${avail}.` : s.active !== 0 ? 'Ahora no tienes la prioridad.' : c.type === 'unit' ? (pl.board.length >= 6 ? 'Tu tablero está lleno.' : 'Solo se juegan unidades con la pila vacía, en tu turno.') : 'Ahora no puedes jugarla (¿necesita objetivo o pila vacía?).'}</p>`);
  }
  return `<div class="rules">${r.join('')}</div>`;
}
const NAT = new Set(['lms', 'arb', 'neg', 'bor', 'ska', 'mkv', 'tsk', 'psy', 'sin', 'ost', 'pon', 'krn', 'syl', 'dsj']);   // cartas de las naciones de la Aventura (ver nations.css)
const artHTML = (id: string) => { const f = id.slice(0, 3);
  return `<div class="art"><span class="glyph">${CARDS[id].type === 'spell' ? '✦' : f === 'lum' ? '☀' : '☾'}</span><img src="${imageOf(id)}" onerror="this.remove()"></div>`; };
function card(id: string, attr = '', cls = '', u?: Unit, extra = ''): string {
  const c = CARDS[id], f = id.slice(0, 3), kws = u ? u.kw : c.kw, dmg = u && u.dmg > 0 ? 'dmg' : '';
  const kn = (c.type === 'spell' ? [SPN[c.speed ?? 'fast']] : []).concat(kws.map(k => KWN[k])).join(' · ');
  return `<div class="card ${c.type} ${f} ${NAT.has(f) ? 'nat' : ''} ${cls}" ${attr}>${artHTML(id)}
    <div class="side"><i class="cost">${c.cost}</i>${kws.map(k => `<i class="ki">${KWI[k]}</i>`).join('')}</div>
    <div class="panel"><div class="nm">${nameOf(id)}</div><div class="orn"></div><p class="tx ${c.text.length > 150 ? 'tl3' : c.text.length > 105 ? 'tl2' : c.text.length > 70 ? 'tl1' : ''}"><em>${kn}</em>${c.text}</p></div>
    ${c.type === 'unit' ? `<b class="atk ${u && u.ta ? 'tmp' : ''}">${u ? atkOf(u) : c.atk}<s>⚔</s></b><b class="hp ${dmg}">${u ? curHp(u) : c.hp}<s>♥</s></b>` : ''}${extra}</div>`;
}
function spot(id: string, side: number, u?: Unit) {
  document.querySelectorAll('.spot').forEach(e => e.remove());
  const d = document.createElement('div'); d.className = 'vfx spot';
  d.innerHTML = `<div class="spot-l">${side ? 'Rival juega' : 'Juegas'}</div>${card(id, '', '', u)}`;
  document.body.append(d); setTimeout(() => d.remove(), 1250);
}
function reader(id: string, side: number, u?: Unit) {
  document.querySelectorAll('.reader').forEach(e => e.remove());
  const c = CARDS[id], ms = c.type === 'spell' ? 6500 : 3800, d = document.createElement('div');
  d.className = 'reader ' + (side ? 'foe' : 'me'); reading = true; readT = Date.now();
  d.innerHTML = `<div class="rd-h">${side ? '⚠ El rival juega' : 'Juegas'}</div>${card(id, '', '', u)}<div class="rd-t"><b>${esc(nameOf(id))}</b> · coste ${c.cost}<p>${esc(c.text)}</p></div>${rules(id, u ? u.kw : c.kw)}<button class="rd-ok" type="button">Entendido ✓</button><i class="rd-bar" style="animation-duration:${ms}ms"></i>`;
  document.body.append(d);
  const close = () => { if (!d.isConnected) return; d.remove(); reading = false; };
  d.querySelector('.rd-ok')!.addEventListener('click', close); d.addEventListener('click', close); setTimeout(close, ms);
}
function portrait(p: Player, i: number, label: string): string {
  const fl = p.nexus < prev[i] ? 'hit' : p.nexus > prev[i] ? 'heal' : '', d = p.nexus - prev[i];
  const gems = Array.from({ length: p.maxMana }, (_, k) => `<u class="${k < p.mana ? 'on' : ''}"></u>`).join('');
  return `<div class="pt ${i ? 'foe' : 'me'}"><div class="ava"><span>${fac(i) ? '☾' : '☀'}</span>${adv && i === 1 ? `<img src="${rivalImg(adv.rival.id)}" data-f="${import.meta.env.BASE_URL}img/avatar_${fac(i) ? 'umb' : 'lum'}.webp" onerror="if(this.dataset.f){this.src=this.dataset.f;delete this.dataset.f}else this.remove()">` : `<img src="${import.meta.env.BASE_URL}img/avatar_${fac(i) ? 'umb' : 'lum'}.webp" onerror="this.remove()">`}</div>
    <div class="orb ${fl}">${Math.max(0, p.nexus)}${d ? `<span class="fx">${d > 0 ? '+' : ''}${d}</span>` : ''}</div>${s.ward?.[i] ? `<div class="ward" title="Glaciar: absorbe ${s.ward[i]} de daño al Nexo">❄ ${s.ward[i]}</div>` : ''}
    <div class="pname">${label}</div><div class="pmana">${gems}<span class="sm">${[0, 1, 2].map(k => `<i class="${k < p.spell ? 'on' : ''}"></i>`).join('')}</span></div></div>`;
}

// ---------- Ataques con animación + informe ----------
const chalTargets = (): Unit[] => { if (!chal) return []; const r = s.p[0].board.find(x => x.uid === chal!.queue[0]); return r ? s.p[1].board.filter(u => canBlock(r, u) && !Object.values(chal!.picks).includes(u.uid)) : []; };
/** Quita de la cola los Retadores que ya no tienen enemigo elegible (el motor los resuelve solo). true = aún hay algo que elegir. */
function chalNext(): boolean { while (chal && chal.queue.length && !chalTargets().length) chal.queue.shift(); return !!chal && chal.queue.length > 0; }
let chal: { units: number[]; queue: number[]; picks: Record<string, number> } | null = null;  // Retador: el jugador elige qué enemigo bloquea
function runAttack(units: number[], side: number, challenge?: Record<string, number>) {
  if (s.phase !== 'main') return;
  if (side === 0 && !challenge && s.p[1].board.length) {
    const q = units.filter(k => s.p[0].board[k]?.kw.includes('retador')).map(k => s.p[0].board[k].uid);
    if (q.length) { chal = { units, queue: q, picks: {} }; if (chalNext()) { sfx('select'); render(); return; } chal = null; }
  }
  if (online) { dispatch({ type: 'attack', units, challenge }); return; }  // online: la animación se hace al llegar la jugada confirmada
  const gid = gameId; busy = true; pend = { side, idx: units }; sfx('attack');
  vfx('banner small', `⚔ ${side ? 'El rival ataca' : 'Atacas'} con ${units.length}`); render();
  setTimeout(() => {
    if (gid !== gameId) return;
    pend = null; busy = false; const n = step(s, { type: 'attack', units, challenge });
    if (n === s) { toast('No puedes atacar ahora'); sel.clear(); render(); loop(); return; }
    s = n; sel.clear(); render(); loop();
  }, 900);
}
function report(b: State, a: State) {
  const at = b.token, df = 1 - at, dmg = b.p[df].nexus - a.p[df].nexus;
  const dead = (i: number) => b.p[i].board.filter(u => !a.p[i].board.some(x => x.uid === u.uid)).map(u => nameOf(u.card));
  const mine = dead(0), theirs = dead(1), n = b.attackers.length;
  const parts = [`${at ? 'El rival atacó' : 'Atacaste'} con ${n}`, dmg > 0 ? `${at ? 'Tu Nexo' : 'Nexo rival'} −${dmg}` : 'sin daño al Nexo'];
  if (mine.length) parts.push('Tuyas caídas: ' + mine.join(', ')); if (theirs.length) parts.push('Rivales caídas: ' + theirs.join(', '));
  const txt = '⚔ ' + parts.join(' · ');
  const d = document.createElement('div'); d.className = 'vfx report' + (at ? '' : ' good'); d.textContent = txt; document.body.append(d); setTimeout(() => d.remove(), 3600); chat.sys(txt);
}

// ---------- Combate: los enfrentamientos se resuelven de uno en uno ----------
// El motor resuelve todo de golpe; aquí solo se presenta pareja a pareja (el estado final es siempre el del motor).
const resolvesCombat = (a: State, b: State) => a !== b && a.phase === 'block' && a.attackers.length > 0 && b.attackers.length === 0 && a.round === b.round;
function playCombat(b: State, a: State, done: () => void) {
  const gid = gameId, T = b.token, D = 1 - T;
  const order = b.attackers.filter(uid => b.p[T].board.some(u => u.uid === uid)).map(uid => ({ uid, bid: b.blocks[String(uid)] as number | undefined }));
  if (!order.length) { done(); return; }
  // reparto estimado del daño al Nexo entre parejas (la suma coincide con el real)
  const total = Math.max(0, b.p[D].nexus - a.p[D].nexus);
  const est = order.map(({ uid, bid }) => {
    const u = b.p[T].board.find(x => x.uid === uid)!, bl = bid !== undefined ? b.p[D].board.find(x => x.uid === bid) : undefined;
    if (!bl) return bid === undefined || u.kw.includes('arrollar') ? atkOf(u) : 0;
    return u.kw.includes('arrollar') ? Math.max(0, atkOf(u) - curHp(bl) - (bl.kw.includes('duro') ? 1 : 0)) : 0;
  });
  const sum = est.reduce((x, y) => x + y, 0), share: number[] = []; let given = 0;
  est.forEach((e, i) => { const v = i === est.length - 1 ? total - given : sum ? Math.round(e / sum * total) : 0; share.push(Math.max(0, v)); given += share[i]; });
  const hyb = (k: number): State => {
    const h = structuredClone(b), done = new Set<number>();
    order.slice(0, k + 1).forEach(({ uid, bid }) => { done.add(uid); if (bid !== undefined) done.add(bid); });
    for (const sd of [0, 1]) {
      h.p[sd].board = h.p[sd].board.filter(u => !done.has(u.uid) || a.p[sd].board.some(x => x.uid === u.uid));
      h.p[sd].board.forEach(u => { if (done.has(u.uid)) { const x = a.p[sd].board.find(y => y.uid === u.uid); if (x) Object.assign(u, x); } });
    }
    h.p[D].nexus = b.p[D].nexus - share.slice(0, k + 1).reduce((x, y) => x + y, 0);
    h.attackers = order.slice(k + 1).map(o => o.uid); h.blocks = {};
    h.attackers.forEach(uid => { const bid = b.blocks[String(uid)]; if (bid !== undefined && h.p[D].board.some(u => u.uid === bid)) h.blocks[String(uid)] = bid; });
    h.forced = h.forced.filter(f => h.attackers.includes(f));
    return h;
  };
  const k0 = order.length > 3 ? 0.7 : 1, FOCUS = 480 * k0, STRIKE = 340, SETTLE = 760 * k0;
  dueling = true; sel.clear(); tgt = null; selAtk = null;
  const finish = () => { duel = null; dueling = false; report(b, a); done(); };
  const run = (k: number) => {
    if (gid !== gameId) { duel = null; dueling = false; return; }
    if (k >= order.length) { finish(); return; }
    const { uid, bid } = order[k], bl = bid !== undefined ? b.p[D].board.find(u => u.uid === bid) : undefined, at = b.p[T].board.find(u => u.uid === uid)!;
    s = k ? hyb(k - 1) : b;
    duel = { atk: uid, blk: bl ? bl.uid : null, strike: false, def: D, cap: `⚔ Duelo ${k + 1}/${order.length} · ${esc(nameOf(at.card))} ${bl ? 'contra ' + esc(nameOf(bl.card)) : '→ directo al Nexo'}` };
    render();
    setTimeout(() => {
      if (gid !== gameId) { duel = null; dueling = false; return; }
      // Objetivo: la carta que bloquea o, si no hay bloqueo, el avatar del Nexo defensor
      const ea = document.querySelector<HTMLElement>(`[data-uid="${uid}"]`),
        eb = bl ? document.querySelector<HTMLElement>(`[data-uid="${bl.uid}"]`) : document.querySelector<HTMLElement>(`.pt.${D === 0 ? 'me' : 'foe'} .ava`);
      const WIND = 150, DASH = 330, HOLD = 70, BACK = 560, GO = WIND + DASH, tot = GO + HOLD + BACK, alive = a.p[T].board.some(u => u.uid === uid), fac = at.card.startsWith('umb') ? 'umb' : 'lum';
      if (ea && eb) {
        // Una sola animación continua sobre una copia fija en pantalla (los renders intermedios no la cortan):
        // carga breve → embestida suave con estela → choque → regreso suave a su sitio. La original se oculta mientras dura.
        const A = ea.getBoundingClientRect(), B = eb.getBoundingClientRect(), dy0 = B.top + B.height / 2 - (A.top + A.height / 2), dir = Math.sign(dy0) || 1;
        const dx = B.left + B.width / 2 - (A.left + A.width / 2), dy = dy0 - dir * ((A.height * 1.08 + B.height) / 2 - (bl ? 4 : 16));
        const dist = Math.hypot(dx, dy) || 1, wx = -dx / dist * Math.min(26, dist * .09), wy = -dy / dist * Math.min(26, dist * .09);
        const fl = ea.cloneNode(true) as HTMLElement; fl.classList.remove('duel', 'duelatk', 'sel', 'can', 'enter', 'atkr'); fl.removeAttribute('data-a'); fl.removeAttribute('data-uid');
        fl.style.cssText = `position:fixed;left:${A.left}px;top:${A.top}px;width:${A.width}px;height:${A.height}px;--w:${A.width}px;margin:0;z-index:80;pointer-events:none;will-change:transform;box-shadow:0 0 0 2px #ffd36e,0 12px 30px #000a,0 0 30px #ffd36eaa`;
        document.body.append(fl); duel!.fly = true;
        // GSAP: anticipación (se agacha y retrocede) → embestida que acelera y se estira → impacto que aplasta → regreso con inercia
        const lean = Math.max(-9, Math.min(9, dx / dist * 9));
        const an = gsap.timeline({ onComplete: () => { fl.remove(); if (duel && duel.atk === uid) { duel.fly = false; render(); } } });
        gsap.set(fl, { transformOrigin: '50% 50%' });
        an.to(fl, { x: wx, y: wy, scaleX: 1.07, scaleY: .93, rotation: -lean * .5, duration: WIND / 1000, ease: 'power2.out' })
          .to(fl, { x: dx, y: dy, scaleX: .94, scaleY: 1.12, rotation: lean, duration: DASH / 1000, ease: 'power3.in' })
          .to(fl, { scaleX: 1.16, scaleY: .86, rotation: lean * .3, duration: HOLD / 2000, ease: 'power4.out' })
          .to(fl, { scaleX: 1.06, scaleY: 1.06, duration: HOLD / 2000, ease: 'power2.out' })
          .to(fl, { x: 0, y: 0, scaleX: 1, scaleY: 1, rotation: 0, duration: BACK / 1000, ease: 'power3.inOut' });
        trailFx(fl, WIND + DASH + 40, fac);
        setTimeout(() => {
          if (!alive) { an.kill(); fl.remove(); if (duel && duel.atk === uid) duel.fly = false; }
          clashFx(B.left + B.width / 2, B.top + B.height / 2 - dir * B.height / 2 + dir * 4, A.width, fac);
          if (bl) document.querySelector<HTMLElement>(`[data-uid="${bl.uid}"]`)?.animate([{ transform: 'scale(1.08)' }, { transform: `translateY(${dir * 16}px) rotate(${dir * 3}deg) scale(1.02)`, filter: 'brightness(2.2)', offset: .3 }, { transform: 'scale(1.08)' }], { duration: 340, easing: 'ease-out' });
        }, GO);
      }
      duel!.strike = true; sfx('attack'); render();
      setTimeout(() => {
        if (gid !== gameId) { duel = null; dueling = false; return; }
        s = hyb(k); duel!.strike = false; render();
        setTimeout(() => run(k + 1), SETTLE);
      }, ea && eb ? GO : STRIKE);
    }, FOCUS);
  };
  run(0);
}
function commit(n: State) {
  sel.clear(); tgt = null; selAtk = null; heldBlk = null;
  if (resolvesCombat(s, n)) { busy = true; playCombat(s, n, () => { busy = false; s = n; render(); loop(); }); return; }
  s = n; render(); loop();
}

// ---------- Render ----------
function render() {
  if (s.round !== lastRound && s.round > 0 && s.phase !== 'mulligan') { drawUntil = Date.now() + 1400; setTimeout(() => render(), 1450); }
  { const bs = !!adv?.rival.boss, enr = bs && s.winner === null && s.phase !== 'mulligan' && s.p[1].nexus <= (s.cap?.[1] ?? 20) * 0.4;
    document.body.classList.toggle('boss', bs); document.body.classList.toggle('enraged', enr); setBoss(bs);
    if (bs) document.body.dataset.bn = adv!.nation; else delete document.body.dataset.bn;
    if (enr && !enraged) { enraged = true; vfx('banner', '☠ EL JEFE SE ENFURECE'); sfx('boss'); } else if (!enr && s.p[1].nexus > (s.cap?.[1] ?? 20) * 0.4) enraged = false; }
  pv.style.display = 'none'; setTension(s.phase === 'block' || s.stack.length ? 1 : 0);
  const me = s.p[0], foe = s.p[1], myTurn = s.active === 0 && s.winner === null && !busy && s.phase !== 'mulligan';
  const defMe = s.phase === 'block' && s.token === 1 && s.active === 0;
  const blockers = new Set(Object.values(s.blocks)), atkSet = new Set(s.attackers);
  // Columnas de combate: cada atacante con su defensor justo enfrente (debajo/arriba según quién ataque)
  type Col = { a?: Unit; ai: number; b?: Unit; bi: number };
  const T = s.attackers.length ? s.token : 0, cols: Col[] = [];
  if (s.attackers.length) s.attackers.forEach(uid => { const ai = s.p[T].board.findIndex(u => u.uid === uid); if (ai < 0) return; const bid = s.blocks[String(uid)], bi = bid === undefined ? -1 : s.p[1 - T].board.findIndex(u => u.uid === bid); cols.push({ a: s.p[T].board[ai], ai, b: bi >= 0 ? s.p[1 - T].board[bi] : undefined, bi }); });
  else if (s.phase === 'main' && sel.size) [...sel].forEach(ai => { if (me.board[ai]) cols.push({ a: me.board[ai], ai, bi: -1 }); });
  const inCombat = (u: Unit, side: number) => cols.some(c => (side === T ? c.a : c.b) === u);
  const unit = (u: Unit, i: number, side: number) => {
    const mine = side === 0, o = prevHp.get(u.uid), eff = curHp(u);
    let fx = '', fc = ''; if (o && s.round === lastRound) { if (eff < o[1]) { fc = 'hurt'; fx = String(eff - o[1]); } else if (eff > o[1] || atkOf(u) > o[0]) { fc = 'boost'; fx = '+' + (eff > o[1] ? eff - o[1] : atkOf(u) - o[0]); } }
    const valid = tgt && ((tgt.kind === 'enemy' && !mine) || (tgt.kind === 'ally' && mine));
    const a = chal && !mine && chalTargets().includes(u) ? 'chal' : valid ? 'tgt' : mine ? 'unit' : defMe && atkSet.has(u.uid) ? 'enemy-unit' : 'view';
    const can = mine && myTurn && s.phase === 'main' && s.tok[0] && !s.attackers.length && !s.peace && canAttack(u);
    const cls = `mini ${sel.has(i) && mine ? 'sel ' : ''}${can ? 'can ' : ''}${seen.has(u.uid) ? '' : 'enter '}${fc} ${valid ? 'tgtok ' : ''}${!mine && selAtk === i ? 'blocktarget ' : ''}${mine && blockers.has(u.uid) ? 'assignedblock ' : ''}${mine && heldBlk === i && s.phase === 'block' ? 'sel ' : ''}${chal && !mine && Object.values(chal.picks).includes(u.uid) ? 'forced ' : ''}${chal && !mine && chalTargets().includes(u) ? 'tgtok ' : ''}${s.forced.includes(u.uid) || (s.forced.some(f => s.blocks[String(f)] === u.uid)) ? 'forced ' : ''}${atkSet.has(u.uid) ? 'atkr ' : ''}${pend && pend.side === side && pend.idx.includes(i) ? 'attacking ' + (side ? 'down' : 'up') : ''}${duel && u.uid === duel.atk ? 'duel duelatk ' + (duel.fly ? 'fly ' : '') : duel && u.uid === duel.blk ? 'duel duelblk ' : ''}`;
    return card(u.card, `data-u="${side}:${i}" data-a="${a}" data-i="${i}" data-uid="${u.uid}" data-c="${u.card}"`, cls, u, fx ? `<span class="fx">${fx}</span>` : '');
  };
  const lanes = (p: Player, side: number) => {
    const back: string[] = [], comb: string[] = [];
    p.board.forEach((u, i) => { if (!inCombat(u, side)) back.push(unit(u, i, side)); });
    cols.forEach(c => { const x = side === T ? c.a : c.b, xi = side === T ? c.ai : c.bi;
      comb.push(x ? unit(x, xi, side) : `<div class="slot cslot ${fac(side) ? 'umb' : 'lum'} ${defMe && side === 0 ? 'ask' : ''}">${defMe && side === 0 ? '<span>Elige<br>defensor</span>' : ''}</div>`); });
    const ghosts = lastBoard[side].filter(uid => !p.board.some(u => u.uid === uid)).map(uid => { const g = ghostCache.get(uid); return g ? card(g.id, '', 'mini dying', g.u) : ''; });
    const slots = Array.from({ length: Math.max(0, 6 - p.board.length) }, (_, k) => `<div class="slot ${fac(side) ? 'umb' : 'lum'}">${ghosts[k] ?? ''}</div>`).join('');
    return { back: back.join('') + slots, comb: comb.join('') };
  };
  const F = lanes(foe, 1), M = lanes(me, 0);
  const phaseName = s.phase === 'mulligan' ? 'Mulligan' : s.phase === 'main' ? 'Prioridad' : s.phase === 'block' ? 'Bloqueos' : 'Pila';
  const msg = s.winner !== null ? (s.winner === -1 ? 'Empate' : s.winner === 0 ? '¡Victoria!' : 'Derrota')
    : chal ? `⚔ Retador: elige qué enemigo debe bloquear a ${nameOf(me.board.find(u => u.uid === chal!.queue[0])?.card ?? '')} (${Object.keys(chal.picks).length + 1}/${Object.keys(chal.picks).length + chal.queue.length}) · Esc cancela`
    : tgt ? `Elige objetivo para ${nameOf(me.hand[tgt.hand])} · Esc cancela`
    : s.phase === 'stack' ? (myTurn ? `Responde o pulsa OK · ${s.stack.length} en la pila` : `Pila · ${s.stack.length}`)
    : s.phase === 'block' ? (defMe ? (heldBlk !== null ? 'Toca el atacante al que mover ese bloqueador (el mismo para quitarlo)' : 'Toca un atacante y luego tu bloqueador · toca un bloqueador ya puesto para moverlo') : s.active === 0 ? 'Rival bloqueó: puedes responder o resolver' : 'El rival asigna bloqueos…')
    : myTurn ? (s.passes === 1 ? 'El rival pasó: pasa también para cerrar la ronda' : s.tok[0] ? 'Tu turno: juega cartas o selecciona unidades y ataca' : 'Tu turno: juega cartas o pasa') : 'El rival tiene la prioridad…';
  const log = s.log.slice(-14).map(l => l.replace(/\{(\w+)\}/g, (_, id) => `<b>${nameOf(id)}</b>`)).join('<br>');
  const bs = s.attackers.length ? `<div class="blocksummary"><b>⚔ Combate</b>${s.attackers.map(uid => {
    const a = s.p[s.token].board.find(u => u.uid === uid), bid = s.blocks[String(uid)], b = bid === undefined ? undefined : s.p[1 - s.token].board.find(u => u.uid === bid);
    return `<span>${a ? nameOf(a.card) : '?'} <i>→</i> ${b ? nameOf(b.card) : '<em>Sin bloquear</em>'}</span>`; }).join('')}</div>` : '';
  // botón principal contextual
  let label = 'RIVAL', mode = 'wait';
  if (myTurn) {
    if (s.phase === 'main') { if (sel.size) { label = `ATACAR ${sel.size}`; mode = 'atk'; } else { label = s.passes === 1 ? 'FIN DE RONDA' : 'PASAR'; mode = 'go'; } }
    else if (s.phase === 'block') { label = defMe ? (Object.keys(s.blocks).length ? 'BLOQUEAR' : 'SIN BLOQUEO') : 'RESOLVER'; mode = 'go'; }
    else { label = 'OK'; mode = 'go'; }
  }
  const uname = (uid?: number) => { const u = uid === undefined ? undefined : [...s.p[0].board, ...s.p[1].board].find(x => x.uid === uid); return u ? nameOf(u.card) : ''; };
  const stack = s.stack.length ? `<div class="stacktray"><b>✦ Pila · se resuelve de arriba abajo</b>${[...s.stack].map((x, k) => ({ x, k })).reverse().map(({ x, k: si }, k) => { const c = CARDS[x.card], tn = uname(x.target);
    return `<div data-st="${si}" class="stackitem ${x.owner ? 'foe' : 'me'} ${k === 0 ? 'top' : ''}"><div class="si-h"><em>${x.owner ? 'Rival' : 'Tú'}</em><strong>${nameOf(x.card)}</strong><i>${c.cost}</i></div><p>${esc(c.text)}</p>${tn ? `<small>🎯 Objetivo: ${esc(tn)}</small>` : ''}</div>`; }).join('')}</div>` : '';
  // HUD de fases (estilo Yu-Gi-Oh): Robo · Invocación · Combate · Final
  const drawing = Date.now() < drawUntil && s.phase !== 'mulligan', inBlock = s.phase === 'block' || (s.phase === 'stack' && s.resumePhase === 'block');
  const ph = s.phase === 'mulligan' ? -1 : drawing ? 0 : inBlock ? 2 : s.passes === 1 && !s.attackers.length && s.phase === 'main' ? 3 : 1;
  const PH = [['ROBO', 'Robas 1 carta y ganas 1 de maná'], ['INVOCACIÓN', 'Juega unidades y hechizos'], ['COMBATE', 'Ataque y bloqueo · hechizos rápidos permitidos'], ['FINAL', 'Si ambos pasáis, acaba la ronda y pasa el turno']];
  app.dataset.ph = String(ph);
  const whose = s.winner !== null || s.phase === 'mulligan' ? '' : s.active === 0 ? 'mine' : 'theirs';
  const hud = `<div class="phasehud ${whose}"><div class="who">${whose === 'mine' ? '⚡ TU TURNO' : whose ? '⏳ TURNO RIVAL' : 'PARTIDA'}</div><ol>${PH.map((x, k) => `<li class="${k === ph ? 'on' : k < ph ? 'done' : ''}"><i>${k + 1}</i><span>${x[0]}</span>${k === ph ? `<small>${x[1]}</small>` : ''}</li>`).join('')}</ol>${s.stack.length ? '<div class="hstack">✦ Pila activa</div>' : ''}</div>`;
  const n = me.hand.length, occ: Record<string, number> = {}, fan = me.hand.map((id, i) => { const r = i - (n - 1) / 2, k = `${id}#${occ[id] = (occ[id] ?? -1) + 1}`;
    return `<div class="slotc" data-a="hand" data-i="${i}" data-k="${k}" data-id="${id}" style="--rot:${(r * 3.2).toFixed(1)}deg;--y:${(r * r * 2.6).toFixed(1)}px" aria-label="${esc(nameOf(id))}, coste ${CARDS[id].cost}">${card(id, '', `${myTurn && canPlay(s, 0, i) ? 'ok' : 'no'} ${tgt?.hand === i ? 'sel' : ''}`)}</div>`; }).join('');
  const mullHTML = s.phase === 'mulligan' && s.mull[0] ? `<div class="mull"><h2>Mulligan</h2><p>Esperando al rival…</p></div>` : s.phase === 'mulligan' ? `<div class="mull"><h2>Mulligan</h2><p>Toca las cartas que quieras reemplazar (0 a 4)</p><div class="mrow">${me.hand.map((id, i) => card(id, `data-a="mul" data-i="${i}"`, mulSel.has(i) ? 'sel swap' : '')).join('')}</div><button class="btn" data-a="mulgo">${mulSel.size ? `Reemplazar ${mulSel.size}` : 'Conservar mano'}</button></div>` : '';
  motionSnapshot(app, gameId);
  app.innerHTML = `<header><div class="brand"><span class="brand-mark">✦</span><h1>Cartas <small>ALFA</small></h1></div><div class="header-state"><span class="rd">Ronda ${s.round}/40</span><span class="phase-chip">${phaseName}</span><span class="tok">${s.tok[0] ? '⚑ Tienes la ficha de ataque' : s.tok[1] ? '⚑ Ficha de ataque: rival' : '⚑ Ficha gastada'}</span>${s.gas ? `<span class="tok" title="Al cerrar la ronda daña 1 a cada unidad sin Adaptado">☣ Gas tóxico: ${s.gas} ronda(s)</span>` : ''}${s.peace ? '<span class="tok" title="Nadie puede atacar hasta que acabe la ronda">☮ Tregua</span>' : ''}</div>
    <nav class="toolbar"><button class="ghost" data-a="chat">${chatOpen ? '✕ Cerrar' : '☰ Chat / registro'}</button><button class="ghost icon-btn" data-a="mute">${isMuted() ? '🔇' : '🔊'}</button><button class="ghost" data-a="menu">⌂ Menú</button><button class="ghost" data-a="online">🌐 Online</button><button class="ghost" data-a="new">↻ Nueva partida</button></nav></header>` +
    `<main class="stage ${tgt ? 'targeting' : ''}${dueling ? ' dueling' : ''}" data-dnex="${duel && duel.blk === null ? duel.def : ''}">${duel ? `<div class="duelcap">${duel.cap}</div>` : ''}
      <div class="foehand">${Array.from({ length: foe.hand.length }, () => '<i></i>').join('')}</div>
      <div class="plane-wrap"><div class="plane"><div class="lane foeback">${F.back}</div><div class="lane foecomb">${F.comb}</div><div class="lane mycomb">${M.comb}</div><div class="lane myback">${M.back}</div></div></div>
      
      <div class="msgbar"><span class="pill ${myTurn ? 'go' : ''}">${msg}</span></div>
      <aside class="sideL">${hud}${stack}${bs}<div class="pgroup me"><div class="pile p0" data-l="MAZO" title="Tu mazo"><b>${me.deck.length}</b></div>${portrait(me, 0, `${facName(0)} · Tú`)}</div></aside>
      <aside class="sideR"><div class="pgroup foe">${portrait(foe, 1, `${facName(1)} · Rival`)}<div class="pile p1" data-l="MAZO" title="Mazo rival"><b>${foe.deck.length}</b></div></div>
      <div class="manapanel"><div class="mrow2"><b>MANÁ</b><span>${me.mana}/${me.maxMana}</span></div><div class="gems">${Array.from({ length: Math.max(me.maxMana, 1) }, (_, k) => `<u class="${k < me.mana ? 'on' : ''}"></u>`).join('')}</div>
        <div class="mrow2" title="Reserva exclusiva para hechizos: se gasta ANTES que el maná normal y se rellena con el maná que te sobra al acabar la ronda (máximo 3)."><b>RESERVA ✦</b><span>${me.spell}/3</span></div><div class="gems sp">${[0, 1, 2].map(k => `<u class="${k < me.spell ? 'on' : ''}"></u>`).join('')}</div><p class="mnote">Reserva: solo hechizos, se gasta primero. Se llena con el maná que sobra al cerrar la ronda (máx. 3).</p></div>
      <button class="endbtn ${mode}" data-a="${mode === 'atk' ? 'attack' : 'go'}" ${mode === 'wait' ? 'disabled' : ''}><span>${label}</span></button></aside>
      <div class="fan">${fan}</div></main>` + mullHTML +
    (s.winner !== null ? `<div class="over"><h2>${msg}</h2>${adv && !adv.free ? `<p class="over-sub">${esc(NATIONS[adv.nation].name)} · ${esc(adv.rival.name)}</p><button class="btn" data-a="new">${s.winner === 0 ? 'Revancha' : 'Reintentar'}</button>${s.winner === 0 && nextRival(adv.nation) ? '<button class="btn" data-a="advnext">Siguiente rival ▶</button>' : ''}<button class="btn" data-a="advmap">🗺 Mapa de la Aventura</button>` : '<button class="btn" data-a="new">Jugar de nuevo</button>'}</div>` : '');
  motionPlay(app, side => (fac(side) ? 'umb' : 'lum'));
  // --- efectos y sonidos por transición de estado ---
  const fresh = s.p.some(p => p.board.some(u => !seen.has(u.uid))), gone = lastBoard.some(l => l.some(uid => !s.p.some(p => p.board.some(u => u.uid === uid))));
  if (fresh) s.p.flatMap(p => p.board.filter(u => !seen.has(u.uid)).map(u => u.card)).forEach((id, k) => setTimeout(() => sfxCard(id), k * 170)); if (gone) sfx('death');
  s.p.forEach((p, i) => p.board.filter(u => !seen.has(u.uid)).forEach(u => {
    if (isFlagship(u.card)) { document.querySelectorAll('.spot,.reader').forEach(e => e.remove()); reading = true; readT = Date.now(); sfx('round'); epicEntrance(u.card, card(u.card, '', '', u), () => { reading = false; }); }
    else if (i) reader(u.card, 1, u); else spot(u.card, 0, u);
  }));
  if (me.nexus < prev[0]) vfx('vhit'); else if (me.nexus > prev[0]) vfx('vheal');
  if (me.nexus < prev[0] || foe.nexus < prev[1]) sfx('hurt'); if (me.nexus > prev[0] || foe.nexus > prev[1]) sfx('heal');
  s.p.forEach((p, i) => { const id = p.played[p.played.length - 1]; if (p.played.length > prevPlayed[i] && id && CARDS[id].type === 'spell') { vfx('cast ' + id.slice(0, 3)); sfx('spell_' + id.slice(0, 3)); if (i) reader(id, 1); else spot(id, 0); if (i === 1) react('cast'); } });
  if (s.round !== lastRound && s.round > 0) { vfx('banner', `Ronda ${s.round}`); sfx('round'); if (me.spell > prevSpell) setTimeout(() => toast(`✦ +${me.spell - prevSpell} reserva de hechizo (maná sobrante)`), 1500); }
  if (s.active === 0 && prevActive !== 0 && !busy && s.winner === null && s.phase !== 'mulligan' && s.round === lastRound) { vfx('banner small turn', defMe ? '🛡 Tu turno · bloquea' : '⚡ Tu turno'); sfx('round'); }
  prevActive = s.phase === 'mulligan' ? -1 : s.active; prevSpell = me.spell;
  if (!dueling && prevS.attackers.length && !s.attackers.length && prevS.round === s.round) report(prevS, s);
  prev = [me.nexus, foe.nexus]; prevPlayed = s.p.map(p => p.played.length); lastRound = s.round; prevS = s;
  prevHp = new Map(); lastBoard = [[], []];
  ghostCache = new Map();
  s.p.forEach((p, i) => p.board.forEach(u => { seen.add(u.uid); prevHp.set(u.uid, [atkOf(u), curHp(u)]); lastBoard[i].push(u.uid); ghostCache.set(u.uid, { id: u.card, u: { ...u, kw: [...u.kw] } }); }));
  if (s.winner !== null && !ended) { ended = true; if (adv && !adv.free && s.winner === 0) markWon(adv.nation, adv.rival.id); if (online) Online.clearSaved(); sfx(s.winner === 0 ? 'win' : 'lose'); if (s.winner === 0) react('win'); else if (s.winner === 1) react('lose'); }
  logv.innerHTML = log; chatEl.hidden = !chatOpen;
}
// ---------- Acciones ----------
function dispatch(a: Action) {
  if (online) {
    if (busy || online.busy) return;
    if (!online.isReady) { toast('Esperando al rival… Para jugar contra la IA, sal de la sala desde 🌐 Online'); return; }
    const n = step(s, toView(a));                                 // validación local sobre la vista propia
    if (n === s) { toast(a.type === 'block' ? 'Ese bloqueo no es válido (Elusivo/Temible/ya asignado)' : a.type === 'play' ? 'No puedes jugar eso ahora' : 'Acción no válida'); return; }
    if (a.type === 'pass' || a.type === 'confirmBlocks') sfx('pass');
    busy = true; sel.clear(); tgt = null; selAtk = null; heldBlk = null; render();
    online.send(a).then(ok => { if (!ok) { busy = false; render(); } });
    return;                                                       // el estado cambia cuando vuelve la jugada confirmada
  }
  const n = step(s, a);
  if (n === s) { toast(a.type === 'block' ? 'Ese bloqueo no es válido (Elusivo/Temible/ya asignado)' : a.type === 'play' ? 'No puedes jugar eso ahora' : 'Acción no válida'); return; }
  if (a.type === 'pass' || a.type === 'confirmBlocks') sfx('pass');
  commit(n);
}
function loop() {
  if (online) return;
  if (s.winner !== null || s.active !== 1 || s.phase === 'mulligan') return;
  const gid = gameId;
  // Un único temporizador: si algo (animación, carta que se lee) retrasa a la IA, vuelve a intentarlo en vez de perder el turno.
  const tick = () => {
    if (gid !== gameId || online || s.winner !== null || s.active !== 1 || s.phase === 'mulligan') return;
    if (reading && Date.now() - readT > 9000) reading = false;   // seguro: una carta "leyéndose" nunca bloquea a la IA para siempre
    if (busy || dueling || reading) { aiTimer = window.setTimeout(tick, 300); return; }
    const a = aiAction(s, adv?.rival.level);
    if (a.type === 'attack') { runAttack(a.units, 1); return; }
    const n = step(s, a);
    commit(n === s ? step(s, { type: 'pass' }) : n);   // jugada ilegal de la IA: pasa en vez de quedarse atascada
  };
  clearTimeout(aiTimer); aiTimer = window.setTimeout(tick, 1200);
}
function go() {
  const myTurn = s.active === 0 && s.winner === null && !busy; if (!myTurn) return; sfx('click');
  if (s.phase === 'main' && sel.size) runAttack([...sel], 0);
  else if (s.phase === 'block' && s.token === 1) dispatch({ type: 'confirmBlocks' });
  else dispatch({ type: 'pass' });
}
app.addEventListener('click', e => {
  const t = (e.target as HTMLElement).closest<HTMLElement>('[data-a]');
  if (chal && t?.dataset.a !== 'chal') {
    if (t?.dataset.u?.startsWith('1:')) { toast('Ese enemigo ya fue elegido o no puede ser retado: elige otro'); return; }  // no cancelar por un clic erróneo
    chal = null; render(); return;
  }
  if (tgt && t?.dataset.a !== 'tgt') { tgt = null; render(); if (!t || t.dataset.a === 'hand') return; }
  if (!t) return;
  const a = t.dataset.a, i = Number(t.dataset.i), myTurn = s.active === 0 && s.winner === null && !busy && s.phase !== 'mulligan';
  if (a === 'chat') { chatOpen = !chatOpen; sfx('click'); render(); }
  else if (a === 'mute') { toggleMute(); sfx('click'); render(); }
  else if (a === 'new' && online) { toast('Para otra partida online crea o únete a una sala nueva'); openOnlineMenu(menuApi()); }
  else if (a === 'menu') { sfx('click'); showMenu(); }
  else if (a === 'online') { sfx('click'); openOnlineMenu(menuApi()); }
  else if (a === 'advmap') { sfx('click'); showAdventure(adv?.nation); }
  else if (a === 'advnext') { const r = adv && nextRival(adv.nation); if (adv && r) { sfx('start'); startDuel(adv.nation, r); } }
  else if (a === 'new') { sfx('click'); gameId++; busy = false; pend = null; selAtk = null; heldBlk = null; tgt = null; s = newS(); sel.clear(); mulSel.clear(); prev = [20, 20]; seen.clear(); prevPlayed = [0, 0]; lastRound = 0; prevHp.clear(); lastBoard = [[], []]; ended = false; prevS = s; render(); }
  else if (a === 'mul') { sfx('select'); mulSel.has(i) ? mulSel.delete(i) : mulSel.add(i); render(); }
  else if (a === 'mulgo') { sfx('click'); const idx = [...mulSel]; mulSel.clear(); dispatch({ type: 'mulligan', idx }); }
  else if (!myTurn) return;
  else if (a === 'chal') {
    if (!chal) return; const f = s.p[1].board[i]; if (!f) return;
    chal.picks[String(chal.queue.shift()!)] = f.uid; sfx('select');
    if (chalNext()) render(); else { const { units, picks } = chal; chal = null; runAttack(units, 0, picks); }
  }
  else if (a === 'tgt') { if (tgt) { const uid = Number(t.dataset.uid), h = tgt.hand; dispatch({ type: 'play', hand: h, target: uid }); } }
  else if (a === 'hand') {
    if (!canPlay(s, 0, i)) { toast('No puedes jugar esa carta ahora'); return; }
    const k = targetKind(s.p[0].hand[i]); sfx('select');
    if (k) { tgt = { hand: i, kind: k }; render(); } else dispatch({ type: 'play', hand: i });
  }
  else if (a === 'go') go();
  else if (a === 'attack') go();
  else if (a === 'enemy-unit' && s.phase === 'block') { if (heldBlk !== null) dispatch({ type: 'block', attacker: i, blocker: heldBlk }); else { selAtk = i; sfx('select'); render(); } }
  else if (a === 'unit' && s.phase === 'block' && s.token === 1) {
    const mineU = s.p[0].board[i];
    if (selAtk !== null) dispatch({ type: 'block', attacker: selAtk, blocker: i });   // asignar o MOVER un bloqueador ya puesto
    else if (mineU && Object.values(s.blocks).includes(mineU.uid)) {                    // coger un bloqueador ya asignado para moverlo
      if (s.forced.some(f => s.blocks[String(f)] === mineU.uid)) toast('Ese bloqueo lo impone un Retador: no se puede mover');
      else { heldBlk = heldBlk === i ? null : i; sfx('select'); render(); }
    } else toast('Primero toca al atacante rival');
  }
  else if (a === 'unit' && s.phase === 'main' && s.tok[0] && !s.attackers.length && (s.peace || !canAttack(s.p[0].board[i]))) { toast(s.peace ? '☮ Hay tregua: esta ronda nadie puede atacar' : s.p[0].board[i]?.kw.includes('raiz') ? '🌳 Las Raíces no pueden atacar' : '🍬 Está Pegada: no puede atacar esta ronda'); }
  else if (a === 'unit' && s.phase === 'main' && s.tok[0] && !s.attackers.length) { sel.has(i) ? sel.delete(i) : sel.add(i); sfx('select'); render(); }
});
document.addEventListener('keydown', e => {
  if ((e.target as HTMLElement).tagName === 'INPUT') return;
  if (e.key === 'Escape' && chal) { chal = null; render(); }
  else if (e.key === 'Escape' && tgt) { tgt = null; render(); }
  else if (e.key === ' ' && s.phase !== 'mulligan') { e.preventDefault(); go(); }
});
document.addEventListener('contextmenu', e => { if (tgt) { e.preventDefault(); tgt = null; render(); } });
const clearPay = () => document.querySelectorAll('.manapanel u.pay').forEach(x => x.classList.remove('pay'));
function showPay(id: string) {
  clearPay(); const c = CARDS[id], pl = s.p[0], sm = c.type === 'spell' ? Math.min(pl.spell, c.cost) : 0, mm = c.cost - sm;
  const g = document.querySelectorAll('.manapanel .gems'); const pay = (row: Element | undefined, on: number, n: number) => { if (!row) return; const u = row.querySelectorAll('u'); for (let k = on - 1; k >= Math.max(0, on - n); k--) u[k]?.classList.add('pay'); };
  pay(g[0], pl.mana, mm); pay(g[1], pl.spell, sm);
}
app.addEventListener('mouseover', e => {
  const st = (e.target as HTMLElement).closest<HTMLElement>('[data-st]');
  if (st) { const id = s.stack[Number(st.dataset.st)]?.card; if (id) { pv.innerHTML = card(id) + rules(id, CARDS[id].kw); pv.style.display = 'block'; } return; }
  const el = (e.target as HTMLElement).closest<HTMLElement>('[data-u],[data-a="hand"]');
  if (!el || !el.dataset.i || el.dataset.a !== 'hand') clearPay();
  if (el?.dataset.a === 'hand') { const id = s.p[0].hand[Number(el.dataset.i)]; if (id) showPay(id); }
  if (!el) { pv.style.display = 'none'; return; }
  if (el.dataset.u) { const [side, i] = el.dataset.u.split(':').map(Number), u = s.p[side]?.board[i]; if (u) { pv.innerHTML = card(u.card, '', '', u) + rules(u.card, u.kw); pv.style.display = 'block'; } }
  else { const i = Number(el.dataset.i), id = s.p[0].hand[i]; if (id) { pv.innerHTML = card(id) + rules(id, CARDS[id].kw, i); pv.style.display = 'block'; } }
});
app.addEventListener('mouseleave', () => { pv.style.display = 'none'; });

// ---------- Online: conexión con Firebase ----------
type Fresh = { before: State; action: Action; seat: Seat };
const queue: Fresh[] = []; let pumping = false;
function freshUi(st: State) {
  gameId++; busy = false; pend = null; selAtk = null; heldBlk = null; tgt = null; s = st; sel.clear(); mulSel.clear(); ended = st.winner !== null;
  prev = [st.p[0].nexus, st.p[1].nexus]; prevPlayed = st.p.map(p => p.played.length); lastRound = st.round; prevS = st;
  seen = new Set(st.p.flatMap(p => p.board.map(u => u.uid))); prevHp = new Map(); lastBoard = [[], []];
  st.p.forEach((p, i) => p.board.forEach(u => { prevHp.set(u.uid, [atkOf(u), curHp(u)]); lastBoard[i].push(u.uid); }));
  render();
}
function pump() {
  const m = queue.shift();
  if (!m) { pumping = false; return; }
  pumping = true;
  const after = view(applyMove(m.before, m.seat, m.action), ME);
  const finish = () => { pend = null; busy = false; s = after; sel.clear(); tgt = null; selAtk = null; render(); setTimeout(pump, 0); };
  const apply = () => { if (resolvesCombat(s, after) && queue.length === 0) { busy = true; pend = null; playCombat(s, after, finish); } else finish(); };
  if (m.action.type === 'attack' && queue.length === 0) {         // animar solo la jugada más reciente (al reconectar no se reproducen todas)
    const side = m.seat === ME ? 0 : 1; busy = true; pend = { side, idx: m.action.units }; sfx('attack');
    vfx('banner small', `⚔ ${side ? 'El rival ataca' : 'Atacas'} con ${m.action.units.length}`); render(); setTimeout(apply, 900);
  } else apply();
}
function menuApi() {
  return {
    inRoom: !!online,
    create: async () => {
      startOnline();
      try { curDeck = getDeck(); const c = await online!.create(wireDeck(curDeck)); setRoomTag(`Sala ${c} · esperando rival…`); menuStatus(`Código de sala: ${c} — pásaselo a tu rival`); }
      catch (e) { online = null; throw e; }
    },
    join: async (code: string) => { startOnline(); try { curDeck = getDeck(); await online!.join(code, wireDeck(curDeck)); } catch (e) { online = null; throw e; } },
    leave: () => { adv = null; online?.close(); online = null; ME = 0; queue.length = 0; pumping = false; setRoomTag(''); freshUi(newS()); loop(); },
  };
}
function startOnline() {
  adv = null;   // las salas online no son duelos de la Aventura
  if (online) return;
  online = new Online({
    onStatus: m => { setRoomTag(m); menuStatus(m); },
    onChat: m => { chat.push({ from: m.mine ? 'Tú' : 'Rival', text: m.text, side: m.mine ? 'me' : 'foe' }); if (!m.mine && !chatOpen) toast('💬 Rival: ' + m.text.slice(0, 60)); },
    onReady: () => { ME = online!.seat; closeMenu(); hideMenu(); chat.sys('Chat online activo: puedes escribir a tu rival.'); freshUi(view(online!.g, ME)); chat.sys(`Sala ${online!.code}: juegas con ${facName(0)}.`); },
    onMoves: (g, fresh, replay) => { if (replay) { queue.length = 0; freshUi(view(g, ME)); } else { queue.push(...fresh); if (!pumping) pump(); } },
    onSettled: () => { if (!pumping && !queue.length && busy) { busy = false; render(); } },
  });
}
const savedRoom = Online.savedCode();
if (savedRoom) { startOnline(); online!.resume(savedRoom).catch(() => { online = null; Online.clearSaved(); setRoomTag(''); }); }

// Menú principal: IA u online
document.addEventListener('menu:ia', ev => {
  const d = (ev as CustomEvent<{ nation: string; rival: string } | undefined>).detail, rv = d && NATIONS[d.nation]?.rivals.find(r => r.id === d.rival);
  if (rv) { startDuel(d!.nation, rv, true); return; }   // partida rápida contra el rival elegido (no cuenta para la Aventura)
  const wasAdv = !!adv; adv = null; closeAdventure(); if (wasAdv && !online) { gameId++; freshUi(newS()); loop(); } else if (!online && (curDeck !== getDeck() || curSig !== deckCards(getDeck()).join())) { gameId++; freshUi(newS()); loop(); } else if (online) { online.close(); online = null; ME = 0; queue.length = 0; pumping = false; setRoomTag(''); closeMenu(); freshUi(newS()); loop(); } });
document.addEventListener('menu:online', () => openOnlineMenu(menuApi()));
// ---------- Aventura ----------
function startDuel(nation: string, rival: Rival, free = false) {
  if (online) { online.close(); online = null; ME = 0; queue.length = 0; pumping = false; setRoomTag(''); closeMenu(); }
  adv = { nation, rival, free }; hideMenu(); startMusic(); freshUi(newS()); loop();
  chat.sys(free ? `Duelo contra ${rival.name}.` : `Aventura · ${NATIONS[nation].name}: duelo contra ${rival.name}.`);
  react('start'); if (rival.boss) bossIntro(rival);
}
/** Presentación a pantalla completa del jefe final (la IA espera a que termine; clic para saltar). */
function bossIntro(r: Rival) {
  document.querySelectorAll('.bossintro').forEach(e => e.remove());
  const d = document.createElement('div'); d.className = 'bossintro'; reading = true; readT = Date.now() + 1000;
  d.innerHTML = `<small>JEFE FINAL</small><i></i><h2>${esc(r.name)}</h2><i></i><p>${esc(r.tag)}</p>`; document.body.append(d); sfx('boss');
  const end = () => { if (!d.isConnected) return; d.classList.add('out'); setTimeout(() => d.remove(), 700); reading = false; };
  d.addEventListener('click', end); setTimeout(end, 4200);
}
function showAdventure(focus?: string) { openAdventure({ onFight: startDuel, onClose: () => { if (!document.getElementById('title')) showMenu(); } }, focus); }
document.addEventListener('menu:adv', () => showAdventure());
render(); loop();
initFx();
