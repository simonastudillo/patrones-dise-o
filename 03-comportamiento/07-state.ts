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
import { sleep } from "../helpers/sleep.ts";

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

   constructor() {
      this.state = new WaitingForMoney(this);
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

class SelectingProduct implements State {
   public name = "Seleccionando Producto";
   private vendingMachine: VendingMachine;

   constructor(vendingMachine: VendingMachine) {
      this.vendingMachine = vendingMachine;
   }

   insertMoney() {
      console.log("%cPor favor, seleccione un producto primero.", COLORS.red);
   }

   selectProduct() {
      console.log("Producto seleccionado. Ahora puedes dispensar el producto.");
      this.vendingMachine.setState(new DispensingProduct(this.vendingMachine));
   }

   dispenseProduct() {
      console.log("%cPor favor, seleccione un producto primero.", COLORS.red);
   }
}

class DispensingProduct implements State {
   public name = "Dispensando Producto";
   private vendingMachine: VendingMachine;

   constructor(vendingMachine: VendingMachine) {
      this.vendingMachine = vendingMachine;
   }

   insertMoney() {
      console.log("%cPor favor, espere a que se dispense el producto.", COLORS.red);
   }

   selectProduct() {
      console.log("%cPor favor, espere a que se dispense el producto.", COLORS.red);
   }

   dispenseProduct() {
      console.log("Producto dispensado. Gracias por su compra.");
      this.vendingMachine.setState(new WaitingForMoney(this.vendingMachine));
   }
}

async function main(){
   const vendingMachine = new VendingMachine();

   let selectedOption: string | null = '4';

   do {
      console.clear();
      console.log(`Seleccione una opción: ${vendingMachine.getStateName()}`);
      selectedOption = prompt(`1. Insertar dinero\n2. Seleccionar producto\n3. Dispensar producto\n4. Salir`);
      switch (selectedOption) {
         case '1':
            vendingMachine.insertMoney();
            break;
         case '2':
            vendingMachine.selectProduct();
            break;
         case '3':
            vendingMachine.dispenseProduct();
            break;
         case '4':
            console.log("Saliendo...");
            break;
         default:
            console.log("%cOpción no válida.", COLORS.red);
      }
      await sleep(3000);
   } while (selectedOption !== '4');
}

main();
