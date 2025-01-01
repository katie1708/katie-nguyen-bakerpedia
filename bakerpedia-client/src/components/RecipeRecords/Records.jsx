import { Link } from 'react-router-dom';
import StarRating from '../StarRating/StarRating';
import deleteicon from "../../assets/icons/delete.svg"

export default function Records(props) {
    const records = props.records

    //Date formatter
    const specFormat = {
        year:"numeric", 
        month:"long", 
        day:"2-digit"
    };

    // const date = new Date(records[1].date).toLocaleDateString();
        
    return (
        <div className='details__full-record'>
            <div className='details__full-record__title'>
                <h2>Baking History</h2>
                <Link to='/modal'>Add</Link>
            </div>
            <div className='details__full-record__content'>
                {records.map((record) => (
                    <div className='details__full-record__item' key={record.id}>
                        <div>
                            <p className='details__full-record__item--date'>{new Date(record.date).toLocaleDateString('en-US',specFormat)}</p>
                            <StarRating rating={record.rating}/>
                            <p className='details__full-record__item--notes'>{record.notes}</p>
                        </div>
                        <img src={deleteicon}/>
                    </div>
                ))}
            </div>            
        </div>
    )
}