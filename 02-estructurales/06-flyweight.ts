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
         console.log( `Creando nuevo icono de tipo ${ type }`, COLORS.cyan );
         const iconImage = `imagen_de_${ type.toLowerCase() }.png`; // Simulación de una URL de imagen
         this.icons[type ] = new LocationIcon( type, iconImage );
      }
      return this.icons[type];
   }
}

class MapLocation {
   private coordinates: { x: number; y: number };
   private icon: LocationIcon;

   constructor( x: number, y: number, icon: LocationIcon ) {
      this.coordinates = { x, y };
      this.icon = icon;
   }

   display(): void {
      this.icon.display( this.coordinates );
   }
}

function main() {
   const factory = new LocationFactory();

   const locations: MapLocation[] = [
      new MapLocation( 10, 20, factory.getLocationIcon( "Hospital" ) ),
      new MapLocation( 15, 25, factory.getLocationIcon( "Escuela" ) ),
      new MapLocation( 30, 40, factory.getLocationIcon( "Parque" ) ),
      new MapLocation( 50, 60, factory.getLocationIcon( "Hospital" ) ),
      new MapLocation(70, 80, factory.getLocationIcon("Escuela")),
      new MapLocation(30, 50, factory.getLocationIcon("Hospital")),
      new MapLocation(80, 60, factory.getLocationIcon("Hospital")),
   ];

   locations.forEach( location => location.display() );

   console.log( `\nNúmero de iconos únicos creados: ${ Object.keys( factory['icons'] ).length }`, COLORS.cyan );
}

main();