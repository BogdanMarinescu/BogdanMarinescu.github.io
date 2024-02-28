import './App.css';
import Landing from './Landing/landing';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import MovieDetails from './Movie-details/movie-details';
import CreateMovie from './Create-movie/create-movie';
import Navigation from './navigation';
import React from 'react';
import MoviesContextProvider from './movies-context';
import Register from './Authenticator/Register/register';
import Login from './Authenticator/Login/login';
import UserContextProvider from './user-context';



function App() {
  

  return (
    <UserContextProvider>
      <MoviesContextProvider>
    <Router>
      <Navigation />

      <Routes>
        <Route path="/" element={<Landing />}></Route>
        <Route path="/about" element={<div>About</div>}></Route>
        <Route path="/movie/:id" element={<MovieDetails />}></Route>
        <Route path="/create-movie" element={<CreateMovie />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="*" element={<div>Page not found 404</div>}></Route>
      </Routes>
    </Router>
    </MoviesContextProvider>
    </UserContextProvider>
  );
}

export default App;
