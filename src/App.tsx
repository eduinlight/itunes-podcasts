import { Provider } from "react-redux";
import { Routes } from "./Routes";
import store from "./store";

export const App = () => {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
};
