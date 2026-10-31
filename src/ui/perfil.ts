import { AVATARES, avatar, correo, entrar, esCuenta, guardarPerfil, olvide, registrar, salir, snapshot } from '../net/cuenta';
import { misPuntos, nick } from '../net/liga';
import { ensureStyle } from '../net/onlineUi';
import { isConfigured } from '../net/firebase';

const esc = (s: string) => s.replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]!));
export async function openPerfil() {
  ensureStyle(); document.querySelectorAll('.onl.pf').forEach(e => e.remove());
  const cuenta = esCuenta(), p = snapshot(), vencidos = Object.values(p.adv).reduce((n, l) => n + l.length, 0);
  let ava = avatar();
  const m = document.createElement('div'); m.className = 'onl pf';
  m.innerHTML = `<div><h2>Perfil</h2>
    <p>${cuenta ? esc(correo()) : 'Sin cuenta: tu progreso está solo en este navegador.'}</p>
    <input class="nick" data-x="nick" maxlength="14" placeholder="Tu nombre" autocomplete="off" value="${esc(nick())}">
    <div class="avs">${AVATARES.map(a => `<button type="button" data-a="${a}" class="${a === ava ? 'on' : ''}">${a}</button>`).join('')}</div>
    <div class="me">${vencidos} rivales vencidos · ${p.decks.length} mazos propios<span class="pts"></span></div>
    ${cuenta ? '<button class="btn" data-x="save">Guardar perfil</button><button class="btn" data-x="out">Cerrar sesión</button>' : isConfigured
      ? `<p style="margin:0;opacity:.8;font-size:12px">Crea una cuenta para guardar tu progreso en la nube. Lo que tienes ahora se sube tal cual.</p>
         <input class="nick" data-x="mail" type="email" placeholder="Correo" autocomplete="email"><input class="nick" data-x="pass" type="password" placeholder="Contraseña (mín. 6)" autocomplete="current-password">
         <button class="btn" data-x="reg">Crear cuenta</button><button class="btn" data-x="in">Iniciar sesión</button><button class="ghost" data-x="forgot">Olvidé mi contraseña</button>`
      : '<p>Online y cuentas no están configurados (faltan las claves de Firebase).</p><button class="btn" data-x="save">Guardar perfil</button>'}
    <div class="st"></div><button class="ghost" data-x="close">Cerrar</button></div>`;
  document.body.append(m);
  const q = <T extends HTMLElement>(s: string) => m.querySelector<T>(s)!, st = (t: string) => { q('.st').textContent = t; };
  if (isConfigured) misPuntos().then(r => { q('.pts').textContent = ` · ${r.pt} PT (${r.wins}V/${r.losses}D)`; }).catch(() => {});
  const val = (x: string) => q<HTMLInputElement>(`[data-x=${x}]`).value;
  const go = (f: () => Promise<unknown>, ok = '') => { st('Un momento…'); f().then(() => st(ok)).catch(e => st(e?.message ?? 'Error')); };
  m.addEventListener('keydown', e => { e.stopPropagation(); if ((e as KeyboardEvent).key === 'Escape') m.remove(); });
  m.addEventListener('click', e => {
    const b = e.target as HTMLElement;
    if (b === m) return m.remove();
    if (b.dataset.a) { ava = ava === b.dataset.a ? '' : b.dataset.a; m.querySelectorAll('.avs button').forEach(x => x.classList.toggle('on', (x as HTMLElement).dataset.a === ava)); if (!cuenta) void guardarPerfil(val('nick'), ava); return; }
    const x = b.dataset.x; if (!x) return;
    if (x === 'close') m.remove();
    else if (x === 'save') go(() => guardarPerfil(val('nick'), ava), 'Perfil guardado ✓');
    else if (x === 'reg') go(async () => { await guardarPerfil(val('nick'), ava); await registrar(val('mail'), val('pass')); m.remove(); openPerfil(); });
    else if (x === 'in') go(() => entrar(val('mail'), val('pass')));
    else if (x === 'forgot') go(() => olvide(val('mail')), 'Te enviamos un correo para cambiarla.');
    else if (x === 'out') go(() => salir());
  });
  m.querySelector('[data-x=nick]')!.addEventListener('change', () => { if (!cuenta) void guardarPerfil(val('nick'), ava); });
}
