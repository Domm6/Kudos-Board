import React, { useState } from 'react';
import './KudoCard.css'

const LOGO = "https://icons.iconarchive.com/icons/designbolts/free-valentine-heart/256/Heart-icon.png";


function KudoCard ({title, type, deleteKudo}) {
    return (
        <div className='kudo-card'>
            <div className='kc-img'>
                <img src={LOGO} alt="" />
            </div>
            <div className='kc-title'>
                <h3>{title}</h3>
            </div>
            <div className='kc-type'>
                <p>{type}</p>
            </div>
            <div className='kc-actions'>
                <button type="button" className='kc-view-button'>View Board</button>
                <button type="button" className='kc-delete-button' onClick={() => deleteKudo()}>Delete Board</button>
            </div>
        </div>
    )
}

export default KudoCard