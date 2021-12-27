import { useActor } from "@xstate/react";
import { useCallback, useContext, useEffect } from "react";
import { Outlet, useParams } from "react-router-dom";
import { GlobalStateContext } from "../../context";
import { useHeaderActions } from "../../context/header/useHeaderActions";
import { usePodcastDetailsActions } from "../../context/podcastDetails/usePodcastDetailsActions";
import { useOnMount } from "../../hooks/useOnMount";

export const PodcastDetails = () => {
  const { podcastDetailsService } = useContext(GlobalStateContext);
  const [state] = useActor(podcastDetailsService);
  const { idle, loading } = useHeaderActions();
  const { fetchPodcast, retry } = usePodcastDetailsActions();
  const params = useParams();

  useOnMount(() => {
    if (params.podcastId) {
      fetchPodcast(params.podcastId);
    }
  });

  useEffect(() => {
    if (state.matches("idle") || state.matches("failure")) {
      idle();
    } else {
      loading();
    }
  }, [idle, loading, state]);

  const handleRetry = useCallback(() => {
    retry();
  }, [retry]);

  console.log(state.context);

  return (
    <div>
      podcast details <Outlet />
    </div>
  );
};
