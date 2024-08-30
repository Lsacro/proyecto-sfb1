//Componente para mostrar informacion individual de un flat

import Casa from "../../images/casa.png";

function FlatItem({ id, city, size, availableFrom, addres, value }) {
  return (
    <>
      <div
        className="shadow-md shadow-beige p-4 rounded-lg bg-white mt-6"
        key={id}
      >
        <img className="w-52 rounded-lg" src={Casa} alt="casa" />
        <p className="text-xl mt-4">{city}</p>
        <p className=" mt-1">{size}</p>
        <p className="mt-1">{availableFrom ? "Disponible" : "No disponible"}</p>
        <div className="flex flex-wrap items-center mt-1">
          <div className="mr-10">{addres}</div>
          <div>
            <p>
              <span className="text-xl font-bold">$ {value}</span>
              /mes{" "}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default FlatItem;
