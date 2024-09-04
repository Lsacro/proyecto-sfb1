//Componente para listar los flats

import { useState, useEffect } from "react";
import { getFlats } from "../../services/firebase";
import { getToken } from "../../services/authService";
import fondoHome from "../../images/fondoHome.png";
import FlatItem from "./FlatItem";

function FlatList({ showOnlyUserFlats = false }) {
  const [flats, setFlats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFlats = async () => {
      try {
        setLoading(true);
        const allFlats = await getFlats();
        const userToken = getToken();

        if (showOnlyUserFlats) {
          const userFlats = allFlats.filter(
            (flat) => flat.userId === userToken
          );
          setFlats(userFlats);
        } else {
          setFlats(allFlats);
        }
      } catch (err) {
        console.error("Error fetching flats:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFlats();
  }, [showOnlyUserFlats]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center gap-5 bg-cover bg-center"
      style={{ backgroundImage: `url(${fondoHome})` }}
    >
      {flats.map((flat) => (
        <FlatItem
          key={flat.id}
          id={flat.id}
          city={flat.city}
          size={flat.size}
          availableFrom={flat.availableFrom}
          address={flat.address}
          value={flat.value}
        />
      ))}
    </div>
  );
}

export default FlatList;
