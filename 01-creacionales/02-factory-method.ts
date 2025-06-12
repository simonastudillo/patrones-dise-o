/**
 * ! Factory Method:
 * El patrón Factory Method permite crear objetos sin especificar
 * la clase exacta del objeto que se creará.
 *
 * En lugar de eso, delegamos la creación de objetos a subclases o métodos
 * que encapsulan esta lógica.
 *
 * * Es útil cuando una clase no puede anticipar la clase
 * * de objetos que debe crear.
 *
 * https://refactoring.guru/es/design-patterns/factory-method
 *
 */

import { COLORS } from "../helpers/colors.ts";


interface Hamburger {
   prepare(): void;
}

class ChickenHamburger implements Hamburger {
   prepare(): void {
      console.log('Preparando hamburguesa de %cpollo',COLORS.yellow);
   }
}

class BeefHamburger implements Hamburger {
   prepare(): void {
      console.log('Preparando hamburguesa de %cres',COLORS.brown);
   }
}


abstract class Restaurant {
   abstract createHamburger(): Hamburger;

   orderHamburger(): void {
      const hamburger = this.createHamburger();
      hamburger.prepare();
   }
}


class ChickenRestaurant extends Restaurant {
   override createHamburger(): Hamburger {
      return new ChickenHamburger();
   }
}

class BeefRestaurant extends Restaurant {
   override createHamburger(): Hamburger {
      return new BeefHamburger();
   }
}


const chickenRestaurant = new ChickenRestaurant();
chickenRestaurant.orderHamburger();

const beefRestaurant = new BeefRestaurant();
beefRestaurant.orderHamburger();