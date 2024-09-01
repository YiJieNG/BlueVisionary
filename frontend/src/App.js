import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BlueNavbar from "./components/Navbar/BlueNavbar";
import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/scss/bootstrap.scss";
import "./assets/scss/bluevisionary.scss";
import "./App.css";

import Home from "./pages/home/Home";
import MarineLife from "./pages/marinelife/MarineLife";
import Quiz from "./pages/education/Quiz";
import MiniGame from "./pages/minigame/MiniGame";

function App() {
  return (
    <Router>
      <BlueNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/marinelife" element={<MarineLife />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/minigame" element={<MiniGame />} />
      </Routes>
    </Router>
  );
}

export default App;
