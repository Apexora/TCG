import type { CardDef, Effect, Keyword, SpellSpeed } from '../engine/types';
import { NATION_CARDS_2 } from './nations2';
// Cartas propias de las naciones de la Aventura. Prefijo de 3 letras = nación (también es la clase CSS de la carta).
const U = (id: string, name: string, cost: number, atk: number, hp: number, kw: Keyword[] = [], text = '', fx: Effect[] = [], grow?: { a: number; h: number }): CardDef =>
  ({ id, name, cost, type: 'unit', atk, hp, kw, text, fx, grow });
const S = (id: string, name: string, cost: number, speed: SpellSpeed, text: string, fx: Effect[]): CardDef =>
  ({ id, name, cost, type: 'spell', atk: 0, hp: 0, kw: [], text, fx, speed });
/** Ficha: no va en mazos, solo la crean otras cartas. */
const T = (id: string, name: string, atk: number, hp: number, kw: Keyword[] = [], text = ''): CardDef =>
  ({ id, name, cost: 0, type: 'unit', atk, hp, kw, text, fx: [], token: true });
const sum = (card: string, n: number): Effect => ({ t: 'summon', card, n });

/** LUMIS: nación futurista y de control. Drones (fichas), sintéticos, hackeo (silenciar/congelar) y robo de cartas. */
export const LUMIS: CardDef[] = [
  U('lms_chip', 'Microchip', 1, 1, 1, [], 'Al jugarla: invoca un Dron.', [sum('lms_dron', 1)]),
  U('lms_nanobot', 'Nanobot Reparador', 1, 1, 2, ['regenera']),
  U('lms_artillero', 'Dron Artillero', 2, 2, 1, ['rapido']),
  U('lms_escudo', 'Androide Escudo', 2, 1, 3, ['duro']),
  U('lms_enlace', 'Enlace de Datos', 2, 2, 1, [], 'Al jugarla: +1/+1 a otra aliada.', [{ t: 'buffOther', a: 1, h: 1 }]),
  U('lms_medico', 'Dron Médico', 2, 1, 2, [], 'Al jugarla: cura 3 a tu Nexo.', [{ t: 'healNexus', n: 3 }]),
  U('lms_enjambre', 'Enjambre de Drones', 3, 2, 2, [], 'Al jugarla: invoca 2 Drones.', [sum('lms_dron', 2)]),
  U('lms_analista', 'Cíborg Analista', 3, 2, 3, [], 'Al jugarla: roba 1.', [{ t: 'draw', n: 1 }]),
  U('lms_hacker', 'Unidad Hackeadora', 3, 2, 2, [], 'Al jugarla: la enemiga más fuerte pierde sus palabras clave.', [{ t: 'silence' }]),
  U('lms_elite', 'Sintético de Élite', 4, 3, 4, ['barrera']),
  U('lms_cazador', 'Cazador Algorítmico', 4, 3, 3, ['retador']),
  U('lms_nodo', 'Nodo de Sincronía', 4, 2, 3, [], 'Al jugarla: +1/+1 a tus unidades.', [{ t: 'buffAll', a: 1, h: 1 }]),
  U('lms_mecha', 'Mecha Reparador', 5, 4, 5, ['duro']),
  U('lms_nave', 'Nave Nodriza', 6, 3, 5, [], 'Al jugarla: invoca 3 Drones.', [sum('lms_dron', 3)]),
  U('lms_cerebro', 'Cerebro Cuántico', 6, 4, 5, ['elusivo'], 'Al jugarla: roba 1.', [{ t: 'draw', n: 1 }]),
  U('lms_inargo', 'Inargo, la IA Central', 7, 5, 6, ['barrera', 'retador'], 'Al jugarla: invoca 2 Drones y roba 1.', [sum('lms_dron', 2), { t: 'draw', n: 1 }]),
  S('lms_virus', 'Virus', 2, 'fast', 'Una unidad enemiga pierde todas sus palabras clave.', [{ t: 'silence' }]),
  S('lms_cortafuegos', 'Cortafuegos', 2, 'fast', 'Una aliada gana Barrera.', [{ t: 'giveKw', kw: 'barrera' }]),
  S('lms_overclock', 'Overclock', 2, 'burst', 'Una aliada gana +2/+0 esta ronda.', [{ t: 'tempBuff', a: 2, h: 0 }]),
  S('lms_laser', 'Disparo Láser', 3, 'fast', 'Inflige 3 a una unidad enemiga.', [{ t: 'dmgEnemy', n: 3 }]),
  S('lms_nube', 'Respaldo en la Nube', 3, 'focus', 'Roba 2 cartas.', [{ t: 'draw', n: 2 }]),
  S('lms_despliegue', 'Despliegue de Drones', 3, 'slow', 'Invoca 3 Drones.', [sum('lms_dron', 3)]),
  S('lms_emp', 'Pulso EMP', 4, 'fast', 'Las unidades enemigas tienen 0 de poder esta ronda.', [{ t: 'frostAll' }]),
  S('lms_purga', 'Purga del Sistema', 5, 'slow', 'Inflige 3 a todas las unidades enemigas y roba 1.', [{ t: 'dmgAll', n: 3 }, { t: 'draw', n: 1 }]),
  T('lms_dron', 'Dron de Enjambre', 1, 1, [], 'Ficha.'),
];

