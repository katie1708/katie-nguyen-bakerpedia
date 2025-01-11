import deleteIcon from "../../assets/icons/delete.svg";

export default function InstructionStep({instruction, handleRemoveInstruction}) {
    const {
        step,
        text
    } = instruction

    return (
        <div className="addrecipe__form__instructions__list-item">
            <p className="addrecipe__form__instructions__list-item__step">{step}</p>
            <p className="addrecipe__form__instructions__list-item__text">{text}</p>
            <p className="addrecipe__form__instructions__list-item__button" >
                <img src={deleteIcon} onClick={() => handleRemoveInstruction(instruction)}/>
            </p>
        </div>
    )
}