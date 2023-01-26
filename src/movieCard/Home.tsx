import React, {useCallback, useEffect, useState} from 'react';
import {DataType, MovieType} from "../dal/movie-api";
import {MovieCard} from "./MovieCard/MovieCard";
import s from '../AppForMovie/appForMovie.module.css'
import {Header} from "./header/Header";
import SuperSelect from "../components/SuperSelect/SuperSelect";
import {fetchMoviesTC, GenresType, RatingType, setGenreMovieAC} from "./bll/movies-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType, useAppSelector} from "./state/store";
import {Pagination} from "../components/Pagination/Pagination";
import up from './images/angle-circle-up.svg'

export const Home = React.memo(() => {

    const movies = useSelector<AppRootStateType, MovieType[]>(state => state.movies.movies)
    const currentGenreFromState = useSelector<AppRootStateType, GenresType>(state => state.movies.genre)
    const pageNum = useSelector<AppRootStateType, number>(state => state.movies.page)

    const status = useAppSelector((state) => state.app.status)
    const [showButton, setShowButton] = useState(false);
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchMoviesTC())
    }, [dispatch, currentGenreFromState, pageNum])
    // <ScrollToTopButton height={200} />
    // @ts-ignore

        const scrollToTop = () => {
            window.scroll({
                top: 0,
                left: 0,
                behavior: "smooth"
            });
    }
        // @ts-ignore
        const handleScroll = (event) => {
            if (document.documentElement.scrollTop > 200) {
                setShowButton(true);
            } else if (!showButton) {
                setShowButton(false);
            }
        };
     useEffect(() => {
            window.addEventListener("scroll", handleScroll);
            return () => {
                window.removeEventListener("scroll", handleScroll);
            };
        }, []);
    return (
        <div className={s.wrapper}>

            <Header/>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <div>
                    <Pagination/>
                </div>
            </div>
            {status === "loading"
                ? <p style={{display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '28px'}}>Is
                    Loading...</p>
                : <section className={s.container}>
                    {movies?.map(m => {
                        return <MovieCard key={m.id} movie={m}/>
                    })}
                </section>
            }
            <button
                className={showButton ? s.scrollToTopBtn : s.hidden}
                onClick={scrollToTop}>
                <img src={up} alt="" className={s.scroll} />
            </button>

            <div>
                <Pagination/>
            </div>

        </div>

    );
})

