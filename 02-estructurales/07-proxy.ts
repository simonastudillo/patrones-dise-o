import { COLORS } from '../helpers/colors.ts';
/**
   * ! Patrón Proxy
   * Este patrón se utiliza para controlar el acceso a un objeto, es decir,
   * se crea un objeto que actúa como intermediario entre el cliente y el objeto real.
   *
   * * Es útil cuando necesitamos controlar el acceso a un objeto,
   * * por ejemplo, para verificar si el cliente tiene permiso
   * * para acceder a ciertos métodos o propiedades.
   *
   * https://refactoring.guru/es/design-patterns/proxy
   *
*/

interface Player {
   name: string;
   level: number;
}

interface Room {
   enter(player: Player): void;
}

class Player implements Player {
   constructor(public name: string, public level: number) {}
}

class SecretRoom implements Room {
   private isOpen: boolean = false;

   enter(player: Player): void {
      console.log(`%cBienvenido a la sala secreta,${player.name}`, COLORS.blue);
      console.log('Un gran enemigo te espera')
   }
}

class MagicPortal implements Room {
   private secretRoom: SecretRoom;

   constructor(room: SecretRoom) {
      this.secretRoom = room;
   }

   enter(player: Player): void {
      if (player.level >= 10) {
         this.secretRoom.enter(player);
         return;
      }
      console.log(`%c${player.name} no tiene permiso para entrar en la sala secreta.`, COLORS.red);
   }
}