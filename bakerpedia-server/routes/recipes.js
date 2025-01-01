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

export default router;