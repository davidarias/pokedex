import React, { Component } from 'react';

import pokeapi from '../pokeapi';

import loading from '../img/loading.gif';

class Image extends Component {

    constructor(props) {
        super(props);
        this.state = { sprites: null };
    }

    componentDidMount(){
        // get the initial list of pokemon for the app
        pokeapi.getPokemonByName(this.props.name)
            .then((response) => {
                this.setState({sprites: response.sprites} );
            }).catch((err) => {
                console.error("Couldn't load pokemon list from poke api :(");
            });;
    }

    render() {
        if ( this.state.sprites === null ){
            return (<img src={loading} alt="loading"/>);
        }

        if ( this.props.back === true){

            return (
                <img src={this.state.sprites.back_default} alt="this.props.params.name back" />
            );
        }

        return (
            <img src={this.state.sprites.front_default} alt="this.props.params.name" />
        );

    }
}

export default Image;
