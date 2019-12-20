import React from 'react';
import swal from 'sweetalert';
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
        // add movie to the list and selects user to refresh the list
        fetch(apiURL + '/movies/' + this.state.selectedUser.id, {method: 'POST', body: JSON.stringify({title}), headers: {"Content-type": "application/json; charset=UTF-8"}})
            .then(() => this.selectUser(this.state.selectedUser.id, this.state.selectedUser.firstname))
            .catch(() => swal("error", "There was an error when adding the movie to the favourites list", "error"))
    }

    removeMovie(e) {
        // removes the movie from the list and selects user to refresh the list
        fetch(`${apiURL}/movies/${this.state.selectedUser.id}/${e.target.getAttribute("movie")}`, {method: "DELETE"})
            .then(() => this.selectUser(this.state.selectedUser.id, this.state.selectedUser.firstname))
            .catch(() => swal("error", "There was an error when adding the movie to the favourites list", "error"))
    }

    selectUser(id, firstname) {
        // gets the movies of the selected user and updates the state to display the list
        fetch(apiURL + "/movies/" + id)
            .then(result => result.json())
            .then(movies => this.setState({ movies, selectedUser: {id, firstname} }))
            .catch(() => swal("error", "There was an error when adding the movie to the favourites list", "error"));

    }

    render() {
        return (
            <div className="App container">
                <div className="row">
                    <div className="container col-md-4">
                        <MoviesList addMovieToUser={(title) => this.addMovieToUser(title)} />
                    </div>
                    <div className="container col">
                        <UserList selectUser={(id, firstname) => this.selectUser(id, firstname)} />
                        {/* if user a user is selected, show the list */}
                        {this.state.selectedUser.id && <FavList movies={this.state.movies} removeMovie={(e) => this.removeMovie(e)} />}
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
