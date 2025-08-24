/**
   * ! Patrón Command
   * Este patrón encapsula una solicitud como un objeto,
   * lo que le permite parametrizar otros objetos con diferentes solicitudes,
   * encolar solicitudes, o registrar solicitudes, y soporta operaciones que pueden deshacerse.
   *
   * Me gustó mucho la explicación de Refactoring Guru
   * https://refactoring.guru/es/design-patterns/command
   *
   * * Es útil cuando se necesita desacoplar el objeto que invoca
   * * la operación del objeto que sabe cómo realizarla.
   *
   *
*/

import { COLORS } from "../helpers/colors.ts";

interface Command {
   execute() : void;
}

class Light {
   turnOn(): void {
      console.log(`%cLa luz está encendida`, COLORS.yellow);
   }

   turnOff(): void {
      console.log(`%cLa luz está apagada`, COLORS.yellow);
   }
}

class Fan {
   on(): void {
      console.log(`%cEl ventilador está encendido`, COLORS.green);
   }

   off(): void {
      console.log(`%cEl ventilador está apagado`, COLORS.green);
   }
}

// Comandos
class LightOnCommand implements Command
{

   constructor (private light: Light) {}

   execute(): void {
      this.light.turnOn();
   }

}
class LightOffCommand implements Command {

   constructor(private light: Light) { }

   execute(): void {
      this.light.turnOff();
   }

}

class FanOnCommand implements Command {

   constructor(private fan: Fan) { }

   execute(): void {
      this.fan.on();
   }

}

class FanOffCommand implements Command {

   constructor(private fan: Fan) { }

   execute(): void {
      this.fan.off();
   }

}

// Control universal
class RemoteControl {
   private commands: Record<string, Command> = {};

   setCommand(slot: string, command: Command): void {
      this.commands[slot] = command;
   }

   pressButton(slot: string): void {
      if (this.commands[slot]) {
         this.commands[slot].execute();
         return;
      }
      console.log(`%cNo hay comando asignado al botón ${slot}`, COLORS.red);
   }
}

function main(){
   const remoteControl = new RemoteControl();
   const light = new Light();
   const fan = new Fan();

   remoteControl.setCommand("1", new LightOnCommand(light));
   remoteControl.setCommand("2", new LightOffCommand(light));
   remoteControl.setCommand("3", new FanOnCommand(fan));
   remoteControl.setCommand("4", new FanOffCommand(fan));

   let continueProgram = true;
   
   do {
      console.clear();
      const button = prompt(
         `Presiona un botón del control: \n
         1. Encender luz
         2. Apagar luz
         3. Encender ventilador
         4. Apagar ventilador
         
         Botón:
         `) ?? '';
      remoteControl.pressButton(button);

      const continueResponse = prompt('¿Deseas continuar? (s/n): ')?.toLowerCase();
      continueProgram = continueResponse === 's';

   } while (continueProgram);
}

main();