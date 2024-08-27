import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../Logo.png";
import AuthContext from "../../contexts/authContext";
import { validateLogin } from "../../services/firebase";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const history = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const user = {
      email,
      password,
    };

    if (validateLogin(email.toLocaleLowerCase(), password)) {
      login(user.email);
      history("/");
    } else {
      alert("Email o contraseña incorrectos");
    }
  };

  return (
    <div className="border border-black shadow-xl p-4 max-w-md mx-auto mt-10 bg-white rounded-lg">
      <img src={logo} alt="Logo" className="w-60 mx-auto mb-10" />
      <h2 className="text-center font-bold text-2xl mb-4">Login</h2>
      <form id="loginForm" onSubmit={handleSubmit} className="space-y-4">
        <div className="form-group">
          <label htmlFor="email" className="block font-semibold text-center">
            E-mail:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mx-auto flex justify-center w-fit px-4 py-2 border border-gray-300 shadow-md rounded-md focus:outline-none focus:ring-2 focus:ring-beige"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="block font-semibold text-center">
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mx-auto flex justify-center w-fit px-4 py-2 border border-gray-300 shadow-md rounded-md focus:outline-none focus:ring-2 focus:ring-beige"
          />
        </div>
        <button
          type="submit"
          className="p-4 border-2 border-beige rounded-lg mx-auto flex justify-center bg-beige text-white w-40"
        >
          Login
        </button>
      </form>
      <button
        id="registerButton"
        className="mt-2 p-4 border-2 border-beige rounded-lg mx-auto flex justify-center bg-beige text-white w-40"
        onClick={() => history("/register")}
      >
        Register
      </button>
    </div>
  );
};

export default LoginForm;
