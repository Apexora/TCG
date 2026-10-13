// Constructor de mazos: elige 30 cartas (máx. 2 copias de cada una), ponles nombre y guárdalos junto a los predeterminados.
import { CARDS, LUMINARAE, UMBRA } from '../data/cards';
import { DECK_SIZE, MAX_COPIES, customDecks, deckError, esc, getDeck, newDeckId, removeCustom, saveCustom, setDeck } from '../decks';
import { imageOf, nameOf } from './skins';
import { sfx } from './sound';

const CSS = `
.dk{position:fixed;inset:0;z-index:9500;background:rgba(5,4,10,.94);display:grid;place-items:center;color:#e9e6f2;font:500 13px Inter,system-ui,sans-serif}
.dk-in{width:min(1180px,98vw);height:min(760px,96vh);display:grid;grid-template-rows:auto auto 1fr;gap:10px;padding:14px;background:#100d18;border:1px solid #f2d58a44;border-radius:14px}
.dk .dk-h{display:flex;justify-content:space-between;align-items:center}.dk h2{margin:0;font:700 20px Cinzel,serif;color:#f2d58a;letter-spacing:.08em}
.dk button,.dk select,.dk input{font:inherit;color:inherit}
.dk .b{padding:8px 14px;border-radius:8px;border:1px solid #f2d58a66;background:#1b1722;cursor:pointer}.dk .b:hover:not(:disabled){background:#f2d58a;color:#1a1204}
.dk .b:disabled{opacity:.35;cursor:not-allowed}.dk .b.go{background:linear-gradient(#ffe39a,#d19a2f);color:#1a1204;font-weight:700}.dk .b.bad{border-color:#ff6a7488;color:#ff9aa2}
.dk-bar{display:flex;gap:8px;flex-wrap:wrap;align-items:center}.dk-bar select{padding:8px;border-radius:8px;background:#0c0a12;border:1px solid #f2d58a66;min-width:200px}
.dk-main{display:grid;grid-template-columns:1fr 300px;gap:12px;min-height:0}
.dk-cat,.dk-side{display:flex;flex-direction:column;gap:8px;min-height:0}
.dk-f{display:flex;gap:6px;flex-wrap:wrap}.dk-f button{padding:5px 11px;border-radius:99px;border:1px solid #ffffff22;background:none;cursor:pointer;opacity:.7}.dk-f button.on{opacity:1;border-color:#f2d58a;color:#f2d58a;background:#f2d58a14}
.dk-f input{padding:5px 10px;border-radius:99px;border:1px solid #ffffff22;background:#0c0a12;width:150px}
.dk-grid{overflow:auto;display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));grid-auto-rows:200px;gap:10px;align-content:start;padding:4px}
.dk .dk-t{all:unset;box-sizing:border-box;display:block;position:relative;height:200px;border-radius:10px;overflow:hidden;border:2px solid #ffffff22;background:#1b1722;cursor:pointer;text-align:left;transition:transform .12s,box-shadow .12s}
.dk .dk-t:focus-visible{outline:2px solid #fff}
.dk .dk-t.lum{border-color:#f2d58a88}.dk .dk-t.umb{border-color:#9a6bffaa}.dk .dk-t:hover{transform:translateY(-2px);box-shadow:0 6px 16px #000a}
.dk-t img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.dk-t::after{content:"";position:absolute;inset:0;background:linear-gradient(transparent 40%,#000e)}
.dk-t .c{position:absolute;top:6px;left:6px;z-index:2;width:26px;height:26px;border-radius:50%;background:#2a5fd4;display:grid;place-items:center;font:700 13px Inter;font-style:normal}
.dk-t .n{position:absolute;left:8px;right:8px;bottom:26px;z-index:2;font:700 13px Cinzel,serif;line-height:1.15;text-shadow:0 1px 3px #000}
.dk-t .s{position:absolute;left:8px;right:8px;bottom:8px;z-index:2;font-size:12px;opacity:.9}
.dk-t .k{position:absolute;top:5px;right:5px;z-index:2;padding:2px 7px;border-radius:99px;background:#f2d58a;color:#1a1204;font:700 12px Inter}
.dk .dk-t.full{filter:grayscale(.8) brightness(.6)}
.dk-side{background:#0c0a12;border:1px solid #ffffff1a;border-radius:10px;padding:10px}
.dk-side input{padding:8px;border-radius:8px;background:#14101c;border:1px solid #f2d58a55}
.dk-count{font:700 15px Inter}.dk-count.ok{color:#7dffb0}
.dk-list{flex:1;overflow:auto;margin:0;padding:0;list-style:none;display:grid;gap:3px;align-content:start}
.dk-list li{display:flex;gap:8px;align-items:center;padding:4px 8px;border-radius:6px;background:#1b1722;cursor:pointer;border-left:3px solid #f2d58a}.dk-list li.umb{border-left-color:#9a6bff}.dk-list li:hover{background:#2a2236}
.dk-list li i{width:20px;height:20px;border-radius:50%;background:#2a5fd4;display:grid;place-items:center;font:700 11px Inter;font-style:normal;flex:none}.dk-list li span{flex:1}.dk-list li em{opacity:.7;font-style:normal}
.dk-msg{min-height:1.3em;font-size:12px;color:#ffb3b9}.dk-msg.ok{color:#7dffb0}
@media(max-width:800px){.dk-main{grid-template-columns:1fr;grid-template-rows:1fr 1fr}.dk-in{height:98vh}}
`;

let root: HTMLElement | null = null;

