import React from 'react';
import KudoCard from './KudoCard';
import "./KudoList.css"

function KudoList() {
    return (
        <div className='kudo-list'>
            <KudoCard title="Happy Birthday Dominic" type="Celebration"></KudoCard>
        </div>
    )
}

export default KudoList