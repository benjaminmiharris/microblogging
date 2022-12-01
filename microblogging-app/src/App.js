import Home from "./views/Home";
import Profile from "./views/Profile";
import Error from "./views/Error";
import Navbarstrip from "./components/Navbar";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
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
  );
}

export default App;
