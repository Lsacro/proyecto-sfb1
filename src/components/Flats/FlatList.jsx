//Componente para listar los flats

import { flatsArray } from "../../services/firebase";
import fondoHome from "../../images/fondoHome.png";
import FlatItem from "./FlatItem";

function FlatList() {
  const flats = flatsArray;
  return (
    <div
      className="grid grid-cols-4  justify-items-center gap-5 bg-cover bg-center"
      style={{ backgroundImage: `url(${fondoHome})` }}
    >
      {flats.map((flat) => (
        <FlatItem
          key={flat.id}
          city={flat.city}
          size={flat.size}
          availableFrom={flat.availableFrom}
          addres={flat.address}
          value={flat.value}
        />
      ))}
    </div>
  );
}

export default FlatList;
