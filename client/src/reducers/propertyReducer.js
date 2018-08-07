import {
    SEND_APPLICATION,
    LIKE_UNLIKE_PRODUCT
} from '../constants/actionTypes';

const initialState = {
    sentApplication: null
}

const authReducer = (state = initialState, {type, payload}) => {
    switch(type) {
        case SEND_APPLICATION:
            return {...state, sentApplication: payload}
        case LIKE_UNLIKE_PRODUCT:
            return {...state, likeStatus: payload}
        default:
            return state
    }
}

export default authReducer;