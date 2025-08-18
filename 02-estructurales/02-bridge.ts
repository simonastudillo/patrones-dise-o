/**
   * ! Patrón Bridge
   * Este patrón nos permite desacoplar una abstracción de su implementación,
   * de tal forma que ambas puedan variar independientemente.
   *
   * * Es útil cuando se tienen múltiples implementaciones de una abstracción
   * * Se puede utilizar para separar la lógica de negocio de la lógica de presentación
   * * Se puede utilizar para separar la lógica de la interfaz de usuario también.
   *
   * https://refactoring.guru/es/design-patterns/bridge
*/

import { COLORS } from "../helpers/colors.ts";

interface Ability {
   use(): void;
}

class SwordAtack implements Ability
{
   use(): void {
      console.log('Atacando con %cespada\n', COLORS.blue);
   }
}

class MagicSpell implements Ability {
   use(): void {
      console.log('Lancha un %hechizo mágico poderoso\n', COLORS.green);
   }
}

abstract class Character {
   protected ability: Ability;

   constructor(ability: Ability) {
      this.ability = ability;
   }

   setAbility(ability: Ability): void {
      this.ability = ability;
   }

   abstract performAbility(): void;
}

class Warrior extends Character {
   
   override performAbility(): void {
      console.log('El guerrero está listo para luchar\n');
      this.ability.use();
   }
}

class Mage extends Character {

   override performAbility(): void {
      console.log('El mago prepara su magia\n');
      this.ability.use();
   }
}