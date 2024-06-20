import React, { useState, useEffect } from 'react';
import KudoCard from './KudoCard';
import "./KudoList.css";

function KudoList({kudos = [], searchTerm = "", filter="All", deleteKudo}) {
    const filteredKudos = kudos.filter(kudo => 
        (filter === "All" || kudo.kudo === filter) &&
        kudo.title && kudo.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return (
        <div className='kudo-list'>
            {filteredKudos.map(kudo => (
                <KudoCard key={kudo.id} title={kudo.title} type={kudo.kudo} deleteKudo={() => deleteKudo(kudo.id)}/>
            ))}
        </div>
    );
}

export default KudoList;