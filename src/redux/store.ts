import { createStore } from "redux";
import rootReducer from "./rootReducer";
// import {composeWithDevTools} from 'redux-devtools-extension';


// const store = createStore(rootReducer, composeWithDevTools());
const store = createStore(rootReducer);

export default store;
