import axios from 'axios'
import {GenresType, RatingType} from "../movieCard/bll/movies-reducer";

const instance = axios.create({
    baseURL: 'https://yts.mx/api/v2/',

})

// api
export const movieAPI = {
    getMovie(params: {query_term?: string, genre?: GenresType, page?: number }) {
        return instance.get<ResponseType>('list_movies.json', {params}).then(res => res.data.data);
    },
    getMovieDetails(id: number) {
        return instance.get<ResponseTypeForDetails>(`movie_details.json?movie_id=${id}`).then(res => res.data.data.movie);
    },

}

// types
export type MovieType = {
    id: number
    year: number
    title: string
    summary: string
    medium_cover_image: string
    background_image: string
    background_image_original: string
    description_full: string
    language: string
    rating: RatingType
    genres: Array<GenresType>
    large_cover_image: string
    small_cover_image: string
}
export type ResponseType = {
    data: DataType
    status: string
    status_message: string
}
export type ResponseTypeForDetails = {
    data: DataTypeForDetails
    status: string
    status_message: string
}
export type DataType = {
    limit: number
    movie_count: number
    movies: MovieType[]
    page_number: number
}
export type DataTypeForDetails = {
    limit: number
    movie_count: number
    movie: MovieType
    page_number: number
}

// export type TodolistType = {
//     id: string
//     title: string
//     addedDate: string
//     order: number
// }
// export type ResponseType<D = {}> = {
//     resultCode: number
//     messages: Array<string>
//     fieldsErrors: Array<string>
//     data: D
// }
//
//
// export enum TaskStatuses {
//     New = 0,
//     InProgress = 1,
//     Completed = 2,
//     Draft = 3
// }
//
// export enum TaskPriorities {
//     Low = 0,
//     Middle = 1,
//     Hi = 2,
//     Urgently = 3,
//     Later = 4
// }
//
// export type TaskType = {
//     description: string
//     title: string
//     status: TaskStatuses
//     priority: TaskPriorities
//     startDate: string
//     deadline: string
//     id: string
//     todoListId: string
//     order: number
//     addedDate: string
// }
// export type UpdateTaskModelType = {
//     title: string
//     description: string
//     status: TaskStatuses
//     priority: TaskPriorities
//     startDate: string
//     deadline: string
// }
// type GetTasksResponse = {
//     error: string | null
//     totalCount: number
//     items: TaskType[]
// }
