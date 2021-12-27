import { IPodcastCategory } from "./podcast-category.model";

export interface IPodcast {
  id: string;
  name: string;
  category: IPodcastCategory;
  artist: string;
  image55x55: string;
  image60x60: string;
  image170x170: string;
  title: string;
  summary: string;
  releaseDate: Date;
}
