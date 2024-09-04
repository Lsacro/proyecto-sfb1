import { useState, useEffect, useContext } from "react";
import { getFlats, getUserById } from "../services/firebase";
import AuthContext from "../contexts/authContext";
import Navbar from "../components/Commons/Navbar";
import FlatItem from "../components/Flats/FlatItem";
import { getToken } from "../services/authService";

function FavouritesPage() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (auth) {
        try {
          setLoading(true);
          const userId = getToken();
          const user = await getUserById(userId);
          const allFlats = await getFlats();
          const userFavorites = allFlats.filter((flat) =>
            user.favorites?.includes(flat.id)
          );
          setFavorites(userFavorites);
        } catch (error) {
          console.error("Error fetching favorites:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setFavorites([]);
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [auth]);

  if (!auth) {
    return (
      <div>
        <Navbar />
        <div className="text-center mt-10">
          Por favor, inicie sesión para ver sus favoritos.
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <h1 className="text-3xl font-bold text-center my-6">Mis Favoritos</h1>
      {loading ? (
        <div className="text-center">Cargando...</div>
      ) : favorites.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {favorites.map((flat) => (
            <FlatItem key={flat.id} {...flat} />
          ))}
        </div>
      ) : (
        <div className="text-center mt-10">No tienes flats favoritos aún.</div>
      )}
    </div>
  );
}

export default FavouritesPage;
