import Home from "./views/Home";
import Profile from "./views/Profile";
import Error from "./views/Error";
import Navbarstrip from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <Navbarstrip />
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
