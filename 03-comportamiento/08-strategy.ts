/**
 * ! Patrón Strategy
 *
 * El patrón Strategy es un patrón de diseño de software que define una
 * familia de algoritmos, los encapsula y los hace intercambiables.
 *
 *
 * * Es útil cuando se tiene una clase que tiene un comportamiento que puede
 * * cambiar en tiempo de ejecución y se quiere delegar la responsabilidad de
 * * la implementación a otra clase.
 *
 * https://refactoring.guru/es/design-patterns/strategy
 */

import { COLORS } from "../helpers/colors.ts";

/**
 * !Objetivo: Explicar el patrón Strategy usando un ejemplo donde varios
 * ! patitos compiten en una carrera y cada uno tiene su propia
 * ! estrategia de movimiento (por ejemplo, nadar, volar o caminar).
 */

interface MovementStrategy {
   move(): void;
}

// Estrategia #1 Rápida pero costosa
class SwimFast implements MovementStrategy {
   move(): void {
      console.log('%cEl pato nada rápidamente sobre el agua.', COLORS.blue);
   }
}

// Estrategia #2 No tan rápida pero no tan costosa
class FlyOverWater implements MovementStrategy {
   move(): void {
      console.log('%cEl pato vuela elegantemente sobre el agua.', COLORS.pink);
   }
}

// Estrategia #3 Lenta pero económica
class WalkClumsily implements MovementStrategy {
   move(): void {
      console.log('%cEl pato camina torpemente por la orilla.', COLORS.green);
   }
}

// Consumidor de estrategia
class Duck {
   private name: string;
   private movementStrategy: MovementStrategy;

   constructor(name: string, movementStrategy: MovementStrategy) {
      this.name = name;
      this.movementStrategy = movementStrategy;

      console.log(`%c${ name } %clisto para competir`, COLORS.green, COLORS.white);
   }

   performMove(): void {
      console.log(`%c${ this.name } %ccomienza a moverse...`, COLORS.green, COLORS.white);
      this.movementStrategy.move();
   }

   setMovementStrategy(movementStrategy: MovementStrategy): void {
      console.log(`%c${ this.name } %cha cambiado su estrategia de movimiento.`, COLORS.green, COLORS.white);
      this.movementStrategy = movementStrategy;
   }
}

function main(){
   const duck1 = new Duck('Pato1', new SwimFast());
   const duck2 = new Duck('Pato2', new FlyOverWater());
   const duck3 = new Duck('Pato3', new WalkClumsily());

   duck1.performMove();
   duck2.performMove();
   duck3.performMove();

   // Cambiar estrategia de movimiento
   duck3.setMovementStrategy(new SwimFast());
}


main();