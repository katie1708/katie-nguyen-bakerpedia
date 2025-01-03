import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);
import express from "express";


const router = express.Router();

//GET /recipes/:id/records to get all the baking records of a single recipe
router.get('/recipes/:id/records', async(req,res) => {
    const recipeId = req.params.id;

    try {
        //Fetch records of a single recipe
        const records = await knex('bakinghistory').select('*')
            .where('recipe_id',recipeId)

        res.status(200).json(records);

    } catch(e) {
        res.status(500).send("Unable to fetch baking history")
    }
})

// POST /records to create a baking record of a single recipe
router.post('/records', async(req,res) => {
    const {
        date,
        rating,
        notes,
        recipe_id
    } = req.body
    
    //Validate all fields
    if (!date || !rating || !notes || !recipe_id) {
        return res.status(400).json({ message: "All fields are required." });
    }

    //Validate recipe ID
    const foundRecipe = await knex('recipes')
    .where('id', recipe_id).first()

    if ( !foundRecipe ) {
        return res.status(400).json({ message: `There is no recipe with the ID of ${recipe_id}` });
    }

    //Insert new record
    try{
        const [recordId] = await knex('bakinghistory').insert({
            date,
            rating,
            notes,
            recipe_id
        });

        const newRecord = await knex('bakinghistory').where('id', recordId).first();

        res.status(201).json(newRecord);

    } catch(e) {
        res.status(500).send("Unable to add baking history")

    }
})

// DELETE /records/:id to delete a single record
router.delete('/records/:id', async(req,res) => {
    const recordId = req.params.id;

    try {
        // Delete item by Id
        const deletedRecord = await knex('bakinghistory').where({id: recordId}).del();
        if(deletedRecord){
            res.status(200).json({message:`Record with ID ${recordId} was deleted.`});
        } else {
            res.status(404).json({message: `Record not found, check the record id.`});
        }
    } catch(e) {
        res.status(500).json({message: 'Unable to delete the record.'})
    }
})

export default router;