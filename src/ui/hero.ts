// Fondo de aventura/fantasía del menú: cielo crepuscular, sigilo lunar con la grieta del logo, auroras,
// cordilleras con parallax, islas flotantes, bruma y motas de luz. Todo procedural (SVG + canvas), sin imágenes.
// Si existe public/img/hero.webp se usa como capa extra de pintura detrás de las cordilleras.
const SVGNS = 'http://www.w3.org/2000/svg';
const W = 1600, H = 900;
function rng(seed: number) { let a = seed >>> 0; return () => { a = (a + 0x6D2B79F5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
const mixHex = (a: string, b: string, t: number) => { const p = (h: string) => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16)); const x = p(a), y = p(b); return '#' + x.map((v, i) => Math.round(v + (y[i] - v) * t).toString(16).padStart(2, '0')).join(''); };

function ridgePath(seed: number, base: number, amp: number, scale: number, spikes = 0): string {
  const r = rng(seed), ph = [r() * 6.3, r() * 6.3, r() * 6.3, r() * 6.3];
  const pts: string[] = [`M0,${H}`];
  for (let x = 0; x <= W; x += 14) {
    let y = Math.sin(x / scale + ph[0]) * 0.55 + Math.sin(x / (scale * 0.43) + ph[1]) * 0.28 + Math.sin(x / (scale * 0.19) + ph[2]) * 0.12 + Math.sin(x / (scale * 0.07) + ph[3]) * 0.05;
    const sp = spikes ? Math.pow(Math.max(0, Math.sin(x / (scale * 0.31) + ph[1] * 2)), 6) * spikes : 0;
    pts.push(`L${x},${(base + y * amp - sp).toFixed(1)}`);
  }
  pts.push(`L${W},${H}Z`);
  return pts.join('');
}
function island(cx: number, cy: number, w: number, seed: number): string {
  const r = rng(seed), top: string[] = [], bot: string[] = [];
  const n = 9;
  for (let i = 0; i <= n; i++) { const f = i / n; top.push(`${(cx - w / 2 + w * f).toFixed(1)},${(cy - Math.sin(f * Math.PI) * w * 0.07 + (r() - 0.5) * w * 0.025).toFixed(1)}`); }
  for (let i = n; i >= 0; i--) { const f = i / n, d = Math.sin(f * Math.PI); bot.push(`${(cx - w / 2 + w * f + (r() - 0.5) * w * 0.05).toFixed(1)},${(cy + d * w * (0.08 + r() * 0.2)).toFixed(1)}`); }
  return 'M' + top.join('L') + 'L' + bot.join('L') + 'Z';
}

export function mountHero(host: HTMLElement, alive: () => boolean) {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const rg = rng(7);
  // --- ridges ---
  const ridgeDefs = [
    { seed: 11, base: 520, amp: 70, sc: 210, c: '#7F77BC', o: 0.5, d: 6, sp: 0 },
    { seed: 23, base: 585, amp: 80, sc: 160, c: '#6a5f9e', o: 0.8, d: 11, sp: 90 },
    { seed: 37, base: 650, amp: 70, sc: 190, c: '#534158', o: 1, d: 18, sp: 0 },
    { seed: 41, base: 725, amp: 60, sc: 140, c: '#3a2b44', o: 1, d: 28, sp: 40 },
    { seed: 59, base: 800, amp: 38, sc: 230, c: '#1d1523', o: 1, d: 42, sp: 0 },
  ];
  const ridges = ridgeDefs.map((r, i) => `<svg class="hz hz-r r${i}" data-d="${r.d}" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMax slice"><defs><linearGradient id="rg${i}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${mixHex(r.c, '#D57D6B', i < 2 ? 0.34 : 0.12)}"/><stop offset=".55" stop-color="${r.c}"/><stop offset="1" stop-color="${mixHex(r.c, '#150f1a', 0.6)}"/></linearGradient></defs><path d="${ridgePath(r.seed, r.base, r.amp, r.sc, r.sp)}" fill="url(#rg${i})" opacity="${r.o}"/></svg>`);
  // torres lejanas sobre la 2ª cordillera
  const spires = `<svg class="hz hz-t" data-d="9" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMax slice"><g fill="#4a3b5c" opacity=".92">
    <path d="M918,610 v-92 l9,-34 l9,34 v92z M941,610 v-60 l7,-22 l7,22 v60z M900,610 v-44 l6,-16 l6,16 v44z"/>
    <path d="M1010,606 v-120 l5,-60 l5,60 v120z M1003,606 v-40 h30 v40z M1030,606 v-70 l6,-18 l6,18 v70z"/></g>
    <g fill="#D57D6B" opacity=".9"><rect x="925" y="520" width="3" height="7" rx="1"/><rect x="1014" y="470" width="2.5" height="6" rx="1"/><rect x="1035" y="560" width="2.5" height="6" rx="1"/></g></svg>`;
  // islas flotantes
  const isl = [
    { x: 1010, y: 330, w: 190, s: 3, d: 14, f: 9 }, { x: 1250, y: 150, w: 300, s: 5, d: 20, f: 12 }, { x: 1480, y: 400, w: 150, s: 8, d: 26, f: 8 },
  ].map((o, i) => `<svg class="hz hz-i i${i}" data-d="${o.d}" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice" style="--f:${o.f}s"><g class="fl"><defs><linearGradient id="ig${i}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6a5f9e"/><stop offset="1" stop-color="#2a1d33"/></linearGradient></defs>
    <path d="${island(o.x, o.y, o.w, o.s)}" fill="url(#ig${i})" stroke="#C8D1ED" stroke-opacity=".22" stroke-width="1.2"/>
    <path d="M${o.x - o.w * 0.4},${o.y - o.w * 0.035} q${o.w * 0.4},${-o.w * 0.07} ${o.w * 0.8},0" fill="none" stroke="#C8D1ED" stroke-opacity=".55" stroke-width="1.4"/>
    <path d="M${o.x + o.w * 0.12},${o.y - o.w * 0.02} l${o.w * 0.03},${-o.w * 0.17} l${o.w * 0.03},${o.w * 0.17}z" fill="#D57D6B" opacity=".95"/>
    <ellipse cx="${o.x + o.w * 0.135}" cy="${o.y - o.w * 0.05}" rx="${o.w * 0.12}" ry="${o.w * 0.12}" fill="#D57D6B" opacity=".22" class="cg"/></g></svg>`).join('');
  // sigilo lunar con anillos rúnicos y la grieta
  const tick = Array.from({ length: 72 }, (_, i) => { const a = i / 72 * 6.2832, l = i % 6 === 0 ? 16 : 7; return `<line x1="${(300 + Math.cos(a) * 286).toFixed(1)}" y1="${(300 + Math.sin(a) * 286).toFixed(1)}" x2="${(300 + Math.cos(a) * (286 - l)).toFixed(1)}" y2="${(300 + Math.sin(a) * (286 - l)).toFixed(1)}"/>`; }).join('');
  const sigil = `<div class="hz hz-s" data-d="4"><svg viewBox="0 0 600 600"><defs>
    <radialGradient id="mn" cx="38%" cy="34%" r="75%"><stop offset="0" stop-color="#eef0fb"/><stop offset=".45" stop-color="#C8D1ED"/><stop offset=".8" stop-color="#9A7AD4"/><stop offset="1" stop-color="#534158"/></radialGradient>
    <radialGradient id="sh" cx="30%" cy="28%" r="85%"><stop offset=".5" stop-color="#534158" stop-opacity="0"/><stop offset="1" stop-color="#2a1d33" stop-opacity=".78"/></radialGradient><path id="rp" d="M300,300 m-262,0 a262,262 0 1,1 524,0 a262,262 0 1,1 -524,0"/></defs>
    <circle cx="300" cy="300" r="150" fill="url(#mn)"/><circle cx="300" cy="300" r="150" fill="url(#sh)"/><g fill="#9A7AD4" opacity=".22"><circle cx="262" cy="262" r="17"/><circle cx="340" cy="352" r="24"/><circle cx="246" cy="338" r="10"/><circle cx="352" cy="262" r="8"/></g><circle cx="300" cy="300" r="150" fill="none" stroke="#eef0fb" stroke-opacity=".4" stroke-width="1.5"/>
    <path class="crack" d="M318,150 l-14,38 l16,26 l-20,34 l18,30 l-16,32 l14,40" fill="none" stroke="#D57D6B" stroke-width="3.2" stroke-linejoin="round"/>
    <path d="M318,150 l-14,38 l16,26 l-20,34 l18,30 l-16,32 l14,40" fill="none" stroke="#fff3ee" stroke-opacity=".7" stroke-width="1"/>
    <g class="ring a"><circle cx="300" cy="300" r="190" fill="none" stroke="#C8D1ED" stroke-opacity=".5" stroke-width="1"/><circle cx="300" cy="300" r="196" fill="none" stroke="#9A7AD4" stroke-opacity=".6" stroke-width="3" stroke-dasharray="2 14"/></g>
    <g class="ring b"><g stroke="#C8D1ED" stroke-opacity=".55" stroke-width="1.2">${tick}</g><circle cx="300" cy="300" r="286" fill="none" stroke="#C8D1ED" stroke-opacity=".35"/></g>
    <g class="ring c"><text font-family="Cinzel,serif" font-size="17" letter-spacing="9" fill="#D57D6B" fill-opacity=".85"><textPath href="#rp">ᚠ ᚢ ᚦ ᚨ ᚱ ᚲ ᚷ ᚹ ᚺ ᚾ ᛁ ᛃ ᛇ ᛈ ᛉ ᛊ ᛏ ᛒ ᛖ ᛗ ᛚ ᛜ ᛞ ᛟ ᚠ ᚢ ᚦ ᚨ ᚱ</textPath></text></g></svg></div>`;
  host.innerHTML = `<div class="hz-sky"></div><div class="hz hz-img" data-d="3"></div>${sigil}<div class="hz hz-au" data-d="5"><i class="a1"></i><i class="a2"></i><i class="a3"></i></div><canvas class="hz-cv"></canvas>${isl}${ridges.slice(0, 2).join('')}${spires}${ridges.slice(2)}<div class="hz-mist m1"></div><div class="hz-mist m2"></div><div class="hz-vig"></div>`;
  const imgEl = host.querySelector<HTMLElement>('.hz-img')!;
  const im = new Image(); im.onload = () => { imgEl.style.backgroundImage = `url(${im.src})`; host.classList.add('has-img'); }; im.src = `${import.meta.env.BASE_URL}img/hero.webp`;
  void rg;

  const layers = Array.from(host.querySelectorAll<HTMLElement>('.hz[data-d]'));
  const cv = host.querySelector<HTMLCanvasElement>('.hz-cv')!, g = cv.getContext('2d')!;
  let cw = 0, ch = 0;
  const size = () => { const r = host.getBoundingClientRect(), dpr = Math.min(devicePixelRatio || 1, 1.5); cw = r.width; ch = r.height; cv.width = Math.round(cw * dpr); cv.height = Math.round(ch * dpr); g.setTransform(dpr, 0, 0, dpr, 0, 0); };
  size(); addEventListener('resize', size);
  if (reduce) return;
  type S = { x: number; y: number; r: number; a: number; p: number };
  type M = { x: number; y: number; vy: number; ph: number; sw: number; r: number; c: string; a: number };
  const r2 = rng(99);
  const stars: S[] = Array.from({ length: 170 }, () => ({ x: r2(), y: r2() * 0.62, r: r2() * 1.3 + 0.25, a: r2() * 0.7 + 0.25, p: r2() * 6.3 }));
  const cols = ['#C8D1ED', '#9A7AD4', '#D57D6B', '#F3D2C9'];
  const motes: M[] = Array.from({ length: innerWidth < 800 ? 36 : 80 }, () => ({ x: r2(), y: r2(), vy: r2() * 0.05 + 0.015, ph: r2() * 6.3, sw: r2() * 0.03 + 0.01, r: r2() * 2.2 + 0.7, c: cols[Math.floor(r2() * cols.length)], a: r2() * 0.6 + 0.3 }));
  let shoot: { x: number; y: number; l: number } | null = null, nextShoot = 3;
  let tx = 0, ty = 0, mx = 0, my = 0, t = 0, last = performance.now(), lastMove = -1e9;
  const onMove = (e: PointerEvent) => { tx = (e.clientX / innerWidth - 0.5) * 2; ty = (e.clientY / innerHeight - 0.5) * 2; lastMove = performance.now(); };
  document.addEventListener('pointermove', onMove);
  const frame = (now: number) => {
    if (!alive()) { removeEventListener('resize', size); document.removeEventListener('pointermove', onMove); return; }
    requestAnimationFrame(frame);
    if (document.hidden) { last = now; return; }
    const dt = Math.min(0.05, (now - last) / 1000); last = now; t += dt;
    if (now - lastMove > 4000) { tx = Math.sin(t * 0.18) * 0.6; ty = Math.cos(t * 0.15) * 0.25; }
    const k = Math.min(1, dt * 2.4); mx += (tx - mx) * k; my += (ty - my) * k;
    for (const l of layers) { const d = +l.dataset.d!; l.style.transform = `translate3d(${(-mx * d).toFixed(1)}px,${(-my * d * 0.55).toFixed(1)}px,0)`; }
    g.clearRect(0, 0, cw, ch);
    for (const s of stars) { const a = s.a * (0.55 + Math.sin(t * 1.6 + s.p) * 0.45); g.globalAlpha = a; g.fillStyle = '#eef0fb'; g.beginPath(); g.arc(s.x * cw - mx * 3, s.y * ch - my * 2, s.r, 0, 6.283); g.fill(); }
    nextShoot -= dt;
    if (nextShoot < 0 && !shoot) { shoot = { x: 0.2 + Math.random() * 0.6, y: 0.04 + Math.random() * 0.2, l: 0 }; nextShoot = 6 + Math.random() * 8; }
    if (shoot) { shoot.l += dt * 1.6; const f = shoot.l, x = shoot.x * cw + f * 260, y = shoot.y * ch + f * 110; const gr = g.createLinearGradient(x, y, x - 120, y - 52); gr.addColorStop(0, 'rgba(238,240,251,.9)'); gr.addColorStop(1, 'rgba(238,240,251,0)'); g.globalAlpha = Math.sin(Math.min(f, 1) * Math.PI); g.strokeStyle = gr; g.lineWidth = 1.6; g.beginPath(); g.moveTo(x, y); g.lineTo(x - 120, y - 52); g.stroke(); if (f > 1) shoot = null; }
    g.globalCompositeOperation = 'lighter';
    for (const m of motes) {
      m.y -= m.vy * dt; m.x += Math.sin(t * 0.6 + m.ph) * m.sw * dt; if (m.y < -0.03) { m.y = 1.03; m.x = Math.random(); }
      const px = m.x * cw - mx * 14, py = m.y * ch - my * 8, tw = 0.55 + Math.sin(t * 2 + m.ph) * 0.45, rr = m.r * 5;
      const gr = g.createRadialGradient(px, py, 0, px, py, rr); gr.addColorStop(0, m.c); gr.addColorStop(1, 'rgba(0,0,0,0)');
      g.globalAlpha = m.a * tw * 0.8; g.fillStyle = gr; g.beginPath(); g.arc(px, py, rr, 0, 6.283); g.fill();
    }
    g.globalCompositeOperation = 'source-over'; g.globalAlpha = 1;
  };
  requestAnimationFrame(frame);
}
