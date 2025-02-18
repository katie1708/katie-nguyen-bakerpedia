import { Link } from 'react-router-dom';

export default function Details({recipe}) {
    const {
        id,
        name,
        time,
        difficulty,
        ingredients,
        instructions,
        type_name,
        type_icon 
    } = recipe

    if (ingredients && instructions) {
        return(
            <div className="details__full-recipe">
                <div className="details__full-recipe__title">
                    <h2>Recipe</h2>
                    <Link to={`/edit-recipe/${id}`}>Edit</Link>
                </div>
                <div className="details__full-recipe__content">
                    <div className="details__full-recipe__content--block">
                        <p className="details__full-recipe__content--title">Ingredients</p>
                        <ul className="details__full-recipe__content--list-ingredients">
                            {ingredients.map((item,index) => (
                                <li className="details__full-recipe__content--list-item" key={index}>{`${item.quantity} ${ (item.unit !== null) ? item.unit : "" } ${item.name}`}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="details__full-recipe__content--block">
                        <p className="details__full-recipe__content--title">Instructions</p>
                        <ul className="details__full-recipe__content--list-instructions">
                            {instructions.map((step) => (
                                <li className="details__full-recipe__content--list-item instructions" key={step.step}>
                                    <p className="instructions__step">{step.step}</p>
                                    <p className="instructions__text">{step.text}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        )
    } 
}