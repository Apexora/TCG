// Aventura: naciones, rivales y mazos. Sin DOM: se puede probar con tsx.
import { CARDS, DECKS } from '../data/cards';

export const DECK_LEN = 40, MAX_COPIES = 2;

/** Mazo de 40: `core` ("id" o "id:n") + relleno de la misma facción hasta completar, sin pasar de 2 copias. */
function build(faction: string, core: string[]): string[] {
  const out: string[] = [], n: Record<string, number> = {};
  const put = (id: string, c = 1) => { for (let k = 0; k < c && out.length < DECK_LEN && (n[id] ?? 0) < MAX_COPIES; k++) { out.push(id); n[id] = (n[id] ?? 0) + 1; } };
  for (const e of core) { const [id, c] = e.split(':'); put(`${faction}_${id}`, c ? +c : 1); }
  const rest = Object.values(CARDS).filter(c => c.id.startsWith(faction + '_') && !c.token).sort((a, b) => a.cost - b.cost).map(c => c.id);
  for (let pass = 0; out.length < DECK_LEN && pass < MAX_COPIES; pass++) for (const id of rest) put(id);
  return out;
}

export interface Rival { id: string; name: string; level: 1 | 2 | 3 | 4 | 5; tag: string; deck: string[]; boss?: boolean; imgs: string[] }
export interface Nation { id: string; name: string; rivals: Rival[] }

