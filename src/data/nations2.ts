import type { CardDef, Effect, Keyword, SpellSpeed } from '../engine/types';
// Segunda tanda de naciones de la Aventura. Prefijo de 3 letras = nación (también es la clase CSS de la carta).
// Cada nación trae una palabra clave y un efecto propios (ver engine.ts):
//   Psybernia → Mutante + Fusión · Sinfalía → Don + Tregua · Ostraca → Leal + Clonar · Pongí → Estilo + Chicle (Pegada)
//   Krahn → Cerrojo + Peaje · Sylvaris → Raíz + Poda · Disnjav → Adaptado + Gas tóxico
const U = (id: string, name: string, cost: number, atk: number, hp: number, kw: Keyword[] = [], text = '', fx: Effect[] = [], grow?: { a: number; h: number }): CardDef =>
  ({ id, name, cost, type: 'unit', atk, hp, kw, text, fx, grow });
const S = (id: string, name: string, cost: number, speed: SpellSpeed, text: string, fx: Effect[]): CardDef =>
  ({ id, name, cost, type: 'spell', atk: 0, hp: 0, kw: [], text, fx, speed });
/** Ficha: no va en mazos, solo la crean otras cartas. */
const T = (id: string, name: string, atk: number, hp: number, kw: Keyword[] = [], text = ''): CardDef =>
  ({ id, name, cost: 0, type: 'unit', atk, hp, kw, text, fx: [], token: true });
const sum = (card: string, n: number): Effect => ({ t: 'summon', card, n });
const FUSE = 'Al jugarla: sacrifica a tu aliada más débil y absorbe sus estadísticas.';

/** PSYBERNIA: nación sometida bajo la arena; sus habitantes son experimentos deformes.
 *  Mutante: +2 de poder y -1 de vida permanentes al cerrar cada ronda (explotan de fuerza y se deterioran). Fusión: se sacrifica a la más débil y se absorbe. */
export const PSYBERNIA: CardDef[] = [
  U('psy_larva', 'Larva Inestable', 1, 1, 3, ['mutante']),
  U('psy_resto', 'Resto de Probeta', 1, 2, 1),
  U('psy_gusano', 'Gusano de las Dunas', 2, 2, 2, ['elusivo']),
  U('psy_carcelero', 'Guardián de Celda', 2, 1, 4, ['duro']),
  U('psy_cobaya', 'Cobaya Mutada', 2, 2, 3, ['mutante']),
  U('psy_quimera', 'Quimera Fallida', 3, 3, 3, [], FUSE, [{ t: 'fuse' }]),
  U('psy_segador', 'Segador de Arena', 3, 3, 2, ['rapido']),
  U('psy_aborto', 'Sujeto Deforme', 3, 2, 4, ['regenera']),
  U('psy_reptante', 'Reptante del Cráter', 3, 2, 3, ['veneno']),
  U('psy_amalgama', 'Amalgama Carnal', 4, 3, 5, ['mutante']),
  U('psy_hibrido', 'Híbrido Letal', 4, 3, 3, ['letal']),
  U('psy_abominacion', 'Abominación', 5, 5, 5, ['duro']),
  U('psy_hidra', 'Hidra Sintética', 5, 3, 5, ['regenera'], FUSE, [{ t: 'fuse' }]),
  U('psy_coloso', 'Coloso Quimérico', 6, 5, 6, ['mutante', 'arrollar']),
  U('psy_valeria', 'Valeria, la Creadora', 7, 5, 7, ['mutante', 'duro'], 'Al jugarla: invoca 2 Engendros.', [sum('psy_engendro', 2)]),
  S('psy_bisturi', 'Bisturí Oxidado', 1, 'burst', 'Inflige 2 a una unidad enemiga.', [{ t: 'dmgEnemy', n: 2 }]),
  S('psy_suero', 'Suero Inestable', 2, 'fast', 'Una aliada gana +1/+1 y Mutante.', [{ t: 'buffAlly', a: 1, h: 1 }, { t: 'giveKw', kw: 'mutante' }]),
  S('psy_inyeccion', 'Inyección de Arena', 2, 'fast', 'Una aliada gana +3/+0 esta ronda.', [{ t: 'tempBuff', a: 3, h: 0 }]),
  S('psy_quirofano', 'Quirófano Clandestino', 2, 'focus', 'Roba 2 cartas. Tu Nexo recibe 2.', [{ t: 'draw', n: 2 }, { t: 'hurtNexus', n: 2 }]),
  S('psy_disecar', 'Disección', 3, 'fast', 'Inflige 3 a una enemiga y cura 3 a tu Nexo.', [{ t: 'drain', n: 3 }]),
  S('psy_amputar', 'Amputación', 3, 'slow', 'Sacrifica tu unidad más débil; daña a una enemiga igual a su ataque.', [{ t: 'sacDmg' }]),
  S('psy_fusion', 'Fusión Forzada', 3, 'slow', 'Sacrifica tu unidad más débil; tu unidad más fuerte absorbe sus estadísticas.', [{ t: 'fuse' }]),
  S('psy_cria', 'Cámara de Cría', 3, 'slow', 'Invoca 2 Engendros.', [sum('psy_engendro', 2)]),
  S('psy_arena', 'Tormenta de Arena', 4, 'fast', 'Las unidades enemigas tienen 0 de poder esta ronda.', [{ t: 'frostAll' }]),
  S('psy_purga', 'Purga del Laboratorio', 5, 'slow', 'Inflige 3 a todas las unidades enemigas.', [{ t: 'dmgAll', n: 3 }]),
  T('psy_engendro', 'Engendro', 1, 2, ['mutante'], 'Ficha.'),
];

