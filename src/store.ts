import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { formReducer, modalReducer } from './reducers/appReducers';
import { postReducer } from './reducers/postReducers';

const reducer = combineReducers({
	postReducer: postReducer,
	modalReducer: modalReducer,
	formReducer: formReducer,
});

const middleware = [thunk];

const store = createStore(
	reducer,
	composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
