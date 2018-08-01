import React, { Component } from 'react';

function List({list}){
    let pokeList = list.map( pokemon => {
        return (
            <li key={pokemon.name}>{pokemon.name}</li>
        );
    });

    return (
        <ul>{pokeList}</ul>
    );
}

export default List;
