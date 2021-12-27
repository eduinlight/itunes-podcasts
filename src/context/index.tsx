import { createContext, FC, PropsWithChildren } from "react";
import { ActorRefFrom } from "xstate";
import { useInterpret } from "@xstate/react";
import { podcastListService as plService } from "./podcastList/service";

interface GlobalStateContextType {
  podcastListService: ActorRefFrom<typeof plService>;
}

export const GlobalStateContext = createContext({} as GlobalStateContextType);

export const GlobalStateProvider: FC<PropsWithChildren<{}>> = ({
  children,
}) => {
  const podcastListService = useInterpret(plService);

  return (
    <GlobalStateContext.Provider value={{ podcastListService }}>
      {children}
    </GlobalStateContext.Provider>
  );
};