/** ARBORIS: bosque mágico. Veneno (la víctima pierde 1/1 para siempre), ilusiones (0 de poder), regeneración y brotes. */
export const ARBORIS: CardDef[] = [
  U('arb_hongo', 'Hongo Esporífero', 1, 1, 1, ['veneno']),
  U('arb_libelula', 'Libélula Silvestre', 1, 1, 1, ['elusivo']),
  U('arb_arana', 'Araña Tejedora', 2, 1, 3, ['veneno']),
  U('arb_corteza', 'Guardián de Corteza', 2, 1, 3, ['regenera']),
  U('arb_duende', 'Duende Ilusionista', 3, 2, 2, ['elusivo'], 'Al jugarla: la enemiga más fuerte tiene 0 de poder esta ronda.', [{ t: 'frost' }]),
  U('arb_jabali', 'Jabalí Salvaje', 3, 3, 2, ['arrollar']),
  U('arb_hada', 'Hada Sembradora', 3, 2, 3, [], 'Al jugarla: invoca un Brote.', [sum('arb_brote', 1)]),
  U('arb_serpiente', 'Serpiente Cascabel', 3, 2, 2, ['veneno', 'rapido']),
  U('arb_ent', 'Ent Joven', 4, 3, 5, ['duro']),
  U('arb_cazadora', 'Cazadora de Sombras', 4, 3, 2, ['elusivo', 'veneno']),
  U('arb_ciervo', 'Ciervo Lunar', 4, 3, 4, ['barrera']),
  U('arb_driade', 'Dríade Madre', 5, 3, 4, [], 'Al jugarla: invoca 2 Brotes.', [sum('arb_brote', 2)]),
  U('arb_hidra', 'Hidra de la Ciénaga', 5, 4, 4, ['veneno', 'regenera']),
  U('arb_espiritu', 'Espíritu del Bosque', 6, 4, 5, ['elusivo', 'regenera']),
  U('arb_arbol', 'Gran Árbol Ancestral', 7, 5, 7, ['duro', 'regenera']),
  U('arb_guardian', 'Guardián Primigenio', 7, 6, 6, ['veneno', 'arrollar', 'regenera']),
  S('arb_espejismo', 'Espejismo', 2, 'fast', 'Una unidad enemiga tiene 0 de poder esta ronda.', [{ t: 'frost' }]),
  S('arb_savia', 'Savia Curativa', 2, 'burst', 'Cura 4 a una unidad aliada.', [{ t: 'healUnit', n: 4 }]),
  S('arb_piel', 'Piel de Corteza', 2, 'burst', 'Una aliada gana Duro.', [{ t: 'giveKw', kw: 'duro' }]),
  S('arb_mordedura', 'Mordedura Venenosa', 2, 'fast', 'Una aliada gana Veneno.', [{ t: 'giveKw', kw: 'veneno' }]),
  S('arb_floracion', 'Floración', 2, 'slow', 'Una aliada gana +2/+2.', [{ t: 'buffAlly', a: 2, h: 2 }]),
  S('arb_espinas', 'Lluvia de Espinas', 3, 'fast', 'Inflige 1 a todas las unidades enemigas.', [{ t: 'dmgAll', n: 1 }]),
  S('arb_esporas', 'Nube de Esporas', 3, 'fast', 'Las unidades enemigas pierden 1/1.', [{ t: 'debuffEnemies', a: 1, h: 1 }]),
  S('arb_ciclo', 'Ciclo Eterno', 3, 'focus', 'Roba 2 cartas y cura 2 a tu Nexo.', [{ t: 'draw', n: 2 }, { t: 'healNexus', n: 2 }]),
  S('arb_despertar', 'Despertar del Bosque', 4, 'slow', 'Invoca 2 Brotes; tus unidades ganan +1/+1.', [sum('arb_brote', 2), { t: 'buffAll', a: 1, h: 1 }]),
  T('arb_brote', 'Brote Vivo', 1, 1, ['regenera'], 'Ficha.'),
];

/** NEGATT: muerte, degeneración y oscuridad. Daño necrótico (ignora Barrera y Duro y deja Marchita a la víctima), Marchitar (poder a 0 para siempre),
 *  descartes y mazo rival devorado, y Pestes coladas en el mazo enemigo. Los más poderosos se pagan con vida del Nexo. */
