import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {MovieType} from "../../dal/movie-api";
import {useDispatch, useSelector} from "react-redux";
import {fetchMovieDetailsTC} from "../bll/movie-details-reducer";
import {AppRootStateType, useAppSelector} from "../state/store";
import s from './movieDetails.module.css'

export const MovieDetails = () => {
    const {id} = useParams<'id'>()
    const dispatch = useDispatch()
    const movieDetails = useSelector<AppRootStateType, MovieType>(state => state.details)
    const status = useAppSelector((state) => state.app.status)


    useEffect(() => {
        dispatch(fetchMovieDetailsTC(Number(id)))
    }, [dispatch, id])

    const movieStyle = {
        backgroundImage: `url(${movieDetails.background_image}`,
        backgroundSize: 'cover',
      height: '100vh',
        }
    return (
        <div className={s.wrapper}>
            {status === "loading"
                ? <p style={{display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '28px'}}>Is
                    Loading...</p>
                : <section className={s.container} style={movieStyle}>

                    <div className={s.bigImgWrapper}>
                        <img src={movieDetails.large_cover_image} alt=""/>
                    </div>

                    <div className={s.informationWrapper}>
                        <h1>{movieDetails.title}</h1>
                        <h2>{movieDetails.year}</h2>
                        <div style={{display: 'flex'}}>{movieDetails.genres?.map((g, i) => {
                            return <h2 key={i}> {g}  </h2>
                        })}</div>
                        <p> Rating: {movieDetails.rating} / 10</p>
                        <div className={s.discritionWrapper}><p>{movieDetails.description_full}</p></div>
                    </div>
                </section>
            }
        </div>
    );
};

