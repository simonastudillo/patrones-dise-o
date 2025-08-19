/**
   * ! Patrón decorador
   * Es un patrón de diseño estructural que permite añadir
   * funcionalidades a objetos, colocando estos objetos dentro de
   * objetos encapsuladores especiales que contienen estas funcionalidades.
   *
   * No confundirlo con los decoradores de TypeScript que son anotaciones.
   *
   * * Es útil cuando necesitas añadir funcionalidades a objetos
   *  * de manera dinámica y flexible.
   *
   * https://refactoring.guru/es/design-patterns/decorator
*/

import { COLORS } from "../helpers/colors.ts";

interface Notification {
   send( message: string ): void;
}

class BasicNotification implements Notification {
   send( message: string ): void {
      console.log( `Enviando notificación básica: %c${message}`, COLORS.green);
   }
}

// class decoradora
abstract class NotificationDecorator implements Notification {
   
   protected notification: Notification;

   constructor(notification: Notification) {
      this.notification = notification;
   }

   send(message: string): void {
      this.notification.send(message);  
   }

}
// Crear diferentes decoradores
class EmailDecorator extends NotificationDecorator {
   
   private sendEmail(message: string): void {
      console.log(`Enviando notificación por correo electrónico: %c${message}`, COLORS.blue);
   }

   override send(message: string): void {
      super.send(message);
      this.sendEmail(message);
   }
}
class SmsDecorator extends NotificationDecorator {

   private sendSMS(message: string): void {
      console.log(`Enviando notificación por SMS: %c${message}`, COLORS.blue);
   }

   override send(message: string): void {
      super.send(message);
      this.sendSMS(message);
   }
}