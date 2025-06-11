/**
 * ! Patrón Builder:
 * Es un patrón de diseño creacional que nos permite construir objetos complejos
 * paso a paso.
 *
 * El patrón nos permite producir distintos tipos y representaciones
 * de un objeto empleando el mismo código de construcción.
 *
 * * Es útil cuando necesitamos construir un objeto complejo con muchas partes
 * * y queremos que el proceso de construcción sea independiente de las partes
 * * que lo componen.
 */

import { COLORS } from '../helpers/colors.ts';

//! Tarea: crear un QueryBuilder para construir consultas SQL
/**
 * Debe de tener los siguientes métodos:
 * - constructor(table: string)
 * - select(fields: string[]): QueryBuilder -- si no se pasa ningún campo, se seleccionan todos con el (*)
 * - where(condition: string): QueryBuilder - opcional
 * - orderBy(field: string, order: string): QueryBuilder - opcional
 * - limit(limit: number): QueryBuilder - opcional
 * - execute(): string - retorna la consulta SQL
 * 
 ** Ejemplo de uso:
  const usersQuery = new QueryBuilder("users") // users es el nombre de la tabla
    .select("id", "name", "email")
    .where("age > 18")
    .where("country = 'Cri'")
    .orderBy("name", "ASC")
    .limit(10)
    .execute();

  console.log('Consulta: ', usersQuery);
  // Select id, name, email from users where age > 18 and country = 'Cri' order by name ASC limit 10;
 */

//! Solución

class QueryBuilder {
  private table: string;
  private fields: string[] = [];
  private conditions: string[] = [];
  private orderFields: string[] = [];
  private limitCount?: number;

  constructor(table: string) {
    this.table = table;
  }

  select(...fields: string[]): QueryBuilder {
      if (fields.length === 0) {
         this.fields.push('*'); // Selecciona todos los campos si no se especifican
      } else {
         this.fields.push(...fields);
      }
      return this;
  }

  where(condition: string): QueryBuilder {
      this.conditions.push(condition);
      return this;
  }

  orderBy(field: string, direction: 'ASC' | 'DESC' = 'ASC'): QueryBuilder {
      this.orderFields.push(`${field} ${direction}`);
      return this;
  }

  limit(count: number): QueryBuilder {
      this.limitCount = count;
      return this;
  }

   execute(): string {
      // Select id, name, email from users where age > 18 and country = 'Cri' order by name ASC limit 10;
      const selectFields = `SELECT ${this.fields.join(', ')} FROM ${this.table}`;

      // Condiciones
      const whereClause = this.conditions.length > 0 ? this.conditions.join(' AND ') : '';

      // Ordenamiento
      const orderClause = this.orderFields.length > 0 ? ` ORDER BY ${this.orderFields.join(', ')}` : '';

      // Límite
      const limitClause = this.limitCount !== undefined ? ` LIMIT ${this.limitCount}` : '';

      return `${selectFields} ${whereClause} ${orderClause} ${limitClause};`.trim();
   }
}

function main() {
  const usersQuery = new QueryBuilder('users')
    .select('id', 'name', 'email')
    .where('age > 18')
    .where("country = 'Cri'") // Esto debe de hacer una condición AND
    .orderBy('name', 'ASC')
    .limit(10)
    .execute();

  console.log('%cConsulta:\n', COLORS.red);
  console.log(usersQuery);
}

main();
