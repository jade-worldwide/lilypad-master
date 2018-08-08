import {combineReducers} from 'redux';
import authReducer from './authReducer';
import propertyReducer from './propertyReducer'
import errorReducer from './errorReducer'


export default combineReducers({
    auth: authReducer,
    property: propertyReducer,
    errorMessage: errorReducer
})