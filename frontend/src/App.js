import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'


import 'bootstrap/dist/css/bootstrap.min.css';
// import "bootstrap/scss/bootstrap.scss";
import './assets/scss/bluevisionary.scss';

import Home from './pages/home/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}> </Route>
      </Routes>
    </Router>
  );
}

export default App;