import {movieAPI, MovieType} from "../../dal/movie-api";
import {AppReducerType, RequestStatusType, setAppStatusAC} from "./app-reducer";
import {Dispatch} from "redux";
import {AppRootStateType} from "../state/store";

type InitialStateType = {
    movies: MovieTypeDomainType[]
    genre: GenresType
    // limit: number
    movie_count: number
    page_number: number
    page:number
    query_term: string
    // params:{
    //     // query_term: string,
    //     genre:GenresType
    // }

}

const initialState = {
    movies: [] as MovieTypeDomainType[],
    genre: 'all' as GenresType,
    // params:{
    //     // query_term: '',
    // }
    // limit: 20,
    movie_count: 0,
    page_number: 1,
    page:1,
    query_term: ''
}

export const moviesReducer = (state: InitialStateType = initialState, action: MovieActionsType): InitialStateType => {
    switch (action.type) {
        case "SET-MOVIES":
            return {...state,
                movies: action.movies?.map(m => ({...m, entityStatus: 'idle'})),
                movie_count:action.movie_count,
            }
        case "SET-GENRE": {
            return {...state, genre: action.genre}
        }
        case "SET-PAGE":
            return {...state, page:action.page}
        default:
            return state
    }
}

// actions
export const setMovieAC = (movies: Array<MovieType>,movie_count:number) => ({type: 'SET-MOVIES', movies,movie_count} as const)
export const setGenreMovieAC = (genre: GenresType) => ({type: 'SET-GENRE', genre} as const)
export const setPageAC = (page:number) => ({type: 'SET-PAGE', page} as const)


// thunks
export const fetchMoviesTC = () => {
    return (dispatch: Dispatch<MovieActionsType>, getState: () => AppRootStateType) => {

        dispatch(setAppStatusAC('loading'))
        let {genre,page} = getState().movies;
        movieAPI.getMovie({genre,page})
            .then((res) => {
                dispatch(setMovieAC(
                    res.movies,
                    res.movie_count,
                    ))
                dispatch(setAppStatusAC('succeeded'))
            })
    }
}
export const searchMoviesTC = (query_term: string) => {
    return (dispatch: Dispatch<MovieActionsType>, getState: () => AppRootStateType) => {
        dispatch(setAppStatusAC('loading'))
        let {genre,page} = getState().movies;
        // const {query_term} = params
        movieAPI.getMovie({query_term, genre,page})
            .then((res) => {
                dispatch(setMovieAC(res.movies,res.movie_count))
                dispatch(setAppStatusAC('succeeded'))
            })
    }
}
// export const setPageTC = (page_number:number) => {
//     return (dispatch: Dispatch<MovieActionsType>, getState: () => AppRootStateType) => {
//         dispatch(setAppStatusAC('loading'))
//         let {genre,page_number} = getState().movies;
//         // const {query_term} = params
//         movieAPI.getMovie({genre,page_number})
//             .then((res) => {
//                 dispatch(setPageAC(
//                     res.page_number,
//                 ))
//                 console.log(res.movie_count)
//                 dispatch(setAppStatusAC('succeeded'))
//             })
//     }
// }



// types
export type SetMovieACType = ReturnType<typeof setMovieAC>;
export type SetGenreMovieACType = ReturnType<typeof setGenreMovieAC>;
export type SetPageACType = ReturnType<typeof setPageAC>;

type MovieActionsType = SetMovieACType | AppReducerType | SetGenreMovieACType|SetPageACType
export type GenresType =
    'All'
    | 'Action'
    | 'Adventure'
    | 'Animation'
    | 'Biography'
    | 'Comedy'
    | 'Crime'
    | 'Documentary'
    | 'Drama'
    | 'Family'
    | 'Fantasy'
    | 'Film Noir'
    | 'History'
    | 'Horror'
    | 'Music'
    | 'Musical'
    | 'Mystery'
    | 'Romance'
    | 'Sci-Fi'
    | 'Short'
    | 'Sport'
    | 'Superhero'
    | 'Thriller'
    | 'War'
    | 'Western';
export type RatingType = 'all' | '9' | '8' | '7' | '6' | '5' | '4' | '3' | '2' | '1' | '0'
export type MovieTypeDomainType = MovieType & {
    entityStatus: RequestStatusType
}
