import { Switch, Route } from "react-router";
import Home from "./pages/home/Home";
import Game from "./pages/game/Game";
import { Provider } from "react-redux";
import store from "./redux/store";
import './App.css'
function App() {
  console.log("entered");
  return (

    <Provider store={store}>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/start" exact component={Home} />
        <Route path="/game" exact component={Game} />
      </Switch>
    </Provider>
  );
}

export default App;
