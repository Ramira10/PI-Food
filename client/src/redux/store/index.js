import { applyMiddleware, createStore, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "../reducer";

const store = createStore(
    rootReducer,
    compose(applyMiddleware(thunk))
);

export default store;