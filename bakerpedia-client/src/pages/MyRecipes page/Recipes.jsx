import axios from 'axios';
import React, { useEffect, useState } from 'react';
import search from "../../assets/icons/search.svg"
import RecipeCard from '../../components/RecipeCard/RecipeCard';
import "./Recipes.scss"

export default function Recipes() {
    const baseURL = import.meta.env.VITE_API_URL;

    //Fetch the recipe list
    const [recipeList, setRecipeList] = useState([]);

    useEffect(() => {
        try {
            const fetchRecipes = async() => {
                const recipeData = await axios.get(`${baseURL}/recipes`);
                const recipes = recipeData.data;
                setRecipeList(recipes);
            }
            fetchRecipes();
        } catch(e) {
            console.log(e)
        }
    },[]);

    //Fetch the recipe type list
    const [recipeTypes, setRecipeTypes] = useState([]);

    useEffect(() => {
        try {
            const fetchTypes = async() => {
                const typeData = await axios.get(`${baseURL}/types`);
                setRecipeTypes(typeData.data);
            }
            fetchTypes();
        } catch(e) {
            console.log(e)
        }
    },[]);

    //Applying filter to the recipes list
    const [typeValue,setTypeValue] = useState('no type');

    const handleTypeChange = (e) => {
        if (e.target.value == 'no type') {
            setRecipeList(recipeList)
        } else {
            setTypeValue(e.target.value)
            const filteredType = recipeTypes.find((type) => type.name === e.target.value)
            const filteredList = recipeList.filter((recipe) => recipe.type_id == filteredType.id)
           //the problem is after the first filter, the recipe list is not reset to full list
            setRecipeList(filteredList)
            if (e.target.value == 'no type') {
                fetchRecipes();
            }
        }
    }

    return(
        <div className='recipes'>
            <h1>My Recipes</h1>
            <div className='recipes__function'>
                <form className='recipes__filter'>
                    <p>Filter by:</p>
                    <div>
                        <select
                            id="recipe_type"
                            name="recipe_type"
                            value={typeValue}
                            onChange={handleTypeChange}
                        >
                            <option value="no type">Recipe type</option>
                            {recipeTypes.map((type) => (
                                <option key={type.id} value={type.name}>
                                    {type.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <select
                            id="difficulty"
                            name="difficulty"
                            // value={"test"}
                            // onChange={something}
                        >
                            <option value="no level">Difficulty level</option>
                            <option value="easy">Easy</option>
                            <option value="medium">Medium</option>
                            <option value="hard">Hard</option>
                        </select>
                    </div>
                </form>
                <form className='recipes__search'>
                    <div className='recipes__search-box'>
                        <img className='recipes__search-icon' src={search} />
                        <input className='recipes__search-input' type="search" placeholder="Search for recipe">
                        </input>
                    </div>
                    <button className='recipes__search-button'>Search</button>
                </form>
            </div>
            
            <div className='recipes__list'>
                {recipeList
                // ?.filter((recipe) => recipe.type_id == filteredType.id)
                ?.map((recipe) => (
                    <RecipeCard key={recipe.id} id={recipe.id} recipe={recipe} type={recipeTypes.find((type) => type.id === recipe.type_id)}/>
                ))}
            </div>
        </div>
    )
}