/** Abre el constructor. `onChange` se llama al guardar/borrar/elegir (para refrescar el menú). */
export function openDeckBuilder(onChange: () => void) {
  if (root) return;
  if (!document.getElementById('dk-css')) { const s = document.createElement('style'); s.id = 'dk-css'; s.textContent = CSS; document.head.append(s); }
  const all = [...LUMINARAE, ...UMBRA];
  let cur: { id: string | null; name: string; cards: string[] } = { id: null, name: '', cards: [] };
  let dirty = false, fFac = 'all', fType = 'all', q = '', msg = '', msgOk = false;
  const sel = getDeck(), start = customDecks().find(d => d.id === sel);
  if (start) cur = { ...start, cards: [...start.cards] };

  const el = root = document.createElement('div'); el.className = 'dk';
  el.innerHTML = `<div class="dk-in">
    <div class="dk-h"><h2>🃏 Mis mazos</h2><button class="b" data-x="close">✕ Cerrar</button></div>
    <div class="dk-bar"><select data-x="pick"></select>
      <button class="b" data-x="tl">Copiar Luminarae</button><button class="b" data-x="tu">Copiar Umbra</button><button class="b" data-x="clear">Vaciar</button></div>
    <div class="dk-main">
      <section class="dk-cat"><div class="dk-f" data-x="filters">
        <button data-f="all" class="on">Todas</button><button data-f="lum">☀ Luminarae</button><button data-f="umb">☾ Umbra</button><span style="width:10px"></span>
        <button data-t="all" class="on">Todo</button><button data-t="unit">Unidades</button><button data-t="spell">Hechizos</button><input data-x="q" placeholder="Buscar…" autocomplete="off"></div>
        <div class="dk-grid"></div></section>
      <aside class="dk-side"><input data-x="name" maxlength="24" placeholder="Nombre del mazo">
        <div class="dk-count"></div><ul class="dk-list"></ul><div class="dk-msg"></div>
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
        return `<button class="dk-t ${c.id.slice(0, 3)} ${full ? 'full' : ''}" data-add="${c.id}" title="${esc(`${nameOf(c.id)} — ${c.type === 'unit' ? `${c.atk}/${c.hp}` : 'Hechizo'}\n${c.kw.join(', ')} ${c.text}`)}">
          <img src="${imageOf(c.id)}" alt="" onerror="this.remove()"><i class="c">${c.cost}</i>${n ? `<span class="k">×${n}</span>` : ''}
          <b class="n">${esc(nameOf(c.id))}</b><span class="s">${c.type === 'unit' ? `⚔ ${c.atk} · ♥ ${c.hp}` : 'Hechizo'}</span></button>`;
      }).join('');
  };
  const side = () => {
    const n = cur.cards.length, err = deckError(cur.cards);
    const rows = [...new Set(cur.cards)].sort((a, b) => CARDS[a].cost - CARDS[b].cost || nameOf(a).localeCompare(nameOf(b)));
    $('.dk-count').textContent = `${n} / ${DECK_SIZE} cartas`; $('.dk-count').classList.toggle('ok', !err);
    $('.dk-list').innerHTML = rows.map(id => `<li class="${id.slice(0, 3)}" data-rm="${id}" title="Clic para quitar una copia"><i>${CARDS[id].cost}</i><span>${esc(nameOf(id))}</span><em>×${count(id)}</em></li>`).join('') || '<li style="cursor:default;opacity:.6">Toca cartas para añadirlas</li>';
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
    const t = ev.target as HTMLElement, add = t.closest<HTMLElement>('[data-add]'), rm = t.closest<HTMLElement>('[data-rm]'), f = t.closest<HTMLElement>('[data-f]'), ty = t.closest<HTMLElement>('[data-t]'), x = t.closest<HTMLElement>('[data-x]')?.dataset.x;
    if (add) {
      const id = add.dataset.add!;
      if (cur.cards.length >= DECK_SIZE) { msg = `El mazo ya tiene ${DECK_SIZE} cartas: quita alguna primero`; msgOk = false; side(); return; }
      if (count(id) >= MAX_COPIES) { msg = `Máximo ${MAX_COPIES} copias de ${nameOf(id)}`; msgOk = false; side(); return; }
      cur.cards.push(id); edit(); sfx('select'); refresh();
    } else if (rm) { const i = cur.cards.lastIndexOf(rm.dataset.rm!); if (i >= 0) cur.cards.splice(i, 1); edit(); refresh(); }
    else if (f) { fFac = f.dataset.f!; el.querySelectorAll('[data-f]').forEach(b => b.classList.toggle('on', b === f)); grid(); }
    else if (ty) { fType = ty.dataset.t!; el.querySelectorAll('[data-t]').forEach(b => b.classList.toggle('on', b === ty)); grid(); }
    else if (x === 'close') close();
    else if (x === 'tl' || x === 'tu') { if (!discardOk()) return; load({ id: null, name: x === 'tl' ? 'Luminarae (copia)' : 'Umbra (copia)', cards: (x === 'tl' ? LUMINARAE : UMBRA).map(c => c.id) }); dirty = true; }
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
  $('[data-x=name]').addEventListener('input', ev => { cur.name = (ev.target as HTMLInputElement).value; dirty = true; });
  $('[data-x=q]').addEventListener('input', ev => { q = (ev.target as HTMLInputElement).value; grid(); });
  // el teclado no debe llegar al juego (Espacio = pasar turno); Escape cierra
  el.addEventListener('keydown', ev => { ev.stopPropagation(); if (ev.key === 'Escape') close(); });
  refresh();
}
