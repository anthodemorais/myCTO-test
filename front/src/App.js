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
        fetch(apiURL + '/movies/' + this.state.selectedUser.id, {method: 'POST', body: JSON.stringify({title}), headers: {"Content-type": "application/json; charset=UTF-8"}})
            .then(() => this.selectUser(this.state.selectedUser.id, this.state.selectedUser.firstname))
            .catch(() => swal("error", "There was an error when adding the movie to the favourites list", "error"))
    }

    removeMovie(e) {
        fetch(`${apiURL}/movies/${this.state.selectedUser.id}/${e.target.getAttribute("movie")}`, {method: "DELETE"})
            .then(() => this.selectUser(this.state.selectedUser.id, this.state.selectedUser.firstname))
            .catch(() => swal("error", "There was an error when adding the movie to the favourites list", "error"))
    }

    selectUser(id, firstname) {
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
                        {this.state.selectedUser.id && <FavList movies={this.state.movies} removeMovie={(e) => this.removeMovie(e)} />}
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
