import { useState } from "react"; // import useState from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../Logo.png";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (
      storedUser &&
      storedUser.email === email &&
      storedUser.password === password
    ) {
      alert("Login exitoso");
      history.push("/HomePage"); // Aqui va link a home
    } else {
      alert("Correo electrónico o contraseña incorrectos");
    }
  };

  const handleRegister = () => {
    history.push("/register");
  };

  return (
    <div className="container">
      <img src={logo} alt="Logo" className="logo" />
      <h2>Login</h2>
      <form id="loginForm" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">E-mail:</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <button id="registerButton" onClick={handleRegister}>
        Register
      </button>
    </div>
  );
};

export default LoginForm;
