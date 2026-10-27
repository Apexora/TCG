// Nombres, descripciones e iconos de palabras clave y velocidades de hechizo (los usan el juego y el constructor de mazos).
import type { Keyword, SpellSpeed } from '../engine/types';
export const KWN: Record<Keyword, string> = { barrera: 'Barrera', robovida: 'Robo de vida', arrollar: 'Arrollar', letal: 'Letal', rapido: 'Ataque rápido', duro: 'Duro', elusivo: 'Elusivo', temible: 'Temible', retador: 'Retador', regenera: 'Regeneración', efimero: 'Efímero', veneno: 'Veneno',
  mutante: 'Mutante', don: 'Don', leal: 'Leal', estilo: 'Estilo', pegada: 'Pegada', cerrojo: 'Cerrojo', raiz: 'Raíz', adaptado: 'Adaptado', marchito: 'Marchito', virus: 'Virus', falange: 'Falange', mando: 'Mando', saqueo: 'Saqueo', marea: 'Marea', andanada: 'Andanada', glacial: 'Glacial', skanuj: 'Skanuj', madura: 'Madura' };
export const KWD: Record<Keyword, string> = {
  barrera: 'anula el siguiente daño que recibiría y luego se pierde.', robovida: 'el daño que inflige cura a tu Nexo.', arrollar: 'el daño sobrante sobre su bloqueador va al Nexo.',
  letal: 'destruye cualquier unidad a la que dañe.', rapido: 'al atacar, golpea antes que su bloqueador.', duro: 'recibe 1 de daño menos de cada fuente.',
  elusivo: 'solo puede ser bloqueada por unidades elusivas.', temible: 'solo la bloquean unidades con 3 o más de poder.', retador: 'al atacar, elige qué enemigo debe bloquearla.',
  regenera: 'se cura por completo al final de cada ronda.', efimero: 'muere al golpear o al acabar la ronda.', veneno: 'la unidad que daña pierde 1 de poder y 1 de vida para siempre.',
  mutante: 'al cerrar cada ronda gana +2 de poder y pierde 1 de vida para siempre.', don: 'al morir, tus demás unidades ganan +1 de poder para siempre.',
  leal: 'cuando entra otra unidad Leal tuya, tus demás Leales ganan +1 de poder para siempre.', estilo: 'cada hechizo que lanzas le da +1/+1 hasta el final de la ronda.',
  pegada: 'pegada con chicle: no puede atacar ni bloquear hasta el final de la ronda.', cerrojo: 'cierra el paso: puede bloquear también a unidades Elusivas y Temibles.',
  raiz: 'no puede atacar. Al cerrar cada ronda da vida a un Retoño (1/1).', adaptado: 'inmune al gas tóxico (que daña 1 a las demás unidades al cerrar la ronda).',
  marchito: 'degenerada por daño necrótico: no puede curarse ni regenerar.',
  falange: 'muro de escudos: gana +1 de vida por cada otra aliada con Falange en el campo (máx +2). Si sus compañeras caen, pierde el bono.',
  mando: 'al atacar con ella, las demás unidades del asalto ganan +1 de poder esta ronda (cada Mando suma).',
  saqueo: 'cuando daña al Nexo rival en combate, añade un Doblón a tu mano.',
  marea: 'Pleamar (rondas impares): +2 de poder. Bajamar (rondas pares): +2 de vida. Solo dura la ronda.',
  andanada: 'si no atacó esta ronda, al cerrarla cañonea: 1 de daño a la unidad enemiga más fuerte (al Nexo si no hay unidades).',
  glacial: 'mientras la controles, tu Glaciar crece +1 al cerrar cada ronda (no se acumula por varias Glacial). El Glaciar es un muro de hielo (máx. 6) que absorbe el daño enemigo a tu Nexo.',
  skanuj: 'raza de piel azulada, hecha al frío: inmune a Silenciar, Virus, Gas tóxico y Marchito. Gana +1 de poder si tienes 3 o más de Glaciar.',
  madura: 'si sigue en juego y no atacó esta ronda, al cerrarla madura y se transforma en su forma adulta (ver su texto), conservando sus mejoras.',
  virus: 'infectada: al cerrar cada ronda recibe 1 de daño y el virus salta a otra unidad de su bando. Perder las palabras clave lo cura.',
};
export const KWI: Record<Keyword, string> = { barrera: '🛡', robovida: '🩸', arrollar: '🐗', letal: '☠', rapido: '⚡', duro: '🪨', elusivo: '🌫', temible: '👁', retador: '⚔', regenera: '♻', efimero: '⏳', veneno: '🧪', mutante: '🧬', don: '🎁', leal: '🤖', estilo: '💅', pegada: '🍬', cerrojo: '🚧', raiz: '🌳', adaptado: '☣', marchito: '🥀', virus: '🦠', falange: '🔱', mando: '🎖', saqueo: '🪙', marea: '🌊', andanada: '💥', glacial: '❄', skanuj: '🧊', madura: '🐺' };
export const SPN: Record<SpellSpeed, string> = { burst: 'Ráfaga', focus: 'Enfoque', fast: 'Rápido', slow: 'Lento' };
export const SPD: Record<SpellSpeed, string> = {
  burst: 'Ráfaga: se resuelve al instante, no pasa la prioridad y sirve como reacción.', focus: 'Enfoque: se resuelve al instante, no pasa la prioridad; solo como acción original.',
  fast: 'Rápido: va a la pila; el rival puede responder. Sirve como reacción.', slow: 'Lento: va a la pila; solo como acción original (con la pila vacía).',
};
