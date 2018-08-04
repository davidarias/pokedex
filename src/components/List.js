import React, { Component } from 'react';

import { Link } from 'react-router';
import ReactPaginate from 'react-paginate';
import { Transition, config } from 'react-spring';

import hash from 'object-hash';

import pokeapi from '../pokeapi';

import Image from './Image';
import loading from '../img/loading.gif';

const INITAL_POKEMON_LIMIT = 100;
const ITEMS_PER_PAGE = 9;
const INITAL_PAGE_COUNT = Math.ceil(INITAL_POKEMON_LIMIT / ITEMS_PER_PAGE );


function filterByName(nameFilter, all){
    let regex = new RegExp(`^${nameFilter}.*`);
    return all.filter( ( {name} ) => name.match(regex));
}

function filterListForPage(page, all){
    let offset = Math.ceil(page * ITEMS_PER_PAGE);
    return all.slice(offset, offset + ITEMS_PER_PAGE);
}


function PokeList({filtered}){

    if ( filtered === null){

        return (<div className="center"><img src={loading} alt="loading"/> </div>);
    }

    if (filtered.length > 0){
        return  (
            <Transition config={config.slow}
                        keys={hash(filtered)}
                        from={{transform: 'translateX(500px)', opacity: 0 }}
                        enter={{ transform: 'translateX(0px)', opacity: 1  }}
                        leave={{ transform: 'translateX(-500px)', opacity: 0  }}>

              {style => {
                  return (
                      <ul className="list-items" style={style}>
                        {filtered.map( pokemon => {
                            return (
                                <li className="col-4" key={pokemon.name}>
                                  <div className="item row">
                                    <div className="col-6">
                                      <Image name={pokemon.name} />
                                    </div>
                                    <div className="col-6">
                                      <Link to={`/details/${pokemon.name}`}> { pokemon.name } </Link>
                                    </div>
                                  </div>
                                </li>
                            );
                        })}
                      </ul>
                  );
              }}

            </Transition>
        );
    }

    return (<div className="center"><h3>No items</h3></div>);
}

class List extends Component {

    constructor(props) {
        super(props);

        let page = parseInt(props.params.page, 10);
        if (isNaN(page) || page > INITAL_PAGE_COUNT) page = 1;

        this.state = {
            list: [], // all items loaded when component mount
            filtered: null, // items to show dependeing on page and name filter
            pageCount: 0,
            // page indexing starts at 0
            page: page - 1,
            nameFilter: (props.params.nameFilter || '')
        };
    }

    componentDidMount(){
        // get the initial list of pokemon for the app
        pokeapi.getPokemonsList({limit: INITAL_POKEMON_LIMIT, offset: 0})
            .then((response) => {

                let filteredByName = filterByName(this.state.nameFilter, response.results);
                let pageCount = Math.ceil( filteredByName.length / ITEMS_PER_PAGE );

                this.setState({
                    list: response.results,
                    filtered: filterListForPage(
                        this.state.page,
                        filteredByName
                    ),
                    pageCount: pageCount
                });
            }).catch((err) => {
                console.error("Couldn't load pokemon list from poke api :(");
            });;
    }

    componentWillReceiveProps(nextProps) {
        if ( nextProps.params.nameFilter !== this.props.params.nameFilter ||
             nextProps.params.page !== this.props.params.page ){

            let nameFilter = (nextProps.params.nameFilter || '');

            let filteredByName = filterByName(nameFilter, this.state.list);
            let pageCount = Math.ceil( filteredByName.length / ITEMS_PER_PAGE );

            let page = parseInt(nextProps.params.page, 10) - 1;
            if (isNaN(page) || page > pageCount) page = 1;

            this.setState({
                pageCount: pageCount,
                filtered: filterListForPage(
                    page,
                    filteredByName
                ),
                page: page,
                nameFilter: nameFilter
            });
        }
    }

    handlePageClick(data) {
        // set url with current page
        let nextUrl = `/list/${data.selected + 1}`;
        if (this.state.nameFilter !== '') {
            nextUrl += `/${this.state.nameFilter}`;
        }

        this.props.router.push(nextUrl);

    };

    handleNameFilter(event){
        let nameFilter = event.target.value;

        this.props.router.push(`/list/${1}/${nameFilter}`);
    }

    render() {

        return (
            <div className="pokelist">
              <div className="filter row">
                <div className="col-2">
                  <label>Search by name: </label>
                </div>
                <div className="col-10">
                  <input value={this.state.nameFilter} type="text" onChange={this.handleNameFilter.bind(this)}/>
                </div>
              </div>
              <div className="list row">
                <PokeList filtered={this.state.filtered} />
              </div>
              <div className="row">
                <div className="col-12">
                  <ReactPaginate previousLabel={"< previous"}
                                 nextLabel={"next >"}
                                 breakLabel={"..."}
                                 breakClassName={"break-me"}
                                 pageCount={this.state.pageCount}
                                 marginPagesDisplayed={2}
                                 pageRangeDisplayed={5}
                                 forcePage={this.state.page}
                                 onPageChange={this.handlePageClick.bind(this)}
                                 containerClassName={"pagination"}
                                 subContainerClassName={"pages pagination"}
                                 activeClassName={"active"} />
                </div>
              </div>
            </div>
        );
    }
}

export default List;
