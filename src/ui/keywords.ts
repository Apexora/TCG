// Nombres, descripciones e iconos de palabras clave y velocidades de hechizo (los usan el juego y el constructor de mazos).
import type { Keyword, SpellSpeed } from '../engine/types';
export const KWN: Record<Keyword, string> = { barrera: 'Barrera', robovida: 'Robo de vida', arrollar: 'Arrollar', letal: 'Letal', rapido: 'Ataque rápido', duro: 'Duro', elusivo: 'Elusivo', temible: 'Temible', retador: 'Retador', regenera: 'Regeneración', efimero: 'Efímero', veneno: 'Veneno',
  mutante: 'Mutante', don: 'Don', leal: 'Leal', estilo: 'Estilo', pegada: 'Pegada', cerrojo: 'Cerrojo', raiz: 'Raíz', adaptado: 'Adaptado', marchito: 'Marchito' };
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
};
export const KWI: Record<Keyword, string> = { barrera: '🛡', robovida: '🩸', arrollar: '🐗', letal: '☠', rapido: '⚡', duro: '🪨', elusivo: '🌫', temible: '👁', retador: '⚔', regenera: '♻', efimero: '⏳', veneno: '🧪', mutante: '🧬', don: '🎁', leal: '🤖', estilo: '💅', pegada: '🍬', cerrojo: '🚧', raiz: '🌳', adaptado: '☣', marchito: '🥀' };
export const SPN: Record<SpellSpeed, string> = { burst: 'Ráfaga', focus: 'Enfoque', fast: 'Rápido', slow: 'Lento' };
export const SPD: Record<SpellSpeed, string> = {
  burst: 'Ráfaga: se resuelve al instante, no pasa la prioridad y sirve como reacción.', focus: 'Enfoque: se resuelve al instante, no pasa la prioridad; solo como acción original.',
  fast: 'Rápido: va a la pila; el rival puede responder. Sirve como reacción.', slow: 'Lento: va a la pila; solo como acción original (con la pila vacía).',
};
