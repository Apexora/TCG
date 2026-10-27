import { auth } from '../net/firebase';
import { DIVISIONES, divisionDe, miNE, rankingNE, siguiente } from '../net/elo';

const esc = (s: string) => s.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!));
const CSS = `
.rnk{position:fixed;inset:0;z-index:9500;display:grid;place-items:center;overflow:hidden;font-family:Cinzel,"Cormorant Garamond",serif;background:radial-gradient(ellipse 70% 80% at 50% 45%,#2a1a5acc 0,#0d0820e6 55%,#04020aef 100%);-webkit-backdrop-filter:blur(7px);backdrop-filter:blur(7px);animation:rnkIn .35s ease-out both}
@keyframes rnkIn{from{opacity:0}}
.rnk .mt{position:absolute;bottom:-12px;left:var(--x);width:var(--s);height:var(--s);border-radius:50%;background:var(--c);box-shadow:0 0 10px var(--c);opacity:0;animation:rnkMote var(--d) var(--w) linear infinite;pointer-events:none}
@keyframes rnkMote{0%{transform:translate(0,0);opacity:0}15%{opacity:.9}100%{transform:translate(var(--dx),-105vh);opacity:0}}
.rnk>div{position:relative;width:min(94vw,470px);max-height:88vh;display:grid;grid-template-rows:auto auto auto 1fr auto;gap:12px;padding:30px 26px 18px;color:#e3d6ff;background:linear-gradient(160deg,#1b1238f2,#0a0716f5);border:1px solid #c7a2ff3d;border-radius:4px;box-shadow:0 0 0 1px #05030a,0 0 60px #7a54ff44,0 30px 80px #000c,inset 0 0 50px #7a54ff1a;animation:rnkPanel .6s cubic-bezier(.2,.8,.2,1) both}
@keyframes rnkPanel{from{opacity:0;transform:translateY(24px) scale(.95);filter:blur(8px)}}
.rnk>div::before,.rnk>div::after{content:"";position:absolute;width:14px;height:14px;background:linear-gradient(135deg,#bffcef,#2cc9d9);box-shadow:0 0 0 2px #f2d58a,0 0 14px #2cf0c4aa;transform:rotate(45deg);animation:rnkGem 3s ease-in-out infinite alternate}
.rnk>div::before{left:-8px;top:-8px}.rnk>div::after{right:-8px;bottom:-8px;animation-delay:1.5s}
@keyframes rnkGem{to{filter:brightness(1.5);box-shadow:0 0 0 2px #f2d58a,0 0 22px #2cf0c4}}
.rnk h2{margin:0;text-align:center;font:800 clamp(30px,6vw,42px)/1 Cinzel,serif;letter-spacing:.08em;background:linear-gradient(180deg,#fff 0,#d9c8ff 50%,#8d6fe0 100%);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;filter:drop-shadow(0 0 16px #8a5cff88)}
.rnk h2::after{content:"";display:block;height:1px;margin:12px auto 0;width:70%;background:linear-gradient(90deg,transparent,#f2d58aaa,transparent)}
.rnk .me{text-align:center;padding:12px 14px 14px;background:linear-gradient(160deg,#120c2acc,#0a0716cc);border:1px solid var(--c,#c7a2ff55);box-shadow:0 0 22px -6px var(--c,#7a54ff),inset 0 0 24px -10px var(--c,#7a54ff);animation:rnkMe 3.2s ease-in-out infinite alternate}
@keyframes rnkMe{to{box-shadow:0 0 34px -4px var(--c,#7a54ff),inset 0 0 30px -8px var(--c,#7a54ff)}}
.rnk .me b{display:block;font:800 clamp(20px,4.6vw,26px) Cinzel,serif;letter-spacing:.04em;color:#fff;text-shadow:0 0 16px var(--c,#8a5cff)}
.rnk .me small{display:block;margin-top:6px;font:500 11px Cinzel,serif;letter-spacing:.1em;color:#b9acd8}
.rnk .pb{height:5px;margin:10px auto 0;width:86%;border-radius:9px;background:#ffffff14;overflow:hidden}
.rnk .pb i{display:block;height:100%;width:var(--p,0%);border-radius:9px;background:linear-gradient(90deg,var(--c,#7a54ff),#fff);box-shadow:0 0 10px var(--c,#7a54ff);transform-origin:left;animation:rnkBar 1.1s .3s cubic-bezier(.2,.8,.2,1) both}
@keyframes rnkBar{from{transform:scaleX(0)}}
.rnk .divs{display:flex;gap:6px;justify-content:center;flex-wrap:wrap;font:600 11px Cinzel,serif;letter-spacing:.06em}
.rnk .divs span{padding:3px 10px;border-radius:99px;border:1px solid #c7a2ff33;background:#ffffff08;text-shadow:0 0 10px currentColor}
.rnk ol{list-style:none;margin:0;padding:0 4px 0 0;overflow:auto;display:grid;gap:5px;align-content:start;scrollbar-width:thin;scrollbar-color:#7a54ff88 transparent}
.rnk li{position:relative;display:grid;grid-template-columns:36px 1fr auto;gap:8px;padding:8px 12px;align-items:center;background:linear-gradient(90deg,#241a4acc,#150e2ecc);border-left:2px solid #c7a2ff44;font:500 14px Cinzel,serif;animation:rnkRow .45s calc(var(--i,0)*45ms + .25s) cubic-bezier(.2,.8,.2,1) both;transition:transform .2s,background .2s}
@keyframes rnkRow{from{opacity:0;transform:translateX(-18px)}}
.rnk li:hover{transform:translateX(4px);background:linear-gradient(90deg,#33256acc,#1c1340cc)}
.rnk li i{font:800 16px Cinzel,serif;font-style:normal;text-align:center;color:#a99cc8}
.rnk li em{font-style:normal;font-size:11px;opacity:.85;margin-left:8px;letter-spacing:.04em;text-shadow:0 0 8px currentColor}
.rnk li b{font:800 14px Cinzel,serif;color:#fff;letter-spacing:.04em}
.rnk li:nth-child(1){border-left-color:#ffd27a;background:linear-gradient(90deg,#4a3a12cc,#150e2ecc)}.rnk li:nth-child(1) i{color:#ffd27a;text-shadow:0 0 12px #ffd27a}
.rnk li:nth-child(2){border-left-color:#d6deea;background:linear-gradient(90deg,#3a4058cc,#150e2ecc)}.rnk li:nth-child(2) i{color:#e6ecf5;text-shadow:0 0 12px #d6deea}
.rnk li:nth-child(3){border-left-color:#d9945a;background:linear-gradient(90deg,#4a2f1ccc,#150e2ecc)}.rnk li:nth-child(3) i{color:#e8a56d;text-shadow:0 0 12px #d9945a}
.rnk li.yo{border-left-color:#2cf0c4;box-shadow:inset 0 0 0 1px #2cf0c477,0 0 16px -4px #2cf0c4;animation:rnkRow .45s calc(var(--i,0)*45ms + .25s) cubic-bezier(.2,.8,.2,1) both,rnkYo 2.2s 1.2s ease-in-out infinite alternate}
@keyframes rnkYo{to{box-shadow:inset 0 0 0 1px #2cf0c4cc,0 0 24px -2px #2cf0c4}}
.rnk .load{animation:rnkLd 1.2s ease-in-out infinite alternate}@keyframes rnkLd{from{opacity:.45}}
.rnk button.ghost{justify-self:center;padding:6px 14px;border:0;background:none;cursor:pointer;font:600 12px Cinzel,serif;letter-spacing:.3em;text-transform:uppercase;color:#f2d58a99;transition:color .2s,text-shadow .2s}
.rnk button.ghost:hover,.rnk button.ghost:focus-visible{outline:0;color:#f2d58a;text-shadow:0 0 12px #f2d58a88}
@media(prefers-reduced-motion:reduce){.rnk,.rnk>div,.rnk>div::before,.rnk>div::after,.rnk .mt,.rnk .me,.rnk li,.rnk .pb i,.rnk .load{animation:none!important}}
.ne-badge{animation:up 1s 1.3s both;display:inline-flex;gap:8px;align-items:center;padding:6px 14px;border-radius:99px;background:#0c0c14cc;border:1px solid var(--c,#555);color:#eee;font:700 13px var(--ui,system-ui);letter-spacing:.12em;position:relative;z-index:2;margin-top:14px}
`;
function style() { if (!document.getElementById('rnk-css')) { const s = document.createElement('style'); s.id = 'rnk-css'; s.textContent = CSS; document.head.append(s); } }