const pest = (n: number): Effect => ({ t: 'plant', card: 'neg_peste', n });
export const NEGATT: CardDef[] = [
  U('neg_acolito', 'Acólito Caído', 1, 2, 1, [], 'Al jugarla: cuela 1 Peste Latente en el mazo enemigo. Tu Nexo recibe 1.', [pest(1), { t: 'hurtNexus', n: 1 }]),
  U('neg_penitente', 'Penitente Marcado', 1, 1, 2, ['robovida']),
  U('neg_heraldo', 'Heraldo Marchito', 2, 1, 1, ['letal']),
  U('neg_monje', 'Monje del Silencio', 2, 1, 3, ['duro']),
  U('neg_sacerdote', 'Sacerdote Corrupto', 2, 2, 2, [], 'Al jugarla: el rival descarta 1 carta al azar. Tu Nexo recibe 2.', [{ t: 'discard', n: 1 }, { t: 'hurtNexus', n: 2 }]),
  U('neg_caballero', 'Caballero Sacrílego', 3, 3, 3, ['robovida']),
  U('neg_vasallo', 'Vasallo de las Diez Casas', 3, 2, 2, [], 'Al jugarla: la enemiga más débil recibe 2 de daño necrótico. Tu Nexo recibe 2.', [{ t: 'necroWeak', n: 2 }, { t: 'hurtNexus', n: 2 }]),
  U('neg_profeta', 'Profeta Roto', 3, 2, 2, [], 'Al jugarla: la enemiga más fuerte se marchita: su poder queda en 0 para siempre. Tu Nexo recibe 2.', [{ t: 'wither' }, { t: 'hurtNexus', n: 2 }]),
  U('neg_angel', 'Ángel Corrupto', 4, 4, 3, ['elusivo'], 'Al jugarla: elimina las 2 cartas superiores del mazo enemigo y cuela 1 Peste Latente en él. Tu Nexo recibe 3.', [{ t: 'mill', n: 2 }, pest(1), { t: 'hurtNexus', n: 3 }]),
  U('neg_juez', 'Juez de la Casa Negra', 4, 3, 4, ['retador']),
  U('neg_devoto', 'Devoto de Sangre', 4, 3, 3, [], 'Gana +1/+1 cuando muere una unidad aliada.', [], { a: 1, h: 1 }),
  U('neg_arconte', 'Arconte Caído', 5, 4, 4, ['barrera', 'robovida']),
  U('neg_patriarca', 'Patriarca Maldito', 5, 6, 4, [], 'Al jugarla: la enemiga más fuerte recibe 3 de daño necrótico. Tu Nexo recibe 4.', [{ t: 'necroStrong', n: 3 }, { t: 'hurtNexus', n: 4 }]),
  U('neg_serafin', 'Serafín Corrompido', 6, 5, 5, ['elusivo', 'robovida'], 'Al jugarla: el rival descarta 1 carta al azar y se cuela 1 Peste Latente en su mazo. Tu Nexo recibe 3.', [{ t: 'discard', n: 1 }, pest(1), { t: 'hurtNexus', n: 3 }]),
  U('neg_cruzado', 'Cruzado Quebrado', 6, 5, 6, ['duro', 'arrollar']),
  U('neg_dios', 'Dios Marchito', 7, 6, 6, ['barrera', 'letal'], 'Al jugarla: destruye a la enemiga más fuerte. Tu Nexo recibe 4.', [{ t: 'destroyEnemy' }, { t: 'hurtNexus', n: 4 }]),
  S('neg_pacto', 'Pacto Prohibido', 1, 'burst', 'Roba 2 cartas. Tu Nexo recibe 3.', [{ t: 'draw', n: 2 }, { t: 'hurtNexus', n: 3 }]),
  S('neg_exorcismo', 'Exorcismo Inverso', 2, 'fast', 'Una unidad enemiga recibe 2 de daño necrótico (ignora Barrera y Duro; si sobrevive, queda Marchita).', [{ t: 'dmgEnemy', n: 2, necro: true }]),
  S('neg_sacrificio', 'Sacrificio Impío', 2, 'slow', 'Sacrifica tu unidad más débil; una enemiga recibe daño necrótico igual a su ataque.', [{ t: 'sacDmg', necro: true }]),
  S('neg_bendicion', 'Bendición Corrompida', 2, 'slow', 'Una aliada gana +3/+1. Tu Nexo recibe 2.', [{ t: 'buffAlly', a: 3, h: 1 }, { t: 'hurtNexus', n: 2 }]),
  S('neg_condena', 'Condena', 3, 'fast', 'Marchita a una unidad enemiga: su poder queda en 0 para siempre.', [{ t: 'wither' }]),
  S('neg_misa', 'Misa Negra', 3, 'fast', 'Inflige 3 de daño necrótico a una enemiga y cura 3 a tu Nexo.', [{ t: 'drain', n: 3, necro: true }]),
  S('neg_plaga', 'Plaga Divina', 4, 'slow', 'Las unidades enemigas pierden 1/1 y reciben 1 de daño necrótico.', [{ t: 'debuffEnemies', a: 1, h: 1 }, { t: 'dmgAll', n: 1, necro: true }]),
  S('neg_decreto', 'Decreto de las Diez Casas', 6, 'slow', 'Destruye una unidad enemiga; las demás pierden 2 de poder. Cura 2 a tu Nexo.', [{ t: 'destroyEnemy' }, { t: 'debuffEnemies', a: 2, h: 0 }, { t: 'healNexus', n: 2 }]),
  /** Ficha-maldición: la cuela Negatt en el mazo rival. Es una carta muerta que estorba en la mano; jugarla duele. */
  { id: 'neg_peste', name: 'Peste Latente', cost: 1, type: 'spell', atk: 0, hp: 0, kw: [], speed: 'burst', token: true,
    text: 'Ficha de Negatt colada en tu mazo. Al jugarla: tu Nexo recibe 2.', fx: [{ t: 'hurtNexus', n: 2 }] },
];

