import { rankingTop, misPuntos } from '../net/liga';
import { ensureStyle } from '../net/onlineUi';
import { isConfigured, netErr } from '../net/firebase';

const esc = (s: string) => s.replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]!));
export async function openRanking() {
  ensureStyle(); document.querySelectorAll('.onl.rk').forEach(e => e.remove());
  const m = document.createElement('div'); m.className = 'onl rk';
  m.innerHTML = `<div><h2>Ranking</h2><div class="me"></div><ol class="rkl"><li><span></span><span>Cargando…</span></li></ol><button class="ghost" data-x="close">Cerrar</button></div>`;
  document.body.append(m);
  m.addEventListener('click', e => { if ((e.target as HTMLElement).dataset.x === 'close' || e.target === m) m.remove(); });
  m.addEventListener('keydown', e => { if ((e as KeyboardEvent).key === 'Escape') m.remove(); });
  const ol = m.querySelector('ol')!;
  if (!isConfigured) { ol.innerHTML = `<li><span></span><span>${esc(netErr(null))}</span></li>`; return; }
  try {
    const [yo, top] = await Promise.all([misPuntos(), rankingTop(50)]);
    m.querySelector('.me')!.textContent = `Tus puntos: ${yo.pt} · ${yo.wins} V / ${yo.losses} D`;
    ol.innerHTML = top.length ? top.map((r, i) => `<li class="${r.mine ? 'mine' : ''}"><span>${i + 1}</span><span>${esc(r.name)}</span><b>${r.pt}</b><small>${r.wins}V ${r.losses}D</small></li>`).join('') : '<li><span></span><span>Aún no hay partidas. ¡Sé el primero!</span></li>';
  } catch (e) { ol.innerHTML = `<li><span></span><span>${esc(netErr(e))}</span></li>`; }
}
