//Componente para mostrar informacion individual de un flat

import React from "react";
import { Link } from "react-router-dom";
import Casa from "../../images/casa.png";

function FlatItem({ id, city, size, availableFrom, address, value }) {
  return (
    <Link to={`/flat/${id}`} className="block">
      <div
        className="shadow-md shadow-beige p-4 rounded-lg bg-white mt-6 hover:shadow-lg transition-shadow duration-300"
        key={id}
      >
        <img className="w-52 rounded-lg" src={Casa} alt="casa" />
        <p className="text-xl mt-4">{city}</p>
        <p className=" mt-1">{size} m²</p>
        <p className="mt-1">{availableFrom ? "Disponible" : "No disponible"}</p>
        <div className="flex flex-wrap items-center mt-1">
          <div className="mr-10">{address}</div>
          <div>
            <p>
              <span className="text-xl font-bold">$ {value}</span>
              /mes
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default FlatItem;
