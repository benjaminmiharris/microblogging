import Home from "./views/Home";
import Profile from "./views/Profile";
import Error from "./views/Error";
import Login from "./views/Login";

import Navbarstrip from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { UsernameContext } from "./context/UsernameContext";

function App() {
  const { isAuth } = useContext(UsernameContext);
  return (
    <Router>
      <div className="App">
        <nav>
          <Navbarstrip />
        </nav>
        <Routes>
          {isAuth && (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
            </>
          )}
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
