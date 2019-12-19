import React, { Component } from 'react';
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
            .then(data => this.setState({ movies: data.results }));
    }

    addMovieToUser(e) {
        let movie = e.target.getAttribute("movie")
        this.props.addMovieToUser(movie)
        this.setState({ movieAdded: movie });
    }

    render() { 
        // lists the top rated movies
        return (
            <div>
                {this.state.movies.map(movie => {
                    return (
                        <div className="movie" key={movie.id}>
                            <span>{movie.title}</span>
                            <button
                                onClick={(e) => this.addMovieToUser(e)}
                                movie={movie.title}
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