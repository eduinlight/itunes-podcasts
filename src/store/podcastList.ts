import { createMachine } from "xstate";

interface Context {}

type Events = { type: "" };

const podcastListMachine = createMachine<Context>({
  id: "podcastListMachine",
  context: {},
  initial: "idle",
  states: {
    idle: {},
  },
});

export default function podcastListReducer(
  state = podcastListMachine.initialState,
  event: Events
) {
  return podcastListMachine.transition(state, event);
}
