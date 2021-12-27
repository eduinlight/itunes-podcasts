import { createMachine } from "xstate";

interface Context {}

type Typestate = {
  value: "idle" | "loading";
  context: Context;
};

type Events = { type: "LOADING" } | { type: "IDLE" };

export const headerService = createMachine<Context, Events, Typestate>({
  id: "headerService",
  context: {},
  initial: "idle",
  states: {
    idle: {
      on: {
        LOADING: {
          target: "loading",
        },
      },
    },
    loading: {
      on: {
        IDLE: {
          target: "idle",
        },
      },
    },
  },
});
