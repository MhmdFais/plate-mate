import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const API_URL = "http://localhost:3000";

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/register`, {
        email,
        password,
        name,
      });

      const data = response.data;

      console.log("Registered user:", data);
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mainContainer">
      <div className="loginContainer">
        <h1>Register</h1>
        <div className="loginFormContainer">
          <form onSubmit={handleSubmit}>
            <div className="formElement">
              <label htmlFor="nameInput">Name</label>
              <input
                id="nameInput"
                type="text"
                placeholder="Name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
              />
            </div>
            <div className="formElement">
              <label htmlFor="emailInput">Email</label>
              <input
                id="emailInput"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>
            <div className="formElement">
              <label htmlFor="passwordInput">Password</label>
              <input
                id="passwordInput"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </div>
            <div className="formElement">
              <label htmlFor="confirmPasswordInput">Confirm Password</label>
              <input
                id="confirmPasswordInput"
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                required
              />
            </div>
            <button type="submit">Register</button>
          </form>
          <p>
            Already Have an Account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
