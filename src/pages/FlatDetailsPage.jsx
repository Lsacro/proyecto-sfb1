import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Commons/Navbar";
import FlatView from "../components/Flats/FlatView";
import MessageList from "../components/Messages/MessageList";
import { getToken } from "../services/authService";
import { getMessages, getFlats } from "../services/firebase";

const FlatDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [flatData, setFlatData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isOwner, setIsOwner] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        console.log("Fetching data for flat with id:", id);

        const allFlats = await getFlats();
        const flat = allFlats.find((flat) => flat.id === id);

        if (!flat) {
          throw new Error("Flat not found");
        }

        setFlatData(flat);

        const allMessages = await getMessages();
        // Filtramos los mensajes para este flat específico
        const flatMessages = allMessages.filter(
          (message) => message.flatId === id
        );
        setMessages(flatMessages);

        const userToken = getToken();
        setIsOwner(userToken === flat.userId);
      } catch (err) {
        console.error("Error fetching flat data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!flatData) return <div>Flat not found</div>;

  return (
    <div>
      <Navbar />
      <FlatView flatData={flatData} isOwner={isOwner} />
      <MessageList
        flatId={id}
        userId={getToken()}
        isOwner={isOwner}
        existingMessages={messages}
      />
    </div>
  );
};

export default FlatDetailsPage;
