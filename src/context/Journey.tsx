import { Direction } from "lib/rooms";
import { Reducer, useCallback, useReducer } from "react";
import { createContainer } from "unstated-next";

enum ActionType {
  Append,
}

interface Action {
  type: ActionType;
  payload: Direction;
}

type State = Direction[];

const reducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case ActionType.Append:
      return [...state, action.payload];
    default:
      return state;
  }
};

function useJourney(): [Direction[], (payload: Direction) => void] {
  const [journey, dispatch] = useReducer<typeof reducer>(reducer, []);
  const appendToJourney = useCallback(
    (payload: Direction) => dispatch({ type: ActionType.Append, payload }),
    [],
  );

  return [journey, appendToJourney];
}

export default createContainer(useJourney);
