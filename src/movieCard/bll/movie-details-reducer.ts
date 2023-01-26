import {movieAPI, MovieType} from "../../dal/movie-api";
import {AppReducerType, RequestStatusType, setAppStatusAC} from "./app-reducer";
import {Dispatch} from "redux";


// @ts-ignore
const initialState: MovieType = {}

export const movieDetailsReducer = (state:  MovieType = initialState, action: MovieDetailsActionsType):MovieType  => {
    switch (action.type) {
        case "SET-MOVIE-DETAILS":
            return action.movie
        default:
            return state
    }
}

// actions
export const setMovieDetailsAC = (movie: MovieType, id:number) => ({type: 'SET-MOVIE-DETAILS', movie,id} as const)

// thunks

export const fetchMovieDetailsTC = (id:number) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC('loading'))
        movieAPI.getMovieDetails(id)
            .then((res) => {
                dispatch(setMovieDetailsAC(res,id))
                dispatch(setAppStatusAC('succeeded'))
            })
    }
}

// types
export type SetMovieDetailsACType = ReturnType<typeof setMovieDetailsAC>;

type MovieDetailsActionsType = AppReducerType|SetMovieDetailsACType


