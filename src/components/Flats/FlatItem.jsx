//Componente para mostrar informacion individual de un flat

import Casa from "../../images/casa.png";
import fondoHome from "../../images/fondoHome.png";

function FlatItem() {
  const flatArray = [
    {
      id: 1,
      name: "Flat 1",
      size: "50m2",
      avaible: true,
      addres: "Bellavista",
      price: 100,
    },
    {
      id: 2,
      name: "Flat 2",
      size: "60m2",
      avaible: true,
      addres: "La Carolina",
      price: 200,
    },
    {
      id: 3,
      name: "Flat 3",
      size: "70m2",
      avaible: false,
      addres: "Atahualpa",
      price: 300,
    },
    {
      id: 4,
      name: "Flat 4",
      size: "80m2",
      avaible: true,
      addres: "El Batán",
      price: 400,
    },
    {
      id: 5,
      name: "Flat 5",
      size: "90m2",
      avaible: true,
      addres: "Carapungo",
      price: 500,
    },
  ];
  return (
    <>
      <div
        className="grid grid-cols-4  justify-items-center gap-5 bg-cover bg-center"
        style={{ backgroundImage: `url(${fondoHome})` }}
      >
        {flatArray.map((flat) => {
          return (
            <div
              className="shadow-md shadow-beige p-4 rounded-lg bg-white mt-6"
              key={flat.id}
            >
              <img className="w-52 rounded-lg" src={Casa} alt="casa" />
              <p className="text-xl mt-4">{flat.name}</p>
              <p className=" mt-1">{flat.size}</p>
              <p className="mt-1">
                {flat.avaible ? "Disponible" : "No disponible"}
              </p>
              <div className="flex flex-wrap items-center mt-1">
                <div className="mr-10">{flat.addres}</div>
                <div>
                  <p>
                    <span className="text-xl font-bold">$ {flat.price}</span>
                    /mes{" "}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default FlatItem;
