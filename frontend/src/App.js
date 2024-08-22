import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'


import 'bootstrap/dist/css/bootstrap.min.css';
// import "bootstrap/scss/bootstrap.scss";
import './assets/scss/bluevisionary.scss';
import './App.css'

import Home from './pages/home/Home';
import MarineLife from './pages/marinelife/MarineLife';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/marinelife" element={<MarineLife />} />
      </Routes>
    </Router>
  );
}

export default App;