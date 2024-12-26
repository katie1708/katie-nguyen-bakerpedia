/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema
    .createTable("users", (table) => {
        table.increments("id").primary();
        table.string("username").notNullable();
        table.string("firstname").notNullable();
        table.string("lastname").notNullable();
        table.string("password").notNullable();
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
    return knex.schema.dropTable("users");
}
