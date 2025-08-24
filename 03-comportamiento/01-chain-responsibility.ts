/**
   * ! Patron Chain of Responsibility
   * Es un patrón de diseño de comportamiento que te permite pasar solicitudes
   * a lo largo de una cadena de manejadores.
   *
   * * Es útil cuando se necesita procesar datos de diferentes maneras, pero no
   * * se sabe de antemano qué tipo de procesamiento se necesita o en qué orden
   * * pero se sabe que se necesita procesar en una secuencia.
   *
   * https://refactoring.guru/es/design-patterns/chain-of-responsibility
*/

import { COLORS } from "../helpers/colors.ts";

interface Handler {
   
   setNext(handler: Handler): Handler;
   handle(request: string): void;
}

abstract class BaseHandler implements Handler{
   private nextHandler?: Handler;
   
   setNext(handler: Handler): Handler {
      this.nextHandler = handler;
      return handler;
   }
   handle(request: string): void {
      this.nextHandler?.handle(request);
   }
}
// Soporte Básico
class BasicSupport extends BaseHandler{
   
   override handle(request: string): void {
      if(request === 'basico'){
         console.log(`%cSoporte básico: Resolviendo problema básico`, COLORS.blue);
         return;
      }

      console.log(`%cSoporte básico: No puedo resolver el problema, derivando...`, COLORS.yellow);
      super.handle(request);
   }
}

// Soporte avanzado
class AdvancedSupport extends BaseHandler {

   override handle(request: string): void {
      if (request === 'avanzado') {
         console.log(`%cSoporte avanzado: Resolviendo problema avanzado`, COLORS.green);
         return;
      }

      console.log(`%cSoporte avanzado: No puedo resolver el problema, derivando...`, COLORS.yellow);
      super.handle(request);
   }
}

// Soporte experto
class ExpertSupport extends BaseHandler {

   override handle(request: string): void {
      if (request === 'experto') {
         console.log(`%cSoporte experto: Resolviendo problema experto`, COLORS.green);
         return;
      }

      console.log(`%cSoporte experto: No puedo resolver el problema, no podemos hacer más`, COLORS.yellow);
   }
}