import { combineReducers } from "redux";
import userReducer, { UserState } from "./reducers/userReducer";
import gameReducer, { GameState } from "./reducers/gameReducer";
export interface GlobalStateDefinition {
  user: UserState;
  game: GameState;
}
const rootReducer = combineReducers<GlobalStateDefinition>({
  user: userReducer,
  game: gameReducer,
});

export default rootReducer;
