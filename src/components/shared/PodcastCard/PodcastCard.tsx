import { FC } from "react";
import { IPodcast } from "../../../core/interfaces/podcast.model";
import { collapseString } from "../../../utils";

export interface PodcastCardProps {
  podcast: IPodcast;
}

export const PodcastCard: FC<PodcastCardProps> = ({ podcast }) => {
  return (
    <div className="relative flex flex-col justify-end items-center pt-[100px] sm:mt-[100px] cursor-pointer hover:shadow-xl">
      <img
        className="rounded-full w-[140px] h-[140px] absolute top-[35px]"
        alt={podcast.name}
        src={podcast.image170x170}
      />
      <div
        key={podcast.id}
        className="flex flex-col gap-2 shadow-lg p-4 w-full h-[170px] justify-end hover:shadow-xl"
      >
        <h1
          className="text-md text-black uppercase text-center leading-[17px]"
          title={podcast.name}
        >
          {collapseString(podcast.name, 50)}
        </h1>
        <h1
          className="text-sm text-gray-500 text-center leading-[15px]"
          title={podcast.artist}
        >
          {collapseString(`Author: ${podcast.artist}`, 50)}
        </h1>
      </div>
    </div>
  );
};
