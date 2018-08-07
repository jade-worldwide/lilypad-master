import {
    IS_AUTHENTICATED,
    AUTHENTICATION_FAILED
} from '../constants/actionTypes';

const initialState = {
    user: null
}

const authReducer = (state = initialState, {type, payload}) => {
    switch(type) {
        case IS_AUTHENTICATED:
            return {...state, user: payload, userInfo: payload}
        case AUTHENTICATION_FAILED:
            return {...state, user: null, authError: payload}
        default:
            return state
    }
}

export default authReducer;