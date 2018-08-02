import React, { Component } from 'react';

class App extends Component {

    render() {
        return (
            <div className="wrap">
              <header>
                <div className="container">

                  <h1>Pokedex</h1><small>beta!</small>
                </div>

              </header>
              <div className="container">
                {this.props.children}
              </div>

              <footer>
                <p>Made using only high quality bits.</p>
                <p>Copyright &copy 2018 <a href="http://davidarias.net">David Arias</a>. All rights reserved. </p>
              </footer>
            </div>
        );
    }
}

export default App;
