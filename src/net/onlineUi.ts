// Menú "Jugar online" y etiqueta de sala. Vive fuera de render() para no perderse al repintar.
const CSS = `
.onl{position:fixed;inset:0;z-index:9000;display:grid;place-items:center;overflow:hidden;background:radial-gradient(ellipse 70% 80% at 50% 45%,#2a1a5acc 0,#0d0820e6 55%,#04020aef 100%);-webkit-backdrop-filter:blur(7px);backdrop-filter:blur(7px);animation:onlIn .35s ease-out both}
@keyframes onlIn{from{opacity:0}}
.onl .mt{position:absolute;bottom:-12px;left:var(--x);width:var(--s);height:var(--s);border-radius:50%;background:var(--c);box-shadow:0 0 10px var(--c);opacity:0;animation:onlMote var(--d) var(--w) linear infinite;pointer-events:none}
@keyframes onlMote{0%{transform:translate(0,0);opacity:0}15%{opacity:.9}100%{transform:translate(var(--dx),-105vh);opacity:0}}
.onl>div{position:relative;width:min(92vw,430px);display:grid;gap:10px;padding:34px 30px 24px;text-align:center;color:#e3d6ff;font-family:Cinzel,"Cormorant Garamond",serif;background:linear-gradient(160deg,#1b1238f2,#0a0716f5);border:1px solid #c7a2ff3d;border-radius:4px;box-shadow:0 0 0 1px #05030a,0 0 60px #7a54ff44,0 30px 80px #000c,inset 0 0 50px #7a54ff1a;animation:onlPanel .6s cubic-bezier(.2,.8,.2,1) both}
@keyframes onlPanel{from{opacity:0;transform:translateY(24px) scale(.95);filter:blur(8px)}}
.onl>div::before,.onl>div::after{content:"";position:absolute;width:14px;height:14px;background:linear-gradient(135deg,#bffcef,#2cc9d9);box-shadow:0 0 0 2px #f2d58a,0 0 14px #2cf0c4aa;transform:rotate(45deg);animation:onlGem 3s ease-in-out infinite alternate}
.onl>div::before{left:-8px;top:-8px}.onl>div::after{right:-8px;bottom:-8px;animation-delay:1.5s}
@keyframes onlGem{to{filter:brightness(1.5);box-shadow:0 0 0 2px #f2d58a,0 0 22px #2cf0c4}}
.onl h2{margin:0 0 6px;font:800 clamp(30px,6vw,42px)/1 Cinzel,serif;letter-spacing:.04em;background:linear-gradient(180deg,#fff 0,#d9c8ff 50%,#8d6fe0 100%);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;filter:drop-shadow(0 0 16px #8a5cff88)}
.onl h2::after{content:"";display:block;height:1px;margin:14px auto 0;width:70%;background:linear-gradient(90deg,transparent,#f2d58aaa,transparent)}
.onl p{margin:0;font:500 14px Cinzel,serif;letter-spacing:.06em;color:#c9bbe8}
.onl p[style]{display:flex;align-items:center;gap:12px;font-size:12px;letter-spacing:.18em;text-transform:uppercase;color:#a99cc8!important;opacity:1!important}
.onl p[style]::before,.onl p[style]::after{content:"";flex:1;height:1px;background:linear-gradient(90deg,transparent,#c7a2ff55)}
.onl p[style]::after{transform:scaleX(-1)}
.onl button{font:inherit;cursor:pointer}
.onl button.btn{display:inline-flex;align-items:center;justify-content:center;margin:0 auto;padding:4px 10px;border:0;background:none;box-shadow:none;border-radius:0;font:700 clamp(22px,4.4vw,30px)/1.2 Cinzel,serif;letter-spacing:.03em;color:#e3d6ff;text-shadow:0 0 14px #8a5cff99,0 2px 0 #1a0f38;transition:color .2s,text-shadow .2s,transform .2s}
.onl button.btn::before{content:"";flex:none;width:0;height:.5em;margin-right:0;transform:rotate(45deg) scale(0);background:linear-gradient(135deg,#bffcef,#2cc9d9);box-shadow:0 0 0 2px #f2d58a,0 0 12px #2cf0c4aa;transition:width .22s,margin .22s,transform .22s}
.onl button.btn:hover,.onl button.btn:focus-visible{outline:0;color:#fff;transform:translateX(3px);text-shadow:0 0 18px #c7a2ffcc,0 0 4px #fff8,0 2px 0 #1a0f38}
.onl button.btn:hover::before,.onl button.btn:focus-visible::before{width:.5em;margin-right:.55em;transform:rotate(45deg) scale(1)}
.onl button.ghost{justify-self:center;margin-top:6px;padding:6px 14px;border:0;background:none;font:600 12px Cinzel,serif;letter-spacing:.3em;text-transform:uppercase;color:#f2d58a99;transition:color .2s,text-shadow .2s}
.onl button.ghost:hover,.onl button.ghost:focus-visible{outline:0;color:#f2d58a;text-shadow:0 0 12px #f2d58a88}
.onl input{width:min(100%,250px);justify-self:center;padding:8px 6px 6px;font:700 34px Cinzel,serif;letter-spacing:.5em;padding-left:.5em;text-align:center;text-transform:uppercase;color:#bffcef;caret-color:#2cf0c4;background:#0c0820aa;border:0;border-bottom:2px solid #c7a2ff77;border-radius:2px;text-shadow:0 0 14px #2cf0c488;transition:border-color .25s,box-shadow .25s,background .25s}
.onl input::placeholder{color:#c7a2ff40;text-shadow:none}
.onl input:focus{outline:0;border-bottom-color:#2cf0c4;background:#120c2acc;box-shadow:0 10px 24px -10px #2cf0c488,inset 0 0 20px #7a54ff22}
.onl .st{min-height:1.4em;font:500 13px Cinzel,serif;letter-spacing:.12em;color:#f2d58a}
.onl .st:not(:empty){animation:onlSt 1.4s ease-in-out infinite alternate}
@keyframes onlSt{from{opacity:.55}}
.roomtag{position:fixed;top:8px;left:50%;transform:translateX(-50%);z-index:8000;font:600 12px Cinzel,serif;letter-spacing:.2em;padding:5px 16px;border-radius:99px;background:linear-gradient(160deg,#1b1238ee,#0a0716ee);border:1px solid #c7a2ff55;box-shadow:0 0 16px #7a54ff44;color:#e3d6ff;pointer-events:none}
@media(prefers-reduced-motion:reduce){.onl,.onl>div,.onl>div::before,.onl>div::after,.onl .mt,.onl .st{animation:none!important}}
`;
let tag: HTMLElement | null = null, menu: HTMLElement | null = null;
function style() { if (!document.getElementById('onl-css')) { const s = document.createElement('style'); s.id = 'onl-css'; s.textContent = CSS; document.head.append(s); } }