/** BORO: cyberpunk industrial fallido y mafioso. Deudas y usura (maná prestado, intereses sobre el Nexo), hackeo (virus que salta, malware en la mano,
 *  unidades secuestradas), cortocircuitos en cadena, sobrecargas y sobornos. Matones (fichas) como músculo que cobra. */
export const BORO: CardDef[] = [
  U('bor_raterillo', 'Raterillo de Neón', 1, 2, 1),
  U('bor_informante', 'Informante Pagado', 2, 1, 2, [], 'Al jugarla: filtra un dato envenenado: el rival recibe 1 Malware en la mano (cuesta 1 purgarlo; si sigue ahí al cerrar la ronda, 1 de Nexo).', [{ t: 'malware', n: 1 }]),
  U('bor_pandilla', 'Pandilla Callejera', 2, 1, 1, [], 'Al jugarla: invoca un Matón.', [sum('bor_maton', 1)]),
  U('bor_guardaespaldas', 'Guardaespaldas Cromado', 2, 1, 4, ['duro']),
  U('bor_contrabandista', 'Contrabandista', 2, 2, 1, [], 'Al jugarla: ganas 2 de maná este turno, pero empiezas la próxima ronda con 1 menos (deuda).', [{ t: 'prestamo', n: 2, d: 1 }]),
  U('bor_sicario', 'Sicario', 3, 2, 2, ['letal']),
  U('bor_recaudador', 'Recaudador de Deudas', 3, 2, 3, [], 'Al jugarla: el Nexo rival entra en usura: pierde 2 al cerrar esta ronda y 1 al cerrar la siguiente (se acumula hasta 3).', [{ t: 'usura', n: 2 }]),
  U('bor_dron', 'Dron Espía', 3, 2, 2, ['elusivo'], 'Al jugarla: copia al azar una carta de la mano del rival y la añade a la tuya.', [{ t: 'copia' }]),
  U('bor_capo', 'Capo de Barrio', 4, 3, 3, [], 'Al jugarla: invoca un Matón y cada Matón que controles te paga 1 de maná (máx 2).', [sum('bor_maton', 1), { t: 'tributo', n: 2 }]),
  U('bor_mercenario', 'Cíborg Mercenario', 4, 4, 3, ['arrollar']),
  U('bor_cirujano', 'Cirujano Clandestino', 4, 2, 4, ['robovida']),
  U('bor_don', 'Don del Sindicato', 5, 3, 4, [], 'Al jugarla: sobrecarga a tus unidades: +2 de poder esta ronda y 1 de daño a cada una (sin matarlas).', [{ t: 'overclock', a: 2, n: 1 }]),
  U('bor_enforcer', 'Enforcer Mecánico', 5, 5, 5, ['duro']),
  U('bor_jefe', 'Jefe de Distrito', 6, 4, 6, ['retador'], 'Al jugarla: hackea a la unidad enemiga más fuerte: la controlas hasta el final de la ronda y se quema (Efímera).', [{ t: 'hack' }]),
  U('bor_senor', 'Señor del Neón', 7, 6, 6, ['letal'], 'Al jugarla: invoca 2 Matones. El rival paga 1 de Nexo por cada unidad que controlas (máx 4).', [sum('bor_maton', 2), { t: 'cobro', n: 4 }]),
  S('bor_botin', 'Botín del Golpe', 1, 'focus', 'Ganas 3 de maná este turno, pero empiezas la próxima ronda con 2 menos (deuda).', [{ t: 'prestamo', n: 3, d: 2 }]),
  S('bor_soborno', 'Soborno', 2, 'fast', 'La unidad enemiga más débil se pasa a tu bando para siempre.', [{ t: 'soborno' }]),
  S('bor_extorsion', 'Extorsión', 2, 'burst', 'Ransomware: el rival recibe 2 Malware en la mano (cuestan 1 para purgar; si siguen ahí al cerrar la ronda, 1 de Nexo cada uno).', [{ t: 'malware', n: 2 }]),
  S('bor_traicion', 'Traición', 2, 'slow', 'Tu unidad más débil y la enemiga más débil intercambian de bando.', [{ t: 'trueque' }]),
  S('bor_cobro', 'Cobro de Protección', 3, 'focus', 'El rival paga 1 de Nexo por cada unidad que controlas (máx 4).', [{ t: 'cobro', n: 4 }]),
  S('bor_contrato', 'Contrato de Sangre', 3, 'fast', 'Infecta con un Virus a una unidad enemiga: recibe 1 de daño al cerrar cada ronda y el virus salta a otra unidad suya.', [{ t: 'virus' }]),
  S('bor_apagon', 'Apagón de la Ciudad', 4, 'fast', 'Las unidades enemigas reciben 1 de daño; el rival pierde su maná de hechizo y no puede lanzar hechizos esta ronda.', [{ t: 'dmgAll', n: 1 }, { t: 'apagon' }]),
  S('bor_refuerzos', 'Llamar Refuerzos', 4, 'slow', 'Invoca 3 Matones.', [sum('bor_maton', 3)]),
  S('bor_ajuste', 'Ajuste de Cuentas', 5, 'slow', 'Cortocircuito en cadena: 4 de daño a la unidad enemiga más fuerte; salta a otras unidades enemigas con 3, 2 y 1.', [{ t: 'arco', n: 4 }]),
  T('bor_maton', 'Matón de Callejón', 2, 1, [], 'Ficha.'),
  { ...S('bor_malware', 'Malware', 1, 'burst', 'Purga el virus de tu mano. Si sigue en tu mano al cerrar la ronda, pierdes 1 de Nexo.', []), token: true },
];

