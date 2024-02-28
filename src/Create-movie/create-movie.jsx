import "./create-movie.css";
import MovieForm from '../Movie-form/movie-form';
import { useContext, useState } from 'react'
import { UserContext, getAccessToken } from '../user-context';
import { useNavigate } from 'react-router-dom';
import {fetch} from '../api/fetch';

export default function CreateMovie() {
    const [success, setSuccess] = useState(false);
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const bearerToken = user?.accessToken || getAccessToken();


    function submit(updatedMovie) {
        setSuccess(false);

        fetch('http://localhost:3001/movies', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                Authorization: `Bearer ${bearerToken}`,
            },
            body: JSON.stringify(updatedMovie),
        })
        .then((response) => {
            setSuccess(response.ok);
        });
    }

    return (
        <section className='create-movie-section'>
            { success && <p>Operation has been successful</p>}
            <MovieForm onSubmit={submit}></MovieForm>
        </section>
    );
}
