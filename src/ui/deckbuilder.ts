// Constructor de mazos: elige 40 cartas (máx. 2 copias de cada una), ponles nombre y guárdalos junto a los predeterminados.
import { CARDS, DECKS, LUMINARAE, UMBRA } from '../data/cards';
import { NATION_CARDS } from '../data/nations';
import { NATIONS } from '../adventure/rivals';
import { KWD, KWN, SPD, SPN } from './keywords';
import { DECK_SIZE, MAX_COPIES, customDecks, deckError, esc, getDeck, natUnlocked, newDeckId, removeCustom, saveCustom, setDeck } from '../decks';
import { imageOf, nameOf } from './skins';
import { sfx } from './sound';

/** Todas las naciones, al mismo nivel: [prefijo de sus cartas, nombre, color del borde, id en la Aventura]. */
const NATS: [string, string, string, string][] = ([['lum', 'Luminarae', '#f2d58a', ''], ['umb', 'Umbra', '#9a6bff', ''], ['lms', 'Lumis', '#3de6ff', 'lumis'], ['arb', 'Arboris', '#69d86f', 'arboris'], ['neg', 'Negatt', '#a65cff', 'negatt'],
  ['bor', 'Boro', '#ff3fa4', 'boro'], ['ska', 'Skaldrum', '#e0a040', 'skaldrum'], ['mkv', 'Markivton', '#ff7a45', 'markivton'], ['tsk', 'Tribus Skaldrak', '#bfe6ff', 'tribus'],
  ['psy', 'Psybernia', '#d49a6a', 'psybernia'], ['sin', 'Sinfalía', '#ffd84d', 'sinfalia'], ['ost', 'Ostraca', '#9db4d6', 'ostraca'], ['pon', 'Pongí', '#ff8fd0', 'pongi'],
  ['krn', 'Krahn', '#a3a58b', 'presidio'], ['syl', 'Sylvaris', '#b08a4a', 'sylvaris'], ['dsj', 'Disnjav', '#c6ff3d', 'disnjav']] as [string, string, string, string][]).sort((x, y) => x[1].localeCompare(y[1]));
/** Mazo de 40 para copiar: Luminarae/Umbra tal cual; las demás naciones, el núcleo del mazo de su jefe. */
const copyOf = (k: string): string[] => k === 'lum' ? [...DECKS.Luminarae] : k === 'umb' ? [...DECKS.Umbra] : (NATIONS[NATS.find(n => n[0] === k)![3]]?.rivals.at(-1)?.deck ?? []).slice(0, DECK_SIZE);
const NAT_CSS = NATS.map(([k, , c]) => `.dk .dk-t.${k}{border-color:${c}aa}.dk-list li.${k}{border-left-color:${c}}`).join('\n');

