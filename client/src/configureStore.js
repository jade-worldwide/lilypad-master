/**
 * Main store function
 */
import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducers";
import thunk from "redux-thunk";

export default function configureStore(initialState = {}) {
	const reduxDevTool =
		typeof window !== "undefined" &&
		window.__REDUX_DEVTOOLS_EXTENSION__ &&
		window.__REDUX_DEVTOOLS_EXTENSION__();

	// Middleware and store enhancers
	const enhancers = [applyMiddleware(thunk), reduxDevTool].filter(f => !!f);

	const store = createStore(rootReducer, initialState, compose(...enhancers));

	return store;
}