/** SKALDRUM: reino griego de órdenes paramilitares. Precisión, estrategia y dominio.
 *  Falange: muro de escudos (+1 de vida por cada otra aliada con Falange, máx +2); los Hoplitas (fichas) la llevan.
 *  Mando: al atacar con ella, el resto del asalto gana +1 de poder. Dominio: efectos que solo se activan si controlas más unidades que el rival.
 *  Tiro certero: el disparo que mata, roba. Augurio: examina las cartas superiores del mazo y se queda con la mejor. */
const dom = (...fx: Effect[]): Effect => ({ t: 'dom', fx });
export const SKALDRUM: CardDef[] = [
  U('ska_vigia', 'Vigía de Muralla', 1, 1, 1, ['barrera']),
  U('ska_recluta', 'Recluta de la Falange', 1, 1, 2, ['falange']),
  U('ska_escudero', 'Escudero del Orden', 2, 1, 1, [], 'Al jugarla: invoca un Hoplita.', [sum('ska_hoplita', 1)]),
  U('ska_lancero', 'Lancero de la Falange', 2, 2, 1, ['rapido', 'falange']),
  U('ska_capitan', 'Capitán de Cohorte', 3, 2, 3, ['mando']),
  U('ska_jinete', 'Jinete de la Orden', 3, 3, 2, ['arrollar']),
  U('ska_pesado', 'Hoplita Pesado', 3, 2, 3, ['duro', 'falange']),
  U('ska_campeon', 'Campeón del Reino', 4, 3, 3, ['retador'], 'Dominio (más unidades que el rival): al jugarla, inflige 2 a una unidad enemiga.', [dom({ t: 'dmgEnemy', n: 2 })]),
  U('ska_estratega', 'Estratega de Guerra', 4, 2, 3, [], 'Al jugarla: Augurio 3 (mira las 3 cartas superiores, roba la de mayor coste y manda el resto al fondo).', [{ t: 'augurio', n: 3 }]),
  U('ska_acropolis', 'Centinela de la Acrópolis', 4, 3, 3, ['duro', 'falange']),
  U('ska_comandante', 'Comandante de Legión', 5, 3, 4, [], 'Al jugarla: invoca 2 Hoplitas.', [sum('ska_hoplita', 2)]),
  U('ska_oraculo', 'Guardia del Oráculo', 5, 3, 4, ['barrera'], 'Al jugarla: Augurio 3 (mira las 3 cartas superiores, roba la de mayor coste y manda el resto al fondo).', [{ t: 'augurio', n: 3 }]),
  U('ska_titan', 'Titán de Bronce', 6, 5, 5, ['duro', 'barrera']),
  U('ska_strategos', 'Strategos', 6, 4, 5, ['retador', 'mando']),
  U('ska_rey', 'Rey de Skaldrum', 7, 6, 6, ['barrera', 'mando'], 'Al jugarla: +1/+1 a tus unidades. Dominio (más unidades que el rival): +1/+1 más.', [{ t: 'buffAll', a: 1, h: 1 }, dom({ t: 'buffAll', a: 1, h: 1 })]),
  S('ska_lanza', 'Lanza Arrojadiza', 2, 'burst', 'Tiro certero: inflige 2 a una unidad enemiga; si la destruye, robas 1.', [{ t: 'certero', n: 2 }]),
  S('ska_escudo', 'Escudo de Bronce', 2, 'fast', 'Una aliada gana Barrera y Falange.', [{ t: 'giveKw', kw: 'barrera' }, { t: 'giveKw', kw: 'falange' }]),
  S('ska_testudo', 'Formación Testudo', 2, 'fast', 'Tus unidades ganan +0/+2 esta ronda.', [{ t: 'tempBuffAll', a: 0, h: 2 }]),
  S('ska_carga', 'Carga de Caballería', 3, 'fast', 'Tus unidades ganan +2/+0 esta ronda.', [{ t: 'tempBuffAll', a: 2, h: 0 }]),
  S('ska_asedio', 'Asedio', 3, 'focus', 'Inflige 2 al Nexo enemigo. Dominio (más unidades que el rival): 2 más.', [{ t: 'dmgNexus', n: 2 }, dom({ t: 'dmgNexus', n: 2 })]),
  S('ska_reclutamiento', 'Reclutamiento', 3, 'slow', 'Invoca 2 Hoplitas.', [sum('ska_hoplita', 2)]),
  S('ska_veredicto', 'Veredicto del Rey', 4, 'slow', 'Inflige 5 a una unidad enemiga. Dominio (más unidades que el rival): además 2 al Nexo enemigo.', [{ t: 'dmgEnemy', n: 5 }, dom({ t: 'dmgNexus', n: 2 })]),
  S('ska_orden', 'Orden del Estratega', 5, 'slow', 'Tus unidades ganan +1/+1. Dominio (más unidades que el rival): +1/+1 más.', [{ t: 'buffAll', a: 1, h: 1 }, dom({ t: 'buffAll', a: 1, h: 1 })]),
  T('ska_hoplita', 'Hoplita', 1, 1, ['falange'], 'Ficha.'),
];