/** Pinta/actualiza la etiqueta "🪨 Roca · 120 NE" dentro de `host` (menú de inicio). */
export async function pintarNE(host: HTMLElement) {
  style();
  let b = host.querySelector<HTMLElement>('.ne-badge');
  if (!b) { b = document.createElement('div'); b.className = 'ne-badge'; b.textContent = '… NE'; host.append(b); }
  const ne = await miNE(), d = divisionDe(ne);
  b.style.setProperty('--c', d.color); b.textContent = `${d.icon} ${d.name} · ${ne} NE`;
}

export async function openRanking() {
  style(); document.querySelector('.rnk')?.remove();
  const m = document.createElement('div'); m.className = 'rnk';
  m.innerHTML = `<i class="mt" style="--x:8%;--s:3px;--c:#c7a2ff;--d:11s;--w:-1s;--dx:30px"></i><i class="mt" style="--x:22%;--s:2px;--c:#2cf0c4;--d:14s;--w:-6s;--dx:-40px"></i><i class="mt" style="--x:37%;--s:4px;--c:#f2d58a;--d:12s;--w:-3s;--dx:25px"></i><i class="mt" style="--x:52%;--s:2px;--c:#c7a2ff;--d:15s;--w:-9s;--dx:-20px"></i><i class="mt" style="--x:66%;--s:3px;--c:#2cf0c4;--d:10s;--w:-4s;--dx:40px"></i><i class="mt" style="--x:80%;--s:4px;--c:#f2d58a;--d:13s;--w:-7s;--dx:-30px"></i><i class="mt" style="--x:92%;--s:2px;--c:#c7a2ff;--d:12s;--w:-2s;--dx:20px"></i><div><h2>RANKING</h2><div class="me"><span class="load">Cargando…</span></div><div class="divs">${DIVISIONES.map(d => `<span style="color:${d.color}">${d.icon} ${d.name} ${d.min}+</span>`).join('')}</div><ol></ol><button class="ghost" data-x="close">Cerrar</button></div>`;
  document.body.append(m);
  m.addEventListener('click', e => { if ((e.target as HTMLElement).dataset.x === 'close' || e.target === m) m.remove(); });
  m.addEventListener('keydown', e => e.stopPropagation());
  const ne = await miNE(), d = divisionDe(ne), sig = siguiente(ne), me = m.querySelector<HTMLElement>('.me')!;
  me.style.setProperty('--c', d.color);
  const span = sig ? ne + sig.falta - d.min : 0, pct = sig && span > 0 ? Math.max(0, Math.min(100, ((ne - d.min) / span) * 100)) : 100;
  me.innerHTML = `<b>${d.icon} ${d.name} · ${ne} NE</b><small>${sig ? `${sig.falta} NE para ${sig.name}` : 'División máxima'} · se gana y pierde solo en partidas online</small><div class="pb" style="--p:${pct.toFixed(0)}%"><i></i></div>`;
  try {
    const filas = await rankingNE(50), uid = auth.currentUser?.uid;
    m.querySelector('ol')!.innerHTML = filas.length ? filas.map((f, i) => { const dv = divisionDe(f.ne); return `<li class="${f.uid === uid ? 'yo' : ''}" style="--i:${Math.min(i, 14)}"><i>${i + 1}</i><span>${esc(f.nombre)}<em style="color:${dv.color}">${dv.icon} ${dv.name}</em></span><b>${f.ne} NE</b></li>`; }).join('') : '<li><span></span><span>Aún nadie jugó online.</span></li>';
  } catch { m.querySelector('ol')!.innerHTML = '<li><span></span><span>No se pudo cargar el ranking.</span></li>'; }
}
