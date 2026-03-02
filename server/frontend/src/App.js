import LoginPanel from "./components/Login/Login.jsx"
import Register from "./components/Register/Register.jsx"
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPanel />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<div><h1>Welcome to Dealership</h1><p><a href="/login">Login</a></p></div>} />
    </Routes>
  );
}
export default App;
