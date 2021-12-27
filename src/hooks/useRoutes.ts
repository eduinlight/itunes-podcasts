import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

export function useRoutes() {
  const navigate = useNavigate();

  const goToPodcastList = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const goToPodcastDetails = useCallback(
    (id: string) => {
      navigate(`/podcast/${id}`);
    },
    [navigate]
  );

  const goToPodcastEpisode = useCallback(
    (podcastId: string, episodeId: string) => {
      navigate(`/podcast/${podcastId}/episode/${episodeId}`);
    },
    [navigate]
  );

  return { goToPodcastList, goToPodcastDetails, goToPodcastEpisode };
}
