import React, { Component } from 'react';
import swal from 'sweetalert';
import { moviesURL, moviesAPIKey } from '../config/config';

class MoviesList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movies: [],
            movieAdded: ""
        }
    }

    componentDidMount() {
        // get the top rated movies
        fetch(moviesURL + '/movie/top_rated?api_key=' + moviesAPIKey)
            .then(res => res.json())
            .then(data => this.setState({ movies: data.results }))
            .catch(() => swal("error", "There was an error when adding the movie to the favourites list", "error"));
    }

    addMovieToUser(e) {
        let movie = e.target.getAttribute("movie")
        this.props.addMovieToUser(movie)
        this.setState({ movieAdded: movie });
    }

    render() { 
        // lists the top rated movies
        return (
            <div className="col section-container">
                <h3 className="col">All movies</h3>
                {this.state.movies.map(movie => {
                    return (
                        <div className="movie" key={movie.id}>
                            <span>{movie.title}</span>
                            <button
                                onClick={(e) => this.addMovieToUser(e)}
                                movie={movie.title}
                                className="btn btn-outline-light"
                            >
                                +
                            </button>
                        </div>
                    )
                })}
            </div>
        );
    }
}
 
export default MoviesList;