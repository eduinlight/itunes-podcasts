import { BrowserRouter, Routes as RDRoutes, Route } from "react-router-dom";
import { NotFound } from "./components/NotFound";
import {
  PodcastDetails,
  PodcastEpisode,
  PodcastEpisodeList,
} from "./components/PodcastDetails";
import { PodcastList } from "./components/PodcastList";
import { GuestLayout } from "./layouts/guests";

export const Routes = () => {
  return (
    <BrowserRouter>
      <RDRoutes>
        <Route path="/" element={<GuestLayout />}>
          <Route index element={<PodcastList />} />
          <Route path="podcast/:podcastId" element={<PodcastDetails />}>
            <Route index element={<PodcastEpisodeList />} />
            <Route path="episode/:episodeId" element={<PodcastEpisode />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </RDRoutes>
    </BrowserRouter>
  );
};
