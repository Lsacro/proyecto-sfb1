import { useState } from "react";
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
    <div className="border border-black shadow-xl p-4 max-w-md mx-auto mt-10 bg-white">
      <img src={logo} alt="Logo" className="logo" />
      <h2 className="text-center font-bold" style={{ fontSize: "30px" }}>
        Login
      </h2>
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
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
