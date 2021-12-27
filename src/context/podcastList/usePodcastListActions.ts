import { useCallback, useContext } from "react";
import { GlobalStateContext } from "..";

export function usePodcastListActions() {
  const { podcastListService } = useContext(GlobalStateContext);

  const fetchPodcasts = useCallback(() => {
    podcastListService.send({
      type: "FETCH_PODCASTS",
    });
  }, [podcastListService]);

  const retry = useCallback(() => {
    podcastListService.send({
      type: "RETRY",
    });
  }, [podcastListService]);

  const filtering = useCallback(
    (str: string) => {
      podcastListService.send({
        type: "FILTERING",
        payload: str,
      });
    },
    [podcastListService]
  );

  return { retry, fetchPodcasts, filtering };
}
