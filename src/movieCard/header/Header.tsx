import React, {
    ChangeEvent,
    DetailedHTMLProps,
    InputHTMLAttributes,
    KeyboardEventHandler,
    useCallback,
    useState
} from 'react';
import s from "./header.module.css";
import {useDispatch} from "react-redux";
import {GenresType, searchMoviesTC, setGenreMovieAC} from "../bll/movies-reducer";
import SuperSelect from "../../components/SuperSelect/SuperSelect";

const genres: GenresType[] = ['All', 'Action', 'Adventure', 'Animation', 'Biography', 'Comedy', 'Crime', 'Documentary',
    'Drama', 'Family', 'Fantasy', 'Film Noir', 'History', 'Horror', 'Music', 'Musical', 'Mystery', 'Romance',
    'Sci-Fi', 'Short', 'Sport', 'Superhero', 'Thriller', 'War', 'Western']
export const Header = () => {
    const dispatch = useDispatch()
    const [value, setValue] = useState('')
    const [variantOfGenres, setVariantOfGenres] = useState('Genres')


    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) => {
        if (e.key === 'Enter') {
            dispatch(searchMoviesTC(value))
        }
    }
    const onClickHandler = () => {
        dispatch(searchMoviesTC(value))
    }
    const handleForGenres = useCallback((option: any) => {
        setVariantOfGenres(option)
        dispatch(setGenreMovieAC(option))
    },[dispatch])

    return (
        <div className={s.headerContainer}>
            <div>

                    <p style={{textAlign:'left'}}>Search term</p>
                    <input type="text"
                           className={s.inputsearch}
                           id={s.inputsearch}
                           onChange={onChangeHandler}
                           onKeyPress={onKeyPressHandler}
                           value={value}
                           autoFocus
                           // placeholder={'Search Movies'}

                    />

                <button className={s.button} onClick={onClickHandler}>Search</button>
                {/*<p>Movies with {value} </p>*/}
                <label className={s.search} htmlFor="input-search"></label>
            </div>



            <div style={{marginLeft:'15px'}}>
                <p style={{textAlign: 'left',marginLeft:'15px'}}>Genres</p>
                <SuperSelect options={genres}
                            value={variantOfGenres}
                            onChangeOption={handleForGenres}
                            className={s.superSelect}
            />
            </div>


        </div>
    );
};

