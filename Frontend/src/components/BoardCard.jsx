import React, { useState } from 'react';
import './BoardCard.css'

const LOGO = "https://www.svgrepo.com/show/340721/no-image.svg";


function BoardCard ({title, deleteCard, likes, likeCard, gifUrl}) {
    return (
        <div className='board-card'>
            <div className='board-img'>
                <img src={gifUrl || LOGO} alt="" />
            </div>
            <div className='bc-title'>
                <h3>{title}</h3>
            </div>
            <div className='bc-actions'>
                <button type="button" className='bc-like-button' onClick={() => likeCard()}>Like Card: {likes}</button>
                <button type="button" className='bc-delete-button' onClick={() => deleteCard()}>Delete Card</button>
            </div>
        </div>
    )
}

export default BoardCard