type Faction2 = 'lum' | 'umb';
/** Arquetipos de mazo reutilizables (cada rival elige uno). Cambiar aquí cambia a todos los rivales que lo usan. */
const ARCH: Record<string, { f: Faction2; tag: string; core: string[] }> = {
  lum_alba: { f: 'lum', tag: 'Unidades pequeñas y curación', core: ['acolita:2', 'vigia:2', 'centinela:2', 'portador:2', 'novicia:2', 'halcon:2', 'sanadora:2', 'vidente:2', 'destello:2', 'rocio:2', 'fervor:2', 'escudo:2', 'bendicion:2', 'plegaria'] },
  lum_cura: { f: 'lum', tag: 'Cura sin parar y resiste', core: ['novicia:2', 'sanadora:2', 'oraculo:2', 'coloso:2', 'serafin', 'plegaria:2', 'destello:2', 'renacer:2', 'absorcion:2', 'rocio:2', 'estrellas', 'amanecer'] },
  lum_cielo: { f: 'lum', tag: 'Elusivos desde el cielo', core: ['halcon:2', 'serafin:2', 'velo:2', 'fervor:2', 'portador:2', 'heraldo:2', 'resplandor:2', 'bendicion:2', 'juicio:2', 'absorcion:2', 'vidente:2'] },
  lum_muralla: { f: 'lum', tag: 'Muralla de Barreras', core: ['centinela:2', 'paladin:2', 'coloso:2', 'arcangel', 'escudo:2', 'heraldo:2', 'bendicion:2', 'renacer:2', 'juicio:2', 'plegaria:2', 'escarcha:2', 'sanadora:2'] },
  lum_hechizos: { f: 'lum', tag: 'Maestría en hechizos', core: ['vision:2', 'escarcha:2', 'juicio:2', 'estrellas:2', 'absorcion:2', 'plegaria:2', 'amanecer:2', 'resplandor:2', 'fervor:2', 'velo:2', 'oraculo:2', 'vidente:2', 'arcangel'] },
  lum_aurora: { f: 'lum', tag: 'Capitanas Aurora y Retador', core: ['lider:2', 'coloso', 'serafin', 'arcangel', 'paladin:2', 'heraldo:2', 'bendicion:2', 'escudo:2', 'juicio:2', 'estrellas', 'amanecer', 'plegaria:2', 'centinela:2', 'novicia:2', 'portador:2'] },
  lum_buffs: { f: 'lum', tag: 'Refuerzos y ataque en masa', core: ['portador:2', 'heraldo:2', 'centinela:2', 'novicia:2', 'halcon:2', 'fervor:2', 'bendicion:2', 'resplandor:2', 'sanadora:2', 'vidente:2', 'paladin:2', 'amanecer', 'juicio'] },
  lum_duelista: { f: 'lum', tag: 'Duelista de control', core: ['centinela:2', 'paladin:2', 'halcon:2', 'juicio:2', 'escarcha:2', 'absorcion:2', 'escudo:2', 'vidente:2', 'oraculo:2', 'serafin', 'heraldo', 'plegaria', 'vision'] },
  lum_celestial: { f: 'lum', tag: 'Gigantes celestiales', core: ['serafin', 'arcangel', 'coloso', 'paladin:2', 'amanecer', 'estrellas', 'plegaria:2', 'juicio:2', 'resplandor:2', 'heraldo:2', 'escudo:2', 'absorcion:2', 'centinela:2', 'novicia:2', 'vidente:2'] },
  umb_rush: { f: 'umb', tag: 'Ataque rápido y sin piedad', core: ['sombra:2', 'aprendiz:2', 'acechador:2', 'cultista:2', 'espectro:2', 'lobo:2', 'sanguijuela:2', 'jinete', 'punalada:2', 'furia:2', 'embestida:2'] },
  umb_letal: { f: 'umb', tag: 'Letal y Temible', core: ['reptante:2', 'acechador:2', 'verdugo:2', 'senor', 'drenar:2', 'plaga:2', 'punalada:2', 'maldicion:2', 'eclipse', 'devoradora:2', 'ritualista:2', 'esqueleto:2'] },
  umb_arrollar: { f: 'umb', tag: 'Arrollar sin freno', core: ['lobo:2', 'jinete:2', 'azote:2', 'titan', 'furia:2', 'embestida:2', 'behemot:2', 'devoradora:2', 'cultista:2', 'espectro:2', 'drenar:2'] },
  umb_muro: { f: 'umb', tag: 'Muro de hierro y regeneración', core: ['aprendiz:2', 'esqueleto:2', 'golem:2', 'basalto:2', 'behemot:2', 'abisal:2', 'titan:2', 'piel:2', 'aplastar:2', 'maldicion', 'eclipse:2', 'plaga:2', 'drenar:2'] },
  umb_general: { f: 'umb', tag: 'Fuerza bruta sin debilidades', core: ['senor', 'titan', 'abisal', 'behemot', 'jinete:2', 'azote:2', 'verdugo:2', 'devoradora:2', 'aplastar:2', 'eclipse', 'maldicion', 'drenar:2', 'furia:2', 'punalada:2', 'golem:2', 'lobo:2'] },
  umb_sacrificio: { f: 'umb', tag: 'Sacrificios y devoradores', core: ['ritualista:2', 'devoradora:2', 'pacto:2', 'eclipse:2', 'verdugo:2', 'cultista:2', 'golem:2', 'aplastar', 'plaga:2', 'punalada:2', 'sombra:2', 'abisal', 'senor'] },
  umb_drenaje: { f: 'umb', tag: 'Drena vida y desgasta', core: ['sanguijuela:2', 'drenar:2', 'abisal:2', 'plaga:2', 'verdugo:2', 'acechador:2', 'aprendiz:2', 'punalada:2', 'maldicion', 'esqueleto:2', 'jinete', 'eclipse'] },
  umb_vacio: { f: 'umb', tag: 'Golpes directos al Nexo', core: ['espectro:2', 'cultista:2', 'embestida:2', 'furia:2', 'azote:2', 'jinete:2', 'lobo:2', 'sombra:2', 'punalada:2', 'acechador:2', 'verdugo', 'aplastar'] },
  umb_titan: { f: 'umb', tag: 'Colosos imparables', core: ['titan', 'behemot', 'senor', 'abisal', 'basalto:2', 'aplastar:2', 'eclipse', 'maldicion', 'golem:2', 'drenar:2', 'piel:2', 'plaga:2', 'lobo:2', 'devoradora:2', 'verdugo:2', 'jinete:2'] },
};
interface Opt { boss?: boolean; tag?: string; team?: string[] }
/** R(id, nombre, nivel de IA, arquetipo). `team` = los integrantes (retratos) de un duelo en equipo. */
const R = (id: string, name: string, level: Rival['level'], arch: string, o: Opt = {}): Rival => {
  const a = ARCH[arch]; if (!a) throw new Error('Arquetipo desconocido: ' + arch);
  return { id, name, level, tag: o.tag ?? a.tag, deck: build(a.f, a.core), boss: !!o.boss, imgs: o.team ?? [id] };
};

/** Rival de una nación con cartas propias: N(id, nombre, nivel de IA, prefijo de nación, descripción, cartas clave). */
const N = (id: string, name: string, level: Rival['level'], pre: string, tag: string, core: string[], o: { boss?: boolean; team?: string[] } = {}): Rival =>
  ({ id, name, level, tag, deck: build(pre, core), boss: !!o.boss, imgs: o.team ?? [id] });

