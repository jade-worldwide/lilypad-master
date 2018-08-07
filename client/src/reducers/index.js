import {combineReducers} from 'redux';
import authReducer from './authReducer';
import propertyReducer from './propertyReducer'


export default combineReducers({
    auth: authReducer,
    property: propertyReducer
})