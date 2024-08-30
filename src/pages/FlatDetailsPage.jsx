//Pagina para ver la informacion detallada de un flat

import Navbar from "../components/Commons/Navbar";
import FlatView from "../components/Flats/FlatView";
import MessageList from "../components/Messages/MessageList";
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

  const isOwner = false; // Cambiar según la lógica
  const userId = 2; // Esto se obtiene del id del usuario
  const existingMessages = [
    {
      id: 1,
      userId: 123,
      name: "Carlos Perez",
      email: "carlos@example.com",
      timestamp: "2024-08-28 10:30",
      content: "¿Está disponible para una visita este fin de semana?",
    },
    {
      id: 2,
      userId: 1234,
      name: "Juana Banana",
      email: "JB@example.com",
      timestamp: "2024-09-28 10:30",
      content: "¿Holi 🍌 ?",
    },
  ]; //Obetenr estos mensajes de la base de datos

  return (
    <div>
      <Navbar name="Carlos Trujillo" />
      <FlatView flatData={flatData} isOwner={isOwner} />
      <MessageList
        flatId={flatData.id}
        userId={userId}
        isOwner={isOwner}
        existingMessages={existingMessages}
      />
    </div>
  );
};

export default FlatDetailsPage;
