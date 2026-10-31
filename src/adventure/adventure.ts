// Aventura: mapa del mundo (SVG) con hover por nación y panel de rivales.
import './adventure.css';
import { MAP } from './mapdata';
import { NATIONS, PLAYABLE, beaten, faction, nextRival, progress, unlocked, type Rival } from './rivals';
import { sfx } from '../ui/sound';

const NAME: Record<string, string> = { luminarae: 'Luminarae Luxor', arboris: 'Arboris', boro: 'Boro', skaldrum: 'Reino de Skaldrum', lumis: 'Lumis', markivton: 'Markivton',
  tribus: 'Tribus Skaldrak', umbra: 'Umbra', psybernia: 'Psybernia', ostraca: 'Ostraca', sinfalia: 'Sinfalía', pongi: 'Pongí', sylvaris: 'Sylvaris', negatt: 'Negatt',
  presidio: 'Presidio de Krahn', disnjav: 'Disnjav' };
// Tono de cada país en el mapa original; en el mapa se mezcla con el fondo oscuro para que encaje con el menú.
const TINT: Record<string, string> = { luminarae: '#f3f99f', arboris: '#99ed99', boro: '#dbabdb', skaldrum: '#f3dbdb', lumis: '#9fd5cf', markivton: '#b7b19f', tribus: '#d5dbe1',
  umbra: '#e7a5a5', psybernia: '#e1d5b7', ostraca: '#b7b7f9', sinfalia: '#c3f9ff', pongi: '#f3cff3', sylvaris: '#93e1cf', negatt: '#8d9399', presidio: '#f3cfab', disnjav: '#f3cfab' };
const mix = (hex: string, to: string, t: number) => { const f = (h: string) => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16)); const a = f(hex), b = f(to);
  return '#' + a.map((v, i) => Math.round(v + (b[i] - v) * t).toString(16).padStart(2, '0')).join(''); };
// Ajuste fino de la posición de algunas etiquetas (evita que se pisen)
const OFF: Record<string, [number, number]> = {};
const esc = (t: string) => t.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!));

/** Retrato del rival: public/img/rivals/<id>.webp (si falta, se ve la inicial). */
export const rivalImg = (id: string) => `${import.meta.env.BASE_URL}img/rivals/${id}.webp`;

export interface AdvHandlers { onFight(nation: string, rival: Rival): void; onClose?(): void }
let root: HTMLElement | null = null;

export const isAdventureOpen = () => !!root;
export function closeAdventure() {
  const r = root; if (!r) return; root = null; r.classList.add('out'); setTimeout(() => r.remove(), 400);
}

