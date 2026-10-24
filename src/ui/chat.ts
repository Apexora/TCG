export interface ChatMsg { from: string; text: string; side: 'me' | 'foe' | 'sys' }
/** Contrato del chat. LocalChannel es un rival IA; para jugar en línea se implementa otro canal (p. ej. Firebase) sin tocar la interfaz. */
export interface ChatChannel { send(text: string): void; onMessage(cb: (m: ChatMsg) => void): void }

/** Quién responde en el chat: el rival actual (nombre, facción de sus cartas y nación de la Aventura). */
export interface Persona { name: string; side: 'lum' | 'umb'; nation?: string; boss?: boolean }

type Kind = 'hello' | 'bye' | 'gg' | 'thanks' | 'praise' | 'taunt' | 'luck' | 'how' | 'who' | 'deck' | 'help' | 'rematch' | 'question' | 'idle' | 'cast' | 'win' | 'lose' | 'start';
type Lines = Partial<Record<Kind, string[]>>;

/** Frases por tono. Un mismo mensaje del jugador se contesta según quién sea el rival (no solo "Umbra"). */
const VOICE: Record<string, Lines> = {
  lum: {
    hello: ['La luz te saluda.', 'Bienvenido al duelo. Que gane el mejor.', 'Hola. Juguemos con honor.'],
    bye: ['Que la luz te guíe.', 'Hasta pronto, duelista.'],
    gg: ['Buena partida. Fue un honor.', 'GG. Aprendo de cada duelo.'],
    thanks: ['No hay de qué.', 'Con gusto.'],
    praise: ['Gracias, tú también juegas bien.', 'Amable de tu parte. Sigamos.'],
    taunt: ['Las palabras no cambian el tablero.', 'Veremos quién ríe al final.', 'La confianza es buena… hasta que se pone a prueba.'],
    luck: ['Igualmente. Que gane la mejor estrategia.', 'La suerte ayuda, la preparación decide.'],
    how: ['Serena, gracias. ¿Y tú?', 'Lista para el duelo.'],
    deck: ['Mi mazo es luz y curación. Descúbrelo jugando.', 'Cada carta tiene su momento.'],
    help: ['Juega unidades, ataca con la ficha y cuida tu Nexo. Pasa el ratón sobre las cartas para leerlas.'],
    rematch: ['Cuando quieras.', 'Con gusto, otra ronda.'],
    question: ['Buena pregunta… concéntrate en el tablero.', 'Quizá la respuesta esté en tu mano.'],
    idle: ['Interesante.', 'Sigue jugando.', 'Te escucho.', '...'],
    cast: ['La luz responde.', 'Eso fue necesario.', '¿Lo viste venir?'],
    win: ['Buena partida. La luz prevaleció.', 'Gracias por el duelo.'],
    lose: ['Bien jugado. Me has superado.', 'La luz se inclina ante ti. Revancha.'],
    start: ['Que comience el duelo.', 'Estoy lista.'],
  },
  umb: {
    hello: ['Las sombras te saludan.', 'Hola, mortal. Disfruta tus últimos turnos.', '¿Listo para caer?'],
    bye: ['Huyes… como todos.', 'La oscuridad te espera.'],
    gg: ['Buena partida. La próxima será peor para ti.', 'GG… por ahora.'],
    thanks: ['No lo hago por ti.', 'Guárdate el agradecimiento.'],
    praise: ['Lo sé.', 'No te acostumbres a los halagos.'],
    taunt: ['Habla todo lo que quieras.', 'Qué ruidoso es el miedo.', 'Ya veremos quién cae primero.'],
    luck: ['La suerte es para los débiles.', 'No la necesito.'],
    how: ['Hambriento.', 'Mejor que tú, seguro.'],
    deck: ['Mi mazo es hambre y sombras.', 'Lo sabrás cuando ya sea tarde.'],
    help: ['Juega unidades, ataca con la ficha… y reza. Pasa el ratón sobre las cartas para leerlas.'],
    rematch: ['Siempre. Me gusta verte caer.', 'Cuando quieras volver a perder.'],
    question: ['Pregunta menos y juega más.', 'La oscuridad no responde a eso.'],
    idle: ['Interesante… aunque inútil.', 'La oscuridad escucha.', 'Juega tu carta.', '...'],
    cast: ['¿Sentiste eso?', 'Las sombras obedecen.', 'Eso va a doler.'],
    win: ['La noche siempre gana.', 'Tu luz se apaga.'],
    lose: ['Imposible… la luz me venció esta vez.', 'Buena partida. Quiero la revancha.'],
    start: ['Que empiece la caza.', 'Las sombras ya están aquí.'],
  },
  arboris: {
    hello: ['Las hojas susurran tu nombre. Hola.', 'Bienvenido al bosque.'],
    bye: ['El bosque te recordará.', 'Vuelve cuando florezca otra vez.'],
    gg: ['Buen duelo. Hasta las raíces lo sintieron.', 'GG. Así crece el bosque.'],
    taunt: ['El bosque es paciente.', 'Las raíces no tienen prisa… ni piedad.'],
    how: ['Echando raíces, ¿y tú?', 'En calma, como el follaje.'],
    deck: ['Brotes, veneno y paciencia.', 'El bosque guarda sus secretos.'],
    idle: ['Las hojas escuchan.', 'Todo crece a su tiempo.', 'Mmm…', '...'],
    cast: ['La savia responde.', 'El bosque se mueve.'],
    win: ['El bosque siempre vuelve a crecer.', 'Las raíces ganan, como siempre.'],
    lose: ['Me has talado… esta vez.', 'Volveré a brotar. Revancha.'],
    start: ['Que crezca el duelo.'],
  },
  lumis: {
    hello: ['Saludo detectado. Hola, humano.', 'Conexión establecida. Hola.'],
    bye: ['Desconexión registrada. Adiós.', 'Fin de la sesión.'],
    gg: ['GG registrado en la memoria.', 'Partida archivada. Buen juego.'],
    taunt: ['Probabilidad de victoria: favorable… para mí.', 'Tu provocación no altera mis cálculos.'],
    how: ['Todos los sistemas operativos.', 'Funcionando al 100 %.'],
    deck: ['Mazo optimizado: drones y hackeo.', 'Información clasificada.'],
    idle: ['Procesando…', 'Dato recibido.', 'Calculando jugada.', '...'],
    cast: ['Ejecutando protocolo.', 'Script lanzado.'],
    win: ['Resultado: victoria. Gracias por jugar.', 'Simulación concluida: gano yo.'],
    lose: ['Error: derrota. Solicito revancha.', 'Mis cálculos fallaron. Reiniciando.'],
    start: ['Iniciando duelo.', 'Sistemas listos.'],
  },
};
const lines = (p: Persona, k: Kind): string[] => VOICE[p.nation ?? '']?.[k] ?? VOICE[p.side][k] ?? VOICE.lum[k] ?? ['...'];