/** SINFALÍA: felicidad sin leyes ni dinero; todos se hacen favores.
 *  Don: al morir, tus unidades ganan +1 de poder (el favor que deja). Tregua: esta ronda nadie puede atacar. */
export const SINFALIA: CardDef[] = [
  U('sin_cantor', 'Cantor Risueño', 1, 1, 2, ['don']),
  U('sin_vecino', 'Vecino Amable', 1, 1, 1, [], 'Al jugarla: cura 2 a tu Nexo.', [{ t: 'healNexus', n: 2 }]),
  U('sin_panadero', 'Panadero Generoso', 2, 2, 2, [], 'Al jugarla: +1/+1 a otra aliada.', [{ t: 'buffOther', a: 1, h: 1 }]),
  U('sin_bailarin', 'Bailarín de Plaza', 2, 1, 2, ['regenera']),
  U('sin_mensajero', 'Mensajero Cordial', 2, 2, 1, ['elusivo']),
  U('sin_regalo', 'Portador de Regalos', 3, 2, 2, ['don'], 'Al jugarla: roba 1.', [{ t: 'draw', n: 1 }]),
  U('sin_poeta', 'Poeta del Camino', 3, 2, 2, [], 'Al jugarla: la enemiga más fuerte tiene 0 de poder esta ronda.', [{ t: 'frost' }]),
  U('sin_curandera', 'Curandera del Pueblo', 3, 2, 2, ['robovida']),
  U('sin_anfitrion', 'Anfitrión Alegre', 4, 2, 3, ['don'], 'Al jugarla: +1/+1 a tus unidades.', [{ t: 'buffAll', a: 1, h: 1 }]),
  U('sin_abuela', 'Abuela Sabia', 4, 2, 3, ['barrera']),
  U('sin_juglar', 'Juglar Errante', 4, 3, 2, ['elusivo'], 'Al jugarla: cura 2 a tu Nexo.', [{ t: 'healNexus', n: 2 }]),
  U('sin_festejos', 'Maestra de Festejos', 5, 3, 3, ['don'], 'Al jugarla: invoca 2 Invitados.', [sum('sin_invitado', 2)]),
  U('sin_guardian', 'Guardián Pacífico', 5, 3, 4, ['duro']),
  U('sin_coro', 'Coro de Voces', 6, 4, 3, ['don', 'robovida']),
  U('sin_alcalde', 'Alcalde de la Alegría', 6, 4, 4, ['barrera'], 'Al jugarla: cura 3 a tu Nexo.', [{ t: 'healNexus', n: 3 }]),
  U('sin_corazon', 'Corazón de Sinfalía', 7, 5, 4, ['don', 'barrera'], 'Al jugarla: cura 4 a tu Nexo y +1/+1 a tus unidades.', [{ t: 'healNexus', n: 4 }, { t: 'buffAll', a: 1, h: 1 }]),
  S('sin_abrazo', 'Abrazo', 1, 'burst', 'Cura 3 a tu Nexo.', [{ t: 'healNexus', n: 3 }]),
  S('sin_favor', 'Favor Devuelto', 2, 'fast', 'Una aliada gana Don.', [{ t: 'giveKw', kw: 'don' }]),
  S('sin_gesto', 'Gesto Noble', 2, 'slow', 'Sacrifica tu unidad más débil; daña a una enemiga igual a su ataque.', [{ t: 'sacDmg' }]),
  S('sin_obsequio', 'Obsequio', 2, 'slow', 'Una aliada gana +2/+2.', [{ t: 'buffAlly', a: 2, h: 2 }]),
  S('sin_canto', 'Canto de Plaza', 2, 'focus', 'Roba 2 cartas.', [{ t: 'draw', n: 2 }]),
  S('sin_banquete', 'Banquete Compartido', 3, 'fast', 'Cura 3 a tu Nexo; tus unidades ganan +1/+1 esta ronda.', [{ t: 'healNexus', n: 3 }, { t: 'tempBuffAll', a: 1, h: 1 }]),
  S('sin_tregua', 'Tregua de Sinfalía', 3, 'slow', 'Esta ronda nadie puede atacar.', [{ t: 'tregua' }]),
  S('sin_fiesta', 'Fiesta del Pueblo', 4, 'slow', 'Invoca 2 Invitados; tus unidades ganan +1/+1.', [sum('sin_invitado', 2), { t: 'buffAll', a: 1, h: 1 }]),
  S('sin_jubileo', 'Jubileo', 6, 'slow', 'Cura 4 a tu Nexo y tus unidades ganan +1/+1.', [{ t: 'healNexus', n: 4 }, { t: 'buffAll', a: 1, h: 1 }]),
  T('sin_invitado', 'Invitado', 1, 1, ['don'], 'Ficha.'),
];

