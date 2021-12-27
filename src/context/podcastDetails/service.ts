import { createMachine } from "xstate";
import { cancel, assign, send } from "xstate/lib/actions";
import { IPodcast } from "../../core/interfaces/podcast.model";
import { avoidCors, Http, loadKey, saveKey } from "../../utils";
import { getPodcastsResponseToPodcast } from "../../utils/mapper";
import { matchSorter } from "match-sorter";
import {
  ONE_DAY_IN_SECONDS,
  PODCAST_DETAILS_STORAGE_KEY,
} from "../../core/constants";

interface Context {
  podcast?: IPodcast;
  id?: string;
}

type Typestate = {
  value: "init" | "loading" | "failure" | "idle";
  context: Context;
};

type Events =
  | { type: "FETCH_PODCAST"; payload: string }
  | { type: "RETRY" }
  | { type: "FILTER" };

export const podcastDetailsService = createMachine<Context, Events, Typestate>({
  id: "podcastDetailsService",
  context: {
    podcast: undefined,
    id: undefined,
  },
  initial: "init",
  states: {
    init: {
      on: {
        FETCH_PODCAST: {
          target: "loading",
          actions: assign((_, event) => ({ id: event.payload })),
        },
      },
    },
    loading: {
      invoke: {
        id: "fetchPodcastDetails",
        src: (context) => {
          // const podcastDetails = loadKey(PODCAST_DETAILS_STORAGE_KEY);
          // if (podcastDetails) {
          //   return Promise.resolve({ fromStorage: true, podcasts });
          // }
          return Http.get(
            avoidCors(`https://itunes.apple.com/lookup?id=${context.id}`)
          );
        },
        onDone: {
          target: "idle",
          actions: assign((_, event) => {
            // const podcasts = event.data.fromStorage
            //   ? event.data.podcasts
            //   : getPodcastsResponseToPodcast(
            //       JSON.parse(event.data.data.contents)
            //     );

            // @todo uncomment this
            // saveKey(PODCASTS_STORAGE_KEY, podcasts, ONE_DAY_IN_SECONDS);

            return {
              podcast: JSON.parse(event.data.data.contents),
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
      type: "final",
    },
  },
});
