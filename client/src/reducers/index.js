import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'
import authReducer from './authReducer';
import createStream from './streamReducers';


export default combineReducers({
    auth: authReducer,
    form: formReducer,
    stream: createStream
})