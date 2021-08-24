import "./sass/styles.scss";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Favourites from "./components/Favourites";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/favourites">
            <Favourites />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
