import React, { Component } from 'react';

import pokeapi from '../pokeapi';

class List extends Component {

    constructor(props) {
        super(props);
        this.state = { list: [] };
    }

    componentDidMount(){
        // get the initial list of pokemon for the app
        pokeapi.getPokemonsList({limit: 50, offset: 0})
            .then((response) => {
                this.setState({list: response.results} );
            }).catch((err) => {
                console.error("Couldn't load pokemon list from poke api :(");
            });;
    }

    render() {
        let pokeList = this.state.list.map( pokemon => {
            return (
                <li key={pokemon.name}>{pokemon.name}</li>
            );
        });

        return (
            <ul>{pokeList}</ul>
        );
    }
}

export default List;
