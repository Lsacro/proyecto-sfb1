//Componente menu de navegacion para toda la app

import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../Logo.png";
import { getToken } from "../../services/authService";
import { findNameByEmail } from "../../services/firebase";
import AuthContext from "../../contexts/authContext";

function Navbar({ onDeleteProfile }) {
  const token = getToken();
  const tokenFirstName = findNameByEmail(token);

  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const { logout } = useContext(AuthContext);

  const handleLogout = (event) => {
    event.preventDefault();
    logout();
    setIsOpen(false);
    navigate("/login");
  };

  const handleDeleteProfile = () => {
    if (window.confirm("¿Borrar Perfil?")) {
      onDeleteProfile();
      navigate("/login");
    }
  };

  const handleLogoClick = () => {
    navigate("/");
  };
  return (
    <div className="flex flex-wrap justify-between mx-16 mt-4 items-center">
      <img
        className="w-64"
        src={Logo}
        alt="Sin Flat Busque 1"
        onClick={handleLogoClick}
      />
      <div className="flex items-center">
        <span className="text-beige text-xl mr-4">Bienvenido</span>
        <div
          className="p-4 border-2 border-beige rounded-full flex gap-4 bg-beige text-white cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <img
            className="w-6 color invert"
            src="https://cdn-icons-png.flaticon.com/512/56/56763.png"
            alt="menu"
          />
          {tokenFirstName.firstName}
          <img
            className="w-6"
            src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
            alt="profile"
          />
        </div>
      </div>

      {isOpen && (
        <div className="absolute right-16 top-20 bg-white shadow-lg rounded-md p-4">
          <button
            className="absolute top-2 right-2 text-brown font-bold"
            onClick={() => setIsOpen(false)}
          >
            ✖️
          </button>
          <ul className="flex flex-col gap-2">
            <li>
              <Link
                className="hover:text-beige"
                to="/"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                className="hover:text-beige"
                to="/myprofile"
                onClick={() => setIsOpen(false)}
              >
                Mi Perfil
              </Link>
            </li>
            <li>
              <Link
                className="hover:text-beige"
                to="/my-flats"
                onClick={() => setIsOpen(false)}
              >
                Mis Flats
              </Link>
            </li>
            <li>
              <Link
                className="hover:text-beige"
                to="/favourites"
                onClick={() => setIsOpen(false)}
              >
                Favoritos
              </Link>
            </li>
            <li>
              <Link
                className="hover:text-beige"
                to="/login"
                onClick={handleLogout}
              >
                LogOut
              </Link>
            </li>
            <li>
              <button
                className="hover:text-beige"
                onClick={() => {
                  setIsOpen(false);
                  handleDeleteProfile();
                }}
              >
                Borrar Perfil
              </button>
            </li>
            <li>
              <Link
                className="hover:text-beige"
                to="/allusers"
                onClick={() => setIsOpen(false)}
              >
                All Users
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Navbar;
