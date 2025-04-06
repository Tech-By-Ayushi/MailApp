import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../utils/api";

export default function Register() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/register", form);
      alert("Registered! Login now.");
      navigate("/login");
    } catch {
      alert("User exists or error");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      <input name="email" onChange={e => setForm({ ...form, email: e.target.value })} required />
      <input name="password" type="password" onChange={e => setForm({ ...form, password: e.target.value })} required />
      <button type="submit">Register</button>
      <p>Have an account? <Link to="/login">Login</Link></p>
    </form>
  );
}
