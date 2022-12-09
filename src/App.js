
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/home/home";
import Property from "./components/property/property.jsx";
import SearchPrty from "./components/searched_stay_prty/searched_prty";
import Login from './components/signin/login'
import SignUp from "./components/signup/signUp";
import "./App.css";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/property" element={<Property />} />
          <Route path="/property/:id" element={<SearchPrty />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
