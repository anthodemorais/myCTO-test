import React from 'react';
import MoviesList from './Components/MoviesList';
import UserList from './Components/UsersList';
import FavList from './Components/FavList';
import { apiURL } from './config/config';

import './App.css';


class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedUser: {},
            refresh: false,
            movies: []
        }
    }

    addMovieToUser(title) {
        fetch(apiURL + '/movies/' + this.state.selectedUser.id, {method: 'POST', body: JSON.stringify({title}), headers: {"Content-type": "application/json; charset=UTF-8"}})
            .then(() => this.setState({ refresh: !this.state.refresh }))
    }

    selectUser(id, firstname) {
        fetch(apiURL + "/movies/" + id)
            .then(result => result.json())
            .then(movies => this.setState({ movies, selectedUser: {id, firstname} }));
    }

    render() {
        return (
            <div className="App">
                <MoviesList addMovieToUser={(title) => this.addMovieToUser(title)} />
                <UserList selectUser={(id, firstname) => this.selectUser(id, firstname)} />
                <FavList user={this.state.selectedUser} movies={this.state.movies} />
            </div>
        );
    }
}

export default App;
