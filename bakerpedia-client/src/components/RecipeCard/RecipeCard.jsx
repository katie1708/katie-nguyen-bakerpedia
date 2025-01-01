import clock from "../../assets/icons/clock.svg"
import level from "../../assets/icons/level.svg"
import { Link } from 'react-router-dom';
import "../../pages/MyRecipes page/Recipes.scss"

export default function RecipeCard(props) {
    const {
        id,
        name,
        user_id,
        type_id,
        time,
        difficulty,
        image
    } = props.recipe;

    const type = props.type

    return(
        <article className='recipe__card'>
            <img className='recipe__card-image' src={image}/>
            <div className='recipe__card-info'>
                <div>
                    <img src={clock}/>
                    <p>{`${time} minutes`}</p>
                </div>
                <div>
                    <img src={level}/>
                    <p>{difficulty}</p>
                </div>
            </div>
            <div className='recipe__card-type'>
                <img src={type.icon}/>
                <p>{type.name}</p>
            </div>
            <p className='recipe__card-name'>{name}</p>
            <Link className='recipe__card-link' to={`/recipes/${id}`}>View Recipe</Link>
        </article>
    )
}