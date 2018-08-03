import * as Pokedex from 'pokeapi-js-wrapper/dist';

const pokeapi = new Pokedex.Pokedex({
    cache: true,
    protocol: 'https'
});

export default pokeapi;