/** OSTRACA: nación de clones que viven para complacer a Chip, el original.
 *  Leal: cuando entra otra unidad Leal, las demás Leales ganan +1 de poder. Clonar: copia de la aliada más fuerte con la mitad de sus estadísticas. */
export const OSTRACA: CardDef[] = [
  U('ost_obrero', 'Obrero Chip', 1, 1, 1, ['leal']),
  U('ost_aprendiz', 'Aprendiz Chip', 1, 1, 2, ['leal']),
  U('ost_granjero', 'Granjero Chip', 2, 2, 1, [], 'Al jugarla: cura 2 a tu Nexo.', [{ t: 'healNexus', n: 2 }]),
  U('ost_guardia', 'Guardia Chip', 2, 1, 3, ['duro']),
  U('ost_cocinero', 'Cocinero Chip', 2, 2, 2, ['leal']),
  U('ost_doctor', 'Doctor Chip', 3, 2, 3, [], 'Al jugarla: cura 3 a tu Nexo.', [{ t: 'healNexus', n: 3 }]),
  U('ost_clon', 'Clon Chip', 3, 2, 2, ['leal'], 'Al jugarla: clona a tu aliada más fuerte.', [{ t: 'clone' }]),
  U('ost_comerciante', 'Comerciante Chip', 3, 2, 3, [], 'Al jugarla: roba 1.', [{ t: 'draw', n: 1 }]),
  U('ost_soldado', 'Soldado Chip', 3, 3, 2, ['leal', 'rapido']),
  U('ost_juez', 'Juez Chip', 4, 3, 4, ['retador']),
  U('ost_cientifico', 'Científico Chip', 4, 2, 3, [], 'Al jugarla: clona a tu aliada más fuerte.', [{ t: 'clone' }]),
  U('ost_maestro', 'Maestro Chip', 4, 2, 3, ['leal'], 'Al jugarla: +1/+1 a tus unidades.', [{ t: 'buffAll', a: 1, h: 1 }]),
  U('ost_capataz', 'Capataz Chip', 5, 3, 3, ['leal'], 'Al jugarla: invoca 2 Clones.', [sum('ost_clonbase', 2)]),
  U('ost_centinela', 'Centinela Chip', 5, 4, 4, ['duro']),
  U('ost_heraldo', 'Heraldo Chip', 6, 4, 5, ['leal', 'barrera']),
  U('ost_chip', 'Chip, el Original', 7, 5, 5, ['barrera', 'retador'], 'Al jugarla: invoca 2 Clones y clona a tu aliada más fuerte.', [sum('ost_clonbase', 2), { t: 'clone' }]),
  S('ost_orden', 'Orden de Chip', 1, 'burst', 'Una aliada gana +2/+0 esta ronda.', [{ t: 'tempBuff', a: 2, h: 0 }]),
  S('ost_cuidado', 'Cuidado de Chip', 2, 'burst', 'Cura 4 a tu Nexo.', [{ t: 'healNexus', n: 4 }]),
  S('ost_obediencia', 'Obediencia', 2, 'fast', 'Una aliada gana Leal.', [{ t: 'giveKw', kw: 'leal' }]),
  S('ost_adoctrinar', 'Adoctrinamiento', 2, 'fast', 'Una unidad enemiga pierde todas sus palabras clave.', [{ t: 'silence' }]),
  S('ost_sacrificio', 'Sacrificio por Chip', 2, 'slow', 'Sacrifica tu unidad más débil; daña a una enemiga igual a su ataque.', [{ t: 'sacDmg' }]),
  S('ost_censo', 'Censo Obligatorio', 3, 'focus', 'Roba 2 cartas.', [{ t: 'draw', n: 2 }]),
  S('ost_replica', 'Réplica', 3, 'slow', 'Clona a tu aliada más fuerte.', [{ t: 'clone' }]),
  S('ost_veredicto', 'Veredicto de Chip', 3, 'fast', 'Inflige 3 a una unidad enemiga.', [{ t: 'dmgEnemy', n: 3 }]),
  S('ost_produccion', 'Producción en Masa', 6, 'slow', 'Invoca 3 Clones.', [sum('ost_clonbase', 3)]),
  S('ost_decreto', 'Decreto de Chip', 5, 'slow', 'Destruye una unidad enemiga; tus unidades ganan +1/+1.', [{ t: 'destroyEnemy' }, { t: 'buffAll', a: 1, h: 1 }]),
  T('ost_clonbase', 'Clon', 1, 1, ['leal'], 'Ficha.'),
];

