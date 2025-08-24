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
   private secretRoom: Room;

   constructor(room: Room) {
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

function main(){
   const portal = new MagicPortal(new SecretRoom() );
   const player1 = new Player('Aventurero A', 5);
   const player2 = new Player('Aventurero B', 15);

   console.log('%cIntentando entrar en la sala secreta con un jugador de nivel 5:', COLORS.yellow);
   portal.enter(player1); // No tiene permiso
   console.log('\n%cIntentando entrar en la sala secreta con un jugador de nivel 15:', COLORS.yellow);
   portal.enter(player2); // tiene permiso
}


main();