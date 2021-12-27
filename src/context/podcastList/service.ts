import { createMachine } from "xstate";
import { cancel, assign, send } from "xstate/lib/actions";
import { IPodcast } from "../../core/interfaces/podcast.model";
import { avoidCors, Http, loadKey, saveKey } from "../../utils";
import { getPodcastsResponseToPodcast } from "../../utils/mapper";
import { matchSorter } from "match-sorter";
import { ONE_DAY_IN_SECONDS, PODCASTS_STORAGE_KEY } from "../../core/constants";

interface Context {
  podcasts: IPodcast[];
  filteredPodcasts: IPodcast[];
  search: string;
}

type Typestate = {
  value: "init" | "loading" | "failure" | "idle";
  context: Context;
};

type Events =
  | { type: "FETCH_PODCASTS" }
  | { type: "RETRY" }
  | { type: "FILTER" }
  | { type: "FILTERING"; payload: string };

export const podcastListService = createMachine<Context, Events, Typestate>({
  id: "podcastListService",
  context: {
    podcasts: [],
    filteredPodcasts: [],
    search: "",
  },
  initial: "init",
  states: {
    init: {
      on: {
        FETCH_PODCASTS: {
          target: "loading",
        },
      },
    },
    loading: {
      invoke: {
        id: "fetchPodcasts",
        src: () => {
          const podcasts = loadKey(PODCASTS_STORAGE_KEY);
          if (podcasts) {
            return Promise.resolve({ fromStorage: true, podcasts });
          }
          return Http.get(
            avoidCors(
              "https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json"
            )
          );
        },
        onDone: {
          target: "idle",
          actions: assign((_, event) => {
            const podcasts = event.data.fromStorage
              ? event.data.podcasts
              : getPodcastsResponseToPodcast(
                  JSON.parse(event.data.data.contents)
                );

            saveKey(PODCASTS_STORAGE_KEY, podcasts, ONE_DAY_IN_SECONDS);

            return {
              podcasts,
              filteredPodcasts: [...podcasts],
            };
          }),
        },
        onError: {
          target: "failure",
        },
      },
    },
    failure: {
      on: {
        RETRY: {
          target: "loading",
        },
      },
    },
    idle: {
      on: {
        FILTERING: {
          actions: [
            assign((_, event) => ({ search: event.payload })),
            cancel("debounce-filter"),
            send("FILTER", {
              delay: 450,
              id: "debounce-filter",
            }),
          ],
        },
        FILTER: {
          actions: assign((context) => {
            return {
              filteredPodcasts: matchSorter(context.podcasts, context.search, {
                keys: ["title", "artist"],
              }),
            };
          }),
        },
      },
    },
  },
});
