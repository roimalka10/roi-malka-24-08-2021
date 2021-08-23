import "./sass/styles.scss";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Home />
      </Router>
    </div>
  );
}

export default App;
