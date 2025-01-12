import { useLocation,useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import IngredientItem from "../../components/IngredientItem/IngredientItem.jsx";
import InstructionStep from "../../components/InstructionStep/InstructionStep.jsx";

export default function EditRecipe() {
    const navigate = useNavigate();
    const baseURL = import.meta.env.VITE_API_URL;

    //Fetch type first
    const [typeList, setTypeList] = useState([]);
        
    useEffect(() => {
        try {
            const fetchTypeList = async() => {
                const res = await axios.get(`${baseURL}/types`);
                setTypeList(res.data);
            }
            fetchTypeList();
        } catch(e) {
            console.log(e)
        }
    });

    //Fetch recipe and handle original form data
    const { recipeId } = useParams(); 
    const [recipe, setRecipe] = useState("")
    
    const [recipeName, setRecipeName] = useState("");
    const [recipeTime, setRecipeTime] = useState("");
    const [recipeType,setRecipeType] = useState("");
    const [recipeLevel,setRecipeLevel] = useState("");  
    const [ingredients,setIngredients] = useState([]);
    const [instructions,setInstructions] = useState([]);

    useEffect(() => {
        const getRecipe = async () => {
            const recipeData = await axios.get(`${baseURL}/recipes/${recipeId}`)
            
            setRecipe(recipeData.data)
            setRecipeName(recipeData.data.name)
            setRecipeTime(recipeData.data.time)
            setRecipeType(recipeData.data.type_name)
            setRecipeLevel(recipeData.data.difficulty)
            setIngredients(recipeData.data.ingredients)
            setInstructions(recipeData.data.instructions)
        }
        getRecipe();
    },[])


    //Handle data change
    const handleRecipeName = (e) => {
        setRecipeName(e.target.value)
    }

    const handleRecipeTime = (e) => {
        setRecipeTime(e.target.value)
    }

    const handleRecipeType = (e) => {
        setRecipeType(e.target.value);
    }

    const handleRecipeLevel = (e) => {
        setRecipeLevel(e.target.value);
    }
    
    //Handle a single ingredient
    const [ingredientQuantiy, setIngredientQuantiy] = useState("");
    const [ingredientUnit, setIngredientUnit] = useState("");
    const [ingredientName, setIngredientName] = useState("");
    
    const handleIngredientQuantiy = (e) => {
        setIngredientQuantiy(e.target.value)
    }

    const handleIngredientUnit = (e) => {
        setIngredientUnit(e.target.value)
    }

    const handleIngredientName = (e) => {
        setIngredientName(e.target.value)
    }

    const handleAddIngredient = (e) => {
        e.preventDefault();

        const ingredient = {
            name: ingredientName,
            unit: ingredientUnit,
            quantity: ingredientQuantiy
        }

        const ingredientList = ingredients.concat(ingredient);
        setIngredients(ingredientList);
        setIngredientQuantiy("")
        setIngredientUnit("")
        setIngredientName("")
    }

    //Handle remove a single ingredient
    const handleRemoveIngredient = (ingredient) => {
        const ingredientList = ingredients.filter((item) => (item.name !== ingredient.name || item.quantity !==ingredient.quantity || item.unit !== ingredient.unit));
        setIngredients(ingredientList);
    }

    //Handle a single instruction
    const [instructionStep, setInstructionStep] = useState("");
    const [instructionText, setInstructionText] = useState("");

    const handleInstructionStep = (e) => {
        setInstructionStep(e.target.value)
    }

    const handleInstructionText = (e) => {
        setInstructionText(e.target.value)
    }

    const handleAddInstruction = (e) => {
        e.preventDefault();

        const instruction = {
            step: instructionStep,
            text: instructionText
        }

        const instructionSteps = instructions.concat(instruction);
        const sortedInstructions = instructionSteps.sort((a,b) => a.step - b.step)
        setInstructions(sortedInstructions);
        setInstructionStep("")
        setInstructionText("")
    }

    //Handle remove a single instruction
    const handleRemoveInstruction = (instruction) => {
        const instructionSteps = instructions.filter((step) => step.step !== instruction.step);
        const sortedInstructions = instructionSteps.sort((a,b) => a.step - b.step)
        setInstructions(sortedInstructions);
    }

    //Construct new recipe and POST /recipes to database
    const handleSubmit= async(e) => {
        e.preventDefault();

        const type = typeList.find((type) => type.name == recipeType);
        
        const updatedRecipe = {
            name: recipeName,
            user_id: recipe.user_id,
            type_id: type.id,
            time: recipeTime,
            difficulty: recipeLevel,
            image: "http://localhost:8080/images/blueberrymuffins.jpg",
            ingredients: ingredients,
            instructions: instructions
        }

        try{
            const res = await axios.put(`${baseURL}/recipes/${recipe.id}`,updatedRecipe);
            alert("The recipe has been updated successfully.");
        } catch (error){
            alert(error.response.data.message);
        }

        navigate(`/recipes/${recipe.id}`)
    }
    
    if(ingredients && instructions) {
        return(
            <div className="addrecipe">
                <h1>Edit recipe</h1>
                <form className="addrecipe__form" onSubmit={handleSubmit}>
                    <div className="addrecipe__form__info">
                        <h2>Recipe information</h2>
                        <div>
                            <label htmlFor="recipe_name">Recipe name</label>
                            <input 
                            type="text" 
                            name="recipe_name"
                            value={recipeName}
                            onChange={handleRecipeName}
                            ></input>
                        </div>
                        <div>
                            <label htmlFor="recipe_time">Estimated time (minutes)</label>
                            <input 
                            type="number" 
                            name="recipe_time"
                            value={recipeTime}
                            onChange={handleRecipeTime}
                            ></input>
                        </div>
                        <div>
                            <label htmlFor="recipe_type">Recipe type</label>
                            <select 
                            name="recipe_type"
                            value={recipeType}
                            onChange={handleRecipeType}
                            > 
                                <option value=""></option>
                                {typeList.map((type) => (
                                    <option key={type.id} value={type.name}>{type.name}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="recipe_level">Difficulty level</label>
                            <select 
                            name="recipe_level"
                            value={recipeLevel}
                            onChange={handleRecipeLevel}
                            > 
                                <option value=""></option>
                                <option value="Easy">Easy</option>
                                <option value="Medium">Medium</option>
                                <option value="Hard">Hard</option>
                            </select>
                        </div>
                    </div>
                    <div className="addrecipe__form__details">
                        <div className="addrecipe__form__ingredients">
                            <h2>Ingredients</h2>
                            <div className="addrecipe__form__ingredients-addform">
                                <div className="addrecipe__form__ingredients-addform--quantity">
                                    <label htmlFor="ing_quantity">Quantity</label>
                                    <input 
                                    type="text" 
                                    name="ing_quantity"
                                    value={ingredientQuantiy}
                                    onChange={handleIngredientQuantiy}
                                    ></input>
                                </div>
                                <div className="addrecipe__form__ingredients-addform--unit">
                                    <label htmlFor="ing_unit">Unit</label>
                                    <select 
                                    name="ing_unit"
                                    value={ingredientUnit}
                                    onChange={handleIngredientUnit}
                                    >
                                        <option value="no unit"></option>
                                        <option value="cup">cup</option>
                                        <option value="gram">gram</option>
                                        <option value="tsp">tsp</option>
                                        <option value="tbsp">tbsp</option>
                                        <option value="ml">ml</option>
                                    </select>
                                </div>
                                <div className="addrecipe__form__ingredients-addform--name">
                                    <label htmlFor="ing_name">Ingredient</label>
                                    <input 
                                    type="text" 
                                    name="ing_name"
                                    value={ingredientName}
                                    onChange={handleIngredientName}
                                    ></input>
                                </div>
                                <button onClick={handleAddIngredient}>Add</button>
                            </div>
                            <div className="addrecipe__form__ingredients__list">
                                {ingredients.map((ingredient) => (
                                    <IngredientItem key={ingredient.name} ingredient={ingredient} handleRemoveIngredient={handleRemoveIngredient}/>
                                ))}
                            </div>
                        </div>
                        <div className="addrecipe__form__instructions">
                            <h2>Instructions</h2>
                            <div className="addrecipe__form__instructions-addform">
                                <div className="addrecipe__form__instructions-addform--step">
                                    <label htmlFor="instruction_step">Step</label>
                                    <input 
                                    type="number" 
                                    name="instruction_step"
                                    value={instructionStep}
                                    onChange={handleInstructionStep}
                                    ></input>
                                </div>
                                <div className="addrecipe__form__instructions-addform--text">
                                    <label htmlFor="instruction_text">Ingredient</label>
                                    <input 
                                    type="text" 
                                    name="instruction_text"
                                    value={instructionText}
                                    onChange={handleInstructionText}
                                    ></input>
                                </div>
                                <button onClick={handleAddInstruction}>Add</button>
                            </div>
                            <div className="addrecipe__form__instructions__list">
                                {instructions.map((instruction) => (
                                    <InstructionStep key={instruction.step} instruction={instruction} handleRemoveInstruction={handleRemoveInstruction}/>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="addrecipe__form__button">
                        <button type="button" className="addrecipe__form__button--cancel" onClick={() => navigate(`/recipes/${recipe.id}`)}>Cancel</button>
                        <button className="addrecipe__form__button--save">Save Recipe</button>
                    </div>
                </form>
            </div>
        )
    }
    
}