/** Solo las naciones con duelos disponibles; el resto del mapa aparece como "Próximamente". */
export const NATIONS: Record<string, Nation> = {
  luminarae: { id: 'luminarae', name: 'Luminarae Luxor', rivals: [
    R('astra', 'Astra', 1, 'lum_alba'), R('luminara4', 'Luminara IV', 2, 'lum_cura'), R('orion', 'Orion', 3, 'lum_cielo'), R('aldebaran', 'Aldebaran', 3, 'lum_muralla'),
    R('vela', 'Vela', 4, 'lum_hechizos', { tag: 'Maestra de hechizos' }), R('klio', 'Klio', 5, 'lum_aurora', { boss: true })] },
  umbra: { id: 'umbra', name: 'Umbra', rivals: [
    R('caleus', 'Caleus', 1, 'umb_rush'), R('abyssara', 'Abyssara', 2, 'umb_letal'), R('voragos', 'Voragos', 3, 'umb_arrollar'), R('puj', 'Puj', 4, 'umb_muro'),
    R('general', 'El General', 5, 'umb_general', { boss: true })] },
  lumis: { id: 'lumis', name: 'Lumis', rivals: [
    N('blue', 'Blue', 1, 'lms', 'Enjambre de drones', ['chip:2', 'nanobot:2', 'artillero:2', 'enlace:2', 'enjambre:2', 'medico:2', 'escudo:2', 'overclock:2', 'despliegue:2', 'analista:2', 'nodo', 'laser']),
    N('bot4', 'BOT4', 2, 'lms', 'Androides blindados', ['escudo:2', 'elite:2', 'mecha:2', 'cortafuegos:2', 'nanobot:2', 'medico:2', 'cazador:2', 'nodo:2', 'laser', 'analista:2', 'cerebro']),
    N('solara', 'Solara', 3, 'lms', 'Hackeo y control', ['hacker:2', 'virus:2', 'emp:2', 'nube:2', 'analista:2', 'laser:2', 'cerebro:2', 'cazador:2', 'cortafuegos', 'enlace:2', 'purga']),
    N('henry', 'Henry', 4, 'lms', 'Ofensiva mecanizada', ['artillero:2', 'cazador:2', 'overclock:2', 'laser:2', 'elite:2', 'nodo:2', 'mecha:2', 'enlace:2', 'emp:2', 'enjambre:2', 'chip:2', 'nave']),
    N('inargo', 'Inargo', 5, 'lms', 'La IA que lo controla todo', ['inargo', 'nave:2', 'cerebro:2', 'purga:2', 'emp:2', 'nube:2', 'despliegue:2', 'hacker:2', 'virus:2', 'analista:2', 'laser:2', 'elite:2', 'mecha', 'chip:2', 'enjambre:2'], { boss: true })] },
  arboris: { id: 'arboris', name: 'Arboris', rivals: [
    N('willow', 'Willow', 1, 'arb', 'Brotes y curación', ['libelula:2', 'corteza:2', 'hada:2', 'savia:2', 'piel:2', 'floracion:2', 'ciclo:2', 'driade', 'ent:2', 'ciervo', 'hongo:2', 'despertar:2']),
    N('seah', 'Seah', 2, 'arb', 'Veneno lento', ['hongo:2', 'arana:2', 'serpiente:2', 'mordedura:2', 'hidra:2', 'esporas:2', 'cazadora:2', 'espinas:2', 'hada', 'corteza:2', 'piel']),
    N('zarick', 'Zarick', 3, 'arb', 'Cacería en la espesura', ['jabali:2', 'serpiente:2', 'cazadora:2', 'libelula:2', 'duende:2', 'espejismo:2', 'mordedura:2', 'ciervo:2', 'arbol', 'espiritu', 'floracion:2', 'espinas']),
    N('tilimad', 'Tilimad', 4, 'arb', 'Ilusiones del bosque', ['duende:2', 'espejismo:2', 'libelula:2', 'cazadora:2', 'espiritu:2', 'ciclo:2', 'esporas:2', 'ciervo:2', 'hada:2', 'savia', 'driade', 'despertar']),
    N('agamuno', 'Agamuno', 5, 'arb', 'El bosque entero despierta', ['guardian:2', 'arbol:2', 'hidra:2', 'espiritu:2', 'ent:2', 'driade:2', 'despertar:2', 'esporas:2', 'ciervo:2', 'mordedura', 'piel:2', 'savia', 'ciclo'], { boss: true })] },
  negatt: { id: 'negatt', name: 'Negatt', rivals: [
    N('cuasipapei', 'Cuasipapei', 1, 'neg', 'Penitentes marcados', ['acolito:2', 'penitente:2', 'heraldo:2', 'sacerdote:2', 'caballero:2', 'vasallo:2', 'pacto:2', 'condena:2', 'bendicion:2', 'monje:2', 'angel']),
    N('tk', 'Tk', 2, 'neg', 'La Inquisición', ['monje:2', 'profeta:2', 'exorcismo:2', 'juez:2', 'caballero:2', 'condena:2', 'misa:2', 'arconte', 'vasallo:2', 'sacerdote:2', 'plaga']),
    N('ricardo-lynch', 'Ricardo y Lynch', 3, 'neg', 'Duelo en equipo · Casas rivales', ['devoto:2', 'sacrificio:2', 'heraldo:2', 'sacerdote:2', 'vasallo:2', 'pacto:2', 'cruzado', 'patriarca:2', 'bendicion:2', 'condena:2', 'plaga', 'misa:2'], { team: ['ricardo', 'lynch'] }),
    N('azalange', 'Azalange', 3, 'neg', 'Ángeles caídos', ['angel:2', 'serafin:2', 'arconte:2', 'penitente:2', 'misa:2', 'exorcismo:2', 'pacto:2', 'caballero:2', 'bendicion:2', 'condena:2', 'decreto']),
    N('xuelen', 'Xuelen', 4, 'neg', 'Sangre y sacrificio', ['devoto:2', 'sacrificio:2', 'patriarca:2', 'profeta:2', 'pacto:2', 'heraldo:2', 'sacerdote:2', 'plaga:2', 'juez:2', 'decreto', 'dios']),
    N('dimorf', 'Dimorf', 5, 'neg', 'Las Diez Casas', ['dios', 'cruzado', 'serafin', 'patriarca:2', 'arconte:2', 'decreto', 'plaga', 'misa:2', 'exorcismo:2', 'condena:2', 'juez:2', 'angel:2', 'pacto:2', 'caballero:2', 'sacerdote:2'], { boss: true })] },
  boro: { id: 'boro', name: 'Boro', rivals: [
    N('sara', 'Sara', 1, 'bor', 'Pandillas de barrio', ['raterillo:2', 'pandilla:2', 'contrabandista:2', 'informante:2', 'sicario:2', 'capo:2', 'refuerzos', 'botin:2', 'soborno', 'contrato:2', 'guardaespaldas:2']),
    N('liyam', 'Liyam', 2, 'bor', 'Extorsión y cobros', ['recaudador:2', 'extorsion:2', 'cobro:2', 'raterillo:2', 'dron:2', 'contrabandista:2', 'mercenario:2', 'ajuste', 'soborno:2', 'botin:2', 'sicario:2']),
    N('belmina', 'Belmina', 3, 'bor', 'Implantes y apagones', ['dron:2', 'cirujano:2', 'enforcer:2', 'mercenario:2', 'apagon:2', 'soborno:2', 'contrato:2', 'informante:2', 'don:2', 'guardaespaldas:2', 'traicion']),
    N('zhorak', 'Zhorak', 4, 'bor', 'Sicarios y traiciones', ['sicario:2', 'traicion:2', 'capo:2', 'pandilla:2', 'contrabandista:2', 'refuerzos:2', 'contrato:2', 'don:2', 'jefe:2', 'apagon', 'soborno', 'raterillo:2']),
    N('beo', 'Beo', 5, 'bor', 'El Sindicato manda', ['senor:2', 'jefe:2', 'don:2', 'enforcer:2', 'capo:2', 'refuerzos:2', 'ajuste:2', 'apagon:2', 'soborno:2', 'contrato:2', 'cobro:2', 'recaudador:2', 'cirujano:2', 'mercenario:2'], { boss: true })] },
  skaldrum: { id: 'skaldrum', name: 'Reino de Skaldrum', rivals: [
    N('axeraide', 'Axeraide', 1, 'ska', 'La falange avanza', ['vigia:2', 'recluta:2', 'escudero:2', 'lancero:2', 'capitan:2', 'jinete:2', 'pesado:2', 'lanza:2', 'escudo:2', 'testudo:2', 'carga', 'reclutamiento']),
    N('ullontras-hijo', 'Ullontras Hijo', 2, 'ska', 'Muralla de bronce', ['recluta:2', 'pesado:2', 'acropolis:2', 'oraculo:2', 'titan', 'testudo:2', 'escudo:2', 'estratega:2', 'capitan:2', 'lanza:2', 'veredicto']),
    N('julio', 'Julio', 3, 'ska', 'Caballería de la Orden', ['lancero:2', 'jinete:2', 'campeon:2', 'capitan:2', 'carga:2', 'asedio:2', 'strategos:2', 'estratega:2', 'lanza:2', 'escudero:2', 'veredicto']),
    N('lurim', 'Lurim', 4, 'ska', 'Legión organizada', ['escudero:2', 'comandante:2', 'reclutamiento:2', 'estratega:2', 'orden:2', 'capitan:2', 'pesado:2', 'acropolis:2', 'testudo:2', 'veredicto:2', 'lanza:2']),
    N('oci', 'Oci', 5, 'ska', 'La Orden del Rey', ['rey', 'strategos', 'titan', 'oraculo', 'comandante', 'campeon:2', 'orden', 'veredicto', 'asedio', 'carga', 'estratega:2', 'acropolis', 'reclutamiento', 'escudo:2', 'capitan:2', 'jinete:2', 'recluta:2', 'lancero:2'], { boss: true })] },
  markivton: { id: 'markivton', name: 'Markivton', rivals: [
    N('nefri', 'Nefri', 1, 'mkv', 'Marineros de puerto', ['grumete_atr:2', 'gaviota:2', 'canonero:2', 'bohemio:2', 'contramaestre:2', 'tiburon:2', 'cofre:2', 'viento:2', 'fiesta:2', 'cocinero:2', 'abordaje']),
    N('nailis', 'Nailis', 2, 'mkv', 'Saqueo de costas', ['corsario:2', 'tiburon:2', 'capitan:2', 'arponero:2', 'viento:2', 'abordaje:2', 'salva:2', 'canonero:2', 'grumete_atr:2', 'reparto:2', 'kraken']),
    N('joshua', 'Joshua', 3, 'mkv', 'Navegantes del horizonte', ['loro:2', 'navegante:2', 'gaviota:2', 'fragata:2', 'galeon:2', 'cofre:2', 'niebla:2', 'tormenta', 'reparto:2', 'bohemio:2', 'fiesta:2', 'cocinero']),
    N('darvok', 'Darvok', 4, 'mkv', 'Corsarios sin bandera', ['corsario:2', 'canonero:2', 'abandonar:2', 'capitan:2', 'arponero:2', 'salva:2', 'abordaje:2', 'viento:2', 'contramaestre:2', 'kraken', 'niebla:2', 'tiburon:2']),
    N('laki', 'Laki', 5, 'mkv', 'El Rey Pirata zarpa', ['rey', 'kraken:2', 'galeon:2', 'arponero:2', 'fragata:2', 'capitan:2', 'tormenta:2', 'abordaje:2', 'cofre:2', 'reparto:2', 'niebla:2', 'navegante:2', 'corsario:2'], { boss: true })] },
  tribus: { id: 'tribus', name: 'Tribus Skaldrak', rivals: [
    N('tatal-ruruk', 'Tatal y Ruruk', 2, 'tsk', 'Duelo en equipo · La manada', ['cachorro:2', 'lobo:2', 'hermano:2', 'manada:2', 'jefe:2', 'yeti:2', 'aliento:2', 'lanza:2', 'juramento:2', 'hoguera:2', 'guerrera'], { team: ['tatal', 'ruruk'] }),
    N('didih-zazap', 'Didih y Zazap', 3, 'tsk', 'Duelo en equipo · Hermandad', ['hermano:2', 'cantor:2', 'jefe:2', 'anciano:2', 'juramento:2', 'hoguera:2', 'aurora:2', 'escarcha:2', 'guerrera:2', 'aprendiz:2', 'manada', 'yeti'], { team: ['didih', 'zazap'] }),
    N('skaldor', 'Skaldor', 3, 'tsk', 'Cazador de las cumbres', ['lobo:2', 'ventisca:2', 'chaman:2', 'yeti:2', 'guerrera:2', 'lanza:2', 'aliento:2', 'cachorro:2', 'mamut:2', 'prision', 'juramento']),
    N('pin', 'Pin', 4, 'tsk', 'Magia de hielo', ['chaman:2', 'hechicera:2', 'dragon:2', 'aliento:2', 'ventiscaz:2', 'prision:2', 'lanza:2', 'guardian:2', 'aprendiz:2', 'ventisca:2', 'escarcha']),
    N('sabio-skanuj', 'Sabio Skanuj', 5, 'tsk', 'La tormenta del Sabio', ['sabio', 'dragon', 'hechicera', 'anciano', 'mamut', 'ventiscaz', 'prision', 'aurora', 'lanza:2', 'yeti', 'guerrera:2', 'jefe:2', 'manada:2', 'aliento:2', 'cantor:2', 'hermano:2', 'cachorro:2', 'lobo:2'], { boss: true })] },
  // ---- Segunda tanda: cada nación con su propia mecánica (ver src/data/nations2.ts) ----
  // Psybernia · Mutante (+2 poder / -1 vida cada ronda) y Fusión
  psybernia: { id: 'psybernia', name: 'Psybernia', rivals: [
    N('ps-01', 'PS-01', 1, 'psy', 'Sujeto de prueba · mutantes inestables', ['larva:2', 'cobaya:2', 'resto:2', 'gusano:2', 'carcelero:2', 'bisturi:2', 'suero:2', 'inyeccion:2', 'quimera', 'aborto']),
    N('pm-05', 'PM-05', 2, 'psy', 'Fusiones deformes', ['quimera:2', 'fusion:2', 'aborto:2', 'gusano:2', 'cobaya:2', 'carcelero:2', 'disecar:2', 'amputar', 'segador:2', 'hibrido', 'suero']),
    N('pl-08', 'PL-08', 3, 'psy', 'Plaga de las dunas', ['reptante:2', 'segador:2', 'gusano:2', 'arena:2', 'cria:2', 'hibrido:2', 'quirofano:2', 'amputar', 'bisturi:2', 'hidra', 'purga']),
    N('p-10', 'P-10', 4, 'psy', 'Colosos de laboratorio', ['abominacion:2', 'hidra:2', 'amalgama:2', 'coloso', 'suero:2', 'disecar:2', 'fusion:2', 'arena', 'purga', 'carcelero:2', 'quimera:2', 'bisturi:2']),
    N('valeria', 'Valeria', 5, 'psy', 'La creadora de los experimentos', ['valeria', 'coloso:2', 'hidra:2', 'abominacion', 'amalgama:2', 'quimera:2', 'fusion:2', 'suero:2', 'purga:2', 'amputar', 'disecar:2', 'cria:2', 'arena', 'quirofano:2', 'hibrido:2'], { boss: true })] },
  // Sinfalía · Don (al morir, +1/+1 al grupo) y Tregua (nadie ataca)
  sinfalia: { id: 'sinfalia', name: 'Sinfalía', rivals: [
    N('ubiubis', 'Ubiubis', 1, 'sin', 'Favores y sonrisas', ['cantor:2', 'vecino:2', 'panadero:2', 'bailarin:2', 'mensajero:2', 'abrazo:2', 'favor:2', 'obsequio:2', 'canto', 'regalo']),
    N('volmi', 'Volmi', 2, 'sin', 'El pueblo comparte', ['regalo:2', 'panadero:2', 'curandera:2', 'poeta:2', 'anfitrion:2', 'banquete:2', 'obsequio:2', 'favor:2', 'abuela', 'festejos']),
    N('seila', 'Seila', 3, 'sin', 'Cantos y dones', ['cantor:2', 'regalo:2', 'anfitrion:2', 'coro:2', 'favor:2', 'gesto:2', 'canto:2', 'festejos:2', 'fiesta', 'juglar:2', 'abrazo:2']),
    N('valmey', 'Valmey', 4, 'sin', 'Tregua eterna', ['abuela:2', 'guardian:2', 'juglar:2', 'tregua', 'banquete', 'alcalde', 'curandera:2', 'poeta:2', 'coro', 'canto:2', 'favor:2', 'gesto', 'panadero:2', 'regalo:2']),
    N('salin', 'Salin', 5, 'sin', 'La alegría sin leyes', ['corazon', 'coro:2', 'festejos:2', 'alcalde:2', 'anfitrion', 'regalo:2', 'tregua', 'fiesta', 'jubileo', 'banquete', 'favor:2', 'gesto:2', 'canto:2', 'abuela', 'juglar:2', 'panadero:2', 'poeta:2'], { boss: true })] },
  // Ostraca · Leal (los clones se refuerzan al llegar) y Clonar
  ostraca: { id: 'ostraca', name: 'Ostraca', rivals: [
    N('doctor-chip', 'Doctor Chip', 1, 'ost', 'Clones sanadores', ['obrero:2', 'aprendiz:2', 'granjero:2', 'doctor:2', 'cocinero:2', 'cuidado:2', 'orden:2', 'obediencia:2', 'guardia:2', 'clon', 'censo']),
    N('juez-chip', 'Juez Chip', 2, 'ost', 'Sentencia obediente', ['juez:2', 'soldado:2', 'guardia:2', 'clon:2', 'veredicto:2', 'adoctrinar:2', 'sacrificio:2', 'obediencia:2', 'maestro', 'orden:2', 'doctor']),
    N('granjero-chip', 'Granjero Chip', 3, 'ost', 'La granja multiplica', ['obrero:2', 'cocinero:2', 'granjero:2', 'clon:2', 'replica:2', 'capataz:2', 'maestro:2', 'cuidado:2', 'censo:2', 'obediencia', 'orden:2', 'centinela']),
    N('comerciante-chip', 'Comerciante Chip', 3, 'ost', 'Producción en masa', ['comerciante:2', 'cientifico:2', 'clon:2', 'capataz:2', 'produccion:2', 'replica:2', 'censo:2', 'maestro:2', 'soldado:2', 'veredicto:2', 'heraldo', 'decreto', 'obediencia']),
    N('chip', 'Chip', 5, 'ost', 'El original: todos le obedecen', ['chip', 'heraldo:2', 'capataz:2', 'cientifico:2', 'clon:2', 'maestro:2', 'produccion:2', 'replica:2', 'decreto:2', 'veredicto:2', 'adoctrinar:2', 'soldado:2', 'centinela:2', 'juez:2', 'comerciante', 'cuidado'], { boss: true })] },
  // Pongí · Estilo (cada hechizo la hace brillar) y Chicle (Pegada)
  pongi: { id: 'pongi', name: 'Pongí', rivals: [
    N('srsc', 'SRSC', 1, 'pon', 'Súper Cool Súper Rosa', ['fan:2', 'patinadora:2', 'modelo:2', 'bailarina:2', 'pose:2', 'brillantina:2', 'paso:2', 'selfie:2', 'influencer', 'burbuja:2']),
    N('eal', 'EAL', 3, 'pon', 'Estético al Límite', ['modelo:2', 'influencer:2', 'diva:2', 'estrella:2', 'pose:2', 'flash:2', 'selfie:2', 'rayo:2', 'paso:2', 'burbuja:2', 'coreografa', 'brillantina:2']),
    N('bc', 'BC', 4, 'pon', 'Baila Conmigo', ['dj:2', 'chiclera:2', 'burbuja:2', 'coreografa:2', 'capitana:2', 'chicle:2', 'flash:2', 'conga:2', 'paso:2', 'estrella:2', 'rayo:2', 'selfie', 'megashow']),
    N('le', 'LE', 5, 'pon', 'Luz Extrema', ['diosa', 'aurora:2', 'megashow:2', 'reina:2', 'diva:2', 'estrella:2', 'chicle:2', 'deslumbrar:2', 'concierto:2', 'flash:2', 'rayo:2', 'pose:2', 'influencer:2', 'conga', 'selfie:2', 'brillantina'], { boss: true })] },
  // Krahn (en el mapa: "presidio") · Cerrojo (bloquea Elusivos y Temibles) y Peaje (el rival pierde maná)
  presidio: { id: 'presidio', name: 'Presidio de Krahn', rivals: [
    N('bob', 'Bob', 1, 'krn', 'Reclutas del paso', ['recluta:2', 'desertor:2', 'centinela:2', 'fusilero:2', 'perro:2', 'fusilar:2', 'cierre:2', 'blindaje:2', 'sargento', 'aduanero']),
    N('lael', 'Lael', 2, 'krn', 'Peaje y aduana', ['aduanero:2', 'comisario:2', 'recluta:2', 'sargento:2', 'peaje:2', 'toque:2', 'cierre:2', 'fusilar:2', 'barricada', 'francotirador:2', 'leva']),
    N('karl', 'Karl', 3, 'krn', 'Artillería de la frontera', ['artillero:2', 'fusilero:2', 'francotirador:2', 'perro:2', 'bombardeo:2', 'alambrada:2', 'fusilar:2', 'veterano:2', 'leva:2', 'ejecucion', 'capitan', 'tanque']),
    N('bisap', 'Bisap', 4, 'krn', 'Muro sin esperanza', ['barricada:2', 'centinela:2', 'capitan:2', 'tanque:2', 'aduanero:2', 'comisario:2', 'peaje:2', 'ley', 'ejecucion:2', 'blindaje:2', 'alambrada:2', 'cierre:2', 'coloso']),
    N('terza', 'Terza', 5, 'krn', 'La que cierra el paso', ['general', 'coloso:2', 'tanque:2', 'capitan:2', 'barricada:2', 'comisario:2', 'aduanero:2', 'ley:2', 'ejecucion:2', 'peaje:2', 'bombardeo:2', 'veterano:2', 'leva', 'alambrada', 'toque:2'], { boss: true })] },
  // Sylvaris · Raíz (no ataca, da vida a Retoños) y Poda (destruye a la enemiga más débil)
  sylvaris: { id: 'sylvaris', name: 'Sylvaris', rivals: [
    N('chacal', 'Chacal', 1, 'syl', 'Cacería en la espesura', ['chacal:2', 'hojarasca:2', 'zarcillo:2', 'musgo:2', 'bestia:2', 'brote:2', 'crecer:2', 'zarzas:2', 'enredo', 'savia', 'tronco']),
    N('prieto', 'Prieto', 4, 'syl', 'Raíces profundas', ['semilla:2', 'raicilla:2', 'zarcillo:2', 'arbolmadre:2', 'savia:2', 'brote:2', 'sabia:2', 'regenerar:2', 'crecer:2', 'ciclo', 'guardian', 'musgo:2']),
    N('beel', 'Beel', 4, 'syl', 'La poda de la Raíz', ['enredadera:2', 'chacal:2', 'musgo:2', 'poda:2', 'enredo:2', 'zarzas:2', 'bestia:2', 'guardian:2', 'tronco:2', 'cosecha:2', 'decision', 'titan']),
    N('gran-raiz', 'Gran Raíz', 5, 'syl', 'La Gran Raíz decide', ['granraiz', 'corazon:2', 'arbolmadre:2', 'semilla:2', 'raicilla:2', 'guardian:2', 'titan:2', 'ciclo:2', 'decision:2', 'poda:2', 'cosecha:2', 'regenerar:2', 'sabia:2', 'crecer', 'brote:2', 'tronco'], { boss: true })] },
  // Disnjav · Gas tóxico (daña a todo lo que no sea Adaptado) y Adaptado
  disnjav: { id: 'disnjav', name: 'Disnjav', rivals: [
    N('ho', 'Ho', 1, 'dsj', 'Nacidos del gas', ['rata:2', 'alga:2', 'nacido:2', 'esporas:2', 'cazador:2', 'aliento:2', 'antidoto:2', 'fuga:2', 'gigante', 'sapo:2']),
    N('jp', 'Jp', 3, 'dsj', 'Esporas y venenos', ['esporas:2', 'sapo:2', 'hongo:2', 'rata:2', 'corrosion:2', 'nube:2', 'aliento:2', 'mascara:2', 'recolector:2', 'quimico', 'generacion', 'hidra']),
    N('nj', 'Nj', 4, 'dsj', 'La atmósfera ahoga', ['recolector:2', 'quimico:2', 'cazador:2', 'gigante:2', 'behemot:2', 'tormenta:2', 'fuga:2', 'nube:2', 'generacion:2', 'aliento:2', 'alfa', 'asfixia']),
    N('bg', 'Bg', 5, 'dsj', 'Madre del aire irrespirable', ['madre', 'leviatan:2', 'alfa:2', 'behemot:2', 'hidra:2', 'quimico:2', 'recolector:2', 'tormenta:2', 'colapso:2', 'asfixia:2', 'fuga:2', 'nube:2', 'mascara', 'generacion:2', 'hongo:2', 'antidoto'], { boss: true })] },
};
/** Naciones jugables por ahora. El resto sigue definido en NATIONS pero aparece como "Próximamente". Para abrir una, añádela aquí. */
export const PLAYABLE = ['arboris', 'lumis', 'umbra', 'luminarae'];
export const faction = (r: Rival) => (r.deck.filter(i => i.startsWith('umb')).length > r.deck.length / 2 ? 'Umbra' : 'Luminarae');

