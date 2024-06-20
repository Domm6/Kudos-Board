import React, { useState, useEffect } from 'react';
import KudoCard from './KudoCard';
import "./KudoList.css";

function KudoList({kudos = [], searchTerm = ""}) {
    const filteredKudos = kudos.filter(kudo => 
        kudo.title && kudo.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return (
        <div className='kudo-list'>
            {filteredKudos.map(kudo => (
                <KudoCard key={kudo.id} title={kudo.title} type={kudo.kudo} />
            ))}
        </div>
    );
}

export default KudoList;