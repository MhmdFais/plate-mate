import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import FullDetail from "./pages/FullDetail";
import Suggestion from "./pages/Suggestion";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/suggestion" element={<Suggestion />} />
        <Route path="/recipe/:id" element={<FullDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
