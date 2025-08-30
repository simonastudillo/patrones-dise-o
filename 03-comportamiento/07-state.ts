/**
 * ! Patrón State
 * Este patrón permite a un objeto cambiar su comportamiento
 * cuando su estado interno cambia.
 *
 * * Es útil cuando un objeto tiene un comportamiento que depende de su estado
 * * y debe cambiar su comportamiento en tiempo de ejecución dependiendo de ese estado.
 *
 * https://refactoring.guru/es/design-patterns/state
 */

import { COLORS } from "../helpers/colors.ts";

/**
 * * Objetivo: Implementar el patrón State para simular el funcionamiento
 * * de una máquina expendedora.
 * * La máquina tiene diferentes estados,
 *  * Como Esperando Dinero,
 *  * Seleccionando Producto,
 *  * Entregando Producto,
 * * y su comportamiento varía dependiendo del estado actual.
 */

interface State {
   name: string;
   
   insertMoney(): void;
   selectProduct(): void;
   dispenseProduct(): void;
}

class VendingMachine {
   private state: State;

   constructor( state: State) {
      this.state = state;
   }

   insertMoney() {
      this.state.insertMoney();
   }

   selectProduct() {
      this.state.selectProduct();
   }

   dispenseProduct() {
      this.state.dispenseProduct();
   }

   setState(state: State) {
      this.state = state;
      console.log(`Estado cambiado a: %c${state.name}`, COLORS.green);
   }

   getStateName() {
      return this.state.name;
   }
}

// Estados
class WaitingForMoney implements State {
   public name = "Esperando Dinero";
   private vendingMachine: VendingMachine;

   constructor(vendingMachine: VendingMachine) {
      this.vendingMachine = vendingMachine;
   }

   insertMoney() {
      console.log("Dinero insertado. Ahora puedes seleccionar un producto");
      this.vendingMachine.setState(new SelectingProduct(this.vendingMachine));
   }

   selectProduct() {
      console.log("%cPor favor, inserte dinero primero.", COLORS.red);
   }

   dispenseProduct() {
      console.log("%cPor favor, inserte dinero primero.", COLORS.red);
   }
}
