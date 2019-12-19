import React, { Component } from 'react';
import { apiURL } from '../config/config';

class FavList extends Component {

    removeMovie(e) {
        fetch(apiURL + "/movies/" + this.props.user.id, {method: "DELETE"})
            .then(() => this.setState({}))
    }

    render() {
        console.log(this.props.movies)
        return (
            <div>
                {this.props.movies.map(movie => {
                    return (
                        <div key={movie.id}>
                            <span>{movie.title}</span>
                            <button onClick={this.removeMovie} movie={movie.id}>-</button>
                        </div>
                    )
                })}
            </div>
        );
    }
}
 
export default FavList;