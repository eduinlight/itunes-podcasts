import { FC } from "react";
import { IPodcast } from "../../../core/interfaces/podcast.model";
import { useRoutes } from "../../../hooks/useRoutes";
import { PodcastCard } from "../PodcastCard/PodcastCard";

export interface PodcastCardListProps {
  podcasts: IPodcast[];
}

export const PodcastCardList: FC<PodcastCardListProps> = ({ podcasts }) => {
  const { goToPodcastDetails } = useRoutes();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-4 gap-8 xl:grid-cols-5">
      {podcasts.map((podcast) => (
        <PodcastCard
          podcast={podcast}
          key={podcast.id}
          onClick={() => goToPodcastDetails(podcast.id)}
        />
      ))}
    </div>
  );
};
