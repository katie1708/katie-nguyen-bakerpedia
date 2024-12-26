/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
    return knex.schema
      .createTable("types", (table) => {
          table.increments("id").primary();
          table.string("name").notNullable();
          table.string("icon");
      })
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  export function down(knex) {
      return knex.schema.dropTable("types");
  }