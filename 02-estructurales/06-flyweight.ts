/**
   * ! Patrón Flyweight
   * Es un patrón de diseño estructural que nos permite usar objetos compartidos
   * para soportar eficientemente grandes cantidades de objetos.
   *
   * * Es útil cuando necesitamos una gran cantidad de objetos y queremos reducir
   * * la cantidad de memoria que utilizan.
   *
   * https://refactoring.guru/es/design-patterns/flyweight
*/

import { COLORS } from "../helpers/colors.ts";

interface Location {
   display( coordinates: { x: number; y: number } ): void;
}

class LocationIcon implements Location {

   private type: string; // Hospital, escuela, parque, etc.
   private iconImage: string; // URL de la imagen del icono

   constructor( type: string, iconImage: string ) {
      this.type = type;
      this.iconImage = iconImage;
   }

   display( coordinates: { x: number; y: number } ): void {
      console.log( `Mostrando icono de ${ this.type }`, COLORS.green)
      console.log( `en (${ coordinates.x }, ${ coordinates.y })`, COLORS.blue );
      console.log( `con imagen ${ this.iconImage }` , COLORS.yellow );
   }
}

// Fabrica de Flyweights
class LocationFactory {

   private icons: Record<string, LocationIcon> = {};

   getLocationIcon( type: string ): LocationIcon {
      if (!this.icons[type ] ) {
         const iconImage = `imagen_de_${ type.toLowerCase() }.png`; // Simulación de una URL de imagen
         this.icons[type ] = new LocationIcon( type, iconImage );
      }
      return this.icons[type];
   }
}