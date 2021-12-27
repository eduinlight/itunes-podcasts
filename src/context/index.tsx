import { createContext, FC, PropsWithChildren } from "react";
import { ActorRefFrom } from "xstate";
import { useInterpret } from "@xstate/react";
import { podcastListService as plService } from "./podcastList/service";
import { headerService as hService } from "./header/service";
import { podcastDetailsService as pdService } from "./podcastDetails/service";

interface GlobalStateContextType {
  podcastListService: ActorRefFrom<typeof plService>;
  headerService: ActorRefFrom<typeof hService>;
  podcastDetailsService: ActorRefFrom<typeof pdService>;
}

export const GlobalStateContext = createContext({} as GlobalStateContextType);

export const GlobalStateProvider: FC<PropsWithChildren<{}>> = ({
  children,
}) => {
  const podcastListService = useInterpret(plService);
  const headerService = useInterpret(hService);
  const podcastDetailsService = useInterpret(pdService);

  return (
    <GlobalStateContext.Provider
      value={{ podcastListService, headerService, podcastDetailsService }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
};
