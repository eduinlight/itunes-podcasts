import { IPodcast } from "../core/interfaces/podcast.model";
import dayjs from "dayjs";

export function getPodcastsResponseToPodcast(response: any): IPodcast[] {
  return response.feed.entry.map(
    (entry: any) =>
      ({
        id: entry.id.attributes["im:id"],
        name: entry["im:name"].label,
        category: {
          id: entry.category.attributes["im:id"],
          name: entry.category.attributes.label,
        },
        image55x55: entry["im:image"][0].label,
        image60x60: entry["im:image"][1].label,
        image170x170: entry["im:image"][2].label,
        releaseDate: dayjs(entry["im:releaseDate"].label).toDate(),
        title: entry.title.label,
        artist: entry["im:artist"].label,
        summary: entry.summary.label,
      } as IPodcast)
  );
}
