// Motor de audio v3.1: sintetizado en tiempo real, sin archivos. Cadena: EQ → compresor → master, con reverb de sala oscura (IR generada),
// eco con filtro, panorama estéreo, campanas FM, arpas, gongs, tambores, saturación, y música ambiental generativa que reacciona a la tensión.
// Para usar tus propios audios: public/sfx/<nombre>.mp3 (click hover select pass summon summon_lum summon_umb spell_lum spell_umb attack hurt heal death round win lose msg start)
let ctx: AudioContext, sfxBus: GainNode, musicBus: GainNode, master: GainNode, drive: WaveShaperNode, booted = false;
let muted = false, musicOn = false, tension = 0, tensionNow = 0, timer = 0, windStop: (() => void) | null = null, barIdx = 0, nextBar = 0;
try { muted = localStorage.getItem('cartas-mute') === '1'; } catch { /* sin almacenamiento */ }
export const isMuted = () => muted;
export function toggleMute(): boolean {
  muted = !muted; try { localStorage.setItem('cartas-mute', muted ? '1' : '0'); } catch { /* */ }
  if (booted) master.gain.setTargetAtTime(muted ? 0 : 0.85, ctx.currentTime, 0.06);
  return muted;
}
/** 0 = calma, 1 = combate/pila: la música añade pulso y brillo. */
export function setTension(v: number) { tension = v; }
/** Duelo contra un jefe final: música más grave y amenazante (latido constante, bajo continuo y tensión mínima alta). */
let boss = false;
export function setBoss(on: boolean) { boss = on; }
const mf = (n: number) => 440 * Math.pow(2, (n - 69) / 12);
const rnd = (a: number, b: number) => a + Math.random() * (b - a);

