import React, { Component } from 'react';

import { Link } from 'react-router';
import ReactPaginate from 'react-paginate';

import pokeapi from '../pokeapi';

const INITAL_POKEMON_LIMIT = 50;
const ITEMS_PER_PAGE = 5;


function filterListForPage(page, all){
    let offset = Math.ceil(page * ITEMS_PER_PAGE);
    return all.slice(offset, offset + ITEMS_PER_PAGE);
}

class List extends Component {

    constructor(props) {
        super(props);
        this.state = {
            list: [], // all items loaded when component mount
            filtered: [], // items to show dependeing on page and name filter
            pageCount: 0,
            // page indexing starts at 0
            initialPage: parseInt((props.params.page || 1), 10) - 1
        };
    }

    componentDidMount(){
        // get the initial list of pokemon for the app
        pokeapi.getPokemonsList({limit: INITAL_POKEMON_LIMIT, offset: 0})
            .then((response) => {
                this.setState({
                    list: response.results,
                    filtered: filterListForPage(this.state.initialPage, response.results), // fisrt page
                    pageCount: Math.ceil(INITAL_POKEMON_LIMIT / ITEMS_PER_PAGE )
                });
            }).catch((err) => {
                console.error("Couldn't load pokemon list from poke api :(");
            });;
    }

    handlePageClick(data) {
        this.props.router.push(`/list/${data.selected + 1}`);
        this.setState({
            filtered: filterListForPage(data.selected, this.state.list)
        });
    };

    render() {
        let pokeList = this.state.filtered.map( pokemon => {
            return (
                <li key={pokemon.name}>
                  <Link to={`/details/${pokemon.name}`}> { pokemon.name } </Link>
                </li>
            );
        });

        return (
            <div className="pokelist">
              <div className="list">
                <ul>{pokeList}</ul>
              </div>
              <div className="pagination">
                <ReactPaginate previousLabel={"previous"}
                               nextLabel={"next"}
                               breakLabel={<a href="">...</a>}
                               breakClassName={"break-me"}
                               pageCount={this.state.pageCount}
                               marginPagesDisplayed={2}
                               pageRangeDisplayed={5}
                               initialPage={this.state.initialPage}
                               onPageChange={this.handlePageClick.bind(this)}
                               containerClassName={"pagination"}
                               subContainerClassName={"pages pagination"}
                               activeClassName={"active"} />
              </div>
            </div>
        );
    }
}

export default List;
