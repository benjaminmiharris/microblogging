import Home from "./views/Home";
import Profile from "./views/Profile";
import Navbarstrip from "./components/Navbar";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <nav>
        <Navbarstrip />
      </nav>
      //Test
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
