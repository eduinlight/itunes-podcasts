import { combineReducers } from "redux";
import podcastListReducer from "./podcastList";

export const rootReducer = combineReducers({
  podcastList: podcastListReducer,
});

export type RootReducerType = ReturnType<typeof rootReducer>;
