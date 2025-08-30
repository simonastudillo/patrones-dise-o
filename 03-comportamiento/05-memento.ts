/**
   * !Patrón Memento
   * Permite capturar y externalizar un estado interno de un objeto,
   * de manera que el objeto pueda ser restaurado a ese estado más tarde.
   *
   * * Es útil cuando se necesita guardar el estado de un objeto para poder
   * * volver a él en un futuro.
   *
   * https://refactoring.guru/es/design-patterns/memento
*/

import { COLORS } from "../helpers/colors.ts";

class GameMemento {
   private level: number;
   private health: number;
   private position: string;

   constructor( level: number, health: number, position: string) {
      this.level = level;
      this.health = health;
      this.position = position;
   }

   getLevel(): number {
      return this.level;
   }

   getHealth(): number {
      return this.health;
   }

   getPosition(): string {
      return this.position;
   }
}

class Game {
   private level: number = 1;
   private health: number = 100;
   private position: string = 'inicio';

   constructor() {
      console.log(`%cJugando en el nivel ${this.level}
      salud: ${this.health}
      posición: ${this.position}`, COLORS.green);
   }

   save(): GameMemento {
      return new GameMemento(this.level, this.health, this.position);
   }

   play( level: number, health: number, position: string) {
      this.level = level;
      this.health = health;
      this.position = position;

      console.log(`%cJugando en el nivel ${this.level}
      salud: ${this.health}
      posición: ${this.position}`, COLORS.blue);
   }

   restore( memento: GameMemento): void {
      this.level = memento.getLevel();
      this.health = memento.getHealth();
      this.position = memento.getPosition();

      console.log(`%cEstado restaurado:
      nivel: ${this.level}
      salud: ${this.health}
      posición: ${this.position}`, COLORS.yellow);
   }
}

class GameHistory {
   private mementos: GameMemento[] = [];

   push(memento: GameMemento) {
      this.mementos.push(memento);
   }

   pop(): GameMemento | null {
      return this.mementos.pop() ?? null;
   }
}

function main() {
   const game = new Game();
   const history = new GameHistory();

   history.push(game.save());

   game.play(2, 90, 'Bosque Encantado');
   history.push(game.save());

   game.play(3, 70, 'Cueva Oscura');
   history.push(game.save());

   game.play(4, 50, 'Castillo del Dragón');
   console.log(`%cEstado actual:
   nivel: ${game['level']}
   salud: ${game['health']}
   posición: ${game['position']}`, COLORS.red);

   game.restore(history.pop()!);
   game.restore(history.pop()!);
}

main();