/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
    return knex.schema
      .createTable("recipes", (table) => {
          table.increments("id").primary();
          table.string("name").notNullable();
          table
            .integer("user_id")
            .unsigned()
            .references("users.id")
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
          table
            .integer("type_id")
            .unsigned()
            .references("types.id")
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
          table.integer("time").notNullable();
          table.string("difficulty").notNullable();
          table.string("image").notNullable();
          table.json("ingredients").notNullable();
          table.json("instructions").notNullable();
      })
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  export function down(knex) {
      return knex.schema.dropTable("recipes");
  }