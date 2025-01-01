import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);
import express from "express";


const router = express.Router();

// GET /recipes endpoint to get the list of all recipes
router.get('/types', async(req,res) => {
    try {
        const recipeTypes = await knex('types').select('*');

        res.status(200).json(recipeTypes);
    } catch(e) {
        res.status(500).send("Unable to fetch the list of recipe types")
    }
});

export default router;