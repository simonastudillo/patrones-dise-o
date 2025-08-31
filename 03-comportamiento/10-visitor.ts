/**
 * !Patrón Visitor
 *
 * El patrón Visitor es un patrón de diseño de comportamiento
 * que te permite separar algoritmos de los objetos sobre
 * los que operan.
 *
 * * Es útil cuando necesitas añadir nuevas operaciones a
 * * clases estables sin cambiar su código.
 *
 * https://refactoring.guru/es/design-patterns/visitor
 */

/**
 * Contexto: Imagina que estás diseñando un sistema para un parque
 * temático con diferentes tipos de atracciones:
 * montañas rusas, casas del terror y ruedas de la fortuna.
 *
 * Cada atracción tiene su propio precio de entrada y ofrece un descuento
 * dependiendo del tipo de visitante (niño, adulto o adulto mayor).
 *
 * Aquí es donde entra el patrón Visitor, que permite aplicar operaciones
 * específicas (como calcular el precio con descuento) dependiendo tanto
 * de la atracción como del tipo de visitante,
 * sin modificar las clases originales.
 */

interface Visitor {
   visitRollerCoaster(rollerCoaster: RollerCoaster): number;
   visitHauntedHouse(hauntedHouse: HauntedHouse): number;
   visitFerrisWheel(ferrisWheel: FerrisWheel): number;
}

interface Attraction {
   accept(visitor: Visitor): number;
}

class RollerCoaster implements Attraction {
   private price: number = 50;

   getPrice(): number {
      return this.price;
   }

   accept(visitor: Visitor): number {
      return visitor.visitRollerCoaster(this);
   }
}

class HauntedHouse implements Attraction {
   private price: number = 50;

   getPrice(): number {
      return this.price;
   }

   accept(visitor: Visitor): number {
      return visitor.visitHauntedHouse(this);
   }
}

class FerrisWheel implements Attraction {
   private price: number = 50;

   getPrice(): number {
      return this.price;
   }

   accept(visitor: Visitor): number {
      return visitor.visitFerrisWheel(this);
   }
}


// Visitors
class ChildVisitor implements Visitor {
   visitRollerCoaster(rollerCoaster: RollerCoaster): number {
      console.log(`Niño visitando Montaña Rusa tiene un precio con descuento de $${ rollerCoaster.getPrice() * 0.5 }`);
      return rollerCoaster.getPrice() * 0.5; // 50% de descuento
   }

   visitHauntedHouse(hauntedHouse: HauntedHouse): number {
      console.log(`Niño visitando Casa del Terror tiene un precio con descuento de $${ hauntedHouse.getPrice() * 0.7 }`);
      return hauntedHouse.getPrice() * 0.7; // 70% de descuento
   }

   visitFerrisWheel(ferrisWheel: FerrisWheel): number {
      console.log(`Niño visitando Rueda de la Fortuna tiene un precio con descuento de $${ ferrisWheel.getPrice() * 0.6 }`);
      return ferrisWheel.getPrice() * 0.6; // 60% de descuento
   }
}

class AdultVisitor implements Visitor {
   visitRollerCoaster(rollerCoaster: RollerCoaster): number {
      console.log(`Adulto visitando Montaña Rusa tiene un precio con descuento de $${rollerCoaster.getPrice()}`);
      return rollerCoaster.getPrice(); // 50% de descuento
   }

   visitHauntedHouse(hauntedHouse: HauntedHouse): number {
      console.log(`Adulto visitando Casa del Terror tiene un precio con descuento de $${hauntedHouse.getPrice()}`);
      return hauntedHouse.getPrice(); // 70% de descuento
   }

   visitFerrisWheel(ferrisWheel: FerrisWheel): number {
      console.log(`Adulto visitando Rueda de la Fortuna tiene un precio con descuento de $${ferrisWheel.getPrice()}`);
      return ferrisWheel.getPrice(); // 60% de descuento
   }
}

class SeniorVisitor implements Visitor {
   visitRollerCoaster(rollerCoaster: RollerCoaster): number {
      console.log(`Adulto visitando Montaña Rusa tiene un precio con descuento de $${rollerCoaster.getPrice() * 0.8}`);
      return rollerCoaster.getPrice() * 0.8; // 80% de descuento
   }

   visitHauntedHouse(hauntedHouse: HauntedHouse): number {
      console.log(`Adulto visitando Casa del Terror tiene un precio con descuento de $${hauntedHouse.getPrice() * 0.8}`);
      return hauntedHouse.getPrice() * 0.8; // 80% de descuento
   }

   visitFerrisWheel(ferrisWheel: FerrisWheel): number {
      console.log(`Adulto visitando Rueda de la Fortuna tiene un precio con descuento de $${ferrisWheel.getPrice() * 0.8}`);
      return ferrisWheel.getPrice() * 0.8; // 80% de descuento
   }
}