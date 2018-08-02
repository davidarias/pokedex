import React, { Component } from 'react';

import { Link } from 'react-router';
import ReactPaginate from 'react-paginate';

import pokeapi from '../pokeapi';

const INITAL_POKEMON_LIMIT = 50;
const ITEMS_PER_PAGE = 5;
const INITAL_PAGE_COUNT = Math.ceil(INITAL_POKEMON_LIMIT / ITEMS_PER_PAGE );


function filterByName(nameFilter, all){
    let regex = new RegExp(nameFilter);
    return all.filter( ( {name} ) => name.match(regex));
}

function filterListForPage(page, all){
    let offset = Math.ceil(page * ITEMS_PER_PAGE);
    return all.slice(offset, offset + ITEMS_PER_PAGE);
}

class List extends Component {

    constructor(props) {
        super(props);

        let page = parseInt(props.params.page, 10);
        if (isNaN(page) || page > INITAL_PAGE_COUNT) page = 1;

        this.state = {
            list: [], // all items loaded when component mount
            filtered: [], // items to show dependeing on page and name filter
            pageCount: 0,
            // page indexing starts at 0
            initialPage: page - 1,
            nameFilter: '.*'
        };
    }

    componentDidMount(){
        // get the initial list of pokemon for the app
        pokeapi.getPokemonsList({limit: INITAL_POKEMON_LIMIT, offset: 0})
            .then((response) => {
                this.setState({
                    list: response.results,
                    filtered: filterListForPage(
                        this.state.initialPage,
                        response.results
                    ),
                    pageCount: INITAL_PAGE_COUNT
                });
            }).catch((err) => {
                console.error("Couldn't load pokemon list from poke api :(");
            });;
    }

    handlePageClick(data) {
        let filteredByName = filterByName(this.state.nameFilter, this.state.list);
        let pageCount = Math.ceil( filteredByName.length / ITEMS_PER_PAGE );

        this.setState({
            pageCount: pageCount,
            filtered: filterListForPage(
                data.selected,
                filteredByName
            )
        });

        // set url with current page
        this.props.router.replace(`/list/${data.selected + 1}`);

    };

    handleNameFilter(event){
        let nameFilter = event.target.value;
        let nameFilterRegEx = `^${nameFilter}.*`;

        let filteredByName = filterByName(nameFilterRegEx, this.state.list);
        let pageCount = Math.ceil( filteredByName.length / ITEMS_PER_PAGE );

        this.setState({
            nameFilter: nameFilterRegEx,
            pageCount: pageCount,
            filtered: filterListForPage(
                0,
                filteredByName
            )
        });
    }

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
              <input tyep="text" onChange={this.handleNameFilter.bind(this)}/>
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
