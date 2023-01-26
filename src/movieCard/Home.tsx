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




export const Home = React.memo(() => {

    const movies = useSelector<AppRootStateType, MovieType[]>(state => state.movies.movies)
    const currentGenreFromState = useSelector<AppRootStateType, GenresType>(state => state.movies.genre)
    const pageNum = useSelector<AppRootStateType, number>(state => state.movies.page)

    const status = useAppSelector((state) => state.app.status)

    // const [rating, setRating] = useState(ratingVariants[0])
    // const [filters, setFilters] = useState({
    //     variantOfGenres,
    //     rating,
    //
    // })
    // const [sortVariant, setSortVariants] = useState(sortVariants[0])
    // let [movie, setMovie] = useState<MovieType[] | null>(null)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchMoviesTC())
    }, [dispatch,currentGenreFromState,pageNum])



    return (
        <div className={s.wrapper}>

            <Header/>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>

                <div >
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
            <div >
                <Pagination/>
            </div>


            {/*<Paginator cardPacksTotalCount={mov.cardPacksTotalCount}*/}
            {/*           pageCount={mov.pageCount}*/}
            {/*           pageSize={10}*/}
            {/*           currentPage={mov.currentPage}*/}
            {/*           onPageChanged={onPageChanged}*/}
            {/*           portionSize={undefined}/>*/}
            {/*    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>*/}
            {/*        /!*<div>*!/*/}
            {/*        /!*    <div style={{marginRight: '5px'}}><p>Sort by</p></div>*!/*/}

            {/*        /!*    <div>*!/*/}
            {/*        /!*        <SuperSelect options={sortVariants}*!/*/}
            {/*        /!*                     value={sortVariant}*!/*/}
            {/*        /!*                     onChange={handleForSorting}*!/*/}
            {/*        /!*                     onChangeOption={setSortVariants}/>*!/*/}
            {/*        /!*    </div>*!/*/}
            {/*        /!*</div>*!/*/}

            {/*    </div>*/}

            {/*    <div >*/}
            {/*        <div style={{marginRight: '5px'}}><p>Rating</p></div>*/}

            {/*        <div>*/}
            {/*            <SuperSelect options={ratingVariants}*/}
            {/*                         value={rating}*/}
            {/*                         onChange={handleForRating}*/}
            {/*                         onChangeOption={setRating}/>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*    <p>Found {movie?.length} results</p>*/}


        </div>

    );
})