/** MARKIVTON: flota pirata sin gobierno (sin mando ni curación: cada barco por su cuenta). Saqueo (los golpes al Nexo dan Doblones, moneda de la mano), Marea (Pleamar/Bajamar según la ronda) y Andanada (cañonea al cerrar la ronda si no atacó). */
const dob = (n: number, unit = false): Effect => ({ t: 'doblon', n, unit });
const tide = (pleamar: Effect[], bajamar: Effect[]): Effect => ({ t: 'tide', pleamar, bajamar });
const paga = (n: number, fx: Effect[]): Effect => ({ t: 'paga', n, fx });
export const MARKIVTON: CardDef[] = [
  U('mkv_grumete_atr', 'Grumete Atrevido', 1, 2, 1, ['saqueo']),
  U('mkv_gaviota', 'Gaviota Mensajera', 1, 1, 1, ['elusivo'], 'Al jugarla: añade un Doblón a tu mano.', [dob(1)]),
  U('mkv_canonero', 'Cañonero Alegre', 2, 2, 2, ['andanada']),
  U('mkv_bohemio', 'Pirata Bohemio', 2, 2, 2, ['marea']),
  U('mkv_loro', 'Loro Parlanchín', 3, 2, 3, ['elusivo', 'saqueo']),
  U('mkv_corsario', 'Corsario Fantasma', 3, 4, 2, ['saqueo', 'efimero']),
  U('mkv_contramaestre', 'Contramaestre', 3, 2, 3, [], 'Al jugarla: paga 1 Doblón para invocar 2 Grumetes.', [paga(1, [sum('mkv_grumete', 2)])]),
  U('mkv_tiburon', 'Tiburón Martillo', 3, 3, 3, ['marea']),
  U('mkv_navegante', 'Navegante Astuto', 3, 2, 3, [], 'Al jugarla: Pleamar, roba 1. Bajamar, añade 2 Doblones a tu mano.', [tide([{ t: 'draw', n: 1 }], [dob(2)])]),
  U('mkv_capitan', 'Capitán Libre', 4, 3, 3, ['rapido', 'saqueo']),
  U('mkv_fragata', 'Fragata Veloz', 4, 3, 4, ['elusivo', 'andanada']),
  U('mkv_cocinero', 'Cocinero del Barco', 4, 2, 4, ['marea'], 'Al jugarla: añade un Doblón a tu mano.', [dob(1)]),
  U('mkv_arponero', 'Arponero', 5, 4, 4, ['rapido'], 'Al jugarla: paga 1 Doblón para infligir 3 a la unidad enemiga más fuerte.', [paga(1, [{ t: 'dmgEnemy', n: 3 }])]),
  U('mkv_kraken', 'Kraken de las Profundidades', 6, 6, 5, ['marea', 'andanada']),
  U('mkv_galeon', 'Galeón Fantasma', 6, 5, 5, ['elusivo', 'andanada']),
  U('mkv_rey', 'Rey Pirata', 7, 5, 5, ['rapido', 'saqueo'], 'Al jugarla: añade 3 Doblones a tu mano.', [dob(3)]),
  S('mkv_reparto', 'Reparto del Botín', 1, 'focus', 'Añade 2 Doblones a tu mano.', [dob(2)]),
  S('mkv_cofre', 'Cofre del Tesoro', 2, 'focus', 'Roba 1 carta y añade un Doblón a tu mano.', [{ t: 'draw', n: 1 }, dob(1)]),
  S('mkv_viento', 'Viento a Favor', 2, 'fast', 'Una aliada gana Saqueo y +1/+0 esta ronda.', [{ t: 'giveKw', kw: 'saqueo' }, { t: 'tempBuff', a: 1, h: 0 }]),
  S('mkv_abandonar', 'Abandonar el Barco', 2, 'slow', 'Sacrifica tu unidad más débil; daña a una enemiga igual a su ataque.', [{ t: 'sacDmg' }]),
  S('mkv_salva', 'Salva de Cañones', 3, 'fast', 'Pleamar: inflige 2 a todas las unidades enemigas. Bajamar: inflige 1 a todas y añade un Doblón a tu mano.', [tide([{ t: 'dmgAll', n: 2 }], [{ t: 'dmgAll', n: 1 }, dob(1)])]),
  S('mkv_abordaje', 'Abordaje', 3, 'focus', 'Inflige 2 al Nexo enemigo. Paga 1 Doblón: 2 más.', [{ t: 'dmgNexus', n: 2 }, paga(1, [{ t: 'dmgNexus', n: 2 }])]),
  S('mkv_niebla', 'Niebla Marina', 3, 'fast', 'Pleamar: la enemiga más fuerte tiene 0 de poder esta ronda. Bajamar: todas las enemigas.', [tide([{ t: 'frost' }], [{ t: 'frostAll' }])]),
  S('mkv_fiesta', 'Fiesta en Cubierta', 3, 'fast', 'Añade un Doblón a tu mano por cada unidad tuya (máx. 3).', [dob(3, true)]),
  S('mkv_tormenta', 'Tormenta en Alta Mar', 5, 'slow', 'Pleamar: inflige 3 a todas las unidades enemigas. Bajamar: inflige 2 a todas y roba 1.', [tide([{ t: 'dmgAll', n: 3 }], [{ t: 'dmgAll', n: 2 }, { t: 'draw', n: 1 }])]),
  T('mkv_grumete', 'Grumete', 1, 2, [], 'Ficha.'),
  { ...S('mkv_doblon', 'Doblón', 0, 'burst', 'Ganas 1 de maná este turno. También sirve de moneda para las cartas que piden pagar Doblones.', [{ t: 'gainMana', n: 1 }]), token: true },
];

