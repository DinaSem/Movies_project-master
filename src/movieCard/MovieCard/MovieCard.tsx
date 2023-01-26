import React from 'react';
import {Link} from 'react-router-dom';
import {MovieType} from "../../dal/movie-api";
import s from './movieCard.module.css'

type PropsType = {
    movie: MovieType
}

export const MovieCard = ({movie}: PropsType) => {


    return (

        <Link className={s.movie} to={`details/${movie.id}`}>
            <img src={movie.medium_cover_image} alt={''} className={s.cardsPicture}/>

            <div className={s.textWrapper}>
                <h3 className={s.movieTitle}>{movie.title}</h3>
                <h5 className={s.movieYear}>{movie.year}</h5>
                <h5 className={s.movieYear}>❤ {movie.rating} / 10</h5>

                <div>{movie.genres?.map((g,i) => {
                    return <span  className={s.genre} key={i}> {g}</span>
                })}</div>
                <p className={s.minitext}>{movie.summary.slice(0, 130)}...</p>
            </div>
        </Link>


    );
};