/** PONGÍ: súper cool, rosa y optimista; baile, estilo y chicles.
 *  Estilo: cada hechizo que lanzas la hace brillar (+1/+1 esta ronda). Chicle: la enemiga queda Pegada (no ataca ni bloquea esta ronda). */
export const PONGI: CardDef[] = [
  U('pon_fan', 'Fan Entusiasta', 1, 1, 2, ['estilo']),
  U('pon_patinadora', 'Patinadora Neón', 1, 2, 1),
  U('pon_burbuja', 'Burbuja de Chicle', 2, 1, 2, [], 'Al jugarla: la enemiga más fuerte queda Pegada.', [{ t: 'chicle' }]),
  U('pon_modelo', 'Modelo de Pasarela', 2, 2, 2, ['estilo']),
  U('pon_bailarina', 'Bailarina Pop', 2, 2, 1, ['elusivo']),
  U('pon_influencer', 'Influencer', 3, 2, 3, ['estilo'], 'Al jugarla: roba 1.', [{ t: 'draw', n: 1 }]),
  U('pon_dj', 'DJ Neón', 3, 3, 2, [], 'Al jugarla: tus unidades ganan +1/+0 esta ronda.', [{ t: 'tempBuffAll', a: 1, h: 0 }]),
  U('pon_chiclera', 'Chiclera Loca', 3, 2, 3, [], 'Al jugarla: la enemiga más fuerte queda Pegada.', [{ t: 'chicle' }]),
  U('pon_diva', 'Diva de Cristal', 4, 3, 3, ['estilo', 'elusivo']),
  U('pon_coreografa', 'Coreógrafa', 4, 2, 4, [], 'Al jugarla: +1/+1 a tus unidades.', [{ t: 'buffAll', a: 1, h: 1 }]),
  U('pon_estrella', 'Estrella Pop', 4, 3, 3, ['estilo']),
  U('pon_capitana', 'Capitana de Pompones', 5, 4, 4, ['rapido'], 'Al jugarla: +1/+1 a otra aliada.', [{ t: 'buffOther', a: 1, h: 1 }]),
  U('pon_reina', 'Reina del Glam', 5, 4, 4, ['estilo', 'robovida']),
  U('pon_megashow', 'Mega Show', 6, 5, 4, ['estilo', 'elusivo']),
  U('pon_aurora', 'Aurora Rosa', 6, 4, 6, ['estilo', 'barrera'], 'Al jugarla: cura 4 a tu Nexo.', [{ t: 'healNexus', n: 4 }]),
  U('pon_diosa', 'Diosa del Brillo', 7, 5, 6, ['estilo', 'barrera'], 'Al jugarla: la enemiga más fuerte queda Pegada.', [{ t: 'chicle' }]),
  S('pon_pose', 'Pose Fabulosa', 1, 'burst', 'Una aliada gana +2/+0 esta ronda.', [{ t: 'tempBuff', a: 2, h: 0 }]),
  S('pon_brillantina', 'Brillantina', 2, 'burst', 'Cura 3 a tu Nexo.', [{ t: 'healNexus', n: 3 }]),
  S('pon_chicle', 'Chicle Pegajoso', 2, 'fast', 'Una unidad enemiga queda Pegada: no ataca ni bloquea esta ronda.', [{ t: 'chicle' }]),
  S('pon_paso', 'Paso de Baile', 2, 'fast', 'Una aliada gana Elusivo.', [{ t: 'giveKw', kw: 'elusivo' }]),
  S('pon_selfie', 'Selfie Grupal', 2, 'focus', 'Roba 2 cartas.', [{ t: 'draw', n: 2 }]),
  S('pon_rayo', 'Rayo de Brillo', 3, 'fast', 'Inflige 3 a una unidad enemiga.', [{ t: 'dmgEnemy', n: 3 }]),
  S('pon_flash', 'Flash de Luz', 3, 'fast', 'Tus unidades ganan +1/+1 esta ronda.', [{ t: 'tempBuffAll', a: 1, h: 1 }]),
  S('pon_globos', 'Globos de Chicle', 3, 'slow', 'Invoca 2 Globos.', [sum('pon_globo', 2)]),
  S('pon_deslumbrar', 'Luz Extrema', 4, 'fast', 'Las unidades enemigas tienen 0 de poder esta ronda.', [{ t: 'frostAll' }]),
  S('pon_conga', 'Conga Imparable', 4, 'slow', 'Tus unidades ganan +1/+1.', [{ t: 'buffAll', a: 1, h: 1 }]),
  S('pon_concierto', 'Concierto Final', 6, 'slow', 'Cura 4 a tu Nexo, tus unidades ganan +1/+1 y robas 1.', [{ t: 'healNexus', n: 4 }, { t: 'buffAll', a: 1, h: 1 }, { t: 'draw', n: 1 }]),
  T('pon_globo', 'Globo de Chicle', 1, 1, ['elusivo', 'estilo'], 'Ficha.'),
];

