import {applyMiddleware, createStore} from "redux";
import {appReducer} from "./app-reducer";
import thunk from "redux-thunk";

export const store = createStore(appReducer, applyMiddleware(thunk));

//@ts-ignore
window.store = store;