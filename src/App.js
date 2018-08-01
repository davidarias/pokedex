import React, { Component } from 'react';
import './App.css';

import List from './components/List';

import * as Pokedex from 'pokeapi-js-wrapper';

const P = new Pokedex.Pokedex({
    cache: true,
    protocol: 'https'
});

class App extends Component {


    constructor(props) {
        super(props);
        this.state = { list: [] };
    }

    componentDidMount(){
        // get the initial list of pokemon for the app
        P.getPokemonsList({limit: 50, offset: 0})
            .then((response) => {
                this.setState({list: response.results} );
            }).catch((err) => {
                console.error("Couldn't load pokemon list from poke api :(");
            });;
    }

    render() {
        return (
            <div className="App">
              <header className="App-header">
                <h1 className="App-title">Pokedex</h1>
              </header>
              <div className="Container">
                <List list={this.state.list}/>
              </div>
            </div>
        );
    }
}

export default App;
