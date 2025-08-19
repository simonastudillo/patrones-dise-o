/**
   * ! Patrón Facade
   * Este patrón proporciona una interfaz unificada para un conjunto de interfaces
   * en un subsistema.
   *
   * Facade define una interfaz de nivel más alto que hace que el subsistema
   * sea más fácil de usar.
   *
   * * Es útil cuando un subsistema es complejo o difícil de entender para
   * * proporcionar una interfaz simplificada para el cliente.
   *
   * https://refactoring.guru/es/design-patterns/facade
*/

import { COLORS } from "../helpers/colors.ts";

class Proyector {
   turnOn(): void {
      console.log('Proyector encendido');
   }

   turnOff(): void {
      console.log('Proyector apagado');
   }
}

class SoundSystem {
   on(): void {
      console.log('Sistema de sonido encendido');
   }

   off(): void {
      console.log('Sistema de sonido apagado');
   }
}

class VideoPlayer {

   on() {
      console.log('Reproductor de video encendido');
   }

   play( movie: string ): void {
      console.log(`Reproduciendo la película: %c${movie}`, COLORS.green);
   }

   stop(): void {
      console.log('Video detenido');
   }

   off(): void {
      console.log('Reproductor de video apagado');
   }
}

class PopcornMaker {
   on(): void {
      console.log('Máquina de palomitas encendida');
   }

   poppingPorcorn(): void {
      console.log('Haciendo palomitas!');
   }

   turnOffPoppingPorcorn(): void {
      console.log('Máquina de palomitas apagada');
   }

   off(): void {
      console.log('Máquina de palomitas apagada');
   }
}

interface HomeTheaterFacadeOptions {
   proyector: Proyector;
   soundSystem: SoundSystem;
   videoPlayer: VideoPlayer;
   popcornMaker: PopcornMaker;
}

class HomeTheaterFacade {
   private proyector: Proyector;
   private soundSystem: SoundSystem;
   private videoPlayer: VideoPlayer;
   private popcornMaker: PopcornMaker;

   constructor({
      proyector,
      soundSystem,
      videoPlayer,
      popcornMaker,
   }: HomeTheaterFacadeOptions) {
      this.proyector = proyector;
      this.soundSystem = soundSystem;
      this.videoPlayer = videoPlayer;
      this.popcornMaker = popcornMaker;
   }

   public watchMovie( movie: string ): void {
      console.log('Preparando el cine en casa...');
      this.proyector.turnOn();
      this.soundSystem.on();
      this.videoPlayer.on();
      this.popcornMaker.on();
      this.popcornMaker.poppingPorcorn();
      this.videoPlayer.play(movie);
   }

   public endMovie(): void {
      console.log('Terminando la película...');
      this.videoPlayer.stop();
      this.popcornMaker.turnOffPoppingPorcorn();
      this.popcornMaker.off();
      this.soundSystem.off();
      this.proyector.turnOff();
      this.videoPlayer.off();
   }
}

function main() {
   const proyector = new Proyector();
   const soundSystem = new SoundSystem();
   const videoPlayer = new VideoPlayer();
   const popcornMaker = new PopcornMaker();

   const homeTheater = new HomeTheaterFacade({
      proyector,
      soundSystem,
      videoPlayer,
      popcornMaker,
   });

   homeTheater.watchMovie('El Señor de los Anillos');
   console.log('----------------------------------');
   homeTheater.endMovie();
}

main();