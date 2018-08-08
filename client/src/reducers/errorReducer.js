//errorReducer.js
import {
    CLEAR_ERROR_MESSAGE,
    DISPLAY_ERROR_MESSAGE
  } from "../constants/actionTypes";
  
  const initialState = { errorMessage: "" };
  
  const errorReducer = (state = initialState, {error, type}) => {
    switch (type) {
      case CLEAR_ERROR_MESSAGE:
        return {...state,errorMessage: error}
      case DISPLAY_ERROR_MESSAGE:
        return {...state,errorMessage: error}
      default:
        return state;
    }
  };
  
  export default errorReducer;
  