/** Clasificador por palabras clave (sin red, sin coste): decide de qué trata el mensaje del jugador. */
const RULES: [Kind, RegExp][] = [
  ['bye', /\b(ad[ií]os|chau|chao|bye|me voy|hasta luego|nos vemos)\b/i],
  ['gg', /\b(gg|wp|bien jugado|buena partida|buen juego)\b/i],
  ['luck', /\b(suerte|glhf|buena suerte)\b/i],
  ['rematch', /\b(revancha|otra (vez|partida|ronda)|de nuevo)\b/i],
  ['thanks', /\b(gracias|thx|thanks)\b/i],
  ['taunt', /\b(tonto|malo|f[aá]cil|noob|ez|basura|in[uú]til|perder[aá]s|perdiste|te voy a ganar|ganar[eé]|pierdes|cobarde|aburrid|lento|nerviosa?o?)\b/i],
  ['praise', /\b(buena jugada|bien hecho|genial|crack|qu[eé] buena|buen[ií]sim|me gusta|bravo|bien jugas|juegas bien)\b/i],
  ['who', /\b(qui[eé]n eres|c[oó]mo te llamas|tu nombre|qui[eé]n sos)\b/i],
  ['how', /\b(c[oó]mo (est[aá]s|andas|vas)|qu[eé] tal|todo bien)\b/i],
  ['deck', /\b(mazo|baraja|cartas?|deck)\b/i],
  ['help', /\b(ayuda|c[oó]mo se juega|reglas|no entiendo|help)\b/i],
  ['hello', /\b(hola|holi|buenas|buen d[ií]a|hey|ola|saludos|hi|hello|qu[eé] onda)\b/i],
];
const classify = (t: string): Kind => RULES.find(([, r]) => r.test(t))?.[0] ?? (/[?¿]/.test(t) ? 'question' : 'idle');

export class LocalChannel implements ChatChannel {
  /** Rival que responde ahora mismo. main.ts lo actualiza según el duelo (Aventura o partida rápida). */
  personaFn: () => Persona = () => ({ name: 'Rival', side: 'lum' });
  /** Gancho opcional para un LLM gratuito (Groq, Gemini, Workers AI…) detrás de un proxy propio. Si devuelve null o falla, responde el bot de reglas. */
  remote?: (text: string, p: Persona) => Promise<string | null>;
  private cbs: ((m: ChatMsg) => void)[] = [];
  private last = 0; private lastLine = ''; private seq = 0;
  onMessage(cb: (m: ChatMsg) => void) { this.cbs.push(cb); }
  private emit(m: ChatMsg) { this.cbs.forEach(cb => cb(m)); }
  push(m: ChatMsg) { this.emit(m); }
  sys(text: string) { this.emit({ from: '', text, side: 'sys' }); }
  send(text: string) {
    this.emit({ from: 'Tú', text, side: 'me' });
    const p = this.personaFn(), id = ++this.seq, k = classify(text);
    const reply = () => this.say(k, p);
    setTimeout(() => {
      if (id !== this.seq) { /* el jugador escribió otra cosa: contesta solo al último */ return; }
      if (!this.remote) { reply(); return; }
      this.remote(text, p).then(r => { if (id !== this.seq) return; r ? this.emit({ from: p.name, text: r.slice(0, 140), side: 'foe' }) : reply(); }).catch(reply);
    }, 600 + Math.random() * 900);
  }
  /** Reacciones a la partida: hechizos del rival, final de partida o inicio del duelo. */
  react(kind: 'cast' | 'win' | 'lose' | 'start') {
    if (kind === 'cast' && (Date.now() - this.last < 20000 || Math.random() > 0.35)) return;
    if (kind === 'start' && Math.random() > 0.6) return;
    setTimeout(() => this.say(kind, this.personaFn()), kind === 'start' ? 1200 : 0);
  }
  private say(k: Kind, p: Persona) {
    const all = lines(p, k), pool = all.length > 1 ? all.filter(x => x !== this.lastLine) : all;
    const text = k === 'who' ? `Soy ${p.name}${p.boss ? ', jefe de esta nación' : ''}. ${p.side === 'umb' ? 'Y tú, una presa más.' : 'Un gusto duelear contigo.'}` : pool[Math.floor(Math.random() * pool.length)];
    this.last = Date.now(); this.lastLine = text;
    this.emit({ from: p.name, text, side: 'foe' });
  }
}
