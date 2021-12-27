import { useCallback, useContext } from "react";
import { GlobalStateContext } from "..";

export function usePodcastDetailsActions() {
  const { podcastDetailsService } = useContext(GlobalStateContext);

  const fetchPodcast = useCallback(
    (id: string) => {
      podcastDetailsService.send({
        type: "FETCH_PODCAST",
        payload: id,
      });
    },
    [podcastDetailsService]
  );

  const retry = useCallback(() => {
    podcastDetailsService.send({
      type: "RETRY",
    });
  }, [podcastDetailsService]);

  return { retry, fetchPodcast };
}