function makeIR(sec: number): AudioBuffer {
  const sr = ctx.sampleRate, n = Math.floor(sr * sec), ir = ctx.createBuffer(2, n, sr);
  for (let c = 0; c < 2; c++) {
    const d = ir.getChannelData(c); let lp = 0;
    for (let i = 0; i < n; i++) {
      const t = i / n, coef = 0.9 - 0.78 * t;                                  // la cola se va oscureciendo
      lp += ((Math.random() * 2 - 1) - lp) * coef;
      d[i] = i < sr * 0.018 ? 0 : lp * Math.pow(1 - t, 2.8) * (i < sr * 0.02 ? 0.2 : 1);
    }
    for (const [ms, g] of [[23, .5], [37, .35], [53, .3], [71, .22]] as const) d[Math.floor(sr * (ms + c * 5) / 1000)] += g * (c ? -1 : 1); // primeras reflexiones
  }
  return ir;
}
function boot() {
  if (booted) { if (ctx.state === 'suspended') void ctx.resume(); return; }
  ctx = new AudioContext(); booted = true;
  const comp = ctx.createDynamicsCompressor(); comp.threshold.value = -20; comp.knee.value = 18; comp.ratio.value = 3.5; comp.attack.value = 0.004; comp.release.value = 0.22;
  const lo = ctx.createBiquadFilter(); lo.type = 'lowshelf'; lo.frequency.value = 140; lo.gain.value = 2.5;
  const hi = ctx.createBiquadFilter(); hi.type = 'highshelf'; hi.frequency.value = 6500; hi.gain.value = 1.5;
  master = ctx.createGain(); master.gain.value = muted ? 0 : 0.85;
  const dry = ctx.createGain(); dry.connect(lo).connect(hi).connect(comp).connect(master).connect(ctx.destination);
  const conv = ctx.createConvolver(); conv.buffer = makeIR(3.2); const rv = ctx.createGain(); rv.gain.value = 0.9; conv.connect(rv).connect(dry);
  const dl = ctx.createDelay(1); dl.delayTime.value = 0.375; const fb = ctx.createGain(); fb.gain.value = 0.4;
  const fl = ctx.createBiquadFilter(); fl.type = 'lowpass'; fl.frequency.value = 2200; dl.connect(fl).connect(fb).connect(dl); fl.connect(dry); fl.connect(conv);
  sfxBus = ctx.createGain(); musicBus = ctx.createGain(); musicBus.gain.value = 0.55;
  const send = (src: AudioNode, rev: number, del: number) => { src.connect(dry); const r = ctx.createGain(); r.gain.value = rev; src.connect(r).connect(conv); if (del) { const d = ctx.createGain(); d.gain.value = del; src.connect(d).connect(dl); } };
  send(sfxBus, 0.32, 0.06); send(musicBus, 0.6, 0.22);
  drive = ctx.createWaveShaper(); const k = new Float32Array(1024); for (let i = 0; i < 1024; i++) { const x = i / 512 - 1; k[i] = Math.tanh(x * 4) * 0.8; } drive.curve = k; drive.oversample = '2x'; drive.connect(sfxBus);
}
interface V { type?: OscillatorType; vol?: number; att?: number; rel?: number; lp?: number; lpEnd?: number; q?: number; det?: number; pan?: number; bus?: AudioNode; slide?: number; pad?: boolean; vib?: number }
function voice(f: number, t: number, dur: number, o: V = {}) {
  const g = ctx.createGain(), fl = ctx.createBiquadFilter(), pn = ctx.createStereoPanner(), v = (o.vol ?? 0.1) * (o.det ? 0.6 : 1), att = o.att ?? 0.004;
  fl.type = 'lowpass'; fl.Q.value = o.q ?? 0.7; fl.frequency.setValueAtTime(o.lp ?? 9000, t); if (o.lpEnd) fl.frequency.exponentialRampToValueAtTime(Math.max(40, o.lpEnd), t + dur);
  pn.pan.value = o.pan ?? 0; g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(v, t + att);
  if (o.pad) { const rel = o.rel ?? dur * 0.4; g.gain.setValueAtTime(v, t + Math.max(att, dur - rel)); g.gain.linearRampToValueAtTime(0.0001, t + dur); } else g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  fl.connect(g).connect(pn).connect(o.bus ?? sfxBus);
  for (const d of o.det ? [-o.det, o.det] : [0]) {
    const osc = ctx.createOscillator(); osc.type = o.type ?? 'sine'; osc.frequency.setValueAtTime(f, t); osc.detune.value = d;
    if (o.slide) osc.frequency.exponentialRampToValueAtTime(Math.max(20, f * Math.pow(2, o.slide / 12)), t + dur);
    if (o.vib) { const l = ctx.createOscillator(), lg = ctx.createGain(); l.frequency.value = 5; lg.gain.value = o.vib; l.connect(lg).connect(osc.detune); l.start(t); l.stop(t + dur + 0.1); }
    osc.connect(fl); osc.start(t); osc.stop(t + dur + 0.1);
  }
}
function fm(f: number, t: number, dur: number, o: { ratio?: number; idx?: number; vol?: number; pan?: number; bus?: AudioNode; att?: number } = {}) {
  const car = ctx.createOscillator(), mod = ctx.createOscillator(), mg = ctx.createGain(), g = ctx.createGain(), pn = ctx.createStereoPanner(), idx = (o.idx ?? 2) * f;
  car.frequency.value = f; mod.frequency.value = f * (o.ratio ?? 2.01); mg.gain.setValueAtTime(idx, t); mg.gain.exponentialRampToValueAtTime(Math.max(1, idx * 0.02), t + dur);
  mod.connect(mg).connect(car.frequency); g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(o.vol ?? 0.1, t + (o.att ?? 0.003)); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  pn.pan.value = o.pan ?? 0; car.connect(g).connect(pn).connect(o.bus ?? sfxBus); car.start(t); mod.start(t); car.stop(t + dur + 0.1); mod.stop(t + dur + 0.1);
}
let nbuf: AudioBuffer;
function noiseBuf() {
  if (nbuf) return nbuf; nbuf = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate); const d = nbuf.getChannelData(0); let b0 = 0, b1 = 0, b2 = 0;
  for (let i = 0; i < d.length; i++) { const w = Math.random() * 2 - 1; b0 = 0.99765 * b0 + w * 0.099; b1 = 0.963 * b1 + w * 0.2965; b2 = 0.57 * b2 + w * 1.0527; d[i] = (b0 + b1 + b2 + w * 0.1848) * 0.2; }
  return nbuf;
}
function noise(t: number, dur: number, o: { vol?: number; type?: BiquadFilterType; f0?: number; f1?: number; q?: number; pan?: number; bus?: AudioNode; att?: number } = {}) {
  const s = ctx.createBufferSource(), fl = ctx.createBiquadFilter(), g = ctx.createGain(), pn = ctx.createStereoPanner(), att = o.att ?? 0.004;
  s.buffer = noiseBuf(); fl.type = o.type ?? 'bandpass'; fl.Q.value = o.q ?? 1; fl.frequency.setValueAtTime(o.f0 ?? 1000, t); fl.frequency.exponentialRampToValueAtTime(Math.max(30, o.f1 ?? o.f0 ?? 1000), t + dur);
  g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(o.vol ?? 0.1, t + att); g.gain.exponentialRampToValueAtTime(0.0001, t + dur); pn.pan.value = o.pan ?? 0;
  s.connect(fl).connect(g).connect(pn).connect(o.bus ?? sfxBus); s.start(t, Math.random() * 1.4); s.stop(t + dur + 0.05);
}
function tom(t: number, f: number, vol: number, bus?: AudioNode) {
  const o = ctx.createOscillator(), g = ctx.createGain(); o.frequency.setValueAtTime(f * 2.2, t); o.frequency.exponentialRampToValueAtTime(f, t + 0.09);
  g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.7); o.connect(g).connect(bus ?? sfxBus); o.start(t); o.stop(t + 0.75);
  noise(t, 0.06, { type: 'lowpass', f0: 1200, f1: 300, vol: vol * 0.5, bus });
}
const T0 = () => ctx.currentTime + 0.01;
const R: Record<string, () => void> = {
  hover: () => fm(mf(96), T0(), 0.09, { vol: 0.02, ratio: 3.5, idx: 0.8, pan: rnd(-0.3, 0.3) }),
  click: () => { const t = T0(); noise(t, 0.06, { f0: 2200, f1: 900, q: 2, vol: 0.12 }); voice(220, t, 0.1, { vol: 0.14, slide: -7 }); },
  select: () => { const t = T0(); fm(mf(84), t, 0.5, { vol: 0.07, ratio: 2, idx: 1.2, pan: -0.15 }); fm(mf(91), t + 0.06, 0.6, { vol: 0.05, ratio: 2, idx: 1, pan: 0.15 }); },
  start: () => { const t = T0();
    [38, 45, 50, 57, 62, 65].forEach((n, k) => voice(mf(n), t, 2.4, { type: 'sawtooth', vol: 0.035, att: 1, pad: true, rel: 1.2, lp: 300, lpEnd: 3200, det: 9, pan: (k - 2.5) * 0.15 }));
    noise(t, 1.3, { f0: 300, f1: 7000, q: 0.8, vol: 0.13, att: 1.15 }); tom(t, 40, 0.5);
    const h = t + 1.25; tom(h, 48, 1); [62, 65, 69, 74, 81].forEach((n, k) => voice(mf(n), h, 2.6, { type: 'triangle', vol: 0.06, lp: 4000, pan: (k - 2) * 0.25 })); fm(mf(86), h, 3, { vol: 0.09, ratio: 1.5, idx: 2 }); },
  pass: () => { const t = T0(); noise(t, 0.35, { f0: 600, f1: 200, q: 1.2, vol: 0.09, att: 0.08 }); voice(mf(50), t, 0.3, { vol: 0.08, slide: -5 }); },
  summon: () => { const t = T0(); tom(t, 48, 0.9); noise(t, 0.5, { type: 'lowpass', f0: 3000, f1: 150, q: 0.7, vol: 0.25 });
    [81, 86, 90, 93].forEach((n, k) => fm(mf(n), t + 0.05 + k * 0.05, 1.2, { vol: 0.05, ratio: 3, idx: 1.5, pan: (k - 1.5) * 0.3 })); voice(mf(38), t, 0.9, { type: 'sawtooth', vol: 0.08, lp: 1500, lpEnd: 150, det: 12, att: 0.02 }); },
  // Invocación de unidades (no hechizos): Luminarae = golpe grave + ascenso radiante; Umbra = caída sub-grave + rugido oscuro
  summon_lum: () => { const t = T0(); tom(t, 52, 0.85);
    noise(t, 0.75, { type: 'bandpass', f0: 400, f1: 6500, q: 0.8, vol: 0.12, att: 0.4 });
    voice(mf(45), t + 0.12, 1.3, { type: 'triangle', vol: 0.11, lp: 1800, att: 0.03 });
    [69, 73, 76, 81, 85].forEach((n, k) => fm(mf(n), t + 0.2 + k * 0.06, 1.7, { vol: 0.06, ratio: 2, idx: 1.4, pan: (k - 2) * 0.25 }));
    fm(mf(93), t + 0.45, 2.2, { vol: 0.045, ratio: 3.01, idx: 1 }); },
  summon_umb: () => { const t = T0();
    voice(mf(33), t, 1.4, { type: 'sawtooth', vol: 0.16, slide: -9, lp: 1800, lpEnd: 90, det: 14, att: 0.02 }); tom(t, 40, 1);
    noise(t, 0.9, { type: 'lowpass', f0: 2200, f1: 90, q: 0.7, vol: 0.22 });
    noise(t + 0.1, 0.8, { type: 'bandpass', f0: 300, f1: 1500, q: 2, vol: 0.08, att: 0.3 });
    fm(mf(58), t + 0.05, 1.9, { vol: 0.06, ratio: 1.41, idx: 3 }); fm(mf(65), t + 0.12, 1.7, { vol: 0.05, ratio: 1.41, idx: 2.5, pan: 0.3 }); },
  spell_lum: () => { const t = T0();
    [74, 76, 78, 81, 83, 86, 90].forEach((n, k) => voice(mf(n), t + k * 0.055, 1.3, { type: 'triangle', vol: 0.07, pan: -0.5 + k * 0.16 }));
    fm(mf(93), t + 0.4, 2.2, { vol: 0.06, ratio: 2.76, idx: 1 }); noise(t, 1.2, { type: 'highpass', f0: 5000, f1: 9000, vol: 0.05, att: 0.5 }); },
  spell_umb: () => { const t = T0();
    voice(mf(50), t, 1.4, { type: 'sawtooth', vol: 0.12, slide: -12, lp: 2400, lpEnd: 100, det: 15 }); voice(mf(25), t, 1.6, { vol: 0.35, att: 0.05 });
    noise(t, 1.2, { type: 'lowpass', f0: 200, f1: 2600, vol: 0.18, att: 0.9 }); fm(mf(63), t + 0.2, 2, { ratio: 1.414, idx: 3, vol: 0.06, pan: -0.3 }); fm(mf(57), t + 0.2, 2, { ratio: 1.414, idx: 3, vol: 0.05, pan: 0.3 }); },
  attack: () => { const t = T0(), h = t + 0.2;
    noise(t, 0.22, { f0: 800, f1: 7000, q: 1.5, vol: 0.18, att: 0.12 }); fm(mf(88), h, 0.7, { ratio: 3.1, idx: 3, vol: 0.09 }); fm(mf(95), h, 0.5, { ratio: 4.7, idx: 2, vol: 0.05 }); tom(h, 70, 0.5); noise(h, 0.12, { type: 'highpass', f0: 3000, f1: 1500, vol: 0.15 }); },
  hurt: () => { const t = T0(); tom(t, 45, 1); voice(mf(40), t, 0.5, { type: 'sawtooth', vol: 0.18, lp: 1200, lpEnd: 120, bus: drive }); noise(t, 0.35, { type: 'lowpass', f0: 2500, f1: 100, vol: 0.3 }); fm(mf(79), t + 0.02, 1.2, { ratio: 1.41, idx: 2, vol: 0.04 }); },
  heal: () => { const t = T0(); [74, 78, 81, 86].forEach((n, k) => fm(mf(n), t + k * 0.08, 1.4, { vol: 0.06, ratio: 2, idx: 0.8, pan: -0.3 + k * 0.2 })); [62, 69].forEach(n => voice(mf(n), t, 1.6, { vol: 0.08, att: 0.3, pad: true })); },
  death: () => { const t = T0(); voice(mf(55), t, 1, { type: 'sawtooth', vol: 0.14, slide: -14, lp: 2500, lpEnd: 100, det: 14 }); noise(t, 0.9, { f0: 3000, f1: 150, q: 0.6, vol: 0.16 }); tom(t + 0.05, 42, 0.7); },
  boss: () => { const t = T0(); [1, 1.41, 2.0, 2.83, 4.1].forEach((r, k) => voice(mf(31) * r, t, 4.6 - k * 0.5, { type: 'sawtooth', vol: 0.12 / (k + 1), lp: 900, det: 12, pan: (k % 2 ? 1 : -1) * 0.3 }));
    tom(t, 38, 1); tom(t + 0.5, 34, 0.9); tom(t + 1.1, 30, 1); noise(t, 2.2, { type: 'lowpass', f0: 150, f1: 2800, vol: 0.22, att: 1.6 }); },
  round: () => { const t = T0(); [1, 2.32, 3.17, 4.1, 5.4].forEach((r, k) => voice(mf(43) * r, t, 3.6 - k * 0.4, { vol: 0.09 / (k + 1), pan: (k % 2 ? 1 : -1) * 0.2 })); tom(t, 52, 0.8); noise(t, 0.5, { f0: 500, f1: 3000, vol: 0.06, att: 0.4 }); },
  win: () => { const t = T0(); ([[62, 66, 69, 74], [67, 71, 74, 79], [69, 73, 76, 81, 86]] as number[][]).forEach((ch, i) => { ch.forEach((n, k) => { voice(mf(n), t + i * 0.45, 1.9, { type: 'triangle', vol: 0.055, lp: 5000, pan: (k - 2) * 0.2 }); fm(mf(n + 12), t + i * 0.45 + 0.02 * k, 1.8, { vol: 0.03, ratio: 2, idx: 0.7 }); }); }); tom(t + 0.9, 50, 0.8); },
  lose: () => { const t = T0(); [62, 60, 57, 55, 50].forEach((n, k) => voice(mf(n), t + k * 0.5, 2, { type: 'sawtooth', vol: 0.07, lp: 900, lpEnd: 150, det: 10, att: 0.1 })); voice(mf(26), t, 3, { vol: 0.2, att: 0.4, pad: true }); },
  msg: () => { const t = T0(); fm(mf(93), t, 0.5, { vol: 0.05, ratio: 2, idx: 0.6 }); fm(mf(98), t + 0.08, 0.6, { vol: 0.04, ratio: 2, idx: 0.6 }); },
};
const files = new Map<string, string | null>();
function probe(name: string) {
  if (files.has(name)) return; files.set(name, null);
  fetch(`${import.meta.env.BASE_URL}sfx/${name}.mp3`).then(r => { if (r.ok && (r.headers.get('content-type') || '').startsWith('audio')) files.set(name, r.url); }).catch(() => { /* */ });
}
// ---------- Sonido propio de cada unidad al invocarla ----------
// Piezas pequeñas que se combinan en una receta distinta por carta (tono, timbre y ritmo según su personaje).
const bell = (t: number, ns: number[], gap = 0.07, vol = 0.06, ratio = 2, idx = 1.4) => ns.forEach((n, k) => fm(mf(n), t + k * gap, 1.5, { vol, ratio, idx, pan: (k - (ns.length - 1) / 2) * 0.25 }));
const harp = (t: number, ns: number[], gap = 0.06, vol = 0.07) => ns.forEach((n, k) => voice(mf(n), t + k * gap, 1.1, { type: 'triangle', vol, pan: (k - (ns.length - 1) / 2) * 0.2 }));
const horn = (t: number, n: number, dur = 0.9, vol = 0.1) => voice(mf(n), t, dur, { type: 'sawtooth', vol, lp: 500, lpEnd: 2600, att: 0.12, det: 8 });
const growl = (t: number, n: number, dur = 1, vol = 0.14, slide = -8) => voice(mf(n), t, dur, { type: 'sawtooth', vol, slide, lp: 1800, lpEnd: 90, det: 14, att: 0.02 });
const howl = (t: number, n: number, dur = 1.2, vol = 0.1) => voice(mf(n), t, dur, { type: 'sawtooth', vol, slide: 5, lp: 1500, lpEnd: 600, vib: 25, att: 0.2 });
const choir = (t: number, ns: number[], dur = 1.6, vol = 0.04) => ns.forEach((n, k) => voice(mf(n), t, dur, { type: 'sawtooth', vol, pad: true, att: 0.5, rel: 0.8, lp: 1400, vib: 12, det: 6, pan: (k - (ns.length - 1) / 2) * 0.3 }));
const whoosh = (t: number, f0: number, f1: number, dur = 0.6, vol = 0.12, att = 0.3) => noise(t, dur, { type: 'bandpass', f0, f1, q: 0.9, vol, att });
const hiss = (t: number, dur = 0.5, vol = 0.08) => noise(t, dur, { type: 'highpass', f0: 5000, f1: 9000, vol, att: 0.1 });
const rumble = (t: number, dur = 1, vol = 0.2) => noise(t, dur, { type: 'lowpass', f0: 900, f1: 80, q: 0.7, vol, att: 0.06 });
const clang = (t: number, n: number, vol = 0.07) => { fm(mf(n), t, 1.6, { vol, ratio: 1.41, idx: 3 }); fm(mf(n + 7), t + 0.02, 1.3, { vol: vol * 0.7, ratio: 2.76, idx: 2 }); };
const clicks = (t: number, c: number, gap = 0.05, vol = 0.1) => { for (let i = 0; i < c; i++) noise(t + i * gap, 0.04, { type: 'highpass', f0: 3000, f1: 6000, vol, pan: (i % 2 ? 0.3 : -0.3) }); };
const flutter = (t: number, c: number, gap = 0.05, vol = 0.09) => { for (let i = 0; i < c; i++) noise(t + i * gap, 0.09, { type: 'bandpass', f0: 1500, f1: 600, q: 1, vol, att: 0.02, pan: (i % 2 ? 0.4 : -0.4) }); };
const UNIT: Record<string, (t: number) => void> = {
  // Luminarae
  lum_acolita: t => { bell(t, [84, 88, 91], 0.08, 0.05); harp(t + 0.05, [76, 79], 0.1, 0.05); },
  lum_vigia: t => { horn(t, 57, 0.5, 0.08); bell(t + 0.2, [88], 0.1, 0.05); tom(t, 55, 0.4); },
  lum_centinela: t => { clang(t, 62); clang(t + 0.1, 69, 0.05); tom(t, 50, 0.7); },
  lum_portador: t => { harp(t, [72, 76, 79, 84], 0.07); whoosh(t, 800, 4000, 0.5, 0.08); },
  lum_halcon: t => { whoosh(t, 3000, 800, 0.4, 0.12, 0.05); flutter(t + 0.05, 5, 0.04); bell(t + 0.3, [96], 0.1, 0.05); },
  lum_novicia: t => { choir(t, [69, 72, 76], 1.2); bell(t + 0.2, [81], 0.1, 0.05); },
  lum_sanadora: t => { harp(t, [67, 71, 74, 79, 83], 0.08); choir(t, [67, 74], 1.5); },
  lum_vidente: t => { bell(t, [88, 93, 98], 0.12); whoosh(t, 2000, 6000, 0.7, 0.06, 0.4); },
  lum_oraculo: t => { choir(t, [62, 69, 74], 1.7); bell(t + 0.2, [86, 90], 0.15); hiss(t, 0.6, 0.05); },
  lum_paladin: t => { horn(t, 50, 0.9, 0.12); clang(t + 0.05, 67); flutter(t + 0.1, 6, 0.05, 0.07); },
  lum_heraldo: t => { horn(t, 62, 0.8); horn(t + 0.15, 69, 0.8); bell(t + 0.3, [93], 0.1); },
  lum_coloso: t => { tom(t, 43, 1); clang(t, 38, 0.09); choir(t, [50, 57], 1.6); tom(t + 0.2, 40, 0.7); },
  lum_lider: t => { horn(t, 55, 0.5); horn(t + 0.25, 62, 0.5); horn(t + 0.5, 67, 0.9, 0.12); clang(t + 0.5, 74); tom(t + 0.5, 48, 0.8); },
  lum_serafin: t => { flutter(t, 10, 0.045); choir(t, [74, 81, 86, 93], 2); bell(t + 0.3, [98, 105], 0.15); },
  lum_arcangel: t => { tom(t, 40, 1); horn(t, 45, 1.4, 0.14); choir(t, [57, 64, 69, 76], 2.2); bell(t + 0.4, [93, 100, 105], 0.14); whoosh(t, 500, 7000, 0.9, 0.1, 0.5); },
  // Umbra
  umb_sombra: t => { whoosh(t, 1500, 300, 0.6, 0.12, 0.08); growl(t, 45, 0.7, 0.06, -5); },
  umb_aprendiz: t => { clicks(t, 4, 0.06); growl(t + 0.1, 52, 0.4, 0.08, -4); },
  umb_acechador: t => { hiss(t, 0.35, 0.1); clang(t + 0.05, 86, 0.04); tom(t + 0.05, 48, 0.5); },
  umb_cultista: t => { choir(t, [45, 48, 52], 1.5, 0.05); bell(t + 0.2, [63, 69], 0.2, 0.05, 1.41, 2.5); },
  umb_espectro: t => { whoosh(t, 4000, 500, 0.5, 0.1, 0.05); voice(mf(88), t, 0.7, { vol: 0.06, slide: -14, vib: 30 }); },
  umb_esqueleto: t => { clicks(t, 8, 0.04, 0.12); tom(t + 0.1, 55, 0.5); clang(t + 0.3, 60, 0.03); },
  umb_reptante: t => { hiss(t, 0.9, 0.1); growl(t, 40, 0.9, 0.1, -3); clicks(t + 0.3, 3, 0.08, 0.08); },
  umb_lobo: t => { howl(t, 57, 1.3); growl(t, 40, 0.6, 0.1); },
  umb_sanguijuela: t => { noise(t, 0.5, { type: 'lowpass', f0: 900, f1: 200, vol: 0.18, att: 0.15 }); voice(mf(52), t, 0.6, { vol: 0.08, slide: 7, vib: 40 }); },
  umb_ritualista: t => { choir(t, [45, 51, 58], 1.8, 0.05); bell(t + 0.15, [63, 69], 0.2, 0.05, 1.41, 2.5); whoosh(t, 400, 2500, 0.8, 0.06, 0.4); },
  umb_golem: t => { tom(t, 36, 1); clang(t, 40, 0.1); rumble(t, 1, 0.2); clang(t + 0.18, 43, 0.07); },
  umb_verdugo: t => { whoosh(t, 3000, 400, 0.3, 0.12, 0.05); clang(t + 0.2, 50, 0.1); tom(t + 0.2, 38, 0.9); growl(t + 0.2, 38, 0.8, 0.1); },
  umb_jinete: t => { [0, 0.12, 0.24, 0.36].forEach((d, i) => tom(t + d, i % 2 ? 55 : 60, 0.6)); howl(t + 0.3, 69, 1, 0.08); whoosh(t, 600, 3000, 0.7, 0.08, 0.3); },
  umb_basalto: t => { tom(t, 38, 1); rumble(t, 1.1, 0.2); clang(t, 43, 0.08); clicks(t + 0.1, 3, 0.07, 0.1); },
  umb_devoradora: t => { growl(t, 35, 1.4, 0.15, -9); hiss(t, 0.8, 0.09); bell(t + 0.2, [58, 64], 0.15, 0.05, 1.41, 3); howl(t + 0.3, 45, 1.1, 0.06); },
  umb_azote: t => { whoosh(t, 800, 5000, 0.3, 0.14, 0.04); clang(t + 0.1, 74, 0.08); growl(t + 0.1, 43, 0.6, 0.12); clicks(t + 0.15, 3, 0.05); },
  umb_behemot: t => { tom(t, 34, 1); tom(t + 0.35, 34, 0.8); growl(t, 31, 1.6, 0.2, -6); rumble(t, 1.2, 0.22); },
  umb_abisal: t => { growl(t, 29, 2, 0.2, -10); choir(t, [34, 41, 46], 2.4, 0.05); rumble(t, 1.6, 0.18); bell(t + 0.3, [58, 65], 0.2, 0.05, 1.41, 3); },
  umb_senor: t => { tom(t, 32, 1); choir(t, [38, 45, 50, 57], 2.4, 0.05); clang(t + 0.05, 33, 0.12); whoosh(t, 300, 4000, 1, 0.08, 0.5); bell(t + 0.5, [69, 75], 0.2, 0.05, 1.41, 3); },
  umb_titan: t => { [0, 0.3, 0.6].forEach(d => tom(t + d, 30, 1)); growl(t, 26, 2.2, 0.22, -8); rumble(t, 1.8, 0.24); clang(t + 0.6, 36, 0.12); },
};
for (const [id, f] of Object.entries(UNIT)) R['u_' + id] = () => f(T0());
/** Sonido de invocación de una unidad concreta (cada carta tiene el suyo; si falta, el de su facción). */
export function sfxCard(id: string) {
  if (muted) return;
  try { boot(); (R['u_' + id] ?? R[id.startsWith('umb') ? 'summon_umb' : 'summon_lum'])(); } catch { /* sin audio */ }
}
export function sfx(name: string) {
  if (muted) return;
  probe(name); const url = files.get(name);
  if (url) { const a = new Audio(url); a.volume = 0.7; void a.play().catch(() => { /* */ }); return; }
  try { boot(); R[name]?.(); } catch { /* sin audio */ }
}