const CSS = NAT_CSS + `
.dk{position:fixed;inset:0;z-index:9500;display:grid;place-items:center;overflow:hidden;color:#e3d6ff;font:500 13px Inter,system-ui,sans-serif;background:radial-gradient(ellipse 70% 80% at 50% 45%,#2a1a5acc 0,#0d0820e6 55%,#04020aef 100%);-webkit-backdrop-filter:blur(7px);backdrop-filter:blur(7px);animation:dkIn .35s ease-out both}
@keyframes dkIn{from{opacity:0}}
.dk .mt{position:absolute;bottom:-12px;left:var(--x);width:var(--s);height:var(--s);border-radius:50%;background:var(--c);box-shadow:0 0 10px var(--c);opacity:0;animation:dkMote var(--d) var(--w) linear infinite;pointer-events:none}
@keyframes dkMote{0%{transform:translate(0,0);opacity:0}15%{opacity:.9}100%{transform:translate(var(--dx),-105vh);opacity:0}}
.dk-in{position:relative;width:min(1180px,98vw);height:min(760px,96vh);display:grid;grid-template-rows:auto auto 1fr;gap:12px;padding:20px 22px 16px;background:linear-gradient(160deg,#1b1238f2,#0a0716f5);border:1px solid #c7a2ff3d;border-radius:4px;box-shadow:0 0 0 1px #05030a,0 0 60px #7a54ff44,0 30px 80px #000c,inset 0 0 50px #7a54ff1a;animation:dkPanel .6s cubic-bezier(.2,.8,.2,1) both}
@keyframes dkPanel{from{opacity:0;transform:translateY(24px) scale(.96);filter:blur(8px)}}
.dk-in::before,.dk-in::after{content:"";position:absolute;width:14px;height:14px;background:linear-gradient(135deg,#bffcef,#2cc9d9);box-shadow:0 0 0 2px #f2d58a,0 0 14px #2cf0c4aa;transform:rotate(45deg);animation:dkGem 3s ease-in-out infinite alternate}
.dk-in::before{left:-8px;top:-8px}.dk-in::after{right:-8px;bottom:-8px;animation-delay:1.5s}
@keyframes dkGem{to{filter:brightness(1.5);box-shadow:0 0 0 2px #f2d58a,0 0 22px #2cf0c4}}
.dk .dk-h{display:flex;justify-content:space-between;align-items:center;padding-bottom:10px;border-bottom:1px solid transparent;border-image:linear-gradient(90deg,#f2d58aaa,transparent 70%) 1}
.dk h2{margin:0;font:800 clamp(26px,3.4vw,36px)/1 Cinzel,serif;letter-spacing:.05em;background:linear-gradient(180deg,#fff 0,#d9c8ff 50%,#8d6fe0 100%);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;filter:drop-shadow(0 0 14px #8a5cff77)}
.dk button,.dk select,.dk input{font:inherit;color:inherit}
.dk .b{padding:8px 16px;border-radius:2px;border:1px solid #c7a2ff55;background:#ffffff08;cursor:pointer;font:600 12px Cinzel,serif;letter-spacing:.12em;text-transform:uppercase;color:#e3d6ff;transition:color .2s,border-color .2s,box-shadow .2s,background .2s,transform .2s}
.dk .b:hover:not(:disabled),.dk .b:focus-visible{outline:0;background:#7a54ff2e;color:#fff;border-color:#2cf0c4;box-shadow:0 0 16px -2px #2cf0c488;transform:translateY(-1px)}
.dk .b:disabled{opacity:.35;cursor:not-allowed}
.dk .b.go{background:linear-gradient(#ffe9a8,#d9a640);color:#1a1204;border-color:#fff0b8;font-weight:800;box-shadow:0 0 18px -4px #f2d58a;animation:dkGo 2.4s ease-in-out infinite alternate}
@keyframes dkGo{to{box-shadow:0 0 28px 0 #f2d58aaa}}
.dk .b.go:hover:not(:disabled){background:linear-gradient(#fff3c4,#ecb94c);color:#1a1204;border-color:#fff}
.dk .b.bad{border-color:#ff6a7466;color:#ff9aa2}.dk .b.bad:hover:not(:disabled){background:#ff6a7422;border-color:#ff6a74;color:#fff;box-shadow:0 0 16px -2px #ff6a7488}
.dk .dk-h .b{border:0;background:none;color:#f2d58a99;letter-spacing:.3em;padding:6px 10px}.dk .dk-h .b:hover:not(:disabled),.dk .dk-h .b:focus-visible{background:none;color:#f2d58a;box-shadow:none;text-shadow:0 0 12px #f2d58a88;transform:none}
.dk select,.dk input{background:#0c0820cc;border:1px solid #c7a2ff44;border-radius:2px;color:#e3d6ff;transition:border-color .2s,box-shadow .2s}
.dk select:hover,.dk input:hover{border-color:#c7a2ff88}.dk select:focus,.dk input:focus{outline:0;border-color:#2cf0c4;box-shadow:0 0 14px -4px #2cf0c4}
.dk input::placeholder{color:#c7a2ff55}
.dk-bar{display:flex;gap:8px;flex-wrap:wrap;align-items:center}.dk-bar select{padding:8px 10px;min-width:200px;cursor:pointer}
.dk-main{display:grid;grid-template-columns:1fr 310px;gap:14px;min-height:0}
.dk-cat,.dk-side{display:flex;flex-direction:column;gap:10px;min-height:0}
.dk-f{display:flex;gap:6px;flex-wrap:wrap;align-items:center}
.dk-f button{padding:5px 14px;border-radius:99px;border:1px solid #c7a2ff2e;background:none;cursor:pointer;opacity:.7;font:600 11px Cinzel,serif;letter-spacing:.1em;text-transform:uppercase;transition:all .2s}
.dk-f button:hover{opacity:1;border-color:#c7a2ff88}
.dk-f button.on{opacity:1;border-color:#2cf0c4;color:#bffcef;background:#2cf0c414;box-shadow:0 0 14px -4px #2cf0c4;text-shadow:0 0 10px #2cf0c4aa}
.dk-f select{padding:5px 12px;border-radius:99px;cursor:pointer}
.dk-f input{padding:5px 12px;border-radius:99px;width:150px}
.dk-grid{overflow:auto;display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));grid-auto-rows:200px;gap:10px;align-content:start;padding:4px 6px 4px 4px;scrollbar-width:thin;scrollbar-color:#7a54ff88 transparent}
.dk .dk-t{all:unset;box-sizing:border-box;display:block;position:relative;height:200px;border-radius:6px;overflow:hidden;border:2px solid #ffffff22;background:#150e2e;cursor:pointer;text-align:left;transition:transform .18s,box-shadow .18s}
.dk .dk-t:focus-visible{outline:2px solid #2cf0c4}
.dk .dk-t:hover{transform:translateY(-4px) scale(1.02);box-shadow:0 12px 24px #000b,0 0 22px #7a54ff66}
.dk-t img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;transition:transform .5s}.dk .dk-t:hover img{transform:scale(1.07)}
.dk-t::after{content:"";position:absolute;inset:0;background:linear-gradient(transparent 40%,#000e)}
.dk-t::before{content:"";position:absolute;inset:0;z-index:3;pointer-events:none;background:linear-gradient(115deg,transparent 38%,#ffffff38 50%,transparent 62%);transform:translateX(-120%);transition:transform .7s}
.dk .dk-t:hover::before{transform:translateX(120%)}
.dk-t .c{position:absolute;top:6px;left:6px;z-index:2;width:27px;height:27px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#6f9bff,#2a4fc4);border:2px solid #f2d58a;box-shadow:0 0 10px #2a5fd488;display:grid;place-items:center;font:800 13px Cinzel,serif;font-style:normal}
.dk-t .n{position:absolute;left:8px;right:8px;bottom:26px;z-index:2;font:700 13px Cinzel,serif;line-height:1.15;text-shadow:0 1px 3px #000}
.dk-t .s{position:absolute;left:8px;right:8px;bottom:8px;z-index:2;font-size:12px;opacity:.9}
.dk-t .k{position:absolute;top:5px;right:5px;z-index:2;padding:2px 8px;border-radius:99px;background:linear-gradient(#ffe9a8,#d9a640);color:#1a1204;font:800 12px Cinzel,serif;box-shadow:0 0 10px #f2d58a88}
.dk .dk-t.full{filter:grayscale(.8) brightness(.6)}
.dk-side{background:linear-gradient(160deg,#120c2acc,#0a0716cc);border:1px solid #c7a2ff2e;border-radius:3px;padding:12px;box-shadow:inset 0 0 30px -12px #7a54ff}
.dk-side input{padding:9px 10px;font:700 15px Cinzel,serif;letter-spacing:.04em}
.dk-count{font:800 16px Cinzel,serif;letter-spacing:.06em;color:#e3d6ff}.dk-count.ok{color:#bffcef;text-shadow:0 0 12px #2cf0c488}
.dk-pb{height:5px;border-radius:9px;background:#ffffff14;overflow:hidden;margin-top:-4px}
.dk-pb i{display:block;height:100%;width:0;border-radius:9px;background:linear-gradient(90deg,#7a54ff,#c7a2ff);box-shadow:0 0 10px #7a54ff;transition:width .35s cubic-bezier(.2,.8,.2,1),background .3s}
.dk-pb.ok i{background:linear-gradient(90deg,#2cc9d9,#bffcef);box-shadow:0 0 12px #2cf0c4}
.dk-list{flex:1;overflow:auto;margin:0;padding:0 4px 0 0;list-style:none;display:grid;gap:4px;align-content:start;scrollbar-width:thin;scrollbar-color:#7a54ff88 transparent}
.dk-list li{display:flex;gap:8px;align-items:center;padding:5px 9px;background:linear-gradient(90deg,#241a4acc,#150e2ecc);cursor:pointer;border-left:3px solid #f2d58a;transition:transform .18s,background .18s}
.dk-list li:hover{background:linear-gradient(90deg,#33256acc,#1c1340cc);transform:translateX(3px)}
.dk-list li i{width:21px;height:21px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#6f9bff,#2a4fc4);border:1px solid #f2d58a99;display:grid;place-items:center;font:800 11px Cinzel,serif;font-style:normal;flex:none}
.dk-list li span{flex:1}.dk-list li em{opacity:.75;font-style:normal;font-family:Cinzel,serif;font-weight:700}
.dk-tip{position:fixed;z-index:9600;max-width:270px;padding:10px 12px;border-radius:3px;background:linear-gradient(160deg,#1b1238f8,#0a0716f8);border:1px solid #c7a2ff77;box-shadow:0 8px 24px #000c,0 0 20px #7a54ff44;pointer-events:none;font-size:12px;line-height:1.4}
.dk-tip b.t{font:800 14px Cinzel,serif;color:#f2d58a;display:block}.dk-tip .m{opacity:.75;margin:2px 0 6px}.dk-tip p{margin:4px 0 0}.dk-tip p b{color:#ffe39a}
.dk-msg{min-height:1.3em;font-size:12px;color:#ffb3b9}.dk-msg.ok{color:#bffcef}
@media(max-width:800px){.dk-main{grid-template-columns:1fr;grid-template-rows:1fr 1fr}.dk-in{height:98vh}}
@media(prefers-reduced-motion:reduce){.dk,.dk-in,.dk-in::before,.dk-in::after,.dk .mt,.dk .b.go{animation:none!important}.dk-t::before{display:none}}
`;

