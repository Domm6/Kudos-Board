import React, { useState } from 'react';
import './BoardCard.css'

const LOGO = "https://icons.iconarchive.com/icons/designbolts/free-valentine-heart/256/Heart-icon.png";


function BoardCard ({title, deleteCard, likes, likeCard}) {
    return (
        <div className='board-card'>
            <div className='board-img'>
                <img src={LOGO} alt="" />
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