import { auth } from '../net/firebase';
import { DIVISIONES, divisionDe, miNE, rankingNE, siguiente } from '../net/elo';

const esc = (s: string) => s.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!));
const CSS = `
.rnk{position:fixed;inset:0;z-index:9500;display:grid;place-items:center;background:rgba(5,5,12,.82);font-family:var(--ui,system-ui)}
.rnk>div{background:#14141f;border:1px solid #3a3a5a;border-radius:14px;padding:20px 22px;width:min(94vw,440px);max-height:88vh;display:grid;grid-template-rows:auto auto auto 1fr auto;gap:10px;color:#eee}
.rnk h2{margin:0;text-align:center;letter-spacing:.2em}
.rnk .me{text-align:center;padding:10px;border-radius:10px;background:#0c0c14;border:1px solid var(--c)}
.rnk .me b{font-size:26px}.rnk .me small{display:block;opacity:.7;margin-top:2px}
.rnk .divs{display:flex;gap:6px;justify-content:center;font-size:12px;flex-wrap:wrap}.rnk .divs span{padding:3px 8px;border-radius:99px;border:1px solid #444}
.rnk ol{list-style:none;margin:0;padding:0;overflow:auto;display:grid;gap:4px;align-content:start}
.rnk li{display:grid;grid-template-columns:32px 1fr auto;gap:8px;padding:7px 10px;border-radius:8px;background:#1b1b2a;align-items:center}
.rnk li.yo{outline:1px solid #ffd27a;background:#2a2412}.rnk li i{font-style:normal;opacity:.6}.rnk li em{font-style:normal;font-size:11px;opacity:.75;margin-left:6px}
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
  m.innerHTML = `<div><h2>RANKING</h2><div class="me">Cargando…</div><div class="divs">${DIVISIONES.map(d => `<span style="color:${d.color}">${d.icon} ${d.name} ${d.min}+</span>`).join('')}</div><ol></ol><button class="ghost" data-x="close">Cerrar</button></div>`;
  document.body.append(m);
  m.addEventListener('click', e => { if ((e.target as HTMLElement).dataset.x === 'close' || e.target === m) m.remove(); });
  m.addEventListener('keydown', e => e.stopPropagation());
  const ne = await miNE(), d = divisionDe(ne), sig = siguiente(ne), me = m.querySelector<HTMLElement>('.me')!;
  me.style.setProperty('--c', d.color);
  me.innerHTML = `<b>${d.icon} ${d.name} · ${ne} NE</b><small>${sig ? `${sig.falta} NE para ${sig.name}` : 'División máxima'} · se gana y pierde solo en partidas online</small>`;
  try {
    const filas = await rankingNE(50), uid = auth.currentUser?.uid;
    m.querySelector('ol')!.innerHTML = filas.length ? filas.map((f, i) => { const dv = divisionDe(f.ne); return `<li class="${f.uid === uid ? 'yo' : ''}"><i>${i + 1}</i><span>${esc(f.nombre)}<em style="color:${dv.color}">${dv.icon} ${dv.name}</em></span><b>${f.ne} NE</b></li>`; }).join('') : '<li><span></span><span>Aún nadie jugó online.</span></li>';
  } catch { m.querySelector('ol')!.innerHTML = '<li><span></span><span>No se pudo cargar el ranking.</span></li>'; }
}
