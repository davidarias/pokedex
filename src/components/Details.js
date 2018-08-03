import React, { Component } from 'react';

import pokeapi from '../pokeapi';

import Image from './Image';

import loading from '../img/loading.gif';


function makeEvolutionList(chain, list = []){
    // recursive function that creates the evolution list from the nested json
    if ( chain.evolves_to.length > 0){
        let line = (<li key={chain.species.name}>{chain.species.name} evolves into {chain.evolves_to[0].species.name}</li>);
        list.push(line);
        return makeEvolutionList(chain.evolves_to[0], list);
    }

    return list;
}

function Evolutions({evolutionChain}){
    if ( ! evolutionChain ){
        return (<img className="evolutions-loading" src={loading} alt="loading"/>);
    }

    let evolutionsList = makeEvolutionList( evolutionChain.chain );

    return (
        <ul>{evolutionsList}</ul>
    );

}

function FlavoredText({species}){
    if (species){
        let flavoredText = species.flavor_text_entries.find( textEntry => {
            return textEntry.language.name === 'en';
        });
        return <p>{flavoredText.flavor_text}</p>;
    }
    return (<img src={loading} alt="loading"/>);
}


function DetailItem({name, value}){
    return (
        <div className="row">
          <div className="col-3">
            <strong>
              {name}
            </strong>
          </div>
          <div className="col-9">
            {value}
          </div>
        </div>
    );
}

function Info({pokemon, species, evolutionChain}){
    if ( pokemon.id === null ){
        return (<img src={loading} alt="loading"/>);
    }

    let types =(
        <ul>
          {pokemon.types.map( type => {
              return (
                  <li key={type.type.name}>{type.type.name}</li>
              );
          })}
        </ul>

    );

    let evolutions = <Evolutions evolutionChain={evolutionChain} />;

    return (
        <div className="row">
          <div className="col-3">
            <Image name={pokemon.name} />
          </div>
          <div className="col-9">

            <ul>
              <li><DetailItem name={"ID:"} value={pokemon.id} /></li>
              <li><DetailItem name={"Description:"} value={FlavoredText({species})} /></li>
              <li><DetailItem name={"Type(s):"} value={types} /></li>
              <li><DetailItem name={"Evolutions:"} value={evolutions} /></li>
            </ul>
          </div>
        </div>
    );

}

class Details extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pokemon: {
                id: null,
                name: props.params.name
            },
            species: null,
            evolutionChain: null,
        };
    }

    componentDidMount(){
        // get the initial list of pokemon for the app
        pokeapi.getPokemonByName(this.props.params.name).then((response) => {

            this.setState({pokemon: response} );

            pokeapi.getPokemonSpeciesByName(response.name).then((response) => {

                this.setState({species: response });

                pokeapi.resource(response.evolution_chain.url).then((response) => {

                    this.setState({evolutionChain: response});

                }).catch((err) => {
                    console.error("Couldn't load pokemon evolution chain :(");
                });;

            }).catch((err) => {
                console.error("Couldn't load pokemon species :(");
            });;

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
                      species={this.state.species}
                      evolutionChain={this.state.evolutionChain}/>
              </div>
            </div>

        );
    }
}

export default Details;
