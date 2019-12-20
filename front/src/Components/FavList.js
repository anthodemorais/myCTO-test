import React, { Component } from 'react';

class FavList extends Component {
    render() {
        return (
            <div className="col section-container">
                <h3>Favourite movies</h3>
                {this.props.movies.map(movie => {
                    return (
                        <div key={movie.id} className="fav-movie">
                            <span>{movie.title}</span>
                            <button className="btn btn-outline-light" onClick={(e) => this.props.removeMovie(e)} movie={movie.id}>-</button>
                        </div>
                    )
                })}
            </div>
        );
    }
}
 
export default FavList;