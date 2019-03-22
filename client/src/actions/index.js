import streamRequest from '../api/index';
import history from '../history';
import {
    SIGN_IN,
    SIGN_OUT,
    CREATE_STREAM,
    FETCH_STREAM,
    FETCH_STREAMS,
    DELETE_STREAM,
    EDIT_STREAM
} from './types';


// AUTHENTICATION 
export const signIn = (userId) => {
    return {
        type: SIGN_IN,
        payload: userId
    }
}

export const signOut = () => {
    return {
        type: SIGN_OUT
    }
}


// STREAMS 
export const createStream = streamInfo => async (dispatch, getState) => {
    const response = await streamRequest.post('/streams', { ...streamInfo, userId: getState().auth.userId });
    dispatch({ type: CREATE_STREAM, payload: response.data });
    history.push('/');
}

export const fetchStream = (id) => async dispatch => {
    const response = await streamRequest.get(`/streams/${id}`);
    // console.log(response);
    dispatch({ type: FETCH_STREAM, payload: response.data });
}

export const fetchStreams = () => async dispatch => {
    const response = await streamRequest.get('/streams');
    console.log(response)
    dispatch({ type: FETCH_STREAMS, payload: response.data });
}

export const editStreams = (id, streamInfo) => async dispatch => {
    const response = await streamRequest.patch(`/streams/${id}`, streamInfo);

    dispatch({ type: EDIT_STREAM, payload: response.data });
    history.push('/');
}

export const deleteStreams = (id) => async dispatch => {
    await streamRequest.delete(`/streams/${id}`);
    dispatch({ type: DELETE_STREAM, payload: id });
}