/** KRAHN (Presidio): nación fronteriza que controla el paso; militarizada, desolada y sin esperanzas.
 *  Cerrojo: cierra el paso, bloquea incluso a Elusivos y Temibles. Peaje: el rival pierde maná. */
export const KRAHN: CardDef[] = [
  U('krn_recluta', 'Recluta del Paso', 1, 1, 2, ['cerrojo']),
  U('krn_desertor', 'Desertor Harapiento', 1, 2, 1),
  U('krn_centinela', 'Centinela de Muro', 2, 1, 4, ['duro']),
  U('krn_fusilero', 'Fusilero', 2, 2, 2, [], 'Al jugarla: inflige 1 al Nexo enemigo.', [{ t: 'dmgNexus', n: 1 }]),
  U('krn_aduanero', 'Aduanero', 3, 2, 3, ['cerrojo'], 'Al jugarla: el rival pierde 1 de maná.', [{ t: 'peaje', n: 1 }]),
  U('krn_francotirador', 'Francotirador', 3, 2, 2, ['letal']),
  U('krn_sargento', 'Sargento de Frontera', 3, 2, 3, [], 'Al jugarla: +1/+1 a otra aliada.', [{ t: 'buffOther', a: 1, h: 1 }]),
  U('krn_perro', 'Perro de Guerra', 3, 3, 2, ['rapido']),
  U('krn_barricada', 'Barricada Viviente', 4, 2, 5, ['duro', 'cerrojo']),
  U('krn_artillero', 'Artillero', 4, 3, 3, [], 'Al jugarla: inflige 2 al Nexo enemigo.', [{ t: 'dmgNexus', n: 2 }]),
  U('krn_veterano', 'Veterano Sin Fe', 4, 4, 3, ['arrollar']),
  U('krn_comisario', 'Comisario', 4, 3, 4, [], 'Al jugarla: el rival pierde 2 de maná.', [{ t: 'peaje', n: 2 }]),
  U('krn_tanque', 'Tanque Oxidado', 5, 5, 5, ['duro']),
  U('krn_capitan', 'Capitán del Paso', 5, 4, 4, ['cerrojo'], 'Al jugarla: +1/+1 a tus unidades.', [{ t: 'buffAll', a: 1, h: 1 }]),
  U('krn_coloso', 'Coloso de Hierro', 6, 5, 6, ['duro', 'cerrojo']),
  U('krn_general', 'General Sin Esperanza', 7, 6, 6, ['cerrojo', 'duro'], 'Al jugarla: el rival pierde 3 de maná.', [{ t: 'peaje', n: 3 }]),
  S('krn_fusilar', 'Fusilamiento', 2, 'burst', 'Inflige 2 a una unidad enemiga.', [{ t: 'dmgEnemy', n: 2 }]),
  S('krn_peaje', 'Peaje', 2, 'fast', 'El rival pierde 2 de maná.', [{ t: 'peaje', n: 2 }]),
  S('krn_cierre', 'Cierre de Frontera', 2, 'fast', 'Una aliada gana Cerrojo.', [{ t: 'giveKw', kw: 'cerrojo' }]),
  S('krn_toque', 'Toque de Queda', 2, 'fast', 'Una unidad enemiga tiene 0 de poder esta ronda.', [{ t: 'frost' }]),
  S('krn_blindaje', 'Blindaje', 2, 'fast', 'Tus unidades ganan +0/+2 esta ronda.', [{ t: 'tempBuffAll', a: 0, h: 2 }]),
  S('krn_alambrada', 'Alambrada', 3, 'fast', 'Inflige 1 a todas las unidades enemigas.', [{ t: 'dmgAll', n: 1 }]),
  S('krn_bombardeo', 'Bombardeo', 3, 'focus', 'Inflige 3 al Nexo enemigo.', [{ t: 'dmgNexus', n: 3 }]),
  S('krn_leva', 'Leva Forzosa', 3, 'slow', 'Invoca 2 Soldados Rasos.', [sum('krn_soldado', 2)]),
  S('krn_ejecucion', 'Ejecución', 4, 'slow', 'Inflige 5 a una unidad enemiga.', [{ t: 'dmgEnemy', n: 5 }]),
  S('krn_ley', 'Ley Marcial', 5, 'slow', 'Tus unidades ganan +1/+1 y el rival pierde 2 de maná.', [{ t: 'buffAll', a: 1, h: 1 }, { t: 'peaje', n: 2 }]),
  T('krn_soldado', 'Soldado Raso', 2, 1, [], 'Ficha.'),
];

