// Capa de espectáculo: pantalla de título, partículas, foil holográfico, temblor de pantalla, estela del cursor y sonido de interfaz.
import { sfx, startMusic } from './sound';
import { initCombatFx } from './combatfx';
import { customDecks, esc, getDeck, setDeck } from '../decks';
import { openDeckBuilder } from './deckbuilder';
const css = (el: HTMLElement, k: string, v: string) => el.style.setProperty(k, v);

function particles() {
  const cv = document.createElement('canvas'); cv.id = 'embers'; document.body.prepend(cv);
  const g = cv.getContext('2d')!; let w = 0, h = 0; const P: { x: number; y: number; r: number; v: number; a: number; hue: number; ph: number }[] = [];
  const size = () => { w = cv.width = innerWidth; h = cv.height = innerHeight; }; size(); addEventListener('resize', size);
  for (let i = 0; i < 90; i++) P.push({ x: Math.random() * 2000, y: Math.random() * 1200, r: Math.random() * 2 + .4, v: Math.random() * .5 + .12, a: Math.random() * .6 + .2, hue: Math.random() < .55 ? 40 : 265, ph: Math.random() * 6 });
  let t = 0;
  (function loop() {
    t += .01; g.clearRect(0, 0, w, h);
    for (const p of P) {
      p.y -= p.v; p.x += Math.sin(t + p.ph) * .35; if (p.y < -10) { p.y = h + 10; p.x = Math.random() * w; }
      const tw = .6 + Math.sin(t * 3 + p.ph) * .4; g.beginPath(); g.fillStyle = `hsla(${p.hue},95%,68%,${p.a * tw})`; g.shadowColor = `hsl(${p.hue},95%,60%)`; g.shadowBlur = 10;
      g.arc(p.x % w, p.y, p.r, 0, 6.3); g.fill();
    }
    requestAnimationFrame(loop);
  })();
}
function trail() {
  const d = document.createElement('div'); d.id = 'glow'; document.body.append(d);
  let x = 0, y = 0, tx = 0, ty = 0;
  addEventListener('pointermove', e => { tx = e.clientX; ty = e.clientY; });
  (function loop() { x += (tx - x) * .14; y += (ty - y) * .14; d.style.transform = `translate(${x - 160}px,${y - 160}px)`; requestAnimationFrame(loop); })();
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
export function showMenu() {
  if (titleEl) return;
  const t = titleEl = document.createElement('div'); t.id = 'title';
  t.innerHTML = `<div class="t-bg"></div><div class="t-art l"></div><div class="t-art u"></div>
    <div class="t-in"><p class="t-kicker"><i></i>DUELO DE LEYENDAS<i></i></p><h1>CARTAS</h1><div class="t-sub"><i></i><span>ALFA</span><i></i></div>
    <div class="t-fac" role="radiogroup" aria-label="Elige tu mazo"></div>
    <div class="t-menu"><button class="t-go" data-m="ia" autofocus>⚔ JUGAR CONTRA LA IA</button><button class="t-go alt" data-m="online">🌐 JUGAR ONLINE</button><button class="t-go dk" data-m="decks">🃏 MIS MAZOS</button></div>
    <p class="t-hint">Elige tu mazo y un modo · sonido activado</p></div>`;
  document.body.append(t);
  const facEl = t.querySelector<HTMLElement>('.t-fac')!;
  const paint = () => {
    const cur = getDeck();
    facEl.innerHTML = `<button class="l" data-d="Luminarae" role="radio">☀ LUMINARAE</button><i>◆</i><button class="u" data-d="Umbra" role="radio">UMBRA ☾</button>`
      + customDecks().map(d => `<i>◆</i><button class="c" data-d="${d.id}" role="radio">🃏 ${esc(d.name)}</button>`).join('');
    facEl.querySelectorAll<HTMLElement>('[data-d]').forEach(b => { const on = b.dataset.d === cur; b.classList.toggle('on', on); b.setAttribute('aria-checked', String(on)); });
  };
  facEl.addEventListener('click', e => { const b = (e.target as HTMLElement).closest<HTMLElement>('[data-d]'); if (!b) return; setDeck(b.dataset.d!); sfx('select'); paint(); });
  paint();
  t.querySelectorAll<HTMLElement>('[data-m]').forEach(b => b.addEventListener('click', () => {
    if (b.dataset.m === 'decks') { sfx('click'); openDeckBuilder(paint); return; }
    sfx('start'); startMusic();
    if (b.dataset.m === 'ia') { hideMenu(); document.dispatchEvent(new Event('menu:ia')); }
    else document.dispatchEvent(new Event('menu:online'));
  }));
}
export function hideMenu() { const t = titleEl; if (!t) return; titleEl = null; t.classList.add('out'); setTimeout(() => t.remove(), 900); }
function title() { showMenu(); }
export function initFx() { initCombatFx(); particles(); trail(); foil(); reactions(); title(); }
