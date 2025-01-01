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

export default router;