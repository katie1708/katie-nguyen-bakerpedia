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
                setFilteredList(recipes)
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
    },[recipeTypes]);

    //Applying filter to the recipes list
    const [filteredList,setFilteredList] = useState([]);
    
    //Type filter
    const [typeValue,setTypeValue] = useState('no type');

    const handleTypeFilter = (e) => {
        setTypeValue(e.target.value)
            
        if(e.target.value == 'no type' && difficultyValue == 'no level') {
            setFilteredList(recipeList)
        } else if (e.target.value == 'no type' && difficultyValue !== 'no level') {
            const filteredList = recipeList.filter((recipe) => recipe.difficulty == difficultyValue)
            setFilteredList(filteredList)
        } else if (e.target.value !== 'no type' && difficultyValue == 'no level') {
            const filteredType = recipeTypes.find((type) => type.name === e.target.value)
            const filteredList = recipeList.filter((recipe) => recipe.type_id == filteredType.id)
            setFilteredList(filteredList)
        } else {
            const filteredType = recipeTypes.find((type) => type.name === e.target.value)
            const filteredList = recipeList.filter((recipe) => recipe.difficulty == difficultyValue && recipe.type_id == filteredType.id)
            setFilteredList(filteredList)
        }
    }

    //Difficulty filter
    const [difficultyValue,setDifficultyValue] = useState('no level');

    const handleDifficultyFilter = (e) => {
        setDifficultyValue(e.target.value)
            
        if(e.target.value == 'no level' && typeValue == 'no type') {
            setFilteredList(recipeList)
        } else if (e.target.value !== 'no level' && typeValue == 'no type') {
            const filteredList = recipeList.filter((recipe) => recipe.difficulty == e.target.value)
            setFilteredList(filteredList)
        } else if(e.target.value == 'no level' && typeValue !== 'no type' ) {
            const filteredType = recipeTypes.find((type) => type.name == typeValue)
            const filteredList = recipeList.filter((recipe) => recipe.type_id == filteredType.id)
            setFilteredList(filteredList)
        } else {
            const filteredType = recipeTypes.find((type) => type.name == typeValue)
            const filteredList = recipeList.filter((recipe) => recipe.difficulty == e.target.value && recipe.type_id == filteredType.id)
            setFilteredList(filteredList)
        }
    }

    //Search function
    const [searchText,setSearchText] = useState("");

    const handleSearchChange = (e) => {
        setSearchText(e.target.value);
    }

    const handleSearch = (e) => {
        e.preventDefault();
        
        if(searchText == "") {
            setFilteredList(recipeList)
        } else {
            const filteredList = recipeList.filter((recipe) => recipe.name.toLowerCase().includes(searchText));
            setFilteredList(filteredList)
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
                            onChange={handleTypeFilter}
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
                            value={difficultyValue}
                            onChange={handleDifficultyFilter}
                        >
                            <option value="no level">Difficulty level</option>
                            <option value="Easy">Easy</option>
                            <option value="Medium">Medium</option>
                            <option value="Hard">Hard</option>
                        </select>
                    </div>
                </form>
                <form className='recipes__search' onSubmit={handleSearch}>
                    <div className='recipes__search-box'>
                        <img className='recipes__search-icon' src={search} />
                        <input 
                            className='recipes__search-input' 
                            type="search" 
                            placeholder="Search for recipe"
                            value={searchText}
                            onChange={handleSearchChange}
                            >
                        </input>
                    </div>
                    <button className='recipes__search-button'>Search</button>
                </form>
            </div>
            
            <div className='recipes__list'>
                { (filteredList.length !== 0) ? 
                (filteredList.map((recipe) => (
                    <RecipeCard key={recipe.id} id={recipe.id} recipe={recipe} type={recipeTypes.find((type) => type.id === recipe.type_id)}/>
                ))) : (<p className='recipes__list--empty'>No recipe found</p>)
                }
            </div>
        </div>
    )
}