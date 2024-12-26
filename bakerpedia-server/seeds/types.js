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
      icon: 'muffins.svg'
    },
    {
      id: 2, 
      name: 'Pastries',
      icon: 'pastries.svg'
    },
    {
      id: 3, 
      name: 'Bagels',
      icon: 'bagels.svg'
    },
    {
      id: 4, 
      name: 'Cookies',
      icon: 'cookies.svg'
    },
    {
      id: 5, 
      name: 'Baguettes',
      icon: 'baguettes.svg'
    },
    {
      id: 6, 
      name: 'Cakes',
      icon: 'cakes.svg'
    }
  ]);
};
