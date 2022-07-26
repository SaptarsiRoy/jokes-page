// react-router-dom
import { HashRouter as Router, Route, Routes } from "react-router-dom";

// components
import Navbar from './components/Navbar';

// pages
import AddJokes from './pages/AddJokes';
import ViewJokes from './pages/ViewJokes';
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";

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
