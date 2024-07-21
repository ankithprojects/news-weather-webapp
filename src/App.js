import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import News from "./News";
import Weather from "./Weather";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app-container">
        <nav className="app-nav">
          <Link className="nav-button" to="/news">
            News
          </Link>
          <Link className="nav-button" to="/weather">
            Weather
          </Link>
        </nav>
        <div className="content-container">
          <Routes>
            <Route path="/news" element={<News />} />
            <Route path="/weather" element={<Weather />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
