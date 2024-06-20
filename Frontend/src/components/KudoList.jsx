import React, { useState, useEffect } from 'react';
import KudoCard from './KudoCard';
import Header from './Header';
import "./KudoList.css";

function KudoList({kudos = [], searchTerm = "", filter="All", deleteKudo, onOpen, setSearchTerm, setFilter}) {
    const filteredKudos = kudos.filter(kudo => 
        (filter === "All" || kudo.kudo === filter) &&
        kudo.title && kudo.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return (
        <>
            <Header onOpen={onOpen} searchTerm={searchTerm} setSearchTerm={setSearchTerm} setFilter={setFilter}></Header>
            <div className='kudo-list'>
                {filteredKudos.map(kudo => (
                    <KudoCard key={kudo.id} id={kudo.id} title={kudo.title} type={kudo.kudo} deleteKudo={() => deleteKudo(kudo.id)}/>
                ))}
            </div>
        </>
    );
}

export default KudoList;