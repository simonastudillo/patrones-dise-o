/**
   * ! Patrón Bridge
   * Este patrón nos permite desacoplar una abstracción de su implementación,
   * de tal forma que ambas puedan variar independientemente.
   *
   * * Es útil cuando se tienen múltiples implementaciones de una abstracción
   * * Se puede utilizar para separar la lógica de negocio de la lógica de presentación
   * * Se puede utilizar para separar la lógica de la interfaz de usuario también.
   *
   * https://refactoring.guru/es/design-patterns/bridge
*/
import { COLORS } from '../helpers/colors.ts';

// 1. Interfaz NotificationChannel
interface NotificationChannel {
   send(message: string): void;
}

// 2. Implementaciones de Canales de Comunicación

class EmailChannel implements NotificationChannel {
   send(message: string): void {
      console.log(`Enviando correo electrónico: ${message}`);
   }
}

class SMSChannel implements NotificationChannel {
   send(message: string): void {
      console.log(`Enviando SMS: ${message}`);
   }
}

class PushNotificationChannel implements NotificationChannel {
   send(message: string): void {
      console.log(`Enviando Push: ${message}`);
   }
}

// 3. Clase Abstracta Notification

abstract class Notification {
   protected channels: NotificationChannel[] = [];

   constructor(channel: NotificationChannel[]) {
      this.channels.push(...channel);
   }

   abstract notify(message: string): void;
   abstract setChannel(channel: NotificationChannel): void;
}

class AlertNotification extends Notification {
   override notify(message: string): void {
      console.log('\n%cNotificación de Alerta:', COLORS.red);
      // Enviar el mensaje a través de todos los canales
      this.channels.forEach(channel => channel.send(message));
   }

   override setChannel(channel: NotificationChannel): void {
      this.channels.push(channel);
      console.log('\n%cCanal de notificación cambiado:', COLORS.yellow);
   }
}

function main()
{
   const channels = [
      new EmailChannel(),
      new SMSChannel(),
      new PushNotificationChannel(),
      new PushNotificationChannel(),
      new PushNotificationChannel(),
   ];

   const alerta = new AlertNotification(channels);
   alerta.notify('¡Alerta! Se ha detectado un problema crítico.');
   alerta.setChannel(new PushNotificationChannel());
   alerta.notify('¡Alerta! Se necesita su presencia en la oficina.');
}

main();