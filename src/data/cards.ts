import type { CardDef, Effect, Keyword, SpellSpeed } from '../engine/types';
import { NATION_CARDS } from './nations';
const U = (id: string, name: string, cost: number, atk: number, hp: number, kw: Keyword[] = [], text = '', fx: Effect[] = [], grow?: { a: number; h: number }): CardDef =>
  ({ id, name, cost, type: 'unit', atk, hp, kw, text, fx, grow });
const S = (id: string, name: string, cost: number, speed: SpellSpeed, text: string, fx: Effect[]): CardDef =>
  ({ id, name, cost, type: 'spell', atk: 0, hp: 0, kw: [], text, fx, speed });

/** LUMINARAE: magia y curación. Unidades frágiles pero resistentes a base de curación/Barrera; muchos hechizos de todas las velocidades. */
export const LUMINARAE: CardDef[] = [
  U('lum_acolita', 'Acólita del Alba', 1, 1, 1, [], 'Al jugarla: cura 2 a tu Nexo.', [{ t: 'healNexus', n: 2 }]),
  U('lum_vigia', 'Vigía del Alba', 1, 1, 2, ['regenera']),
  U('lum_centinela', 'Centinela Radiante', 2, 2, 2, ['barrera']),
  U('lum_portador', 'Portador de Luz', 2, 2, 1, [], 'Al jugarla: +1/+1 a otra aliada.', [{ t: 'buffOther', a: 1, h: 1 }]),
  U('lum_halcon', 'Halcón Dorado', 2, 3, 1, ['elusivo']),
  U('lum_novicia', 'Novicia Curandera', 2, 1, 3, ['robovida']),
  U('lum_sanadora', 'Sanadora de Aurora', 3, 3, 3, ['robovida']),
  U('lum_vidente', 'Vidente del Alba', 3, 2, 3, [], 'Al jugarla: roba 1.', [{ t: 'draw', n: 1 }]),
  U('lum_oraculo', 'Oráculo Sereno', 3, 2, 2, [], 'Al jugarla: roba 1 y cura 2 a tu Nexo.', [{ t: 'draw', n: 1 }, { t: 'healNexus', n: 2 }]),
  U('lum_paladin', 'Paladín Alado', 4, 3, 4, ['barrera']),
  U('lum_heraldo', 'Heraldo Solar', 4, 2, 3, [], 'Al jugarla: +1/+1 a tus unidades.', [{ t: 'buffAll', a: 1, h: 1 }]),
  U('lum_coloso', 'Coloso de Marfil', 5, 4, 4, ['barrera', 'robovida']),
  U('lum_lider', 'Capitana Aurora', 5, 4, 5, ['rapido', 'retador']),
  U('lum_serafin', 'Serafín Eterno', 6, 5, 6, ['elusivo', 'robovida']),
  U('lum_arcangel', 'Arcángel del Amanecer', 7, 5, 5, ['barrera'], 'Al jugarla: cura 4 a tu Nexo.', [{ t: 'healNexus', n: 4 }]),
  S('lum_destello', 'Destello Sanador', 1, 'burst', 'Cura 4 a tu Nexo.', [{ t: 'healNexus', n: 4 }]),
  S('lum_rocio', 'Rocío Vital', 1, 'burst', 'Cura 3 a una unidad aliada.', [{ t: 'healUnit', n: 3 }]),
  S('lum_fervor', 'Fervor', 2, 'burst', 'Una aliada gana +2/+0 esta ronda.', [{ t: 'tempBuff', a: 2, h: 0 }]),
  S('lum_escudo', 'Escudo de Fe', 2, 'fast', 'Una aliada gana Barrera.', [{ t: 'giveKw', kw: 'barrera' }]),
  S('lum_velo', 'Velo Etéreo', 2, 'fast', 'Una aliada gana Elusivo.', [{ t: 'giveKw', kw: 'elusivo' }]),
  S('lum_absorcion', 'Luz Absorbente', 2, 'fast', 'Inflige 2 a una enemiga y cura 2 a tu Nexo.', [{ t: 'drain', n: 2 }]),
  S('lum_plegaria', 'Plegaria', 3, 'fast', 'Cura 5 a tu Nexo y roba 1.', [{ t: 'healNexus', n: 5 }, { t: 'draw', n: 1 }]),
  S('lum_resplandor', 'Resplandor', 3, 'fast', 'Tus unidades ganan +1/+1 esta ronda.', [{ t: 'tempBuffAll', a: 1, h: 1 }]),
  S('lum_juicio', 'Juicio Radiante', 4, 'fast', 'Inflige 4 a una unidad enemiga.', [{ t: 'dmgEnemy', n: 4 }]),
  S('lum_escarcha', 'Escarcha Sagrada', 3, 'focus', 'Una unidad enemiga tiene 0 de poder esta ronda.', [{ t: 'frost' }]),
  S('lum_vision', 'Visión del Alba', 2, 'focus', 'Roba 2 cartas.', [{ t: 'draw', n: 2 }]),
  S('lum_bendicion', 'Bendición', 2, 'slow', 'Una aliada gana +2/+2.', [{ t: 'buffAlly', a: 2, h: 2 }]),
  S('lum_renacer', 'Renacer', 3, 'slow', 'Una aliada gana Regeneración y se cura 4.', [{ t: 'giveKw', kw: 'regenera' }, { t: 'healUnit', n: 4 }]),
  S('lum_estrellas', 'Lluvia de Estrellas', 4, 'slow', 'Inflige 2 a todas las unidades enemigas y cura 2 a tu Nexo.', [{ t: 'dmgAll', n: 2 }, { t: 'healNexus', n: 2 }]),
  S('lum_amanecer', 'Amanecer Eterno', 6, 'slow', 'Cura 6 a tu Nexo y +1/+1 a tus unidades.', [{ t: 'healNexus', n: 6 }, { t: 'buffAll', a: 1, h: 1 }]),
];
/** UMBRA: fuerza bruta y defensa férrea. Muchas unidades grandes con Duro, Letal, Arrollar y Regeneración; pocos hechizos, directos. */
export const UMBRA: CardDef[] = [
  U('umb_sombra', 'Sombra Inquieta', 1, 2, 1),
  U('umb_aprendiz', 'Aprendiz de Huesos', 1, 1, 2, ['duro']),
  U('umb_acechador', 'Acechador Nocturno', 2, 1, 1, ['letal']),
  U('umb_cultista', 'Cultista del Vacío', 2, 3, 3, [], 'Al jugarla: tu Nexo recibe 1.', [{ t: 'hurtNexus', n: 1 }]),
  U('umb_espectro', 'Espectro Fugaz', 2, 3, 1, ['rapido', 'efimero']),
  U('umb_esqueleto', 'Esqueleto Guardián', 2, 1, 4, ['duro']),
  U('umb_reptante', 'Reptante Abisal', 3, 2, 3, ['temible']),
  U('umb_lobo', 'Lobo de Ceniza', 3, 3, 3, ['arrollar']),
  U('umb_sanguijuela', 'Sanguijuela', 3, 3, 2, ['robovida']),
  U('umb_ritualista', 'Ritualista', 3, 2, 2, [], 'Al jugarla: sacrifica una aliada para robar 2.', [{ t: 'sacDraw', n: 2 }]),
  U('umb_golem', 'Gólem de Hierro', 3, 2, 5, ['duro']),
  U('umb_verdugo', 'Verdugo Sombrío', 4, 3, 3, ['letal']),
  U('umb_jinete', 'Jinete Espectral', 4, 5, 3, ['arrollar']),
  U('umb_basalto', 'Centinela de Basalto', 4, 3, 5, ['duro']),
  U('umb_devoradora', 'Devoradora de Almas', 5, 4, 4, [], 'Gana +1/+1 cuando muere una aliada.', [], { a: 1, h: 1 }),
  U('umb_azote', 'Azote del Vacío', 5, 4, 3, ['rapido', 'arrollar']),
  U('umb_behemot', 'Behemot de Hierro', 5, 5, 5, ['duro']),
  U('umb_abisal', 'Coloso Abisal', 6, 5, 5, ['duro', 'robovida']),
  U('umb_senor', 'Señor de la Noche Eterna', 7, 6, 6, ['letal']),
  U('umb_titan', 'Titán Regenerante', 8, 7, 7, ['regenera', 'arrollar']),
  S('umb_punalada', 'Puñalada', 1, 'burst', 'Inflige 2 a una unidad enemiga.', [{ t: 'dmgEnemy', n: 2 }]),
  S('umb_piel', 'Piel de Hierro', 2, 'burst', 'Una aliada gana Duro.', [{ t: 'giveKw', kw: 'duro' }]),
  S('umb_embestida', 'Embestida', 3, 'focus', 'Inflige 3 al Nexo enemigo.', [{ t: 'dmgNexus', n: 3 }]),
  S('umb_furia', 'Furia Sombría', 2, 'fast', 'Una aliada gana +3/+0 esta ronda.', [{ t: 'tempBuff', a: 3, h: 0 }]),
  S('umb_drenar', 'Drenar', 3, 'fast', 'Inflige 3 a una enemiga y cura 3 a tu Nexo.', [{ t: 'drain', n: 3 }]),
  S('umb_plaga', 'Plaga Sombría', 3, 'fast', 'Inflige 1 a todas las unidades enemigas.', [{ t: 'dmgAll', n: 1 }]),
  S('umb_pacto', 'Pacto de Sangre', 2, 'slow', 'Sacrifica tu unidad más débil; daña a una enemiga igual a su ataque.', [{ t: 'sacDmg' }]),
  S('umb_maldicion', 'Maldición de Sombras', 4, 'slow', 'Las unidades enemigas pierden 2/2.', [{ t: 'debuffEnemies', a: 2, h: 2 }]),
  S('umb_aplastar', 'Aplastar', 4, 'slow', 'Inflige 5 a una unidad enemiga.', [{ t: 'dmgEnemy', n: 5 }]),
  S('umb_eclipse', 'Eclipse', 6, 'slow', 'Destruye una unidad enemiga y roba 1.', [{ t: 'destroyEnemy' }, { t: 'draw', n: 1 }]),
];
export const CARDS: Record<string, CardDef> = Object.fromEntries([...LUMINARAE, ...UMBRA, ...NATION_CARDS].map(c => [c.id, c]));
/** Mazo de 40: las 30 cartas de la facción + 10 copias extra de las cartas base (baratas). */
const LUM_EXTRA = ['lum_acolita', 'lum_vigia', 'lum_centinela', 'lum_portador', 'lum_novicia', 'lum_halcon', 'lum_destello', 'lum_rocio', 'lum_escudo', 'lum_bendicion'];
const UMB_EXTRA = ['umb_sombra', 'umb_aprendiz', 'umb_acechador', 'umb_esqueleto', 'umb_cultista', 'umb_lobo', 'umb_golem', 'umb_punalada', 'umb_furia', 'umb_drenar'];
export const DECKS: Record<string, string[]> = { Luminarae: [...LUMINARAE.map(c => c.id), ...LUM_EXTRA], Umbra: [...UMBRA.map(c => c.id), ...UMB_EXTRA] };