export function setRoomTag(text: string) {
  style(); if (!tag) { tag = document.createElement('div'); tag.className = 'roomtag'; document.body.append(tag); }
  tag.textContent = text; tag.hidden = !text;
}
export function closeMenu() { menu?.remove(); menu = null; }
export function menuStatus(t: string) { const e = menu?.querySelector('.st'); if (e) e.textContent = t; }

export function openOnlineMenu(a: { create(): Promise<void>; join(code: string): Promise<void>; leave?: () => void; inRoom: boolean }) {
  style(); closeMenu();
  menu = document.createElement('div'); menu.className = 'onl';
  menu.innerHTML = `<i class=\"mt\" style=\"--x:8%;--s:3px;--c:#c7a2ff;--d:11s;--w:-1s;--dx:30px\"></i><i class=\"mt\" style=\"--x:22%;--s:2px;--c:#2cf0c4;--d:14s;--w:-6s;--dx:-40px\"></i><i class=\"mt\" style=\"--x:37%;--s:4px;--c:#f2d58a;--d:12s;--w:-3s;--dx:25px\"></i><i class=\"mt\" style=\"--x:52%;--s:2px;--c:#c7a2ff;--d:15s;--w:-9s;--dx:-20px\"></i><i class=\"mt\" style=\"--x:66%;--s:3px;--c:#2cf0c4;--d:10s;--w:-4s;--dx:40px\"></i><i class=\"mt\" style=\"--x:80%;--s:4px;--c:#f2d58a;--d:13s;--w:-7s;--dx:-30px\"></i><i class=\"mt\" style=\"--x:92%;--s:2px;--c:#c7a2ff;--d:12s;--w:-2s;--dx:20px\"></i><div><h2>Jugar online</h2>
    ${a.inRoom ? '<p>Ya estás en una sala.</p><button class="btn" data-x="leave">Salir de la sala</button>'
      : '<button class="btn" data-x="create">Crear sala</button><p style="margin:0;opacity:.7">o únete con un código</p><input data-x="code" maxlength="4" placeholder="K7QF" autocomplete="off"><button class="btn" data-x="join">Unirse</button>'}
    <div class="st"></div><button class="ghost" data-x="close">Cerrar</button></div>`;
  document.body.append(menu);
  const run = (f: () => Promise<void>) => { menuStatus('Conectando…'); f().catch(e => menuStatus(e?.message ?? 'Error')); };
  menu.addEventListener('click', ev => {
    const x = (ev.target as HTMLElement).dataset.x; if (!x) return;
    if (x === 'close') closeMenu();
    else if (x === 'create') run(a.create);
    else if (x === 'join') run(() => a.join((menu!.querySelector('[data-x=code]') as HTMLInputElement).value));
    else if (x === 'leave') { a.leave?.(); closeMenu(); }
  });
  menu.addEventListener('keydown', ev => { ev.stopPropagation(); if ((ev as KeyboardEvent).key === 'Enter') (menu!.querySelector('[data-x=join]') as HTMLElement | null)?.click(); });
}
