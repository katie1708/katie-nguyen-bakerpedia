/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

import bcrypt from "bcryptjs";

const hash = bcrypt.hashSync(process.env.USER_PW, 10);

export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {
      id: 1, 
      username: 'katiebaker',
      firstname: 'Katie',
      lastname: 'Nguyen',
      password: hash
    }
  ]);
};
