import { applyMiddleware, createStore } from "redux";
import logger from "redux-logger";
import { rootReducer } from "./rootReducer";

const initialState = {};

let middlewares = applyMiddleware();

if (process.env.NODE_ENV === "development") {
  middlewares = applyMiddleware(logger);
}

const store = createStore(rootReducer, initialState, middlewares);

export default store;