/** SYLVARIS: bosque dominado por la Gran Raíz, que decide y crea la vida.
 *  Raíz: no ataca, pero al cerrar cada ronda da vida a un Retoño. Poda: la Raíz decide y destruye a la unidad enemiga más débil. */
export const SYLVARIS: CardDef[] = [
  U('syl_semilla', 'Semilla Viva', 1, 0, 2, ['raiz']),
  U('syl_hojarasca', 'Hojarasca Inquieta', 1, 2, 1),
  U('syl_zarcillo', 'Zarcillo Espinoso', 2, 2, 2, [], 'Al jugarla: invoca un Retoño.', [sum('syl_retono', 1)]),
  U('syl_raicilla', 'Raicilla', 2, 1, 3, ['raiz']),
  U('syl_chacal', 'Chacal del Sotobosque', 2, 3, 1, ['rapido']),
  U('syl_savia', 'Guardián de Savia', 3, 2, 4, ['regenera']),
  U('syl_musgo', 'Musgo Devorador', 3, 3, 3),
  U('syl_tronco', 'Tronco Marchito', 4, 3, 5, ['duro']),
  U('syl_arbolmadre', 'Árbol Madre', 4, 1, 6, ['raiz'], 'Al jugarla: invoca un Retoño.', [sum('syl_retono', 1)]),
  U('syl_bestia', 'Bestia de Raíces', 4, 4, 4, ['arrollar']),
  U('syl_enredadera', 'Enredadera Estranguladora', 4, 3, 3, [], 'Al jugarla: la enemiga más fuerte tiene 0 de poder esta ronda.', [{ t: 'frost' }]),
  U('syl_guardian', 'Guardián de la Raíz', 5, 4, 5, ['barrera']),
  U('syl_corazon', 'Corazón del Bosque', 5, 2, 7, ['raiz', 'regenera'], 'Al jugarla: invoca 2 Retoños.', [sum('syl_retono', 2)]),
  U('syl_titan', 'Titán de Corteza', 6, 6, 6, ['duro']),
  U('syl_granraiz', 'La Gran Raíz', 7, 3, 10, ['raiz', 'regenera', 'barrera'], 'Al jugarla: invoca 3 Retoños y destruye a la unidad enemiga más débil.', [sum('syl_retono', 3), { t: 'poda' }]),
  S('syl_brote', 'Brote', 1, 'burst', 'Invoca un Retoño.', [sum('syl_retono', 1)]),
  S('syl_sabia', 'Savia de la Raíz', 2, 'burst', 'Cura 4 a una unidad aliada.', [{ t: 'healUnit', n: 4 }]),
  S('syl_enredo', 'Enredo', 2, 'fast', 'Una unidad enemiga tiene 0 de poder esta ronda.', [{ t: 'frost' }]),
  S('syl_regenerar', 'Corteza Viva', 2, 'fast', 'Una aliada gana Regeneración.', [{ t: 'giveKw', kw: 'regenera' }]),
  S('syl_zarzas', 'Zarzas', 3, 'fast', 'Inflige 1 a todas las unidades enemigas.', [{ t: 'dmgAll', n: 1 }]),
  S('syl_cosecha', 'Cosecha', 3, 'focus', 'Roba 2 cartas y cura 2 a tu Nexo.', [{ t: 'draw', n: 2 }, { t: 'healNexus', n: 2 }]),
  S('syl_poda', 'Poda', 3, 'slow', 'La Gran Raíz decide: destruye a la unidad enemiga más débil.', [{ t: 'poda' }]),
  S('syl_crecer', 'Crecimiento', 3, 'slow', 'Una aliada gana +2/+2.', [{ t: 'buffAlly', a: 2, h: 2 }]),
  S('syl_ciclo', 'Ciclo de Vida', 4, 'slow', 'Invoca 2 Retoños; tus unidades ganan +1/+1.', [sum('syl_retono', 2), { t: 'buffAll', a: 1, h: 1 }]),
  S('syl_decision', 'La Gran Raíz Decide', 5, 'slow', 'Destruye una unidad enemiga e invoca 2 Retoños.', [{ t: 'destroyEnemy' }, sum('syl_retono', 2)]),
  T('syl_retono', 'Retoño', 2, 1, [], 'Ficha.'),
];

