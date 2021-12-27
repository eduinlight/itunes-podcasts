import { GlobalStateProvider } from "./context";
import { Routes } from "./Routes";

export const App = () => {
  return (
    <GlobalStateProvider>
      <Routes />
    </GlobalStateProvider>
  );
};
