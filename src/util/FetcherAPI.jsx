import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { actions as actionsFetch, API_FETCHER_STATUSES } from './../redux/features/fetcherApi';
import { fetchAllForLandingPage, fetchListGenres, fetchListPopular } from './fetcherFunctions'
import { actions, MOVIE_SECTION_SCREENS } from './../redux/features/movieSection';
import MovieSection from '../components/fetcher-components/MovieSection';

//MORE CASES
export const FETCH_API_TYPE = {
    LIST_POPULAR: "LIST_POPULAR", 
    LIST_GENRE: "LIST_GENRE", 
    LIST_LANDING: 'LIST_LANDING',
}

const FetcherAPI = ({...props}) => {
    
    const dispatch = useDispatch();

    const STATUS = useSelector(state => state.fetcherApi.STATUS);
    const RESULT = useSelector(state => state.fetcherApi.RESULT);
   
    let fetchedResult = [];

    if (STATUS.status ===  API_FETCHER_STATUSES.FETCHING.status) {
    } 
    else if ( STATUS.status ===  API_FETCHER_STATUSES.SUCCESS.status) {
        fetchedResult = RESULT
    }
    else {
        fetchedResult = [];
    }

    // let useComponent = null;
    let useScreen = null;
    let useFunction = null;
    
    switch(props.type){
        case "LIST_POPULAR":

            useScreen = MOVIE_SECTION_SCREENS.GRID_MOVIES
            useFunction = () => fetchListPopular(dispatch)
            break;

        case "LIST_GENRE":
        
            useScreen = MOVIE_SECTION_SCREENS.LIST_GENRE
            useFunction = () => fetchListGenres(dispatch, String(props.extras.id).toUpperCase())
            break;

        case "LIST_LANDING":
        
            useScreen = MOVIE_SECTION_SCREENS.LIST_LANDING
            useFunction = () => fetchAllForLandingPage(dispatch)
            break;


        default:
    
            useScreen = MOVIE_SECTION_SCREENS.QUICK_ADD
            useFunction = () => {}

            break;

    }

    useEffect(() => {
        StartFetching(useFunction)
    }, [])
    

    //CHANGE TO RETURN DIRECTLY ?: elvis op.
    if( fetchedResult !== null ){

        dispatch(actions.setScreen(useScreen))

        return (
            <React.Fragment>
                <MovieSection {...{RESULT: RESULT}}/>
            </React.Fragment>
        );

    } else {

        return (
            <React.Fragment>
                {'null'}
            </React.Fragment>
        );

    }
   
 }

export default FetcherAPI;

const StartFetching = async (useFunction) => {
    useFunction();
}