/** DISNJAV: nación hipertóxica; solo sobreviven sus nacidos (adaptación genética al gas).
 *  Gas tóxico: al cerrar cada ronda daña 1 a toda unidad sin Adaptado. Adaptado: inmune al gas. */
export const DISNJAV: CardDef[] = [
  U('dsj_rata', 'Rata Mutada', 1, 2, 1, ['adaptado']),
  U('dsj_alga', 'Alga Ácida', 1, 1, 2, ['adaptado']),
  U('dsj_nacido', 'Nacido del Gas', 2, 2, 2, ['adaptado']),
  U('dsj_esporas', 'Portador de Esporas', 2, 1, 2, ['adaptado', 'veneno']),
  U('dsj_recolector', 'Recolector de Gas', 3, 2, 3, ['adaptado'], 'Al jugarla: libera gas tóxico 1 ronda.', [{ t: 'gas', n: 1 }]),
  U('dsj_cazador', 'Cazador de Niebla', 3, 3, 2, ['adaptado', 'elusivo']),
  U('dsj_sapo', 'Sapo Corrosivo', 3, 2, 3, ['adaptado', 'veneno']),
  U('dsj_quimico', 'Químico Nacido', 4, 3, 4, ['adaptado'], 'Al jugarla: libera gas tóxico 1 ronda.', [{ t: 'gas', n: 1 }]),
  U('dsj_gigante', 'Gigante de la Niebla', 4, 4, 4, ['adaptado']),
  U('dsj_hongo', 'Hongo Letal', 4, 2, 4, ['adaptado', 'letal']),
  U('dsj_behemot', 'Behemot Ácido', 5, 5, 5, ['adaptado', 'arrollar']),
  U('dsj_hidra', 'Hidra de Vapor', 5, 4, 5, ['adaptado', 'regenera']),
  U('dsj_leviatan', 'Leviatán de Bruma', 6, 5, 6, ['adaptado', 'elusivo']),
  U('dsj_alfa', 'Primer Nacido', 6, 5, 6, ['adaptado', 'duro']),
  U('dsj_madre', 'Madre del Gas', 7, 6, 6, ['adaptado', 'veneno'], 'Al jugarla: libera gas tóxico durante 2 rondas.', [{ t: 'gas', n: 2 }]),
  S('dsj_aliento', 'Aliento Ácido', 2, 'burst', 'Inflige 2 a una unidad enemiga.', [{ t: 'dmgEnemy', n: 2 }]),
  S('dsj_antidoto', 'Antídoto', 2, 'burst', 'Cura 4 a una unidad aliada.', [{ t: 'healUnit', n: 4 }]),
  S('dsj_fuga', 'Fuga de Gas', 2, 'fast', 'Libera gas tóxico 1 ronda.', [{ t: 'gas', n: 1 }]),
  S('dsj_mascara', 'Máscara de Gas', 2, 'fast', 'Una aliada gana Adaptado.', [{ t: 'giveKw', kw: 'adaptado' }]),
  S('dsj_corrosion', 'Corrosión', 3, 'fast', 'Las unidades enemigas pierden 1/1.', [{ t: 'debuffEnemies', a: 1, h: 1 }]),
  S('dsj_nube', 'Nube Corrosiva', 3, 'fast', 'Inflige 1 a todas las unidades enemigas y libera gas tóxico 1 ronda.', [{ t: 'dmgAll', n: 1 }, { t: 'gas', n: 1 }]),
  S('dsj_generacion', 'Nueva Generación', 3, 'slow', 'Invoca 2 Crías Adaptadas.', [sum('dsj_cria', 2)]),
  S('dsj_tormenta', 'Tormenta Tóxica', 4, 'slow', 'Libera gas tóxico durante 2 rondas.', [{ t: 'gas', n: 2 }]),
  S('dsj_asfixia', 'Asfixia', 5, 'slow', 'Destruye una unidad enemiga.', [{ t: 'destroyEnemy' }]),
  S('dsj_colapso', 'Colapso Atmosférico', 5, 'slow', 'Inflige 2 a todas las unidades enemigas y libera gas tóxico 1 ronda.', [{ t: 'dmgAll', n: 2 }, { t: 'gas', n: 1 }]),
  T('dsj_cria', 'Cría Adaptada', 1, 1, ['adaptado'], 'Ficha.'),
];

export const NATION_CARDS_2: CardDef[] = [...PSYBERNIA, ...SINFALIA, ...OSTRACA, ...PONGI, ...KRAHN, ...SYLVARIS, ...DISNJAV];
