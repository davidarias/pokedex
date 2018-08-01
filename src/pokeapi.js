import * as Pokedex from 'pokeapi-js-wrapper';

const pokeapi = new Pokedex.Pokedex({
    cache: true,
    protocol: 'https'
});

export default pokeapi;
