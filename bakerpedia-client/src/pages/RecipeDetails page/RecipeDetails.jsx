import axios from "axios";
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import clock from "../../assets/icons/clock.svg"
import level from "../../assets/icons/level.svg"
import { Link } from 'react-router-dom';
import Details from "../../components/RecipeDetails/Details";
import Records from "../../components/RecipeRecords/Records";
import "./RecipeDetails.scss"
import { useLocation } from "react-router-dom";
import {userAuth} from "../UserAuth.jsx";

export default function RecipeDetails() {
    //Authorize to see recipe details
    // const location = useLocation();
    // const userId = location.state;

    const auth = userAuth();
    const user = auth.user;

    //Fetch recipe
    const baseURL = import.meta.env.VITE_API_URL;
    const [recipe, setRecipe] = useState([]);
    const [records,setRecords] = useState([]);
    const {recipeId} = useParams();
    
    useEffect(() => {
        try{
            const fetchRecipe = async() => {
                const fetchedData = await axios.get(`${baseURL}/recipes/${recipeId}`);
                const fetchedRecipe = fetchedData.data;
                setRecipe(fetchedRecipe)
            }
            fetchRecipe()
        } catch(e) {
            console.log(e)
        }
    },[recipeId])

    const {
        id,
        name,
        user_id,
        time,
        difficulty,
        ingredients,
        instructions,
        type_name,
        type_icon 
    } = recipe

    //Fetch records
    useEffect(() => {
        try{
            const fetchRecords = async() => {
                const fetchedData = await axios.get(`${baseURL}/recipes/${recipeId}/records`);
                const fetchedRecords = fetchedData.data;
                setRecords(fetchedRecords)
            }
            fetchRecords()
        } catch(e) {
            console.log(e)
        }
    },[recipeId,records])
    
    if(user && user_id !== user.id) {
        return(
            <p className="details--unauthorized">You don't have access to this recipe</p>
        )
    } else {
        return(
            <div className="details">
                <div className="details__brief">
                    <h1 className="details__brief-name">{name}</h1>
                    <div className="details__brief-info">
                        <div>
                            <img src={type_icon}/>
                            <p>{type_name}</p>
                        </div>
                        <div>
                            <img src={clock}/>
                            <p>{`${time} minutes`}</p>
                        </div>
                        <div>
                            <img src={level}/>
                            <p>{difficulty}</p>
                        </div>
                    </div>
                </div>
                <div className="details__full">
                    <Details recipe={recipe}/>
                    <Records records={records} recipeId={recipe.id}/>
                </div>
            </div>
        )
    } 
}