//Pagina para ver la informacion detallada de un flat

import Navbar from "../components/Commons/Navbar";
import FlatView from "../components/Flats/FlatView";
import MessageList from "../components/Messages/MessageList";
import image1 from "../images/image1.jpg";
import image2 from "../images/image2.jpg";
import image3 from "../images/image3.jpg";
import { getToken } from "../services/authService";
import { getMessages } from "../services/firebase";

const messages = await getMessages();

const handleIsOwner = (token, flatId) => {
  if (token === flatId) return true;
  else return false;
};

const FlatDetailsPage = () => {
  const flatData = {
    id: "martin@gmail.com",
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

  const isOwner = handleIsOwner(getToken(), flatData.id); // Cambiar según la lógica
  const userId = 2; // Esto se obtiene del id del usuario
  const existingMessages = messages; //Obetenr estos mensajes de la base de datos

  return (
    <div>
      <Navbar />
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
