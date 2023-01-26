import React from 'react';
import s from './Pagination.module.css'
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../movieCard/state/store";
import {setPageAC} from "../../movieCard/bll/movies-reducer";

export const Pagination = React.memo(() => {
    const mov = useSelector<AppRootStateType, number>(state => state.movies.movie_count)
    const pageNum = useSelector<AppRootStateType, number>(state => state.movies.page)
    const dispatch = useDispatch()

        let maxPages = Math.ceil(mov / 20)
        let items = [];
        let leftSide = pageNum - 2;
        if(leftSide <= 0 ) leftSide=1;
        let rightSide = pageNum + 2;
        if(rightSide>maxPages) rightSide = maxPages;
        for (let number = leftSide ; number <= rightSide; number++) {
            items.push(
                <div key={number} className={(number === pageNum ? s.roundEffectActive : s.roundEffect)} onClick={()=>{dispatch(setPageAC(number))}}>
                    {number}
                </div>,
            );
        }
        const nextPage = () => {
            if(pageNum<maxPages){
                dispatch(setPageAC(pageNum+1))
            }
        }

        const prevPage = () => {
            if(pageNum>1){
                dispatch(setPageAC(pageNum-1))
            }
        }

        const paginationRender = (
            <div className={s.flexContainer}>
                <div> Founded : { mov } movies</div>

                <div className={s.paginateCtn}>
                    <div className={s.roundEffect} onClick={prevPage}> &lsaquo; </div>
                    {items}
                    <div className={s.roundEffect} onClick={nextPage}> &rsaquo; </div>
                </div>
            </div>
        );
        return (paginationRender);
    })
