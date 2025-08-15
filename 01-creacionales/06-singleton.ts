/**
   * ! Singleton:
   * Es un patrón de diseño creacional que garantiza que una clase
   * tenga una única instancia y proporciona un punto de acceso global a ella.
   *
   * * Es útil cuando necesitas controlar el acceso a una única instancia
   * * de una clase, como por ejemplo, en un objeto de base de datos o en un
   * * objeto de configuración.
   *
   * https://refactoring.guru/es/design-patterns/singleton
*/

import { COLORS } from "../helpers/colors.ts";

class DragonBalls
{

   private static instance: DragonBalls;
   private ballsCollected: number = 0;

   private constructor() {
      this.resetBallsCollected();
   }

   public static getInstance(): DragonBalls {
      if (!DragonBalls.instance) {
         DragonBalls.instance = new DragonBalls();
      }
      return DragonBalls.instance;
   }

   collectBall(): void {
      if (this.ballsCollected < 7) {
         this.ballsCollected++;
         console.log(`%cEsferas recolectadas: ${this.ballsCollected}`, COLORS.yellow);
         return;
      }
      console.log(`%cYa tienes las 7 esferas del dragón.`, COLORS.green);
   };

   summonShenlong(): void {
      if (this.ballsCollected === 7) {
         console.log(`%c¡Shenlong ha sido invocado!`, COLORS.yellow);
         this.resetBallsCollected();
      } else {
         console.log(`%cNecesitas recolectar las 7 esferas del dragón para invocar a Shenlong.`, COLORS.red);
      }
   }

   resetBallsCollected(): void {
      this.ballsCollected = 0;
      console.log(`%cEsferas del dragón reiniciadas.`, COLORS.blue);
   }

}

function main() {
   const goku = DragonBalls.getInstance();

   goku.collectBall(); // Recolecta la primera esfera
   goku.collectBall(); // Recolecta la segunda esfera
   goku.collectBall(); // Recolecta la tercera esfera

   goku.summonShenlong();

   const vegeta = DragonBalls.getInstance();
   vegeta.collectBall(); // Recolecta la cuarta esfera
   vegeta.collectBall(); // Recolecta la quinta esfera
   vegeta.collectBall(); // Recolecta la sexta esfera
   vegeta.collectBall(); // Recolecta la séptima esfera

   goku.summonShenlong(); // Invoca a Shenlong
}

main();