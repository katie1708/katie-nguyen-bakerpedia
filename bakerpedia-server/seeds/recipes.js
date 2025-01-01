/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('recipes').del()
  await knex('recipes').insert([
    {
      id: 1, 
      name: 'Blueberry Muffins',
      user_id: 1,
      type_id: 1,
      time: 90,
      difficulty: 'Easy',
      image: 'http://localhost:8080/images/blueberrymuffins.jpg',
      ingredients:'[{"name":"all purposes flour","unit":"cup","quantity":"1.5"},{"name":"granulated sugar","unit":"cup","quantity":"3/4"},{"name": "baking powder","unit": "tsp","quantity":"2"},{"name": "salt","unit": "tsp","quantity":"1/2"},{"name": "vegetable oil","unit": "cup","quantity":"1/3"},{"name": "egg","unit": null,"quantity": "1"},{"name": "milk","unit": "cup","quantity": "1/3"},{"name": "blueberries","unit":"cup","quantity":"1"}]',
      instructions: '[{"step": 1,"text": "Preheat the oven to 400°F (204°C). Line muffin cups with paper liners (8 for big muffins, 10 for standard, or 22 for mini)."},{"step": 2,"text": "Lightly grease or spray the tops of the muffin tin with oil to prevent the oversized tops from sticking."},{"step": 3,"text": "Whisk the flour, sugar, baking powder, and salt in a large bowl."},{"step": 4,"text": "Add the oil, egg and milk altogether and whisk until well combined"},{"step": 5,"text": "Add the wet ingredients to the bowl with the dry ingredients. Stir gently until the batter comes together. Be careful not to overmix!"},{"step": 6,"text": "Gently fold in the blueberries."},{"step": 7,"text": "Divide the batter between muffin cups."},{"step": 8,"text": "Bake muffins in 15 to 20 minutes, wait for it to cool down and enjoy it!!!!"}]'
    },
    {
      id: 2,
      name:'NY Matcha Cookies',
      user_id:1,
      type_id:4,
      time:45,
      difficulty:'Easy',
      image:'http://localhost:8080/images/matchacookies.jpg',
      ingredients:'[{"name":"all purposes flour","unit":"cup","quantity":"2"},{"name":"baking soda","unit":"tsp","quantity":"1"},{"name":"salt","unit":"tsp","quantity":"1/2"},{"name":"matcha powder","unit":"tbsp","quantity":"2"},{"name":"unsalted butter","unit":"cup","quantity":"1"},{"name":"granulated sugar","unit":"cup","quantity":"1/2"},{"name":"light brown sugar","unit":"cup","quantity":"1"},{"name":"vanilla extract","unit":"tsp","quantity":"1"},{"name":"egg","unit":null,"quantity":"2"},{"name":"any kind of toppings","unit":"cup","quantity":"1"}]',
      instructions: '[{"step": 1,"text": "Combine flour, baking soda, salt, and matcha powder in a medium size mixing bowl. Mix well and set aside."},{"step": 2,"text": "Add white sugar and brown sugar to your butter and mix until combine. Once well combined, add in eggs and vanilla and whisk together."},{"step": 3,"text": "Slowly add in the dry ingredients from step 2 to the wet ingredients. Mix well with a spatula until a green dough forms."},{"step": 4,"text": "Add chosen toppings to the dough and mix well"},{"step": 5,"text": "Let the dough rest in the fridge for 1 hour."},{"step": 6,"text": "Preheat oven to 350 degrees F."},{"step": 7,"text": "Scoop cookie dough onto baking sheets and bake for 10-12 minutes"}]'
    },
    {
      id: 3,
      name:'Chocolate Sweet Rolls',
      user_id:1,
      type_id:2,
      time:75,
      difficulty:'Medium',
      image:'http://localhost:8080/images/chocolateroll.jpg',
      ingredients:'[{"name":"bread flour","unit":"cup","quantity":"4"},{"name":"instant yeast","unit":"grams","quantity":"9"},{"name":"salt","unit":"tsp","quantity":"1"},{"name":"whole milk","unit":"tbsp","quantity":"6"},{"name":"unsalted butter","unit":"grams","quantity":"70"},{"name":"granulated sugar","unit":"tbsp","quantity":"6"},{"name":"brown sugar","unit":"cup","quantity":"1/2"},{"name":"vanilla extract","unit":"tsp","quantity":"1"},{"name":"egg","unit":null,"quantity":"2"},{"name":"cocoa powder","unit":"tbsp","quantity":"2"},{"name":"soft unsalted butter","unit":"grams","quantity":"85"},{"name":"chocochip","unit":"cup","quantity":"3/4"}]',
      instructions: '[{"step": 1,"text": "Prepare the dough: Whisk the warm milk, 2 Tablespoons sugar, and the yeast together in the bowl of your stand mixer fitted with a dough hook or paddle attachment. Cover and allow mixture to sit for about 5 minutes or until foamy on top."},{"step": 2,"text": "Add the remaining sugar, the butter, eggs, salt, and 1 cup (about 130g) of flour and beat on medium speed for 1 minute. Add 3 cups (about 400g) flour, switch the mixer down to low speed, and beat until a soft dough forms and pulls away from the sides of the bowl."},{"step": 3,"text": "Knead the dough: Keep the dough in the mixer (and switch to the dough hook if using the paddle) and beat for an additional 6-8 full minutes. Set the dough on aside and allow it to rise in a relatively warm environment for 2 hours or until double in size."},{"step": 4,"text": "Roll out the dough: Punch down the dough to release the air. Place dough on a lightly floured work surface and using a lightly floured rolling pin, roll dough into a 10×16-inch rectangle."},{"step": 5,"text": "Prepare filling: Mix all of the filling ingredients together except for the chopped chocolate/chocolate chips. Spread mixture all over the dough. Sprinkle chopped chocolate/chocolate chips evenly on top. Tightly roll up the dough to form a 16-inch-long log then cut into 12 even rolls and place onto a baking pan"},{"step": 6,"text": "Cover the rolls tightly and allow to rise until doubled in size, about 1 hour."},{"step": 7,"text": "Preheat the oven to 350°F (177°C). Bake rolls for about 25-28 minutes."}]'
    },
    {
      id: 4,
      name:'Homemade Bagels',
      user_id:1,
      type_id:3,
      time:180,
      difficulty:'Medium',
      image:'http://localhost:8080/images/bagels.jpg',
      ingredients:'[{"name":"bread flour","unit":"cup","quantity":"4"},{"name":"instant yeast","unit":"tsp","quantity":"2 and 3/4"},{"name":"salt","unit":"tsp","quantity":"2"},{"name":"warm water","unit":"ml","quantity":"360"},{"name":"granulated sugar","unit":"tbsp","quantity":"1"},{"name":"egg white","unit":null,"quantity":"1"},{"name":"olive oil","unit":"tsp","quantity":"2"}]',
      instructions: '[{"step": 1,"text": "Prepare the dough: Whisk the warm water and yeast together in the mixing bowl. Cover and allow to sit for 5 minutes. Add the flour, brown sugar, and salt. Beat on low speed for 2 minutes."},{"step": 2,"text": "Knead the dough: Keep the dough in the mixer and beat for an additional 6-7 full minutes. Then allow the dough to rise at room temperature for 60-90 minutes or until double in size."},{"step": 3,"text": "Shape the bagels: When the dough is ready, punch it down to release any air bubbles. Divide the dough into 8 equal pieces. Shape each piece into a ball. Press your index finger through the center of each ball to make a hole about 1.5 – 2 inches in diameter."},{"step": 4,"text": "Preheat oven to 425°F (218°C)."},{"step": 5,"text": "Water bath: Fill a large, wide pot with 2 quarts of water. Whisk in the honey. Bring water to a boil, then reduce heat to medium-high. Drop bagels in, 2-4 at a time, making sure they have enough room to float around. Cook the bagels for 1 minute on each side."},{"step":6,"text":"Using a pastry brush, brush the egg wash on top and around the sides of each bagel."},{"step":7,"text":"Place the bagels on a baking mat and bake for 20-25 minutes"}]'
    },
    {
      id: 5,
      name:'Matcha Basque Cheesecake',
      user_id:1,
      type_id:6,
      time:60,
      difficulty:'Medium',
      image:'http://localhost:8080/images/matchacheesecake.jpg',
      ingredients:'[{"name":"creamcheese","unit":"grams","quantity":"250"},{"name":"cake flour","unit":"tsp","quantity":"4"},{"name":"salt","unit":"tsp","quantity":"1/8"},{"name":"corn starch","unit":"tsp","quantity":"2"},{"name":"granulated sugar","unit":"cup","quantity":"1/2"},{"name":"egg","unit":null,"quantity":"3"},{"name":"matcha powder","unit":"tbsp","quantity":"1"},{"name":"whipping cream","unit":"ml","quantity":"220"}]',
      instructions:'[{"step": 1,"text": "Preheat the oven to 475ºF (230ºC)"},{"step": 2,"text": "Combine the cream cheese and the sugar until they are well incorporated and there are no lumps"}, {"step": 3,"text": "In a separate bowl, whisk 2 large eggs and 1 egg yolk"},{"step": 4,"text": "Slowly and gradually add the beaten eggs to the cream cheese mixture. Blend completely and thoroughly"},{"step": 5,"text": "Blend in the matcha with small portion of the batter, then add this mixture back to the batter bowl and mix really well"},{"step": 6,"text": "Shift cake flour and cornstarch into the batter mixture and whisk them well"},{"step":7,"text":"Gradually add 220 ml heavy (whipping) cream (1 cup minus 4 tsp) while you stir. Mix until it’s all combined. Add salt and blend it all together."},{"step":8,"text":"Pour the cake batter into the cake pan (cover with parchment paper) and bake in 25-30 minutes"}]'
    },
    {
      id: 6,
      name:'No Knead Baguette',
      user_id:1,
      type_id:5,
      time:70,
      difficulty:'Medium',
      image:'http://localhost:8080/images/baguette.jpg',
      ingredients:'[{"name":"all purposes flour","unit":"cups","quantity":"6"},{"name":"instant yeast","unit":"tsp","quantity":"2"},{"name":"salt","unit":"tsp","quantity":"2"},{"name":"luke warm water","unit":"cups","quantity":"3"}]',
      instructions:'[{"step": 1,"text": "Mix the dry ingredients together and then add water. Mix the ingredients until the dough comes together. Cover it and let it sit for 12-20 hours."},{"step": 2,"text": "The dough should be wet, sticky and bubbly after. Generously flour your hands and the baking sheet to shape the baguette."}, {"step": 3,"text": "Place them on a baking sheet and sprinkle a generous amount of flour on it. Score the top with a sharp knife and cover it with a towel. Let the dough rise in a warm place for 1-2 hours."},{"step": 4,"text": "Preheat the oven to 450 °F. Fill a deep baking pan with 2 cups of hot boiled water, and place it on the lower rack"},{"step":5,"text":"Bake the baguettes in 40 minutes. After the first 10 minutes, remove the water pan from the oven"}]'
    }
  ]);
};
