// Intro al entrar: el logo nace de una gota de vidrio líquido (WebGL2) y el iris se cierra sobre él para revelar el menú.
import { mountGlassReveal } from './glassreveal';

const BG = '#150f1a';
export function playIntro(onGo: () => void) {
  const root = document.documentElement;
  const base = import.meta.env.BASE_URL;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let released = false;
  const release = () => { if (released) return; released = true; root.classList.remove('apx-wait'); onGo(); };
  if (reduce) { release(); return; }

  const o = document.createElement('div'); o.id = 'apx-intro'; o.setAttribute('role', 'presentation');
  o.innerHTML = `<div class="ai-gl"></div><div class="ai-aura"></div>
    <div class="ai-word" aria-hidden="true"><div class="ai-name">${'APEXORA'.split('').map((c, i) => `<b style="--i:${i}">${c}</b>`).join('')}</div><div class="ai-sub"><i></i>TRADING CARD GAME<i></i></div></div>
    <span class="ai-c tl"></span><span class="ai-c tr"></span><span class="ai-c bl"></span><span class="ai-c br"></span>
    <div class="ai-bar"><i></i></div><button type="button" class="ai-skip">SALTAR ›</button>`;
  document.body.append(o);

  let done = false, started = 0;
  const finish = () => {
    if (done) return; done = true;
    document.removeEventListener('keydown', onKey, true);
    o.classList.add('out');
    setTimeout(release, 380);               // el menú empieza a entrar mientras el iris se cierra
    setTimeout(() => { gl?.dispose(); o.remove(); }, 1500);
  };
  const onKey = (e: KeyboardEvent) => { if (performance.now() - started > 500 && (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); finish(); } };
  document.addEventListener('keydown', onKey, true);
  o.addEventListener('pointerdown', () => { if (performance.now() - started > 500) finish(); });
  started = performance.now();

  let wordOn = false;
  const gl = mountGlassReveal(o.querySelector<HTMLElement>('.ai-gl')!, {
    logo: `${base}logo.png`, background: BG, plateColor: '#2a1d33', originalColors: true, tileSize: 380,
    tuning: { present: 1.9, glide: 1.7, startZoom: 1.9, dispersion: 1.15, colorBleed: 0.8 },
    onTime: (t, end) => {
      o.style.setProperty('--p', String(Math.min(1, t / end)));
      if (!wordOn && t > 1.9) { wordOn = true; o.classList.add('word'); }
    },
    onEnd: () => { setTimeout(finish, 900); },
  });
  if (!gl) {   // sin WebGL2: logo estático con fundido
    o.classList.add('nogl'); o.querySelector('.ai-gl')!.innerHTML = `<img src="${base}logo.png" alt="Apexora TCG">`;
    o.classList.add('word'); setTimeout(finish, 2200);
  }
  setTimeout(finish, 9000);   // red de seguridad
}
