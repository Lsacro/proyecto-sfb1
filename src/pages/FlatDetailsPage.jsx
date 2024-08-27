//Pagina para ver la informacion detallada de un flat

import Navbar from "../components/Commons/Navbar";
import FlatView from "../components/Flats/FlatView";
import image1 from "../images/image1.jpg";
import image2 from "../images/image2.jpg";
import image3 from "../images/image3.jpg";

const FlatDetailsPage = () => {
  const flatData = {
    id: 1,
    title: "Apart-Studio en La Carolina",
    images: [image1, image2, image3],
    description:
      "Acogedor departamento de diseño moderno en el corazón de la ciudad, equipado con todas las comodidades necesarias para una estancia relajante..",
    city: "Quitofff",
    address: "Eloy Alfaro y Shirys",
    number: 101,
    size: 125,
    hasAC: true,
    yearBuilt: 2022,
    value: 600,
    availableFrom: "2024-09-01",
    isAvailable: true,
  };

  const isOwner = true; // Cambiar según la lógica de la aplicación

  return (
    <div>
      <Navbar name="Bienvenido Carlos" />
      <FlatView flatData={flatData} isOwner={isOwner} />
    </div>
  );
};

export default FlatDetailsPage;
