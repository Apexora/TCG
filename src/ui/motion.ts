// Movimiento con GSAP. main.ts reconstruye todo el DOM en cada render(), así que aquí se hace un "FLIP" por clave:
// se mide cada carta antes del render y, después, las cartas que siguen existiendo se deslizan desde donde estaban,
// las invocadas vuelan desde la mano y las robadas desde el mazo. Usa las propiedades individuales translate/scale/rotate
// para no pisar los transform de CSS (selección, hover, abanico de la mano).
import { gsap } from 'gsap';
import { landFx } from './combatfx';

type Pal = 'lum' | 'umb';
interface R { x: number; y: number; w: number; h: number }
const mid = (e: Element): R => { const r = e.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2, w: r.width, h: r.height }; };
const reduced = () => typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;

let prevU = new Map<string, R>(), prevHand = new Map<string, R & { id: string }>(), prevGame = -1;
const flying = new Set<number>();   // unidades con una copia en vuelo: la real permanece oculta hasta que aterriza

/** Llamar justo ANTES de reescribir el DOM. */
export function motionSnapshot(root: HTMLElement, game: number) {
  if (game !== prevGame) { prevU = new Map(); prevHand = new Map(); flying.clear(); prevGame = game; }
  const u = new Map<string, R>(), h = new Map<string, R & { id: string }>();
  root.querySelectorAll<HTMLElement>('[data-uid]').forEach(e => u.set(e.dataset.uid!, mid(e)));
  root.querySelectorAll<HTMLElement>('.fan .slotc[data-k]').forEach(e => { const c = e.firstElementChild; if (c) h.set(e.dataset.k!, { ...mid(c), id: e.dataset.id! }); });
  prevU = u; prevHand = h;
}

/** Interpola desde un estado inicial hasta el reposo (el estado se escribe ya, sin parpadeo, y se limpia al terminar). */
function from(el: HTMLElement, f: { x?: number; y?: number; s?: number; r?: number; o?: number }, dur: number, o: { delay?: number; ease?: string } = {}) {
  const p = { t: 0 };
  const apply = () => {
    const k = 1 - p.t;
    if (f.x !== undefined || f.y !== undefined) el.style.translate = `${((f.x ?? 0) * k).toFixed(1)}px ${((f.y ?? 0) * k).toFixed(1)}px`;
    if (f.s !== undefined) el.style.scale = (1 + (f.s - 1) * k).toFixed(3);
    if (f.r !== undefined) el.style.rotate = `${(f.r * k).toFixed(1)}deg`;
    if (f.o !== undefined) el.style.opacity = Math.max(0, Math.min(1, f.o + (1 - f.o) * p.t)).toFixed(3);
  };
  const clear = () => { el.style.translate = el.style.scale = el.style.rotate = el.style.opacity = ''; };
  apply();
  return gsap.to(p, { t: 1, duration: dur, delay: o.delay ?? 0, ease: o.ease ?? 'power3.out', onUpdate: apply, onComplete: clear });
}

/** Aplastamiento al aterrizar: se ensancha y recupera con rebote. */
function squash(el: HTMLElement) {
  const p = { t: 0 };
  const apply = () => { const k = 1 - p.t; el.style.scale = `${(1 + .13 * k).toFixed(3)} ${(1 - .15 * k).toFixed(3)}`; };
  apply();
  gsap.to(p, { t: 1, duration: .55, ease: 'elastic.out(1,.45)', onUpdate: apply, onComplete: () => { el.style.scale = ''; } });
}

const live = (uid: number) => document.querySelector<HTMLElement>(`[data-uid="${uid}"]`);
const hide = (uid: number) => document.querySelectorAll<HTMLElement>(`[data-uid="${uid}"]`).forEach(e => { e.style.visibility = 'hidden'; });

