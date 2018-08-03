import React, { Component } from 'react';

import { Link } from 'react-router';

class App extends Component {

    render() {
        return (
            <div className="wrap">
              <div className="content">
                <div className="main-content">
                  <header>
                    <div className="container">

                      <h1>
                        <Link to="/list/1">Pokedex</Link>
                      </h1>
                      <small>beta!</small>
                    </div>

                  </header>
                  <div className="container">
                    {this.props.children}
                  </div>
                </div>
              </div>
              <footer>
                <p>Made using only high quality bits.</p>
                <p>Copyright (C) 2018 <a href="http://davidarias.net">David Arias</a>. All rights reserved. </p>
              </footer>
            </div>
        );
    }
}

export default App;
