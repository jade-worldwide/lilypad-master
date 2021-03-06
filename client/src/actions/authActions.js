import API from "../utils/API";
import {displayError } from './errorActions'
import { IS_AUTHENTICATED, AUTHENTICATION_FAILED, SUCCESSFULLY_SIGNED  } from '../constants/actionTypes';



export const signup = ({ name, email, phonenumber, password, role }) => async dispatch => {

    try {
        const { data } = await API.saveUser({
            name,
            email,
            phonenumber,
            password,
            role

        });
        console.log(data, '--testing.......');

            dispatch({
                type: SUCCESSFULLY_SIGNED,
                payload: data.user
            })
        

    } catch (error) {
        console.log(error.response);
        const {data} = error.response
        displayError(data.error)(dispatch)
    }
}

export const login = ({ email, password }) => async dispatch => {

    try {
        const { data } = await API.loginUser({
            email,
            password

        })
        dispatch({
            type: IS_AUTHENTICATED,
            payload: data.user
        });
    } catch (error) {
        dispatch({
            type: AUTHENTICATION_FAILED,
            payload: "Invalid credentials, cannot login"
        });
        console.error(error);
    }
}

export const getAuthenticated = () => async dispatch => {
    try {
        const { data, error } = await API.getAuthenticated();
        console.log(data);
        if (data) {
            dispatch({
                type: IS_AUTHENTICATED,
                payload: data.user
            });
            console.log(data);
        } else {
            console.log('ssss', error)
        }
        // if(getUser) login
        //else logout
    } catch (error) {
        //window redirect to login
    }
}


export const logout = () => async dispatch => {
    try {
        const revoke = await API.logout()
        dispatch({
            type: IS_AUTHENTICATED,
            payload: null
        });
        //should automatically display logout nav 
        //or redirect to anther page
    } catch (e) {
        //just refresh page
    }
}