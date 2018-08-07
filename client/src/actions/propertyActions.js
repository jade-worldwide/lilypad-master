import API from "../utils/API";
import { SEND_APPLICATION, LIKE_UNLIKE_PRODUCT } from '../constants/actionTypes';

export const sendApplication = (applicationData) => async dispatch => {
    try {
        const { data } = await API.sendApplication({...applicationData})
        dispatch({
            type: SEND_APPLICATION,
            payload: data
        });
        console.log('--success', data);
    } catch (error) {
        console.error(error);
    }
};

export const productTaste = (dataObj) => async dispatch => {
    // @param status (Boolean) 
    try {
        console.log('----what do i get', dataObj)
    const { data } = await API.sendProductTaste({...dataObj})
    dispatch({
        type: LIKE_UNLIKE_PRODUCT,
        payload: data
    });
    } catch (error) {
        console.error(error);
    }
}