import React, { Component } from 'react';

import pokeapi from '../pokeapi';

class Details extends Component {

    constructor(props) {
        super(props);
        this.state = { pokemon: {
            id: null,
            name: props.params.name
        } };
    }

    componentDidMount(){
        // get the initial list of pokemon for the app
        pokeapi.getPokemonByName(this.props.params.name)
            .then((response) => {
                this.setState({pokemon: response} );
            }).catch((err) => {
                console.error("Couldn't load pokemon list from poke api :(");
            });;
    }

    render() {
        return (<p>Details for pokemon {this.state.pokemon.name} id: {this.state.pokemon.id}</p>);
    }
}

export default Details;