let root: HTMLElement | null = null;

/** Abre el constructor. `onChange` se llama al guardar/borrar/elegir (para refrescar el menú). */
export function openDeckBuilder(onChange: () => void) {
  if (root) return;
  if (!document.getElementById('dk-css')) { const s = document.createElement('style'); s.id = 'dk-css'; s.textContent = CSS; document.head.append(s); }
  // Solo Luminarae, Umbra y las naciones desbloqueadas (vencidos todos sus rivales)
  const avail = NATS.filter(n => n[0] === 'lum' || n[0] === 'umb' || natUnlocked(n[3])), okPre = new Set(avail.map(n => n[0]));
  const all = [...LUMINARAE, ...UMBRA, ...NATION_CARDS.filter(c => !c.token)].filter(c => okPre.has(c.id.slice(0, 3)));   // las fichas no van en mazos
  let cur: { id: string | null; name: string; cards: string[] } = { id: null, name: '', cards: [] };
  let dirty = false, fFac = 'all', fType = 'all', q = '', msg = '', msgOk = false;
  const sel = getDeck(), start = customDecks().find(d => d.id === sel);
  if (start) cur = { ...start, cards: [...start.cards] };

  const el = root = document.createElement('div'); el.className = 'dk';
  el.innerHTML = `<i class="mt" style="--x:8%;--s:3px;--c:#c7a2ff;--d:11s;--w:-1s;--dx:30px"></i><i class="mt" style="--x:22%;--s:2px;--c:#2cf0c4;--d:14s;--w:-6s;--dx:-40px"></i><i class="mt" style="--x:37%;--s:4px;--c:#f2d58a;--d:12s;--w:-3s;--dx:25px"></i><i class="mt" style="--x:52%;--s:2px;--c:#c7a2ff;--d:15s;--w:-9s;--dx:-20px"></i><i class="mt" style="--x:66%;--s:3px;--c:#2cf0c4;--d:10s;--w:-4s;--dx:40px"></i><i class="mt" style="--x:80%;--s:4px;--c:#f2d58a;--d:13s;--w:-7s;--dx:-30px"></i><i class="mt" style="--x:92%;--s:2px;--c:#c7a2ff;--d:12s;--w:-2s;--dx:20px"></i><div class="dk-in">
    <div class="dk-h"><h2>Mis Mazos</h2><button class="b" data-x="close">Cerrar</button></div>
    <div class="dk-bar"><select data-x="pick"></select>
      <select data-x="copy" title="Empieza con una copia del mazo de una nación"><option value="">📋 Copiar mazo de…</option>${avail.map(([k, n]) => `<option value="${k}">${n}</option>`).join('')}</select><button class="b" data-x="clear">Vaciar</button></div>
    <div class="dk-main">
      <section class="dk-cat"><div class="dk-f" data-x="filters">
        <select data-x="nat" title="Filtrar por nación"><option value="">🌍 Todas las naciones</option>${avail.map(([k, n]) => `<option value="${k}">${n}</option>`).join('')}</select><span style="width:10px"></span>
        <button data-t="all" class="on">Todo</button><button data-t="unit">Unidades</button><button data-t="spell">Hechizos</button><input data-x="q" placeholder="Buscar…" autocomplete="off"></div>
        <div class="dk-grid"></div></section>
      <aside class="dk-side"><input data-x="name" maxlength="24" placeholder="Nombre del mazo">
        <div class="dk-count"></div><div class="dk-pb"><i></i></div><ul class="dk-list"></ul><div class="dk-msg"></div>
        <button class="b go" data-x="use">Guardar y jugar con este mazo</button><button class="b" data-x="save">Guardar</button><button class="b bad" data-x="del">Eliminar mazo</button></aside>
    </div></div>`;
  document.body.append(el);
  const $ = <T extends HTMLElement>(s: string) => el.querySelector<T>(s)!;
  const count = (id: string) => cur.cards.filter(c => c === id).length;
  const discardOk = () => !dirty || confirm('Hay cambios sin guardar. ¿Descartarlos?');

  const fillPick = () => {
    const ds = customDecks();
    $('[data-x=pick]').innerHTML = `<option value="">＋ Mazo nuevo</option>` + ds.map(d => `<option value="${d.id}" ${d.id === cur.id ? 'selected' : ''}>${esc(d.name)}</option>`).join('');
  };
  const grid = () => {
    const ql = q.trim().toLowerCase();
    $('.dk-grid').innerHTML = all.filter(c => (fFac === 'all' || c.id.startsWith(fFac)) && (fType === 'all' || c.type === fType) && (!ql || nameOf(c.id).toLowerCase().includes(ql) || c.text.toLowerCase().includes(ql)))
      .sort((a, b) => a.cost - b.cost || nameOf(a.id).localeCompare(nameOf(b.id))).map(c => {
        const n = count(c.id), full = n >= MAX_COPIES || cur.cards.length >= DECK_SIZE;
        return `<button class="dk-t ${c.id.slice(0, 3)} ${full ? 'full' : ''}" data-add="${c.id}">
          <img src="${imageOf(c.id)}" alt="" onerror="this.remove()"><i class="c">${c.cost}</i>${n ? `<span class="k">×${n}</span>` : ''}
          <b class="n">${esc(nameOf(c.id))}</b><span class="s">${c.type === 'unit' ? `⚔ ${c.atk} · ♥ ${c.hp}` : 'Hechizo'}</span></button>`;
      }).join('');
  };
  const side = () => {
    const n = cur.cards.length, err = deckError(cur.cards);
    const rows = [...new Set(cur.cards)].sort((a, b) => CARDS[a].cost - CARDS[b].cost || nameOf(a).localeCompare(nameOf(b)));
    $('.dk-count').textContent = `${n} / ${DECK_SIZE} cartas`; $('.dk-count').classList.toggle('ok', !err); $('.dk-pb').classList.toggle('ok', !err); $('.dk-pb i').style.width = Math.min(100, (n / DECK_SIZE) * 100) + '%';
    $('.dk-list').innerHTML = rows.map(id => `<li class="${id.slice(0, 3)}" data-rm="${id}"><i>${CARDS[id].cost}</i><span>${esc(nameOf(id))}</span><em>×${count(id)}</em></li>`).join('') || '<li style="cursor:default;opacity:.6">Toca cartas para añadirlas</li>';
    $('.dk-msg').textContent = msg || (err ?? ''); $('.dk-msg').classList.toggle('ok', !!msg && msgOk);
    ($('[data-x=save]') as HTMLButtonElement).disabled = ($('[data-x=use]') as HTMLButtonElement).disabled = !!err;
    ($('[data-x=del]') as HTMLButtonElement).hidden = !cur.id;
    ($('[data-x=name]') as HTMLInputElement).value = cur.name;
  };
  const refresh = () => { grid(); side(); fillPick(); };
  const edit = () => { dirty = true; msg = ''; };
  const save = () => {
    try {
      if (!cur.name.trim()) cur.name = `Mazo ${customDecks().length + 1}`;
      cur.id ??= newDeckId(); saveCustom({ id: cur.id, name: cur.name, cards: cur.cards });
      cur.name = cur.name.trim().slice(0, 24); dirty = false; msg = 'Guardado ✓'; msgOk = true; onChange(); return true;
    } catch (e) { msg = (e as Error).message; msgOk = false; return false; }
  };
  const close = () => { if (!discardOk()) return; el.remove(); root = null; onChange(); };
  const load = (d: { id: string | null; name: string; cards: string[] }) => { cur = { id: d.id, name: d.name, cards: [...d.cards] }; dirty = false; msg = ''; refresh(); };

  el.addEventListener('click', ev => {
    const t = ev.target as HTMLElement, add = t.closest<HTMLElement>('[data-add]'), rm = t.closest<HTMLElement>('[data-rm]'), ty = t.closest<HTMLElement>('[data-t]'), x = t.closest<HTMLElement>('[data-x]')?.dataset.x;
    if (add) {
      const id = add.dataset.add!;
      if (cur.cards.length >= DECK_SIZE) { msg = `El mazo ya tiene ${DECK_SIZE} cartas: quita alguna primero`; msgOk = false; side(); return; }
      if (count(id) >= MAX_COPIES) { msg = `Máximo ${MAX_COPIES} copias de ${nameOf(id)}`; msgOk = false; side(); return; }
      cur.cards.push(id); edit(); sfx('select'); refresh();
    } else if (rm) { const i = cur.cards.lastIndexOf(rm.dataset.rm!); if (i >= 0) cur.cards.splice(i, 1); edit(); refresh(); }
    else if (ty) { fType = ty.dataset.t!; el.querySelectorAll('[data-t]').forEach(b => b.classList.toggle('on', b === ty)); grid(); }
    else if (x === 'close') close();
    else if (x === 'clear') { if (!cur.cards.length) return; cur.cards = []; edit(); refresh(); }
    else if (x === 'save') { save(); refresh(); }
    else if (x === 'use') { if (save()) { setDeck(cur.id!); sfx('start'); el.remove(); root = null; onChange(); } else side(); }
    else if (x === 'del') { if (cur.id && confirm(`¿Eliminar el mazo "${cur.name}"?`)) { removeCustom(cur.id); onChange(); load({ id: null, name: '', cards: [] }); } }
  });
  $('[data-x=pick]').addEventListener('change', ev => {
    const id = (ev.target as HTMLSelectElement).value;
    if (!discardOk()) { fillPick(); return; }
    const d = customDecks().find(x => x.id === id); load(d ?? { id: null, name: '', cards: [] });
  });
  $('[data-x=nat]').addEventListener('change', ev => {
    fFac = (ev.target as HTMLSelectElement).value || 'all'; grid();
  });
  $('[data-x=copy]').addEventListener('change', ev => {
    const sl = ev.target as HTMLSelectElement, k = sl.value; sl.value = ''; if (!k) return;
    if (!discardOk()) return;
    load({ id: null, name: `${NATS.find(n => n[0] === k)![1]} (copia)`, cards: copyOf(k) }); dirty = true;
  });
  $('[data-x=name]').addEventListener('input', ev => { cur.name = (ev.target as HTMLInputElement).value; dirty = true; });
  $('[data-x=q]').addEventListener('input', ev => { q = (ev.target as HTMLInputElement).value; grid(); });
  // el teclado no debe llegar al juego (Espacio = pasar turno); Escape cierra
  el.addEventListener('keydown', ev => { ev.stopPropagation(); if (ev.key === 'Escape') close(); });
  // Descripción al pasar el cursor sobre una carta (catálogo o lista del mazo)
  const tip = document.createElement('div'); tip.className = 'dk-tip'; tip.hidden = true; el.append(tip);
  const tipHTML = (id: string) => {
    const c = CARDS[id], kws = c.kw.map(k => `<p><b>${KWN[k]}:</b> ${KWD[k]}</p>`).join('');
    return `<b class="t">${esc(nameOf(id))}</b><div class="m">Coste ${c.cost} · ${c.type === 'unit' ? `Unidad ${c.atk}/${c.hp}` : `Hechizo · ${SPN[c.speed ?? 'fast']}`}</div>${c.text ? `<div>${esc(c.text)}</div>` : ''}${kws}${c.type === 'spell' ? `<p>${SPD[c.speed ?? 'fast']}</p>` : ''}`;
  };
  const place = (e: MouseEvent) => { const w = tip.offsetWidth, h = tip.offsetHeight; tip.style.left = Math.max(8, Math.min(innerWidth - w - 8, e.clientX + 16)) + 'px'; tip.style.top = Math.max(8, Math.min(innerHeight - h - 8, e.clientY + 16)) + 'px'; };
  el.addEventListener('mousemove', ev => {
    const t = (ev.target as HTMLElement).closest<HTMLElement>('[data-add],[data-rm]'), id = t?.dataset.add ?? t?.dataset.rm;
    if (!id || !CARDS[id]) { tip.hidden = true; return; }
    if (tip.dataset.id !== id) { tip.innerHTML = tipHTML(id); tip.dataset.id = id; }
    tip.hidden = false; place(ev);
  });
  el.addEventListener('mouseleave', () => { tip.hidden = true; });
  refresh();
}
