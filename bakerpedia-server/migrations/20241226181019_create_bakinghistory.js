/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
    return knex.schema
      .createTable("bakinghistory", (table) => {
          table.increments("id").primary();
          table.date('date');
          table.integer("rating").notNullable();
          table.string("notes").notNullable();
          table
            .integer("recipe_id")
            .unsigned()
            .references("recipes.id")
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
      })
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  export function down(knex) {
      return knex.schema.dropTable("bakinghistory");
  }