import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import BlueNavbar from "./components/Navbar/BlueNavbar";
import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/scss/bootstrap.scss";
import "./assets/scss/bluevisionary.scss";
import "./App.css";

import Home from "./pages/home/Home";
import MarineLife from "./pages/marinelife/MarineLife";
import Quiz from "./pages/education/Quiz";
import MiniGame from "./pages/seaTurtleGame/SeaTurtleGame";
import Pollution from "./pages/pollution/Pollution";
import Home_1 from "./iter1/home/Home_1";
import MarineLife_1 from "./iter1/marinelife/MarineLife_1";
import Quiz_1 from "./iter1/education/Quiz_1";
import BlueNavbar_1 from "./components/Navbar/BlueNavbar_1";
import NotFound from "./pages/NotFound";

function Layout() {
  const location = useLocation();

  return (
    <>
      {/* Conditionally render Navbar based on the current path */}
      {location.pathname.includes("iter1") ? <BlueNavbar_1 /> : <BlueNavbar />}
    </>
  );
}

function App() {
  return (
    <Router>
      <Layout />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/marinelife" element={<MarineLife />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/seaturtlegame" element={<MiniGame />} />
        <Route path="/iter1" element={<Home_1 />} />
        <Route path="/iter1/marinelife" element={<MarineLife_1 />} />
        <Route path="/iter1/quiz" element={<Quiz_1 />} />
        <Route path="/pollution" element={<Pollution />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