export function openAdventure(h: AdvHandlers, focus?: string) {
  if (root) return;
  const el = root = document.createElement('div'); el.id = 'adv';
  const playable = (id: string) => PLAYABLE.includes(id);
  const nat = Object.entries(MAP.nations);
  el.innerHTML = `
    <header class="adv-top"><button class="adv-back" data-x="back">← MENÚ</button>
      <div class="adv-ttl"><p>RECORRE EL MUNDO</p><h2>AVENTURA</h2></div><div class="adv-zoom"><button data-x="in" aria-label="Acercar">+</button><button data-x="out" aria-label="Alejar">−</button><button data-x="home" aria-label="Ver todo">⌖</button></div></header>
    <div class="adv-stage"><svg class="adv-map" viewBox="0 0 ${MAP.w} ${MAP.h}" preserveAspectRatio="xMidYMid meet" role="group" aria-label="Mapa del mundo">
      <defs><radialGradient id="adv-sea" cx="50%" cy="48%" r="75%"><stop offset="0" stop-color="#16404c"/><stop offset=".6" stop-color="#0a1c24"/><stop offset="1" stop-color="#05090c"/></radialGradient>
        <linearGradient id="adv-gold" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff0b8"/><stop offset="1" stop-color="#d9ae52"/></linearGradient>
        <linearGradient id="adv-vio" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c7a2ff"/><stop offset="1" stop-color="#6d3fd0"/></linearGradient></defs>
      <rect class="sea" x="-4000" y="-4000" width="${MAP.w + 8000}" height="${MAP.h + 8000}" fill="url(#adv-sea)"/>
      <g class="grat">${[1, 2, 3, 4, 5].map(i => `<line x1="${i * MAP.w / 6}" y1="-4000" x2="${i * MAP.w / 6}" y2="${MAP.h + 4000}"/>`).join('')}${[1, 2, 3].map(i => `<line x1="-4000" y1="${i * MAP.h / 4}" x2="${MAP.w + 4000}" y2="${i * MAP.h / 4}"/>`).join('')}</g>
      <path class="shelf2" d="${MAP.shelf2}" fill-rule="evenodd"/><path class="shelf1" d="${MAP.shelf1}" fill-rule="evenodd"/>
      <path class="decor" d="${MAP.decor}" fill-rule="evenodd"/>
      <g class="nations">${nat.map(([id, n]) => {
        const p = playable(id), c = TINT[id] ?? '#aaa';
        const fill = p ? mix(c, '#ffffff', 0.05) : mix(c, '#150f1d', 0.5);
        const st = p ? `${progress(id)}/${NATIONS[id].rivals.length} rivales vencidos` : 'Próximamente';
        return `<g class="nat ${p ? 'play ' + id : 'lock'}" data-id="${id}" style="--c:${c}" tabindex="0" role="button" aria-label="${esc(NAME[id])}: ${st}"><path d="${n.d}" fill="${fill}" fill-rule="evenodd"/></g>`; }).join('')}</g>
      <g class="labels"></g></svg>
      <div class="adv-tip" hidden></div>
      <p class="adv-hint">Pasa el cursor por un país · rueda para acercar · arrastra para moverte</p></div>
    <aside class="adv-panel" hidden></aside>`;
  document.body.append(el);

  const svg = el.querySelector<SVGSVGElement>('.adv-map')!, tip = el.querySelector<HTMLElement>('.adv-tip')!, panel = el.querySelector<HTMLElement>('.adv-panel')!;
  const gN = svg.querySelector<SVGGElement>('.nations')!, gL = svg.querySelector<SVGGElement>('.labels')!;

  // Etiquetas: la fuente se ajusta al hueco real de cada país (se mide el texto ya montado)
  const NS = 'http://www.w3.org/2000/svg';
  for (const [id, n] of nat) {
    const t = document.createElementNS(NS, 'text'); t.textContent = NAME[id]; t.setAttribute('class', 'lbl ' + (playable(id) ? 'play' : 'lock')); t.setAttribute('data-id', id);
    t.setAttribute('font-size', '100'); gL.append(t);
    const rot = n.el > 2.1 && Math.abs(n.ang) > 20, avail = (rot ? n.arun * 0.72 : n.wrun * 0.84), [ox, oy] = OFF[id] ?? [0, 0], cx = n.cx + ox, cy = n.cy + oy, w100 = t.getComputedTextLength() || 1;
    let fs = Math.max(9, Math.min(34, avail / w100 * 100));
    if (!rot && fs < 15 && NAME[id].includes(' ')) {   // dos líneas en los países pequeños
      const [a, ...b] = NAME[id].split(' '); t.textContent = ''; const l = [a, b.join(' ')];
      l.forEach((s, i) => { const ts = document.createElementNS(NS, 'tspan'); ts.textContent = s; ts.setAttribute('x', String(cx)); ts.setAttribute('dy', i ? '1.05em' : '-0.35em'); t.append(ts); });
      fs = Math.max(8, Math.min(20, avail / (Math.max(...l.map(s => s.length)) * 0.62)));
    }
    t.setAttribute('font-size', fs.toFixed(1)); t.setAttribute('x', String(cx)); t.setAttribute('y', String(cy));
    t.setAttribute('transform', rot ? `rotate(${n.ang} ${cx} ${cy})` : '');
  }

  // ---- Zoom / arrastre (viewBox) ----
  // El encuadre sigue la proporción de la pantalla (en vertical se ve el continente más grande)
  const full = { x: 0, y: 0, w: MAP.w, h: MAP.h };
  const asp = () => { const r = svg.getBoundingClientRect(); return r.width && r.height ? r.width / r.height : MAP.w / MAP.h; };
  const home = () => { const w = asp() < 1.2 ? 1000 : 1560; return { x: 930 - w / 2, y: 520 - w / asp() / 2, w, h: w / asp() }; };
  let vb = home();
  const apply = () => svg.setAttribute('viewBox', `${vb.x} ${vb.y} ${vb.w} ${vb.h}`);
  const clamp = () => {
    vb.w = Math.min(full.w, Math.max(full.w / 6, vb.w)); vb.h = vb.w / asp();
    vb.x = vb.w >= full.w ? (full.w - vb.w) / 2 : Math.min(full.w - vb.w, Math.max(0, vb.x));
    vb.y = vb.h >= full.h ? (full.h - vb.h) / 2 : Math.min(full.h - vb.h, Math.max(0, vb.y));
  };
  const zoomAt = (f: number, px = .5, py = .5) => { const nw = vb.w * f, nh = nw / asp(); vb.x += (vb.w - nw) * px; vb.y += (vb.h - nh) * py; vb.w = nw; clamp(); apply(); };
  clamp(); apply(); window.addEventListener('resize', onResize); function onResize() { if (root) { clamp(); apply(); } }
  const scale = () => svg.getScreenCTM()?.a || 1;   // píxeles de pantalla por unidad del mapa
  const toMap = (e: { clientX: number; clientY: number }) => { const m = svg.getScreenCTM(); if (!m) return { x: .5, y: .5 }; const p = new DOMPoint(e.clientX, e.clientY).matrixTransform(m.inverse()); return { x: Math.min(1, Math.max(0, (p.x - vb.x) / vb.w)), y: Math.min(1, Math.max(0, (p.y - vb.y) / vb.h)) }; };
  svg.addEventListener('wheel', e => { e.preventDefault(); const p = toMap(e); zoomAt(e.deltaY < 0 ? .8 : 1.25, p.x, p.y); }, { passive: false });
  let drag: { x: number; y: number; vx: number; vy: number; moved: boolean } | null = null;
  svg.addEventListener('pointerdown', e => { drag = { x: e.clientX, y: e.clientY, vx: vb.x, vy: vb.y, moved: false }; });
  window.addEventListener('pointermove', onMove); window.addEventListener('pointerup', onUp);
  function onMove(e: PointerEvent) {
    if (!drag || !root) return;
    const dx = e.clientX - drag.x, dy = e.clientY - drag.y;
    if (!drag.moved && Math.hypot(dx, dy) > 6) { drag.moved = true; svg.classList.add('drag'); tip.hidden = true; }
    if (drag.moved) { const k = scale(); vb.x = drag.vx - dx / k; vb.y = drag.vy - dy / k; clamp(); apply(); }
  }
  function onUp() { setTimeout(() => { drag = null; svg.classList.remove('drag'); }, 0); }

  // ---- Hover / tooltip ----
  const info = (id: string) => playable(id) ? `${progress(id)}/${NATIONS[id].rivals.length} rivales vencidos · pulsa para entrar` : '🔒 Próximamente';
  const showTip = (id: string, e: { clientX: number; clientY: number }) => {
    if (drag?.moved) return;
    tip.hidden = false; tip.className = 'adv-tip ' + (playable(id) ? 'play' : 'lock'); tip.innerHTML = `<b>${esc(NAME[id])}</b><span>${info(id)}</span>`;
    const r = el.querySelector('.adv-stage')!.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top;
    tip.style.left = Math.min(r.width - tip.offsetWidth - 8, Math.max(8, x + 16)) + 'px'; tip.style.top = Math.min(r.height - tip.offsetHeight - 8, Math.max(8, y + 18)) + 'px';
  };
  gN.addEventListener('pointerover', e => { const g = (e.target as Element).closest<SVGGElement>('.nat'); if (!g) return; if (g.parentNode!.lastChild !== g) gN.append(g); g.classList.add('hov'); gL.querySelector(`[data-id="${g.dataset.id}"]`)?.classList.add('hov'); if (e.pointerType === 'mouse') sfx('select'); });
  gN.addEventListener('pointermove', e => { const g = (e.target as Element).closest<SVGGElement>('.nat'); if (g && e.pointerType === 'mouse') showTip(g.dataset.id!, e); });
  gN.addEventListener('pointerout', e => { const g = (e.target as Element).closest<SVGGElement>('.nat'); if (!g) return; g.classList.remove('hov'); gL.querySelector(`[data-id="${g.dataset.id}"]`)?.classList.remove('hov'); tip.hidden = true; });
  gN.addEventListener('focusin', e => { const g = (e.target as Element).closest<SVGGElement>('.nat'); if (!g) return; const b = g.getBoundingClientRect(); showTip(g.dataset.id!, { clientX: b.left + b.width / 2, clientY: b.top + b.height / 2 }); });
  gN.addEventListener('focusout', () => { tip.hidden = true; });

  // ---- Selección + panel de rivales ----
  let toastT = 0;
  const select = (id: string) => {
    sfx('select'); tip.hidden = true; tip.style.transform = '';
    gN.querySelectorAll('.nat.sel').forEach(n => n.classList.remove('sel')); gN.querySelector(`[data-id="${id}"]`)?.classList.add('sel');
    const n = NATIONS[id], soon = !playable(id), nx = soon ? null : nextRival(id), pr = soon ? 0 : progress(id);
    panel.hidden = false; panel.dataset.n = id; panel.className = 'adv-panel ' + id + (soon ? ' soon' : '');
    panel.innerHTML = `<button class="adv-x" data-x="close" aria-label="Cerrar">✕</button><p class="adv-k">${soon ? '🔒 PRÓXIMAMENTE' : 'NACIÓN'}</p><h3>${esc(n.name)}</h3>
      <div class="adv-bar" role="progressbar" aria-valuemin="0" aria-valuemax="${n.rivals.length}" aria-valuenow="${pr}"><i style="width:${100 * pr / n.rivals.length}%"></i></div>
      <ol class="adv-ms" aria-hidden="true">${n.rivals.map((r, i) => `<li class="${!soon && beaten(id, r.id) ? 'done' : nx?.id === r.id ? 'cur' : ''} ${r.boss ? 'boss' : ''}"><i>${r.boss ? '★' : i + 1}</i></li>`).join('')}</ol>
      <p class="adv-prog">${soon ? 'Esta nación aún no está disponible' : pr === n.rivals.length ? '★ Nación conquistada' : `${pr} de ${n.rivals.length} rivales vencidos`}</p>
      <ol class="adv-list">${n.rivals.map((r, i) => {
        const done = !soon && beaten(id, r.id), open = !soon && unlocked(id, i), f = faction(r);
        return `<li class="rv ${done ? 'done' : open ? 'open' : 'shut'} ${r.boss ? 'boss' : ''} ${nx?.id === r.id ? 'next' : ''}">
          <span class="rv-n">${done ? '✓' : open ? i + 1 : '🔒'}</span><span class="rv-av ${f === 'Umbra' ? 'u' : 'l'}"><b>${esc(r.name[0])}</b><img src="${rivalImg(r.id)}" alt="" loading="lazy" onerror="this.remove()"><i>${f === 'Umbra' ? '☾' : '☀'}</i></span>
          <div class="rv-i"><b>${esc(r.name)}${r.boss ? '<em>JEFE</em>' : ''}</b><small>${esc(r.tag)}</small><span class="rv-l" aria-label="Dificultad ${r.level} de 5">${'●'.repeat(r.level)}${'○'.repeat(5 - r.level)}</span></div>
          <button class="rv-go" data-r="${r.id}" ${open ? '' : 'disabled'}>${soon ? 'PRÓXIMAMENTE' : done ? 'REPETIR' : open ? 'COMBATIR' : 'BLOQUEADO'}</button></li>`; }).join('')}</ol>
      <p class="adv-note">${soon ? 'Los rivales de esta nación estarán disponibles en una próxima actualización.' : 'Se juega con tu mazo elegido. Vence a cada rival para desbloquear al siguiente.'}</p>`;
  };
  gN.addEventListener('click', e => { if (drag?.moved) return; const g = (e.target as Element).closest<SVGGElement>('.nat'); if (g) select(g.dataset.id!); });
  gN.addEventListener('keydown', e => { if (e.key !== 'Enter' && e.key !== ' ') return; const g = (e.target as Element).closest<SVGGElement>('.nat'); if (g) { e.preventDefault(); select(g.dataset.id!); } });

  const closePanel = () => { panel.hidden = true; gN.querySelectorAll('.nat.sel').forEach(n => n.classList.remove('sel')); };
  const leave = () => { window.removeEventListener('pointermove', onMove); window.removeEventListener('pointerup', onUp); window.removeEventListener('resize', onResize); document.removeEventListener('keydown', onKey, true); closeAdventure(); h.onClose?.(); };
  function onKey(e: KeyboardEvent) { if (e.key !== 'Escape' || !root) return; e.stopPropagation(); if (!panel.hidden) closePanel(); else { sfx('click'); leave(); } }
  document.addEventListener('keydown', onKey, true);
  el.addEventListener('click', e => {
    const t = e.target as HTMLElement, x = t.closest<HTMLElement>('[data-x]')?.dataset.x, go = t.closest<HTMLElement>('.rv-go');
    if (x === 'back') { sfx('click'); leave(); } else if (x === 'close') { sfx('click'); closePanel(); }
    else if (x === 'in') zoomAt(.7); else if (x === 'out') zoomAt(1.4); else if (x === 'home') { vb = home(); clamp(); apply(); }
    else if (go && !go.hasAttribute('disabled')) {
      const id = panel.dataset.n!, r = NATIONS[id].rivals.find(v => v.id === go.dataset.r); if (!r) return;
      window.removeEventListener('pointermove', onMove); window.removeEventListener('pointerup', onUp); window.removeEventListener('resize', onResize); document.removeEventListener('keydown', onKey, true);
      closeAdventure(); h.onFight(id, r);
    }
  });
  if (focus && playable(focus)) select(focus);
}
