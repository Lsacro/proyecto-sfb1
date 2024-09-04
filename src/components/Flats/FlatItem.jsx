import { Link } from "react-router-dom";

function FlatItem({ id, city, size, availableFrom, address, value }) {
  return (
    <Link to={`/flat/${id}`} className="block">
      <div
        className="shadow-md shadow-beige p-4 rounded-lg bg-white mt-6 hover:shadow-lg transition-shadow duration-300"
        key={id}
      >
        <img
          className="w-52 rounded-lg"
          src={`/images/Casa/${Math.floor(Math.random() * 20)}.jpg`}
          alt="casa"
        />
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
