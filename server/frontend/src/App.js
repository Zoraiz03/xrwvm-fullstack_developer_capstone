import LoginPanel from "./components/Login/Login.jsx"
import Register from "./components/Register/Register.jsx"
import About from "./components/About/About.jsx"
import Cars from "./components/Cars/Cars.jsx"
import Contact from "./components/Contact/Contact.jsx"
import Dealers from "./components/Dealers/Dealers"
import Dealer from "./components/Dealers/Dealer"
import PostReview from "./components/Dealers/PostReview"
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<div><h1>Welcome to Dealership</h1><p><a href="/login">Login</a></p></div>} />
      <Route path="/login" element={<LoginPanel />} />
      <Route path="/register" element={<Register />} />
      <Route path="/about" element={<About />} />
      <Route path="/cars" element={<Cars />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/dealers" element={<Dealers />} />
      <Route path="/dealer/:id" element={<Dealer />} />
      <Route path="/postreview/:id" element={<PostReview />} />
    </Routes>
  );
}
export default App;
