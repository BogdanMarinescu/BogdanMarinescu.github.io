import React, { useState } from 'react';

export const MoviesContext = React.createContext();

export default function MoviesContextProvider(props) {
    const [movies, setMovies] = useState([]);
    const { children } = props;

    return (
        <MoviesContext.Provider value={{movies, setMovies}}>
         {children}
        </MoviesContext.Provider>
    )
}