// ---------- Progreso (en este navegador) ----------
const KEY = 'tcgAdv';
let won: Record<string, string[]> = {};
try { const r = JSON.parse(localStorage.getItem(KEY) || '{}'); if (r && typeof r === 'object') for (const k of Object.keys(NATIONS)) if (Array.isArray(r[k])) won[k] = r[k].filter((x: unknown) => typeof x === 'string'); } catch { /* vacío */ }
export const beaten = (nation: string, rival: string) => !!won[nation]?.includes(rival);
export const progress = (nation: string) => NATIONS[nation].rivals.filter(r => beaten(nation, r.id)).length;
/** Se desbloquea el primero y cada rival tras vencer al anterior. */
export const unlocked = (nation: string, idx: number) => idx === 0 || beaten(nation, NATIONS[nation].rivals[idx - 1].id);
export function markWon(nation: string, rival: string) {
  if (!NATIONS[nation]?.rivals.some(r => r.id === rival) || beaten(nation, rival)) return;
  (won[nation] ??= []).push(rival);
  try { localStorage.setItem(KEY, JSON.stringify(won)); } catch { /* sin espacio */ }
  if (typeof document !== 'undefined') document.dispatchEvent(new Event('tcg:progreso'));
}
/** Rivales para "Jugar contra la IA": Astra y Caleus de inicio + todos los vencidos en la Aventura. [nación, rival] */
export const quickRivals = (): [string, Rival][] => {
  const out: [string, Rival][] = [['luminarae', NATIONS.luminarae.rivals[0]], ['umbra', NATIONS.umbra.rivals[0]]];
  for (const n of Object.keys(NATIONS)) for (const r of NATIONS[n].rivals) if (beaten(n, r.id) && !out.some(o => o[1].id === r.id)) out.push([n, r]);
  return out;
};
export const nextRival = (nation: string): Rival | null => { const n = NATIONS[nation], i = n.rivals.findIndex(r => !beaten(nation, r.id)); return i < 0 ? null : n.rivals[i]; };
export { DECKS };
