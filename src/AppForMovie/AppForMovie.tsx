import React from 'react';
import {Navigate, Route, Routes, useParams} from "react-router-dom";
import {Home} from "../movieCard/Home";
import {About} from "../movieCard/About";
import {Navbar} from "../movieCard/Navbar/Navbar";
import {MovieDetails} from "../movieCard/MovieDetails/MovieDetails";
import s from './appForMovie.module.css'
import {Footer} from "../movieCard/Footer/Footer";

const AppForMovie = () => {

    return (
        <div className={s.wrapper}>
            <Navbar/>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='about' element={<About/>}/>
                <Route path='/404' element={<h1>404: PAGE NOT FOUND</h1>} />
                <Route path='*' element={<Navigate to='/404'/>} />
                <Route path='details/:id' element={<MovieDetails />} />
            </Routes>
            <Footer/>
        </div>
    );
};

export default AppForMovie;