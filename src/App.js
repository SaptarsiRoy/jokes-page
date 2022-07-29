// react-router-dom
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

// components
import Navbar from "./components/Navbar";

// cookies
import { useCookies } from "react-cookie";

// pages
import AddJokes from "./pages/add_jokes/AddJokes";
import ViewJokes from "./pages/view_jokes/ViewJokes";
import Contact from "./pages/contact/Contact";
import Login from "./pages/login/Login";
import Register from "./pages/registration/Registration";

// styles
import "./App.css";

function App() {
  const [cookies] = useCookies(["user"]);
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<ViewJokes />} />
          <Route
            path="/add"
            element={cookies.user ? <AddJokes /> : <Navigate to="/login" />}
          />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/login"
            element={!cookies.user ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="/register"
            element={!cookies.user ? <Register /> : <Navigate to="/" />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
