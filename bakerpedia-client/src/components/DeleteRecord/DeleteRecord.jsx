import axios from 'axios';
import './DeleteRecord.scss';
import StarRating from '../StarRating/StarRating';

export default function DeleteRecord(props) {
    //Delete modal
    const modalState = props.toggle;
    const action = props.action;
    
    //Record details
    const record=props.record;
    
    //Date formatter
    const specFormat = {
        year:"numeric", 
        month:"long", 
        day:"2-digit"
    };

    //Delete record
    const baseURL = import.meta.env.VITE_API_URL;
    
    const deleteRecord = async(recordId) => {
        try {
            await axios.delete(`${baseURL}/records/${recordId}`);
        } catch(e) {
            console.log(e)
        }
    }

    return (
        <section className={`delete-container ${modalState ? 'delete-container--open' : ''}`}>
            <div className='delete-active'>
                <h2 className='delete-active__question'>Delete this record?</h2>
                <div className='delete-active__content'>
                    <p className='details__full-record__item--date'>{new Date(record.date).toLocaleDateString('en-US',specFormat)}</p>
                    <StarRating rating={record.rating}/>
                    <p className='details__full-record__item--notes'>{record.notes}</p>
                </div>
                <div className='delete-active__button'>
                    <button className='delete-active__button--delete' onClick={() => {action(); deleteRecord(record.id);}}>Delete</button>
                    <button className='delete-active__button--cancel' onClick={action}>Cancel</button>
                </div>
            </div>
        </section>
      
    );
}