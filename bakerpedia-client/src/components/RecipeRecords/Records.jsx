import { Link } from 'react-router-dom';
import StarRating from '../StarRating/StarRating';
import deleteicon from "../../assets/icons/delete.svg"
import { useState } from 'react';
import DeleteRecord from '../DeleteRecord/DeleteRecord';
import AddRecord from '../AddRecord/AddRecord';

export default function Records(props) {
    const records = props.records

    //Date formatter
    const specFormat = {
        year:"numeric", 
        month:"long", 
        day:"2-digit"
    };

    //Open Add modal
    const [addState, setAddState] = useState(false);

    function openAddModal() {
        setAddState(!addState);
    }

    // Open Delete modal
    const [deleteState, setDeleteState] = useState(false);

    function openDeleteModal() {
        setDeleteState(!deleteState);
    };

    return (
        <div className='details__full-record'>
            <div className='details__full-record__title'>
                <h2>Baking History</h2>
                <Link onClick={openAddModal}>Add</Link>
            </div>
            { (records.length == 0) ? (
                <p className='details__full-record__content--blank'>No baking history yet</p>
            ) : (
                <div className='details__full-record__content'>
                    {records.map((record) => (
                        <div className='details__full-record__item' key={record.id}>
                            <div>
                                <p className='details__full-record__item--date'>{new Date(record.date).toLocaleDateString('en-US',specFormat)}</p>
                                <StarRating rating={record.rating}/>
                                <p className='details__full-record__item--notes'>{record.notes}</p>
                            </div>
                            <button onClick={openDeleteModal}>
                                <img src={deleteicon}/>
                            </button>
                            <DeleteRecord
                                toggle={deleteState} 
                                record={record}
                                action={openDeleteModal}
                            />  
                        </div>
                    ))}
                </div>    
            )}
            <AddRecord 
                toggle={addState} 
                recipeId={props.recipeId}
                action={openAddModal}
            />      
        </div>
    )
}