/** TRIBUS SKALDRAK: clanes sin gobierno central de las montañas heladas; cada clan levanta su propio hielo para defenderse.
 *  · Glaciar: un muro de hielo sobre el Nexo (máx. 6). Absorbe el daño enemigo antes de que llegue al Nexo y se gasta como munición (Avalancha: daño a una enemiga; Alud: daño a todas).
 *    Mientras controles una unidad Glacial, el Glaciar crece +1 al cerrar cada ronda.
 *  · Skanuj: raza de piel azulada, hecha al frío. Inmune a Escarcha y Pegada, y se alimenta del Glaciar (+1 de poder con 3 o más de Glaciar).
 *  · Madura: las crías (Cachorro, Lobeznos, Aprendiz) evolucionan al cerrar la ronda si siguen en juego y no atacaron. */
export const SKALDRAK: CardDef[] = [
  { ...U('tsk_cachorro', 'Cachorro de Lobo', 1, 1, 1, ['madura'], 'Madura: si no ataca, al cerrar la ronda se convierte en Lobo Gris.'), evolve: 'tsk_lobogris' },
  { ...U('tsk_aprendiz', 'Aprendiz de Hielo', 1, 1, 2, ['skanuj', 'madura'], 'Madura: si no ataca, al cerrar la ronda se convierte en Adepto de Hielo.'), evolve: 'tsk_adepto' },
  U('tsk_guardian', 'Guardián del Hielo', 2, 1, 3, ['duro', 'glacial']),
  U('tsk_hermano', 'Hermano de Tribu', 2, 2, 1, [], 'Al jugarla: +1 de Glaciar.', [{ t: 'glaciar', n: 1 }]),
  U('tsk_chaman', 'Chamán de Escarcha', 3, 2, 2, ['skanuj'], 'Al jugarla: +1 de Glaciar.', [{ t: 'glaciar', n: 1 }]),
  U('tsk_lobo', 'Lobo Níveo', 3, 3, 2, ['rapido']),
  U('tsk_cantor', 'Cantor de la Hoguera', 3, 2, 3, [], 'Al jugarla: cura 3 a tu Nexo y +1 de Glaciar.', [{ t: 'healNexus', n: 3 }, { t: 'glaciar', n: 1 }]),
  U('tsk_ventisca', 'Espíritu de Ventisca', 3, 2, 3, ['elusivo']),
  U('tsk_jefe', 'Jefe de Clan', 4, 2, 4, [], 'Al jugarla: +1/+1 a tus unidades.', [{ t: 'buffAll', a: 1, h: 1 }]),
  U('tsk_yeti', 'Yeti de las Cumbres', 4, 3, 4, ['regenera']),
  U('tsk_guerrera', 'Guerrera del Glaciar', 4, 3, 4, ['skanuj', 'barrera'], 'Al jugarla: +1 de Glaciar.', [{ t: 'glaciar', n: 1 }]),
  U('tsk_hechicera', 'Hechicera del Hielo', 5, 3, 4, ['skanuj'], 'Al jugarla: inflige 1 a la enemiga más fuerte, +1 por cada Glaciar que gastes (hasta 3).', [{ t: 'avalancha', base: 1, max: 3 }]),
  U('tsk_mamut', 'Mamut de Lana', 5, 4, 6, ['duro']),
  U('tsk_dragon', 'Dragón de Hielo', 6, 5, 4, ['elusivo'], 'Al jugarla: gasta hasta 6 de Glaciar: inflige 1 a todas las unidades enemigas por cada 2 gastados.', [{ t: 'alud', base: 0, max: 6 }]),
  U('tsk_anciano', 'Anciano de la Fraternidad', 6, 4, 5, [], 'Al jugarla: +1/+1 a tus unidades y +2 de Glaciar.', [{ t: 'buffAll', a: 1, h: 1 }, { t: 'glaciar', n: 2 }]),
  U('tsk_sabio', 'Sabio Skanuj', 7, 5, 6, ['skanuj', 'barrera', 'regenera', 'glacial'], 'Al jugarla: +2 de Glaciar y tus Skanuj ganan +1/+1.', [{ t: 'glaciar', n: 2 }, { t: 'buffSkanuj', a: 1, h: 1 }]),
  S('tsk_hoguera', 'Fuego de la Hoguera', 2, 'burst', 'Cura 3 a tu Nexo y +1 de Glaciar.', [{ t: 'healNexus', n: 3 }, { t: 'glaciar', n: 1 }]),
  S('tsk_aliento', 'Aliento Gélido', 2, 'fast', 'Inflige 2 a una unidad enemiga y +1 de Glaciar.', [{ t: 'dmgEnemy', n: 2 }, { t: 'glaciar', n: 1 }]),
  S('tsk_escarcha', 'Muro de Hielo', 2, 'fast', '+2 de Glaciar.', [{ t: 'glaciar', n: 2 }]),
  S('tsk_lanza', 'Lanza de Hielo', 3, 'fast', 'Inflige 3 a una unidad enemiga, +1 por cada Glaciar que gastes (hasta 3).', [{ t: 'avalancha', base: 3, max: 3 }]),
  S('tsk_juramento', 'Juramento de Hermandad', 3, 'fast', 'Tus unidades ganan +1/+2 esta ronda.', [{ t: 'tempBuffAll', a: 1, h: 2 }]),
  S('tsk_manada', 'Llamado de la Manada', 3, 'slow', 'Invoca 2 Lobeznos (maduran en Lobos Grises).', [sum('tsk_lobezno', 2)]),
  S('tsk_ventiscaz', 'Ventisca', 5, 'fast', 'Gasta hasta 6 de Glaciar: inflige 1 a todas las unidades enemigas por cada 2 gastados.', [{ t: 'alud', base: 0, max: 6 }]),
  S('tsk_prision', 'Prisión de Hielo', 5, 'slow', 'Destruye una unidad enemiga.', [{ t: 'destroyEnemy' }]),
  S('tsk_aurora', 'Aurora Boreal', 5, 'slow', '+2 de Glaciar y tus unidades ganan +1/+1.', [{ t: 'glaciar', n: 2 }, { t: 'buffAll', a: 1, h: 1 }]),
  { ...T('tsk_lobezno', 'Lobezno', 1, 1, ['madura'], 'Ficha. Madura: si no ataca, al cerrar la ronda se convierte en Lobo Gris.'), evolve: 'tsk_lobogris' },
  T('tsk_lobogris', 'Lobo Gris', 2, 2, [], 'Ficha. Es la forma adulta del Cachorro y del Lobezno.'),
  T('tsk_adepto', 'Adepto de Hielo', 2, 3, ['skanuj', 'glacial'], 'Ficha. Es la forma adulta del Aprendiz de Hielo.'),
];

export const NATION_CARDS: CardDef[] = [...LUMIS, ...ARBORIS, ...NEGATT, ...BORO, ...SKALDRUM, ...MARKIVTON, ...SKALDRAK, ...NATION_CARDS_2];
