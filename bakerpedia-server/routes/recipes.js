import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);
import express from "express";


const router = express.Router();

// GET /recipes endpoint to get the list of all recipes
router.get('/recipes', async(req,res) => {
    try {
        const recipes = await knex('recipes').select('*');

        res.status(200).json(recipes);
    } catch(e) {
        res.status(500).send("Unable to fetch the list of recipes")
    }
});

// GET /recipes/:id endpoint to get details of a single recipe
router.get('/recipes/:id', async(req,res) => {
    const recipeId = req.params.id;

    try {
        //Fetch single recipe data
        const recipe = await knex('recipes')
            .join('types','recipes.type_id','types.id')
            .select(
                'recipes.id',
                'recipes.name',
                'recipes.user_id',
                'recipes.time',
                'recipes.difficulty',
                'recipes.ingredients',
                'recipes.instructions',
                'types.name as type_name',
                'types.icon as type_icon'
            )
            .where('recipes.id',recipeId).first()

        if (recipe) {
            res.status(200).json(recipe);
          } else {
            res.status(404).send('Recipe not found');
        }
    } catch(e) {
        res.status(500).send('Error fetching recipe data');
    }
})

//POST /recipes
router.post('/recipes', async(req,res) => {
    const {
        name,
        user_id,
        type_id,
        time,
        difficulty,
        image,
        ingredients,
        instructions
    } = req.body

    //Convert ingredients and instructions
    const convertedIngredients = JSON.stringify(ingredients)
    const convertedInstructions = JSON.stringify(instructions)

    //Validate of no missing fields
    if (!name || !user_id || !type_id || !time || !difficulty || !image || !ingredients || !instructions ) {
        return res.status(400).json({ message: "All fields are required." });
    }

    //Validate user id
    const foundUser = await knex('users')
    .where("id", user_id).first()

    if(!foundUser) {
        return res.status(400).json({ message: `There is no user with the ID of ${user_id}` });
    }

    //Validate type of recipe
    const foundType = await knex('types')
    .where("id", type_id).first();

    if(!foundType) {
        return res.status(400).json({ message: `There is no recipe type with the ID of ${foundType.name}` });
    }

    //Insert new recipe
    try {
        const [newRecipeId] = await knex("recipes").insert({
            name,
            user_id,
            type_id,
            time,
            difficulty,
            image,
            ingredients: convertedIngredients,
            instructions: convertedInstructions
        })

        const newRecipe = await knex("recipes").where("id",newRecipeId).first();
        res.status(201).json(newRecipe);
    } catch(e) {
        console.log(e);
        res.status(500).json({ message: "Can't create new recipe" });
    }
})

// PUT /recipes/:id
router.put('/recipes/:id', async(req,res) => {
    const {
        name,
        user_id,
        type_id,
        time,
        difficulty,
        image,
        ingredients,
        instructions
    } = req.body;
    const recipeId = req.params.id;

    //Convert ingredients and instructions
    const convertedIngredients = JSON.stringify(ingredients)
    const convertedInstructions = JSON.stringify(instructions)

    //Validate of no missing fields
    if (!name || !user_id || !type_id || !time || !difficulty || !image || !ingredients || !instructions ) {
        return res.status(400).json({ message: "All fields are required." });
    }

    //Validate user id
    const foundUser = await knex('users')
    .where("id", user_id).first()

    if(!foundUser) {
        return res.status(400).json({ message: `There is no user with the ID of ${user_id}` });
    }

    //Validate type of recipe
    const foundType = await knex('types')
    .where("id", type_id).first();

    if(!foundType) {
        return res.status(400).json({ message: `There is no recipe type with the ID of ${foundType.name}` });
    }

    //Edit recipe
    try{
        const recipe = await knex('recipes').where("id", recipeId).first();

        if(!recipe) {
            return res.status(404).json({ message: "Recipe not found to update" });
        } else {
            const update = await knex("recipes").where("id", recipeId).update({
                name,
                user_id,
                type_id,
                time,
                difficulty,
                image,
                ingredients: convertedIngredients,
                instructions: convertedInstructions
            })

            const recipe = await knex('recipes').where("id", recipeId).first();
            res.status(200).json({message: "Recipe updated successfully.", recipe});
        }
    } catch(e) {
        res.status(500).json({message: "Can't updating recipe."})
    }
 
})
export default router;