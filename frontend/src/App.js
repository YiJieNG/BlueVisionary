import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import BlueNavbar from "./components/Navbar/BlueNavbar";
import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/scss/bootstrap.scss";
import "./assets/scss/bluevisionary.scss";
import "./App.css";

import Home from "./pages/home/Home";
import MarineLife from "./pages/marinelife/MarineLife";
import Quiz from "./pages/education/Quiz";
import Home_1 from "./iter1/home/Home_1";
import MarineLife_1 from "./iter1/marinelife/MarineLife_1";
import Quiz_1 from "./iter1/education/Quiz_1";
import BlueNavbar_1 from "./components/Navbar/BlueNavbar_1";

function Layout() {
  const location = useLocation(); // This is now inside a child of Router

  return (
    <>
      {/* Conditionally render Navbar based on the current path */}
      {location.pathname === "/" ? <BlueNavbar /> : <BlueNavbar_1 />}
    </>
  );
}

function App() {
  // const location = useLocation();
  // const { hash, pathname, search } = location;
  return (
    <Router>
      <Layout />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/marinelife" element={<MarineLife />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/iter1" element={<Home_1 />} />
        <Route path="/iter1/marinelife" element={<MarineLife_1 />} />
        <Route path="/iter1/quiz" element={<Quiz_1 />} />
      </Routes>
    </Router>
  );
}

export default App;
