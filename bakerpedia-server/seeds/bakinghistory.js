/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('bakinghistory').del()
  await knex('bakinghistory').insert([
    {
      id: 1, 
      rating: 3,
      notes: "The muffins are a little bit dry",
      recipe_id: 1,
      date: "2024-12-14"
    },
    {
      id: 2, 
      rating: 5,
      notes: "This time is perfect!!!!",
      recipe_id: 1,
      date: "2025-01-01"
    }
  ]);
};
