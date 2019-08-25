import { Coords } from "lib/rooms";
import { Reducer, useCallback, useReducer } from "react";
import { createContainer } from "unstated-next";

enum ActionType {
  Append,
}

interface Action {
  type: ActionType;
  payload: Coords;
}

type State = Coords[];

const reducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case ActionType.Append:
      return [...state, action.payload];
    default:
      return state;
  }
};

function useJourney(): [Coords[], (payload: Coords) => void] {
  const [journey, dispatch] = useReducer<typeof reducer>(reducer, []);
  const appendToJourney = useCallback(
    (payload: Coords) => dispatch({ type: ActionType.Append, payload }),
    [],
  );

  return [journey, appendToJourney];
}

export default createContainer(useJourney);
