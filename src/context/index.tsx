import { createContext, FC, PropsWithChildren } from "react";
import { ActorRefFrom } from "xstate";
import { useInterpret } from "@xstate/react";
import { podcastListService as plService } from "./podcastList/service";
import { headerService as hService } from "./header/service";

interface GlobalStateContextType {
  podcastListService: ActorRefFrom<typeof plService>;
  headerService: ActorRefFrom<typeof hService>;
}

export const GlobalStateContext = createContext({} as GlobalStateContextType);

export const GlobalStateProvider: FC<PropsWithChildren<{}>> = ({
  children,
}) => {
  const podcastListService = useInterpret(plService);
  const headerService = useInterpret(hService);

  return (
    <GlobalStateContext.Provider value={{ podcastListService, headerService }}>
      {children}
    </GlobalStateContext.Provider>
  );
};
