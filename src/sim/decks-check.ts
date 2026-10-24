// Comprueba la validación de mazos y que una partida con mazos personalizados (vía formato de sala) es idéntica en ambos clientes.
import { DECKS, LUMINARAE, UMBRA } from '../data/cards';
import { DECK_SIZE, deckError, deckFaction, parseWire } from '../decks';
import { initialState } from '../net/sync';
const ok = (c: boolean, m: string) => { if (!c) throw new Error('FALLO: ' + m); };
const lum = DECKS.Luminarae, umb = DECKS.Umbra;
ok(deckError(lum) === null && lum.length === DECK_SIZE, '40 cartas Luminarae válidas');
ok(!!deckError(lum.slice(1)), '39 cartas inválido');
ok(!!deckError([...lum.slice(0, 39), 'nope']), 'carta desconocida inválida');
ok(!!deckError([...lum.slice(0, 37), lum[0], lum[0], lum[0]]), '3 copias inválido');
const mixed = [...lum.slice(0, 20), ...umb.slice(0, 20)]; ok(deckError(mixed) === null, 'mazo mixto válido');
ok(deckFaction(umb) === 'Umbra' && deckFaction(lum) === 'Luminarae', 'facción por mayoría');
ok(parseWire('Umbra', 'Luminarae') === DECKS.Umbra, 'wire por nombre');
ok(parseWire(mixed, 'Umbra').join() === mixed.join(), 'wire por lista');
ok(parseWire(['x'], 'Umbra') === DECKS.Umbra && parseWire(undefined, 'Luminarae') === DECKS.Luminarae, 'wire inválido → predeterminado');
const a = initialState(9, [parseWire(mixed, 'Luminarae'), parseWire(umb, 'Umbra')]), b = initialState(9, [parseWire(mixed, 'Luminarae'), parseWire(umb, 'Umbra')]);
ok(JSON.stringify(a) === JSON.stringify(b) && a.p[0].deck.length + a.p[0].hand.length === 40, 'estado inicial determinista con 40 cartas');
console.log('Mazos verificados: validación, formato de sala y estado inicial.');
