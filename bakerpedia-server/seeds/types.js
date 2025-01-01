/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('types').del()
  await knex('types').insert([
    {
      id: 1, 
      name: 'Muffins',
      icon: 'http://localhost:8080/icons/muffins.svg'
    },
    {
      id: 2, 
      name: 'Pastries',
      icon: 'http://localhost:8080/icons/pastries.svg'
    },
    {
      id: 3, 
      name: 'Bagels',
      icon: 'http://localhost:8080/icons/bagels.svg'
    },
    {
      id: 4, 
      name: 'Cookies',
      icon: 'http://localhost:8080/icons/cookies.svg'
    },
    {
      id: 5, 
      name: 'Baguettes',
      icon: 'http://localhost:8080/icons/baguette.svg'
    },
    {
      id: 6, 
      name: 'Cakes',
      icon: 'http://localhost:8080/icons/cakes.svg'
    }
  ]);
};
