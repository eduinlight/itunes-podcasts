import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootReducerType } from "../store/rootReducer";

export const useTypedSelector: TypedUseSelectorHook<RootReducerType> =
  useSelector;
