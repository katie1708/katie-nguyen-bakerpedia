import deleteIcon from "../../assets/icons/delete.svg";

export default function IngredientItem({ingredient, handleRemoveIngredient}) {
    const {
        name,
        unit,
        quantity
    } = ingredient

    return (
        <div className="addrecipe__form__ingredients__list-item">
            <p className="addrecipe__form__ingredients__list-item__text">{`${quantity} ${ (unit !== null) ? unit : "" } ${name}`}</p>
            <p className="addrecipe__form__ingredients__list-item__button" onClick={() => handleRemoveIngredient(ingredient)}>
                <img src={deleteIcon}/>
            </p>
        </div>
    )
}