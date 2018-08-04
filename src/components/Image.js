import React, { Component } from 'react';

import pokeapi from '../pokeapi';

import loading from '../img/loading.gif';

class Image extends Component {

    constructor(props) {
        super(props);
        this.state = { sprites: null };
        this._mounted = false;
    }

    fetchState(props){
        // get the initial list of pokemon for the app
        pokeapi.getPokemonByName(props.name)
            .then((response) => {

                // This component can be unmounted before the details are
                // fetched, failing to set state
                // ( i.e. changing page before loading all images)
                if ( this._mounted )
                    this.setState({sprites: response.sprites} );

            }).catch((err) => {
                console.error("Couldn't load pokemon list from poke api :(");
            });;
    }

    componentDidMount(){
        this._mounted = true;
        this.fetchState.call(this, this.props);
    }

    componentWillUnmount(){
        this._mounted = false;
    }

    componentWillReceiveProps(nextProps) {
        if ( nextProps.name !== this.props.name){

            this.fetchState.call(this, nextProps);
        }
    }

    render() {
        if ( this.state.sprites === null ){
            return (<img src={loading} alt="loading"/>);
        }

        if ( this.props.back === true){

            return (
                <img src={this.state.sprites.back_default} alt="pokemon back" />
            );
        }

        return (
            <img src={this.state.sprites.front_default} alt="pokemon" />
        );

    }
}

export default Image;