// ---------- Música ambiental generativa (re menor, 72 bpm) ----------
const BEAT = 60 / 72, BAR = BEAT * 4;
const ROOTS = [38, 34, 41, 36], CHORDS = [[62, 65, 69, 74], [58, 62, 65, 70], [57, 60, 65, 69], [55, 60, 64, 67]], PENT = [62, 65, 67, 69, 72, 74, 77];
function bar(t: number, i: number) {
  if (muted || document.hidden) return;
  tensionNow += (Math.max(tension, boss ? 0.75 : 0) - tensionNow) * 0.5;
  const c = i % 4, ch = CHORDS[c], tn = tensionNow, mb = musicBus;
  ch.forEach((n, k) => voice(mf(n), t, BAR * 1.08, { type: 'sawtooth', vol: 0.02, att: 1.2, pad: true, rel: 1.3, lp: 650 + tn * 900, det: 8 + k * 2, pan: (k - 1.5) * 0.35, bus: mb }));
  voice(mf(ROOTS[c]), t, BAR * 1.02, { vol: 0.15, att: 0.25, pad: true, rel: 1, bus: mb });
  const pat = [0, 2, 1, 3, 2, 1, 3, 2];
  pat.forEach((p, k) => { if (Math.random() < (tn ? 0.9 : 0.7)) { const n = ch[p] + (k % 4 === 3 && Math.random() < 0.4 ? 12 : 0) + 12;
    voice(mf(n), t + k * BEAT / 2, 1.1, { type: 'triangle', vol: 0.035 + tn * 0.01, pan: Math.sin(k) * 0.5, bus: mb }); } });
  if (i % 2 === 0 && Math.random() < 0.7) fm(mf(PENT[Math.floor(Math.random() * PENT.length)] + 12), t + BEAT * (Math.random() < 0.5 ? 0 : 2), 3, { vol: 0.045, ratio: 2, idx: 0.7, pan: rnd(-0.5, 0.5), bus: mb });
  if (boss) {   // jefe: bajo continuo disonante y latido en cada pulso
    voice(mf(ROOTS[c] - 12), t, BAR * 1.05, { type: 'sawtooth', vol: 0.09, att: 0.4, pad: true, rel: 1, lp: 260, bus: mb });
    voice(mf(ROOTS[c] + 6), t, BAR, { type: 'sawtooth', vol: 0.018, att: 0.8, pad: true, rel: 1, lp: 500, det: 14, bus: mb });
    for (let b = 0; b < 4; b++) tom(t + b * BEAT, 40, b % 2 ? 0.2 : 0.34, mb);
  }
  if (c === 0) tom(t, 44, 0.35, mb);
  if (tn > 0.5) for (let b = 0; b < 4; b++) tom(t + b * BEAT, b % 2 ? 80 : 58, b === 2 ? 0.28 : 0.18, mb);
  for (let k = 0; k < 4; k++) if (Math.random() < 0.6) noise(t + rnd(0, BAR), 0.03, { type: 'highpass', f0: 4000, f1: 3000, vol: rnd(0.008, 0.02), pan: rnd(-0.8, 0.8), bus: mb });
}
function wind() {
  const s = ctx.createBufferSource(), fl = ctx.createBiquadFilter(), g = ctx.createGain(), l = ctx.createOscillator(), lg = ctx.createGain();
  s.buffer = noiseBuf(); s.loop = true; fl.type = 'bandpass'; fl.frequency.value = 420; fl.Q.value = 0.9; g.gain.value = 0.045;
  l.frequency.value = 0.07; lg.gain.value = 0.03; l.connect(lg).connect(g.gain); const l2 = ctx.createOscillator(), l2g = ctx.createGain(); l2.frequency.value = 0.05; l2g.gain.value = 250; l2.connect(l2g).connect(fl.frequency);
  s.connect(fl).connect(g).connect(musicBus); s.start(); l.start(); l2.start();
  return () => { g.gain.setTargetAtTime(0, ctx.currentTime, 0.4); setTimeout(() => { s.stop(); l.stop(); l2.stop(); }, 2000); };
}
export function startMusic() {
  if (musicOn) return; boot(); musicOn = true; barIdx = 0; nextBar = ctx.currentTime + 0.15; windStop = wind();
  timer = window.setInterval(() => { while (nextBar < ctx.currentTime + 1.3) { bar(nextBar, barIdx++); nextBar += BAR; } }, 400);
}
export function stopMusic() { musicOn = false; clearInterval(timer); windStop?.(); windStop = null; }
