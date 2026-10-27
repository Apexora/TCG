// Escena viva del menú principal: personajes en formación con flotación, aura, parallax, brasas y rayos (Solara).
import './menuscene.css';

interface Ch { id: string; file: string; gr: string; fd: number; del: number; d: number }
const CH: Ch[] = [
  { id: 'pluma', file: 'plumarquias', gr: '127,208,255', fd: 7.5, del: 0.15, d: 8 },
  { id: 'doria', file: 'dorianus', gr: '154,107,255', fd: 6.2, del: 0.3, d: 14 },
  { id: 'lurim', file: 'lurim', gr: '255,176,64', fd: 8, del: 0.45, d: 20 },
  { id: 'nefri', file: 'nefri', gr: '43,242,176', fd: 5.6, del: 0.6, d: 30 },
  { id: 'solara', file: 'solara', gr: '95,240,255', fd: 6.8, del: 0.75, d: 34 },
];
interface Em { id: string; x0: number; x1: number; y0: number; y1: number; rate: number; up: number; sz: number; sway: number }
const EM: Em[] = [
  { id: 'lurim', x0: 0.1, x1: 0.9, y0: 0.3, y1: 0.95, rate: 13, up: 46, sz: 1.8, sway: 16 },
  { id: 'nefri', x0: 0.15, x1: 0.85, y0: 0.5, y1: 1, rate: 9, up: 26, sz: 2.1, sway: 22 },
  { id: 'pluma', x0: 0, x1: 1, y0: 0.15, y1: 0.8, rate: 9, up: 18, sz: 1.7, sway: 34 },
  { id: 'doria', x0: 0.05, x1: 0.95, y0: 0.1, y1: 0.9, rate: 9, up: 30, sz: 1.6, sway: 20 },
  { id: 'solara', x0: 0.1, x1: 0.9, y0: 0.2, y1: 0.95, rate: 12, up: 38, sz: 1.7, sway: 18 },
];
interface P { x: number; y: number; vy: number; ph: number; sw: number; life: number; max: number; sz: number; c: string }
interface B { pts: [number, number][]; life: number; max: number }

