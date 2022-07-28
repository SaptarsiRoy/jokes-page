// react-router-dom
import { HashRouter as Router, Route, Routes } from "react-router-dom";

// components
import Navbar from './components/Navbar';

// pages
import AddJokes from './pages/add_jokes/AddJokes';
import ViewJokes from './pages/view_jokes/ViewJokes';
import Contact from "./pages/contact/Contact";
import Login from "./pages/login/Login";
import Register from "./pages/registration/Registration";

// styles
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<ViewJokes />} />
          <Route path="/add" element={<AddJokes />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
