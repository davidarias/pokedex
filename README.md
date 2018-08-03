# Podedex

A Pokemon index webapp, made using React and [pokeapi](https://pokeapi.co/)

## Features

* List up to 50 pokemons
* Filter by name
* Pagination
* Local cache of resources to comply with the fair use policy of pokeapi ( provided by the library [pokeapi-js-wrapper](https://github.com/PokeAPI/pokeapi-js-wrapper) )


## Screenshot

![screenshot](https://raw.githubusercontent.com/davidarias/pokedex/master/screeshot.png)

## Build for production and launch a local server

```bash
npm install   # install dependecies
npm run build # build static web application

cd build && python -m SimpleHTTPServer 8000 # launch local server
```

## Development

```bash
npm install # install dependecies
npm start   # run deveploment server
```

## FAQ

* **Why no redux?** This is a very simple application, I think that the standard state management from react components is enough in this particular case.
* **Why no SCSS or less?** The design of the project is simple and minimalist intentionally, so following the "keep it simple" philosophy I thought it was better to just use plain css.

## License

This project is licensed under the MIT License. See the LICENSE file for details
