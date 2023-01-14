import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/home";
import Session from "./pages/session";
import Browse from "./pages/browse";
import NavBar from "./components/NavBar";

function App() {
  return (
    <div className="mt-20">
      <Router>
        <NavBar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/session" element={<Session />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