/** Una unidad recién invocada vuela (en arco, girando) desde su origen y aterrece con impacto. */
function flight(el: HTMLElement, uid: number, origin: R | null, pal: Pal) {
  const to = mid(el);
  if (!to.w) return;
  const o = origin ?? { x: to.x, y: to.y - to.h * .9, w: to.w * .4, h: to.h * .4 };   // sin mano de origen (token/efecto): cae desde arriba
  const dx = o.x - to.x, dy = o.y - to.y, s0 = Math.max(.28, Math.min(1.2, o.w / to.w)), dur = Math.min(.9, .46 + Math.hypot(dx, dy) / 2400);
  const fl = el.cloneNode(true) as HTMLElement;
  fl.classList.remove('enter', 'sel', 'can', 'duel', 'duelatk', 'atkr', 'hurt', 'boost');
  ['data-uid', 'data-a', 'data-u', 'data-i'].forEach(a => fl.removeAttribute(a));
  fl.style.cssText = `position:fixed;left:${to.x - to.w / 2}px;top:${to.y - to.h / 2}px;width:${to.w}px;height:${to.h}px;--w:${to.w}px;margin:0;z-index:85;pointer-events:none;animation:none;will-change:transform,opacity;transform-origin:50% 50%`;
  document.body.append(fl);
  flying.add(uid); hide(uid);
  let ended = false;
  const land = () => {
    if (ended) return; ended = true; fl.remove(); flying.delete(uid);
    const e = live(uid); if (e) { e.style.visibility = ''; squash(e); }
    landFx(to.x, to.y + to.h * .28, to.w, pal);
  };
  gsap.set(fl, { x: dx, y: dy, scale: s0, rotation: dx >= 0 ? 14 : -14, opacity: origin ? 1 : 0 });
  gsap.timeline({ onComplete: land })
    .to(fl, { x: 0, duration: dur, ease: 'power2.out' }, 0)
    .to(fl, { y: 0, duration: dur, ease: 'power2.in' }, 0)
    .to(fl, { rotation: 0, duration: dur, ease: 'back.out(2.2)' }, 0)
    .to(fl, { opacity: 1, duration: dur * .3 }, 0)
    .to(fl, { scale: 1.24, duration: dur * .62, ease: 'power2.out' }, 0)
    .to(fl, { scale: 1, duration: dur * .38, ease: 'power3.in' }, dur * .62);
  setTimeout(land, (dur + .7) * 1000);   // red de seguridad (pestaña en segundo plano, etc.)
}

/** Llamar justo DESPUÉS de reescribir el DOM. `palOf(side)`: paleta del mazo de cada lado. */
export function motionPlay(root: HTMLElement, palOf: (side: number) => Pal) {
  flying.forEach(hide);   // los renders intermedios no deben mostrar la carta real mientras su copia aún vuela
  if (reduced()) return;
  const mulligan = !!root.querySelector('.mull');

  // ---- cartas del tablero ----
  const foeHand = root.querySelector('.foehand'), foeR = foeHand ? mid(foeHand) : null;
  const lostHand = [...prevHand.entries()].filter(([k]) => !root.querySelector(`.fan .slotc[data-k="${k}"]`)).map(([, v]) => v);
  const units = Array.from(root.querySelectorAll<HTMLElement>('[data-uid]')).map(e => ({ e, r: mid(e) }));
  units.forEach(({ e, r }) => {
    const uid = Number(e.dataset.uid), side = Number(e.dataset.u?.split(':')[0] ?? 0), p = prevU.get(String(uid));
    if (flying.has(uid)) return;
    if (p) {
      const dx = p.x - r.x, dy = p.y - r.y, s = r.w ? p.w / r.w : 1;
      if (Math.hypot(dx, dy) > 3 || Math.abs(s - 1) > .03) from(e, { x: dx, y: dy, s: Math.max(.6, Math.min(1.6, s)) }, .46, { ease: 'power3.out' });
    } else if (e.classList.contains('enter') && !mulligan) {
      e.style.animation = 'none';
      let origin: R | null = null;
      if (side === 0) { const i = lostHand.findIndex(h => h.id === e.dataset.c); if (i >= 0) origin = lostHand.splice(i, 1)[0]; }
      else if (foeR && foeR.w) origin = { ...foeR, w: 52, h: 74 };
      flight(e, uid, origin, palOf(side));
    }
  });

  // ---- mano: reacomodo del abanico y reparto desde el mazo ----
  const pile = root.querySelector('.pile.p0'), pr = pile ? mid(pile) : null;
  let n = 0;
  root.querySelectorAll<HTMLElement>('.fan .slotc[data-k]').forEach(sl => {
    const c = sl.firstElementChild as HTMLElement | null; if (!c) return;
    const r = mid(c), p = prevHand.get(sl.dataset.k!);
    if (p) { const dx = p.x - r.x, dy = p.y - r.y; if (Math.hypot(dx, dy) > 3) from(c, { x: dx, y: dy }, .4, { ease: 'power3.out' }); }
    else if (!mulligan) {
      const sx = pr && pr.w ? pr.x : window.innerWidth - 90, sy = pr && pr.w ? pr.y : window.innerHeight - 90;
      from(c, { x: sx - r.x, y: sy - r.y, s: .45, r: -28, o: 0 }, .62, { delay: n++ * .09, ease: 'power3.out' });
    }
  });
}
