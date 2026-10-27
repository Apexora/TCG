export type Keyword = 'barrera' | 'robovida' | 'arrollar' | 'letal' | 'rapido' | 'duro' | 'elusivo' | 'temible' | 'retador' | 'regenera' | 'efimero' | 'veneno'
  // Naciones de la Aventura: mutante (Psybernia), don (Sinfalía), leal (Ostraca), estilo y pegada (Pongí), cerrojo (Krahn), raiz (Sylvaris), adaptado (Disnjav)
  | 'mutante' | 'don' | 'leal' | 'estilo' | 'pegada' | 'cerrojo' | 'raiz' | 'adaptado'
  // Negatt: Marchito (no puede curarse ni regenerar; lo deja el daño necrótico)
  | 'marchito'
  // Boro: virus informático (salta de unidad en unidad y la daña)
  | 'virus'
  // Skaldrum: Falange (aura de formación: +1 de vida por cada otra aliada con Falange, máx +2) y Mando (al atacar, el resto del asalto gana +1 de poder)
  | 'falange' | 'mando'
  // Markivton (piratas sin gobierno): saqueo (golpes al Nexo = Doblones), marea (cambia según la ronda) y andanada (cañonea al cerrar la ronda si no atacó)
  | 'saqueo' | 'marea' | 'andanada';
/** Velocidades de hechizo (burst/focus se resuelven al instante sin pasar prioridad; fast/slow van a la pila. */
export type SpellSpeed = 'burst' | 'focus' | 'fast' | 'slow';
export type Effect =
  | { t: 'healNexus'; n: number } | { t: 'hurtNexus'; n: number } | { t: 'draw'; n: number } | { t: 'dmgNexus'; n: number }
  | { t: 'buffOther'; a: number; h: number } | { t: 'buffAll'; a: number; h: number } | { t: 'buffAlly'; a: number; h: number } | { t: 'tempBuff'; a: number; h: number }
  | { t: 'giveKw'; kw: Keyword } | { t: 'dmgEnemy'; n: number; necro?: boolean } | { t: 'drain'; n: number; heal?: number; necro?: boolean } | { t: 'dmgAll'; n: number; necro?: boolean } | { t: 'frost' }
  | { t: 'healUnit'; n: number } | { t: 'tempBuffAll'; a: number; h: number } | { t: 'sacDraw'; n: number } | { t: 'sacDmg'; necro?: boolean } | { t: 'debuffEnemies'; a: number; h: number } | { t: 'destroyEnemy' }
  | { t: 'summon'; card: string; n: number } | { t: 'frostAll' } | { t: 'silence' } | { t: 'gainMana'; n: number }
  // Naciones de la Aventura
  | { t: 'fuse' } | { t: 'clone' } | { t: 'tregua' } | { t: 'chicle' } | { t: 'peaje'; n: number } | { t: 'poda' } | { t: 'gas'; n: number }
  // Negatt: muerte y degeneración
  | { t: 'necroWeak'; n: number }                 // daño necrótico a la unidad enemiga más débil
  | { t: 'necroStrong'; n: number }               // daño necrótico a la unidad enemiga más fuerte
  | { t: 'wither' }                               // Marchitar: el poder de una enemiga queda en 0 para siempre
  | { t: 'discard'; n: number }                   // el rival descarta n cartas al azar
  | { t: 'mill'; n: number }                      // elimina las n cartas superiores del mazo rival
  | { t: 'plant'; card: string; n: number }       // cuela n copias de una carta en el mazo rival (en posiciones al azar)
  // Boro (cyberpunk fallido, mafioso): malware, virus, cortocircuito, hackeo, deuda y usura
  | { t: 'malware'; n: number } | { t: 'virus' } | { t: 'arco'; n: number } | { t: 'hack' } | { t: 'soborno' } | { t: 'trueque' }
  | { t: 'prestamo'; n: number; d: number } | { t: 'usura'; n: number } | { t: 'cobro'; n: number } | { t: 'tributo'; n: number }
  | { t: 'overclock'; a: number; n: number } | { t: 'apagon' } | { t: 'copia' }
  // Skaldrum (precisión, estrategia y dominio)
  | { t: 'certero'; n: number }                   // Tiro certero: n de daño a una enemiga; si la destruye, robas 1
  | { t: 'augurio'; n: number }                   // mira las n cartas superiores: robas la de mayor coste, el resto va al fondo del mazo
  | { t: 'dom'; fx: Effect[] }                    // Dominio: los efectos solo se aplican si controlas más unidades que el rival
  // Markivton (piratas sin gobierno)
  | { t: 'doblon'; n: number; unit?: boolean }    // añade n Doblones a tu mano (con unit: uno por cada unidad tuya, hasta n)
  | { t: 'tide'; pleamar: Effect[]; bajamar: Effect[] }   // Marea: rondas impares = Pleamar, pares = Bajamar
  | { t: 'paga'; n: number; fx: Effect[] };       // Paga n Doblones de tu mano: si puedes, los gastas y se aplican los efectos
export interface CardDef { id: string; name: string; cost: number; type: 'unit' | 'spell'; atk: number; hp: number; kw: Keyword[]; text: string; fx: Effect[]; grow?: { a: number; h: number }; speed?: SpellSpeed; token?: boolean }
/** ta/th: bonos temporales de la ronda (se revierten al final). */
export interface Unit { uid: number; card: string; atk: number; hp: number; dmg: number; kw: Keyword[]; ta: number; th: number;
  /** Bono de vida de aura (Falange): se recalcula solo; no existe si vale 0. */ fb?: number }
export interface Player { nexus: number; deck: string[]; hand: string[]; board: Unit[]; mana: number; maxMana: number; spell: number; played: string[] }
export interface StackItem { card: string; owner: 0 | 1; target?: number }
export interface State {
  p: [Player, Player]; round: number; token: 0 | 1; active: 0 | 1; phase: 'mulligan' | 'main' | 'block' | 'stack';
  passes: number; winner: null | 0 | 1 | -1; seed: number; uid: number; log: string[];
  stack: StackItem[]; attackers: number[]; blocks: Record<string, number>; forced: number[]; tok: [boolean, boolean]; resumePhase: 'main' | 'block';
  /** Online: qué jugadores ya hicieron su mulligan (contra la IA no se usa). */
  mull: [boolean, boolean];
  /** Tregua (Sinfalía): esta ronda nadie puede atacar. */
  peace?: boolean;
  /** Ventaja de un rival de la Aventura: tope de Nexo por jugador y cartas extra por ronda (solo contra la IA). */
  cap?: [number, number]; extraDraw?: [number, number];
  /** Gas tóxico (Disnjav): rondas que le quedan; al cerrar cada ronda daña a las unidades sin Adaptado. */
  gas?: number;
  /** Markivton: unidades (uid) que ya atacaron esta ronda; las Andanada que no atacaron cañonean al cerrar la ronda. */
  atkd?: number[];
  /** Boro: deuda de maná por jugador (se descuenta al empezar su próxima ronda), usura (intereses sobre el Nexo) y apagón (sin hechizos esta ronda). */
  debt?: [number, number]; usura?: [number, number]; apagon?: [boolean, boolean];
}
export type Action =
  | { type: 'play'; hand: number; target?: number } | { type: 'pass' } | { type: 'attack'; units: number[]; challenge?: Record<string, number> }
  | { type: 'block'; attacker: number; blocker: number } | { type: 'confirmBlocks' } | { type: 'mulligan'; idx: number[]; player?: 0 | 1 };
