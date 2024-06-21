import React, { useState } from 'react';
import './KudoCard.css'
import { Link } from 'react-router-dom';


function KudoCard ({title, type, deleteKudo, id}) {
    return (
        <div className='kudo-card'>
            <div className='kc-img'>
                <img src={`https://picsum.photos/200/300?${id}`} alt="" />
            </div>
            <div className='kc-title'>
                <h3>{title}</h3>
            </div>
            <div className='kc-type'>
                <p>{type}</p>
            </div>
            <div className='kc-actions'>
                <Link to={`/boards/${id}`} className='view-button'>
                    View
                </Link>
                <button type="button" className='kc-delete-button' onClick={() => deleteKudo()}>Delete Board</button>
            </div>
        </div>
    )
}

export default KudoCard