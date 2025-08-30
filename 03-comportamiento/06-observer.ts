/**
   * ! Patrón Observer
   * El patrón Observer es un patrón de diseño de comportamiento que establece
   * una relación de uno a muchos entre un objeto, llamado sujeto,
   * y otros objetos, llamados observadores, que son notificados
   * y actualizados automáticamente por el sujeto
   * cuando se producen cambios en su estado.
   *
   * * Es útil cuando necesitamos que varios objetos estén
   * * pendientes de los cambios
   *
   * !No confundirlo con RXJS Observables
   *
   * https://refactoring.guru/es/design-patterns/observer
*/

import { COLORS } from "../helpers/colors.ts";

interface  Observer {
   notify(videoTitle: string): void;
}

class YoutubeChannel {
   private subcribers: Observer[] = [];
   private name: string;

   constructor(name: string) {
      this.name = name;
   }

   subscribe( observer: Observer): void {
      this.subcribers.push(observer);
      console.log(`Nuevo suscriptor en el canal %c${this.name}`, COLORS.green);
   }

   unsubscribe(observer: Observer): void {
      this.subcribers = this.subcribers.filter(sub => sub !== observer);
      console.log(`Suscriptor eliminado del canal %c${this.name}`, COLORS.red);
   }

   uploadVideo( videoTitle: string ): void {
      console.log(`Nuevo video en el canal %c${this.name}: %c${videoTitle}`, COLORS.green, COLORS.white);
      this.subcribers.forEach(sub => sub.notify(videoTitle));
   }
}

class Subscriber implements Observer {
   private name: string;

   constructor(name: string) {
      this.name = name;
   }

   notify(videoTitle: string): void {
     console.log(`El suscriptor %c${this.name} ha sido notificado del nuevo video: %c${videoTitle}`, COLORS.green, COLORS.yellow);
   }
}