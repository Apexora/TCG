// Capa de espectáculo: pantalla de título, partículas, foil holográfico, temblor de pantalla, estela del cursor y sonido de interfaz.
import { sfx, startMusic } from './sound';
import { initCombatFx } from './combatfx';
import { customDecks, deckCards, deckFaction, esc, getDeck, setDeck, unlockedNationDecks } from '../decks';
import { NATIONS, faction, quickRivals } from '../adventure/rivals';
import { openDeckBuilder } from './deckbuilder';
const css = (el: HTMLElement, k: string, v: string) => el.style.setProperty(k, v);

function particles() {
  if (matchMedia('(prefers-reduced-motion:reduce)').matches) return;
  const cv = document.createElement('canvas'); cv.id = 'embers'; document.body.prepend(cv);
  const g = cv.getContext('2d')!; let w = 0, h = 0; const P: { x: number; y: number; r: number; v: number; a: number; s: number; ph: number }[] = [];
  const size = () => { w = cv.width = innerWidth; h = cv.height = innerHeight; }; size(); addEventListener('resize', size);
  // Un sprite con brillo por tono (se dibuja con drawImage): evita shadowBlur + arco + relleno por partícula y frame
  const spr = [40, 265].map(hue => { const c = document.createElement('canvas'); c.width = c.height = 32; const x = c.getContext('2d')!, gr = x.createRadialGradient(16, 16, 0, 16, 16, 16);
    gr.addColorStop(0, `hsla(${hue},95%,75%,1)`); gr.addColorStop(.25, `hsla(${hue},95%,68%,.85)`); gr.addColorStop(1, `hsla(${hue},95%,60%,0)`); x.fillStyle = gr; x.fillRect(0, 0, 32, 32); return c; });
  const N = innerWidth < 700 ? 45 : 90;
  for (let i = 0; i < N; i++) P.push({ x: Math.random() * 2000, y: Math.random() * 1200, r: Math.random() * 2 + .4, v: Math.random() * .5 + .12, a: Math.random() * .6 + .2, s: Math.random() < .55 ? 0 : 1, ph: Math.random() * 6.3 });
  let t = 0;
  (function loop() {
    t += .01; g.clearRect(0, 0, w, h);
    for (const p of P) {
      p.y -= p.v; p.x += Math.sin(t + p.ph) * .35; if (p.y < -10) { p.y = h + 10; p.x = Math.random() * w; }
      const tw = .6 + Math.sin(t * 3 + p.ph) * .4, d = p.r * 7;
      g.globalAlpha = p.a * tw; g.drawImage(spr[p.s], (p.x % w) - d / 2, p.y - d / 2, d, d);
    }
    g.globalAlpha = 1;
    requestAnimationFrame(loop);
  })();
}
function trail() {
  const d = document.createElement('div'); d.id = 'glow'; document.body.append(d);
  let x = 0, y = 0, tx = 0, ty = 0;
  let run = false;
  const loop = () => { x += (tx - x) * .14; y += (ty - y) * .14; d.style.transform = `translate(${x - 160}px,${y - 160}px)`; if (Math.abs(tx - x) + Math.abs(ty - y) > .3) requestAnimationFrame(loop); else run = false; };
  addEventListener('pointermove', e => { tx = e.clientX; ty = e.clientY; if (!run) { run = true; requestAnimationFrame(loop); } });
}
function foil() {
  let last: HTMLElement | null = null;
  document.addEventListener('pointermove', e => {
    const c = (e.target as HTMLElement).closest<HTMLElement>('.card'); if (!c) return;
    const r = c.getBoundingClientRect(), mx = (e.clientX - r.left) / r.width, my = (e.clientY - r.top) / r.height;
    css(c, '--mx', (mx * 100).toFixed(1) + '%'); css(c, '--my', (my * 100).toFixed(1) + '%'); css(c, '--ang', ((mx - .5) * 60).toFixed(1) + 'deg');
  });
  let lastS = 0;
  document.addEventListener('pointerover', e => {
    const t = (e.target as HTMLElement).closest<HTMLElement>('.slotc,.card[data-a],button,.btn'); if (!t || t === last) return; last = t;
    const n = performance.now(); if (n - lastS > 70) { sfx('hover'); lastS = n; }
  });
  document.addEventListener('pointerout', () => { last = null; });
}
function reactions() {
  new MutationObserver(ms => ms.forEach(m => m.addedNodes.forEach(n => {
    if (!(n instanceof HTMLElement) || !n.classList.contains('vfx')) return;
    const c = n.classList;
    if (c.contains('vhit')) shake('hard'); else if (c.contains('banner') && !c.contains('small')) flash('#ffd27a33');
    else if (c.contains('cast')) { flash(c.contains('lum') ? '#8fe9ff33' : '#a24dff44'); shake('soft'); }
    else if (c.contains('report')) shake('soft');
  }))).observe(document.body, { childList: true });
  new MutationObserver(() => document.querySelectorAll('.card.attacking:not(.fxdone)').forEach(e => { e.classList.add('fxdone'); shake('soft'); })).observe(document.getElementById('app')!, { childList: true, subtree: true });
}
function shake(k: 'soft' | 'hard') {
  const a = document.getElementById('app')!; a.classList.remove('shk-soft', 'shk-hard'); void a.offsetWidth; a.classList.add('shk-' + k);
}
function flash(color: string) {
  const f = document.createElement('div'); f.className = 'flash'; f.style.background = `radial-gradient(circle at 50% 50%,${color},transparent 70%)`; document.body.append(f); setTimeout(() => f.remove(), 700);
}
let titleEl: HTMLElement | null = null;
/** Menú principal: elegir jugar contra la IA o en línea. Avisa a main.ts con eventos 'menu:ia' / 'menu:online'. */
import { openRanking } from './ranking';
import { mountMenuScene } from './menuscene';
export function showMenu() {
  if (titleEl) return;
  const t = titleEl = document.createElement('div'); t.id = 'title';
  t.innerHTML = `<div class="t-bg"></div><div class="t-moon"></div><div class="t-stage"></div>
    <div class="t-in"><h1 class="t-logo">APEXORA<small>TCG</small></h1>
    <div class="t-menu" role="menu"><button class="t-go on" data-m="ia" autofocus>Jugar con la IA</button><button class="t-go alt" data-m="online">Jugar Online</button><button class="t-go adv" data-m="adv">Aventura</button><button class="t-go rkb" data-m="rank">Ranking</button><button class="t-go dk" data-m="decks">Mis Mazos</button></div>
    <div class="t-fac" role="radiogroup" aria-label="Elige tu mazo"></div>
    <p class="t-hint">Elige tu mazo y un modo · sonido activado</p></div>`;
  document.body.append(t);
  const scene = mountMenuScene(t.querySelector<HTMLElement>('.t-stage')!, () => titleEl === t);
  const facEl = t.querySelector<HTMLElement>('.t-fac')!;
  const paint = () => {
    const cur = getDeck();
    facEl.innerHTML = `<button class="l" data-d="Luminarae" role="radio">☀ LUMINARAE</button><i>◆</i><button class="u" data-d="Umbra" role="radio">UMBRA ☾</button>`
      + unlockedNationDecks().map(([k, n]) => `<i>◆</i><button class="c n" data-d="${k}" role="radio">🏳 ${esc(n)}</button>`).join('')
      + customDecks().map(d => `<i>◆</i><button class="c" data-d="${d.id}" role="radio">🃏 ${esc(d.name)}</button>`).join('');
    facEl.querySelectorAll<HTMLElement>('[data-d]').forEach(b => { const on = b.dataset.d === cur; b.classList.toggle('on', on); b.setAttribute('aria-checked', String(on)); });
  };
  const KR = 'tcgRival';
  const saved = () => { try { return localStorage.getItem(KR); } catch { return null; } };
  /** Rival elegido (si no hay o ya no está disponible: el primero de la facción contraria a tu mazo). */
  const pickedRival = () => {
    const l = quickRivals(), sv = saved();
    return l.find(([n, r]) => n + ':' + r.id === sv) ?? l.find(([n]) => n === (deckFaction(deckCards(getDeck())) === 'Umbra' ? 'luminarae' : 'umbra'))!;
  };
  const paintRiv = () => { /* el selector de rival ahora vive en el panel que abre «Jugar contra la IA» */ };
  /** Panel «Elige a tu rival»: se abre al pulsar Jugar contra la IA. */
  const openRivalPicker = () => {
    if (t.querySelector('.rp')) return;
    const list = quickRivals(); let sel = pickedRival();
    const base = import.meta.env.BASE_URL;
    const o = document.createElement('div'); o.className = 'rp'; o.setAttribute('role', 'dialog'); o.setAttribute('aria-modal', 'true'); o.setAttribute('aria-label', 'Elige a tu rival');
    const cards = () => list.map(([n, r]) => {
      const u = faction(r) === 'Umbra', on = r === sel[1];
      return `<button type="button" class="rp-c ${u ? 'u' : 'l'} ${on ? 'on' : ''}" role="radio" aria-checked="${on}" data-k="${n}:${r.id}">
        <span class="rp-art"><b>${esc(r.name[0])}</b><img src="${base}img/rivals/${esc(r.id)}.webp" alt="" loading="lazy" onerror="this.remove()"><i>${u ? '☾' : '☀'}</i></span>
        <span class="rp-n">${esc(r.name)}${r.boss ? '<em>JEFE</em>' : ''}</span>
        <span class="rp-nat">${esc(NATIONS[n].name)}</span>
        <span class="rp-lv" aria-label="Dificultad ${r.level} de 5">${'◆'.repeat(r.level)}<s>${'◆'.repeat(5 - r.level)}</s></span>
        <small class="rp-tag">${esc(r.tag)}</small></button>`;
    }).join('');
    o.innerHTML = `<div class="rp-box"><p class="rp-k"><i></i>MODO ESCARAMUZA<i></i></p><h2>ELIGE A TU RIVAL</h2>
      <div class="rp-grid" role="radiogroup" aria-label="Rival">${cards()}</div>
      <p class="rp-hint">Vence a más rivales en la Aventura para desbloquearlos aquí</p>
      <div class="rp-act"><button type="button" class="rp-back">‹ VOLVER</button><button type="button" class="rp-go">⚔ COMBATIR</button></div></div>`;
    t.append(o);
    const grid = o.querySelector<HTMLElement>('.rp-grid')!;
    const close = () => { document.removeEventListener('keydown', onKey, true); o.classList.add('out'); setTimeout(() => o.remove(), 220); (t.querySelector('[data-m="ia"]') as HTMLElement | null)?.focus(); };
    const go = () => {
      try { localStorage.setItem(KR, sel[0] + ':' + sel[1].id); } catch { /* ignorar */ }
      document.removeEventListener('keydown', onKey, true);
      sfx('start'); startMusic(); hideMenu();
      document.dispatchEvent(new CustomEvent('menu:ia', { detail: { nation: sel[0], rival: sel[1].id } }));
    };
    const choose = (b: HTMLElement) => {
      const hit = list.find(([n, r]) => n + ':' + r.id === b.dataset.k); if (!hit) return; sel = hit;
      grid.querySelectorAll<HTMLElement>('.rp-c').forEach(x => { const on = x === b; x.classList.toggle('on', on); x.setAttribute('aria-checked', String(on)); });
      sfx('select');
    };
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); close(); }
      else if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        const bs = Array.from(grid.querySelectorAll<HTMLElement>('.rp-c')), i = bs.findIndex(x => x.classList.contains('on')), n = bs[(i + (e.key === 'ArrowRight' ? 1 : bs.length - 1)) % bs.length];
        e.preventDefault(); choose(n); n.focus();
      }
    }
    document.addEventListener('keydown', onKey, true);
    grid.addEventListener('click', e => { const b = (e.target as HTMLElement).closest<HTMLElement>('.rp-c'); if (b) choose(b); });
    grid.addEventListener('dblclick', e => { if ((e.target as HTMLElement).closest('.rp-c')) go(); });
    o.querySelector('.rp-go')!.addEventListener('click', go);
    o.querySelector('.rp-back')!.addEventListener('click', () => { sfx('click'); close(); });
    o.addEventListener('click', e => { if (e.target === o) close(); });
    (grid.querySelector('.rp-c.on') as HTMLElement | null)?.focus();
    grid.querySelector('.rp-c.on')?.scrollIntoView({ block: 'nearest', inline: 'center' });
  };
  facEl.addEventListener('click', e => { const b = (e.target as HTMLElement).closest<HTMLElement>('[data-d]'); if (!b) return; setDeck(b.dataset.d!); sfx('select'); paint(); paintRiv(); });
  paint(); paintRiv();
  const onProg = () => { if (titleEl === t) { paint(); paintRiv(); } else document.removeEventListener('tcg:progreso', onProg); }; document.addEventListener('tcg:progreso', onProg);
  const items = Array.from(t.querySelectorAll<HTMLElement>('.t-menu .t-go'));
  const mark = (b: HTMLElement) => { if (b.classList.contains('on')) return; items.forEach(x => x.classList.toggle('on', x === b)); scene.pulse(); };
  items.forEach(b => { b.addEventListener('mouseenter', () => mark(b)); b.addEventListener('focus', () => mark(b)); });
  t.querySelector('.t-menu')!.addEventListener('keydown', e => {
    const k = (e as KeyboardEvent).key; if (k !== 'ArrowDown' && k !== 'ArrowUp') return;
    e.preventDefault(); const i = items.findIndex(x => x === document.activeElement); items[(i + (k === 'ArrowDown' ? 1 : items.length - 1)) % items.length].focus(); sfx('select');
  });
  t.querySelectorAll<HTMLElement>('[data-m]').forEach(b => b.addEventListener('click', () => {
    if (b.dataset.m === 'rank') { sfx('click'); openRanking(); return; }
    if (b.dataset.m === 'decks') { sfx('click'); openDeckBuilder(paint); return; }
    if (b.dataset.m === 'adv') { sfx('click'); document.dispatchEvent(new Event('menu:adv')); return; }
    if (b.dataset.m === 'ia') { sfx('click'); openRivalPicker(); return; }
    sfx('start'); startMusic();
    document.dispatchEvent(new Event('menu:online'));
  }));
}
export function hideMenu() { const t = titleEl; if (!t) return; titleEl = null; t.classList.add('out'); setTimeout(() => t.remove(), 900); }
function title() { showMenu(); }
export function initFx() { initCombatFx(); particles(); trail(); foil(); reactions(); title(); }
