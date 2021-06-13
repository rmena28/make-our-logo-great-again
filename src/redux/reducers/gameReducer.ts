import GameTypes from "../types/GameTypes";

export type GameState = {
  started: boolean;
  wrongPlacement: number;
  gameEnded?: boolean;
};
export type GameReducerProps = {
  type: GameTypes;
  payload?: any;
};

const initialState: GameState = { started: false, wrongPlacement: 0 };

export default function gameReducer(
  state: GameState = initialState,
  action: GameReducerProps
) {
  switch (action.type) {
    case GameTypes.SET_START:
      return { ...state, started: true, gameEnded: false };
    case GameTypes.SET_WRONG_PLACEMENT:
      return { ...state, wrongPlacement: state.wrongPlacement + 1 };
    case GameTypes.SET_RESTART:
      return { ...initialState };
    case GameTypes.SET_GAME_ENDED:
      return { ...state, gameEnded: true, started: false };
    default:
      return { ...state };
  }
}
