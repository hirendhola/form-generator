import { BrowserRouter as Router, Route, Routes } from "react-router";
import Admin from "./pages/Admin";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Form from "./pages/Form";
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/form/:id" element={<Form />} />
        <Route path="/admin/" element={<Admin />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
