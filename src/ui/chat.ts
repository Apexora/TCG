export interface ChatMsg { from: string; text: string; side: 'me' | 'foe' | 'sys' }
/** Contrato del chat. LocalChannel es un rival IA; para jugar en línea se implementa otro canal (p. ej. Firebase) sin tocar la interfaz. */
export interface ChatChannel { send(text: string): void; onMessage(cb: (m: ChatMsg) => void): void }

const LINES: Record<string, string[]> = {
  hello: ['Las sombras te saludan.', 'Hola, mortal. Disfruta tus últimos turnos.', '¿Listo para caer?'],
  gg: ['Buena partida. La próxima será peor para ti.', 'GG… por ahora.'],
  idle: ['Interesante… aunque inútil.', 'Habla todo lo que quieras.', 'La oscuridad escucha.', 'Juega tu carta.', '...'],
  cast: ['¿Sentiste eso?', 'Las sombras obedecen.', 'Eso va a doler.'],
  win: ['Imposible… la luz me venció esta vez.', 'Buena partida. Quiero la revancha.'],
  lose: ['La noche siempre gana.', 'Tu luz se apaga.'],
};
export class LocalChannel implements ChatChannel {
  nameFn: () => string = () => 'Umbra';
  private cbs: ((m: ChatMsg) => void)[] = [];
  private last = 0;
  onMessage(cb: (m: ChatMsg) => void) { this.cbs.push(cb); }
  private emit(m: ChatMsg) { this.cbs.forEach(cb => cb(m)); }
  push(m: ChatMsg) { this.emit(m); }
  sys(text: string) { this.emit({ from: '', text, side: 'sys' }); }
  send(text: string) {
    this.emit({ from: 'Tú', text, side: 'me' });
    const k = /hola|buenas|hey/i.test(text) ? 'hello' : /\bgg\b|bien jugado/i.test(text) ? 'gg' : 'idle';
    setTimeout(() => this.say(k), 700 + Math.random() * 900);
  }
  react(kind: 'cast' | 'win' | 'lose') {
    if (kind === 'cast' && (Date.now() - this.last < 20000 || Math.random() > 0.35)) return;
    this.say(kind);
  }
  private say(k: string) {
    const l = LINES[k]; this.last = Date.now();
    this.emit({ from: this.nameFn(), text: l[Math.floor(Math.random() * l.length)], side: 'foe' });
  }
}
