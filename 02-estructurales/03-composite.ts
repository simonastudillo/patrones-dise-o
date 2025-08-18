/**
   * ! Patrón Composite
   * Es un patrón de diseño estructural que permite componer objetos
   * en estructuras de árbol para representar jerarquías.
   *
   * El patrón permite a los clientes tratar de manera uniforme a los objetos
   * individuales y a sus composiciones.
   *
   * * Es útil cuando necesitas tratar a los objetos individuales
   * * y a sus composiciones de manera uniforme, y la estructura
   * * de los objetos forma una jerarquía en árbol.
   *
   * https://refactoring.guru/es/design-patterns/composite
   *
*/

interface FileSystemComponent {
   showDetails(indent?: string): void;
}

class File implements FileSystemComponent {
   private name: string;

   constructor(name: string) {
      this.name = name;
   }

   showDetails(indent?: string): void {
      console.log(`${indent || ''}- Archivo: ${this.name}`);
   }
}

class Folder implements FileSystemComponent {
   private name: string;
   private contents: FileSystemComponent[] = [];

   constructor(name: string) {
      this.name = name;
   }

   showDetails(indent: string = ''): void {
      console.log(`${indent}- Carpeta: ${this.name}`);
      this.contents.forEach(component => component.showDetails(indent + '  '));
   }
}