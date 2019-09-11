import { Coords } from "lib/rooms";
import { Reducer, useCallback, useReducer } from "react";
import { createContainer } from "unstated-next";

enum ActionType {
  Append,
  Reset,
}

interface Action<T> {
  type: ActionType;
  payload?: T;
}

type State = Coords[];

const reducer: Reducer<State, Action<any>> = (state, action) => {
  switch (action.type) {
    case ActionType.Reset:
      return [];
    case ActionType.Append:
      return [...state, action.payload];
    default:
      return state;
  }
};

function useJourney(): [Coords[], (payload: Coords) => void, () => void] {
  const [journey, dispatch] = useReducer<typeof reducer>(reducer, []);
  const appendToJourney = useCallback(
    (payload: Coords) => dispatch({ type: ActionType.Append, payload }),
    [],
  );

  const resetJourney = useCallback(
    () => dispatch({ type: ActionType.Reset }),
    [],
  );

  return [journey, appendToJourney, resetJourney];
}

export default createContainer(useJourney);
