import "./movie-details.css";
import { useParams, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import Dialog from '../Dialog/dialog';
import MovieForm from '../Movie-form/movie-form';
import { MoviesContext } from "../movies-context";
import { UserContext, getAccessToken } from "../user-context";
import {fetch} from '../api/fetch';

export default function MovieDetails() {
  let { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const { movies } = useContext(MoviesContext);
  const { user } = useContext(UserContext);

  const navigate = useNavigate();
  const bearerToken = user?.accessToken || getAccessToken();

  useEffect(() => {
    const selectedMovie = movies.find((storedMovie) => storedMovie.id === Number(id));
    if (selectedMovie) {
      setMovie(selectedMovie);
    } else {
      fetch(`http://localhost:3001/movies/${id}`, {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      })
      .then((response) => response.json())
      .then((movieFromServer) => setMovie(movieFromServer));
    }
  }, []);

  function onSubmit(updatedMovie) {
    fetch(`http://localhost:3001/movies/${id}`, {
      method: "PUT",
      body: JSON.stringify(updatedMovie),
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${bearerToken}`,
      }
    })
      .then((response) => response.json())
      .then((movieFromServer) => setMovie(movieFromServer));
  }

  function showDeleteDialog() {
    setShowDialog(true);
  }

  function deleteMovie () {
    fetch(`http://localhost:3001/movies/${id}`, {
        method: "DELETE",
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${bearerToken}`,
      },
      }).then(() => navigate("/"));
  }

  function hideDeleteDialog() {
    setShowDialog(false);
  }

  return (
    <section className="movie-details">
      { showDialog && <Dialog yesCallback={deleteMovie} noCallback={hideDeleteDialog} title="Are you sure you want to remove this card?"></Dialog> }
      <article className="movie">
        <div className="movie__image-container">
          <img src={movie?.image} alt="Movie"></img>
        </div>
        <p className="movie__footer">
          <span className="movie__year">{movie?.year}</span>
          <span className="movie__description">{movie?.description}</span>
          <span className="movie__author">{movie?.author}</span>
        </p>
        <h5 className="movie__title">{movie?.title}</h5>
      </article>

      <button onClick={showDeleteDialog}>Delete</button>

      <MovieForm onSubmit={onSubmit} movie={movie}></MovieForm>

    </section>
  );
}
