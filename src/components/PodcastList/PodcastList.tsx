import { useActor } from "@xstate/react";
import { ChangeEvent, useCallback, useContext, useEffect } from "react";
import { GlobalStateContext } from "../../context";
import { useHeaderActions } from "../../context/header/useHeaderActions";
import { usePodcastListActions } from "../../context/podcastList/usePodcastListActions";
import { useOnMount } from "../../hooks/useOnMount";
import { Alert } from "../shared/Alert";
import { Badge } from "../shared/Badge";
import { Button } from "../shared/Button";
import { Input } from "../shared/Input";
import { Loading } from "../shared/Loading";
import { PodcastCardList } from "../shared/PodcastCardList";

export const PodcastList = () => {
  const { podcastListService, headerService } = useContext(GlobalStateContext);
  const [state] = useActor(podcastListService);
  const { idle, loading } = useHeaderActions();
  const { fetchPodcasts, filtering, retry } = usePodcastListActions();

  useOnMount(() => {
    fetchPodcasts();
  });

  useEffect(() => {
    if (state.matches("idle") || state.matches("failure")) {
      idle();
    } else {
      loading();
    }
  }, [idle, loading, state]);

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      filtering(event.target.value);
    },
    [filtering]
  );

  const handleRetry = useCallback(() => {
    retry();
  }, [retry]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row sm:justify-end grow gap-2 items-center">
        <Badge value={state.context.filteredPodcasts.length} />
        <Input
          type="text"
          placeholder="Filter podcasts..."
          className="sm:grow-0 grow"
          name="search"
          value={state.context.search}
          onChange={handleChange}
        />
      </div>
      {state.matches("failure") && (
        <div className="flex flex-col gap-4">
          <Alert text="Error loading podcasts" type="error" />
          <Button
            label="retry"
            onClick={handleRetry}
            className="sm:self-start"
          />
        </div>
      )}
      {state.matches("idle") && state.context.filteredPodcasts.length === 0 && (
        <div className="mt-2">
          <Alert text="No podcast found." />
        </div>
      )}
      {state.matches("idle") && (
        <div className="block">
          <PodcastCardList podcasts={state.context.filteredPodcasts} />
        </div>
      )}
    </div>
  );
};
