import { COLORS } from '../helpers/colors.ts';
/**
   * ! Factory Function
   * Es un patrón de diseño que nos permite crear objetos o funciones de manera dinámica que serán
   * usados posteriormente en el código.
   *
   * * Es útil cuando necesitamos crear objetos o funciones de manera dinámica,
   * * es decir, en tiempo de ejecución y no en tiempo de compilación.
   *
*/

type Language = 'es' | 'en' | 'fr';

function createGreeter(lang: Language): (name: string) => void
{
   return function(name: string) {
      const messages = {
         es: `Hola, ${name}!`,
         en: `Hello, ${name}!`,
         fr: `Bonjour, ${name}!`
      }

      return console.log(messages[lang],COLORS.red);
   }
}