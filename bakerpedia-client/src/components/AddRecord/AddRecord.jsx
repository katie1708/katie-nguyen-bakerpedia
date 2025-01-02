import axios from 'axios';
import './AddRecord.scss';
import { useState } from 'react';
import { FaStar } from "react-icons/fa";


export default function AddRecord(props) {
    const baseURL = import.meta.env.VITE_API_URL;

    //Handle addrecord modal
    const modalState = props.toggle;
    const action = props.action;

    //Handle date
    const today = new Date().toLocaleDateString('en-CA');
   
    const [date, setDate] = useState(today);

    const handleDate = (e) => {
        setDate(e.target.value)
    }

    //Handle star rating in the form
    const [rating, setRating] = useState(0)
    const [hoverValue, setHoverValue] = useState(undefined)

    const colors= {
        brown: "#A64F21",
        gray: "#EAEAEB"
    }
    const stars = Array(5).fill(0)


    const handleMouseOverStar = value => {
        setHoverValue(value)
    };
    
    const handleMouseLeaveStar = () => {
        setHoverValue(undefined)
    }
    
    const handleClickStar = value => {
        setRating(value)
    };
    
    const handleRating = (e) => {
        setRating(e.target.value)
    }

    //Handle notes
    const [notes,setNotes] = useState("");

    const handleNotes = (e) => {
        setNotes(e.target.value)
    }

    //Add new record
    const recipeId=props.recipeId;

    const handleSubmit = async(e) => {
        e.preventDefault();

        const newRecord = {
            date: date,
            rating: rating,
            notes: notes,
            recipe_id: recipeId
        }

        try{
            const res = await axios.post(`${baseURL}records`,newRecord);
            alert("The item has been created successfully.");
            console.log(res);
        }catch (e){
            alert(e.response.data.message);
        }

        setDate(today);
        setHoverValue(0);
        setRating(0);
        setNotes("");
    }

    return (
        <section className={`addrecord-container ${modalState ? 'addrecord-container--open' : ''}`}>
            <div className='addrecord-active'>
                <p className='addrecord-active__title'>Add baking history</p>
                <form id="add__form" className='addrecord-active__form' onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="add_date">Date</label>
                        <input 
                            type="date" 
                            id="add_date" 
                            name="add_date" 
                            value={date}
                            min="01/02/2025" 
                            max="31/12/2025" 
                            onChange={handleDate}
                        />
                    </div>
                    <div>
                        <label>Rating</label>
                        <div>
                            {stars.map((_, index) => {
                                return (
                                    <FaStar
                                        key={index}
                                        size={24}
                                        value={rating}
                                        onChange={handleRating}
                                        fill={((hoverValue || rating) > index) ? colors.brown : colors.gray}
                                        onClick={() => handleClickStar(index + 1)}
                                        onMouseOver={() => handleMouseOverStar(index + 1)}
                                        onMouseLeave={() => handleMouseLeaveStar}
                                    />
                                )
                            })}
                        </div>
                        
                    </div>
                    <div>
                        <label htmlFor='add_notes'>Notes</label>
                        <input 
                            type="text"
                            id="add_notes" 
                            name="add_notes" 
                            value={notes}
                            onChange={handleNotes}
                        />
                    </div>
                </form>
                <div className='addrecord-active__button'>
                    <button className='addrecord-active__button--add' onClick={() => {action();}} form="add__form">Add baking history</button>
                    <button className='addrecord-active__button--cancel' onClick={() => {action();setHoverValue(0);setRating(0);}}>Cancel</button>
                </div>
            </div>
        </section>
      
    );
}