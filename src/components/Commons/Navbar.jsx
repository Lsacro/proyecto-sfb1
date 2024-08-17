//Componente menu de navegacion para toda la app
import { Link } from "react-router-dom";
import Logo from "../../Logo.png";

function Navbar({ name }) {
  return (
    <div className="flex flex-wrap mx-16 mt-4">
      <img className="w-64" src={Logo} alt="Sin Flat Busque 1" />

      <nav className="flex flex-grow justify-end items-center gap-16">
        <Link className="hover:text-beige hover:underline" to="/">
          Home
        </Link>
        <Link className="hover:text-beige hover:underline" to="/favourites">
          Favourites
        </Link>
        <Link className=" hover:text-beige hover:underline" to="/my-flats">
          My Flats
        </Link>
        <Link className=" hover:text-beige hover:underline" to="/my-profile">
          My Profile
        </Link>
        <p className="p-4 border-2 border-beige rounded-full flex gap-4 bg-beige text-white">
          {name}{" "}
          <img
            className="w-6"
            src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
            alt=""
          />{" "}
        </p>
      </nav>
    </div>
  );
}

export default Navbar;
