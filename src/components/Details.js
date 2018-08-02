import React, { Component } from 'react';

import pokeapi from '../pokeapi';

import Image from './Image';


function makeEvolutionList(chain, list = []){
    // recursive function that creates the evolution list from the nested json
    if ( chain.evolves_to.length > 0){
        let line = (<li key={chain.species.name}>{chain.species.name} evolves into {chain.evolves_to[0].species.name}</li>);
        list.push(line);
        return makeEvolutionList(chain.evolves_to[0], list);
    }else{
        return list;
    }
}

function Evolutions({evolutionChain}){
    if ( ! evolutionChain ){
        return (<p>Loading...</p>);

    }else{
        let evolutionsList = makeEvolutionList( evolutionChain.chain );

        return (
            <ul className="evolutions">{evolutionsList}</ul>
        );
    }
}

function Info({pokemon, evolutionChain}){
    if ( pokemon.id === null ){
        return  (<p>Loading...</p>);
    }else{
        let types = pokemon.types.map( type => {
            return (
                <li key={type.type.name}>{type.type.name}</li>
            );
        });

        return (
            <div className="row">
              <div className="col-3">
                <Image name={pokemon.name} />
              </div>
              <div className="col-9">
                <ul>
                  <li><strong>ID:</strong> {pokemon.id}</li>
                  <li><strong>Types:</strong>
                    <ul className="types">{types}</ul>
                  </li>
                  <li><strong>Evolutions:</strong>
                    <Evolutions evolutionChain={evolutionChain} />
                  </li>
                </ul>
              </div>
            </div>
        );
    }
}

function getEvolutionChain(pokemon, callback){
    pokeapi.getPokemonSpeciesByName(pokemon.name).then((response) => {
        pokeapi.resource(response.evolution_chain.url).then((response) => {
            callback(response);
        }).catch((err) => {
            console.error("Couldn't load pokemon evolution chain :(");
        });;
    }).catch((err) => {
        console.error("Couldn't load pokemon species :(");
    });;
}

class Details extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pokemon: {
                id: null,
                name: props.params.name
            },
            evolutionChain: null,
        };
    }

    componentDidMount(){
        // get the initial list of pokemon for the app
        pokeapi.getPokemonByName(this.props.params.name)
            .then((response) => {
                this.setState({pokemon: response} );
                getEvolutionChain(response, (response) => {

                    this.setState({evolutionChain: response});
                });
            }).catch((err) => {
                console.error("Couldn't load pokemon list from poke api :(");
            });;
    }

    render() {

        return (
            <div className="details row">
              <div className="box col-6 pull-3">
                <div className="row">
                  <div className="col-12">
                    <h2>{this.state.pokemon.name}</h2>
                  </div>
                </div>
                <Info pokemon={this.state.pokemon}
                      evolutionChain={this.state.evolutionChain}/>
              </div>
            </div>

        );
    }
}

export default Details;