export function mountMenuScene(host: HTMLElement, alive: () => boolean): { pulse: () => void } {
  host.innerHTML = '<div class="st-rays"></div><div class="st-halo"></div><div class="st-fog a"></div><div class="st-fog b"></div>'
    + CH.map(c => `<figure class="ch c-${c.id}" style="--gr:${c.gr};--fd:${c.fd}s;--del:${c.del}s"><div class="ent"><div class="flt"><i class="glow"></i><img src="${import.meta.env.BASE_URL}img/menu/${c.file}.webp?v=${__IMG_V__}" alt="" draggable="false"></div></div></figure>`).join('')
    + '<div class="st-flash"></div><canvas class="st-fx"></canvas>';
  const figs = CH.map(c => host.querySelector<HTMLElement>('.c-' + c.id)!);
  const cv = host.querySelector<HTMLCanvasElement>('.st-fx')!;
  const g = cv.getContext('2d')!;
  const pulse = () => { host.classList.remove('pulse'); void host.offsetWidth; host.classList.add('pulse'); };
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return { pulse };

  let W = 0, H = 0;
  const size = () => { const r = host.getBoundingClientRect(), dpr = Math.min(window.devicePixelRatio || 1, 1.5); W = r.width; H = r.height; cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr); g.setTransform(dpr, 0, 0, dpr, 0, 0); };
  size();
  let tx = 0, ty = 0, mx = 0, my = 0, lastMove = -1e9;
  const onMove = (e: PointerEvent) => { tx = (e.clientX / window.innerWidth - 0.5) * 2; ty = (e.clientY / window.innerHeight - 0.5) * 2; lastMove = performance.now(); };
  window.addEventListener('resize', size); document.addEventListener('pointermove', onMove);

  const ps: P[] = [], bolts: B[] = [];
  const acc: number[] = EM.map(() => 0);
  let accDust = 0, nextBolt = 1.6, t = 0, last = performance.now();
  const rnd = (a: number, b: number) => a + Math.random() * (b - a);
  const colOf = (id: string) => CH.filter(c => c.id === id)[0].gr;
  const mkBolt = (x: number, y: number, s: number, side: number): B => {
    const len = rnd(90, 220) * s, a = (side < 0 ? Math.PI : 0) + rnd(-0.6, 0.9) * (side < 0 ? -1 : 1);
    const pts: [number, number][] = [[x, y]];
    for (let i = 1; i <= 7; i++) { const f = i / 7; pts.push([x + Math.cos(a) * len * f + rnd(-13, 13) * s, y + Math.sin(a) * len * f + rnd(-13, 13) * s + f * f * 30 * s]); }
    return { pts, life: 0, max: rnd(0.12, 0.22) };
  };

  const frame = (now: number) => {
    if (!alive()) { window.removeEventListener('resize', size); document.removeEventListener('pointermove', onMove); return; }
    const dt = Math.min(0.05, (now - last) / 1000); last = now; t += dt;
    const hr = host.getBoundingClientRect(), rc = figs.map(f => f.getBoundingClientRect());
    // parallax: ratón; en reposo, un vaivén suave automático
    if (now - lastMove > 4000) { tx = Math.sin(t * 0.25) * 0.7; ty = Math.cos(t * 0.2) * 0.3; }
    const k = Math.min(1, dt * 3); mx += (tx - mx) * k; my += (ty - my) * k;
    figs.forEach((f, i) => { f.style.transform = `translate3d(${(-mx * CH[i].d).toFixed(1)}px,${(-my * CH[i].d * 0.45).toFixed(1)}px,0)`; });

    // brasas / motas de cada personaje
    EM.forEach((e, i) => {
      const ci = CH.findIndex(c => c.id === e.id), r = rc[ci]; acc[i] += e.rate * dt;
      while (acc[i] >= 1 && ps.length < 280) {
        acc[i] -= 1;
        ps.push({ x: r.left - hr.left + r.width * rnd(e.x0, e.x1), y: r.top - hr.top + r.height * rnd(e.y0, e.y1), vy: -rnd(0.5, 1.2) * e.up, ph: rnd(0, 6.28), sw: e.sway * rnd(0.5, 1), life: 0, max: rnd(2.2, 4.6), sz: e.sz * rnd(0.6, 1.4), c: colOf(e.id) });
      }
      if (acc[i] > 1) acc[i] = 0;
    });
    accDust += 6 * dt;
    while (accDust >= 1 && ps.length < 280) { accDust -= 1; ps.push({ x: rnd(0, W), y: H + 10, vy: -rnd(14, 34), ph: rnd(0, 6.28), sw: 30, life: 0, max: rnd(5, 9), sz: rnd(1, 2.4), c: '190,150,255' }); }
    if (accDust > 1) accDust = 0;

    // rayos de Solara
    nextBolt -= dt;
    if (nextBolt <= 0) {
      nextBolt = rnd(0.9, 2.6);
      const r = rc[CH.findIndex(c => c.id === 'solara')], s = r.height / 900, n = Math.random() < 0.4 ? 2 : 1;
      for (let q = 0; q < n; q++) { const side = Math.random() < 0.5 ? -1 : 1; bolts.push(mkBolt(r.left - hr.left + r.width * (side < 0 ? 0.13 : 0.88), r.top - hr.top + r.height * (side < 0 ? 0.32 : 0.35), s, side)); }
    }

    g.clearRect(0, 0, W, H); g.globalCompositeOperation = 'lighter';
    for (let i = ps.length - 1; i >= 0; i--) {
      const p = ps[i]; p.life += dt;
      if (p.life >= p.max) { ps.splice(i, 1); continue; }
      p.y += p.vy * dt; p.x += Math.sin(t * 1.4 + p.ph) * p.sw * dt;
      const a = Math.sin(Math.PI * (p.life / p.max));
      g.fillStyle = `rgb(${p.c})`;
      g.globalAlpha = a * 0.28; g.beginPath(); g.arc(p.x, p.y, p.sz * 3.2, 0, 6.283); g.fill();
      g.globalAlpha = a * 0.9; g.beginPath(); g.arc(p.x, p.y, p.sz, 0, 6.283); g.fill();
    }
    for (let i = bolts.length - 1; i >= 0; i--) {
      const b = bolts[i]; b.life += dt;
      if (b.life >= b.max) { bolts.splice(i, 1); continue; }
      const a = (1 - b.life / b.max) * rnd(0.6, 1);
      g.globalAlpha = 1; g.lineJoin = 'round'; g.shadowColor = '#4fe8ff'; g.shadowBlur = 16;
      for (let pass = 0; pass < 2; pass++) {
        g.strokeStyle = pass ? `rgba(255,255,255,${a})` : `rgba(120,240,255,${a})`; g.lineWidth = pass ? 1 : 2.4;
        g.beginPath(); b.pts.forEach((q, j) => { if (j) g.lineTo(q[0], q[1]); else g.moveTo(q[0], q[1]); }); g.stroke();
      }
      g.shadowBlur = 0;
    }
    g.globalAlpha = 1; g.globalCompositeOperation = 'source-over';
    requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);
  return { pulse };
}
