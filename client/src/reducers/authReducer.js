import {
    IS_AUTHENTICATED,
    AUTHENTICATION_FAILED,
    SUCCESSFULLY_SIGNED
} from '../constants/actionTypes';

const initialState = {
    user: null,
    userAccountCreated: null
}

const authReducer = (state = initialState, {type, payload}) => {
    switch(type) {
        case IS_AUTHENTICATED:
            return {...state, user: payload, userInfo: payload}
        case AUTHENTICATION_FAILED:
            return {...state, user: null, authError: payload}
        case SUCCESSFULLY_SIGNED:
            return {...state, userAccountCreated: payload}
        default:
            return state
            
    }
}

export default authReducer;