import React, {Component} from 'react';
import './MovieList.css';
import AddField from "../../components/AddField/AddField";
import ListItem from "../../components/ListItem/ListItem";
import {nanoid} from 'nanoid'


class MovieList extends Component {
    constructor(props) {
        super(props);
        if (localStorage.getItem("state") !== null) {
            this.state = {
                movies: JSON.parse(localStorage.getItem("state")),
                movieName: '',
            };
        } else {
            this.state = {
                movies: [],
                movieName: '',
            };
        }

    }

    componentDidUpdate() {
        localStorage.clear();
        const currentState = localStorage.getItem('state');
        if (!currentState) {
            localStorage.setItem('state', JSON.stringify(this.state.movies));
        }
    }

    currentMovie = event => {
        let newMovie = event.target.value
        this.setState({movieName: newMovie});
    }

    addMovie = () => {
        if (this.state.movieName !== '') {
            const newMovies = [...this.state.movies];
            let newMovie = {name: this.state.movieName, id: nanoid(9)};
            newMovies.push(newMovie);
            this.setState({movies: newMovies});
            this.setState({movieName: ''});
        }
    }

    removeMovie = id => {
        const index = this.state.movies.findIndex(p => p.id === id);
        const moviesCopy = [...this.state.movies];
        moviesCopy.splice(index, 1);
        localStorage.removeItem(id);
        this.setState({movies: moviesCopy});
    };

    changeName = (event, id) => {
        const index = this.state.movies.findIndex(p => p.id === id);
        const movie = {...this.state.movies[index]};
        movie.name = event.target.value;
        const moviesCopy = [...this.state.movies];
        moviesCopy[index] = movie;
        this.setState({movies: moviesCopy});
    };

    render() {
        return (
            <div className="MovieList">
                <AddField
                    onChange={this.currentMovie}
                    click={this.addMovie}
                    value={this.state.movieName}
                />
                <p>To watch list:</p>

                {
                    this.state.movies.map(movie => (
                    <ListItem
                    key={movie.id}
                    value={movie.name}
                    remove={() => this.removeMovie(movie.id)}
                    change={event => this.changeName(event, movie.id)}
                    />
                    ))
                }
            </div>
        );
    }
}

export default MovieList;