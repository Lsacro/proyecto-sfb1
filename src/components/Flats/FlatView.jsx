import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { db } from "../../config/firebase";
import AuthContext from "../../contexts/authContext";
import { getToken } from "../../services/authService";

const FlatView = ({ flatData, isOwner }) => {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Inicialmente falso para evitar bloqueo inicial.
  const [userId, setUserId] = useState(null);

  const {
    id = "",
    title = "Sin título",
    description = "Sin descripción",
    city = "",
    address = "",
    number = "",
    size = "",
    hasAC = false,
    yearBuilt = "",
    value = "",
    availableFrom = null,
    userId: flatUserId = "",
  } = flatData || {};

  useEffect(() => {
    const fetchUserData = async () => {
      if (auth) {
        const token = getToken();
        setUserId(token);
        const userRef = doc(db, "users", token);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          const userData = userSnap.data();
          setIsFavorite(userData.favorites?.includes(id) || false);
        } else {
          await setDoc(userRef, { favorites: [] });
        }
      }
    };

    if (auth && id) {
      fetchUserData();
    }
  }, [auth, id]);

  const handleEdit = () => {
    navigate(`/edit-flat/${id}`);
  };

  const toggleFavorite = async () => {
    if (!auth) {
      alert("Por favor, inicie sesión para agregar favoritos.");
      navigate("/login");
      return;
    }

    setIsLoading(true); // Iniciar carga

    const userRef = doc(db, "users", userId);

    try {
      const userSnap = await getDoc(userRef);
      if (!userSnap.exists()) {
        await setDoc(userRef, { favorites: [] });
      }

      const newIsFavorite = !isFavorite;

      await updateDoc(userRef, {
        favorites: newIsFavorite ? arrayUnion(id) : arrayRemove(id),
      });

      setIsFavorite(newIsFavorite);
    } catch (error) {
      console.error("Error updating favorites:", error);
      alert(
        "Hubo un error al actualizar los favoritos. Por favor, inténtelo de nuevo."
      );
    } finally {
      setIsLoading(false); // Finalizar carga
    }
  };

  const formatDate = (timestamp) => {
    if (timestamp && timestamp.seconds) {
      return new Date(timestamp.seconds * 1000).toLocaleDateString();
    }
    return "Fecha no disponible";
  };

  return (
    <div className="border-beige border-gray-300 shadow-lg p-6 max-w-4xl mx-auto mt-10 bg-white rounded-lg">
      <div className="flex flex-col items-center mb-6">
        <h2 className="text-3xl font-bold mb-2">{title}</h2>
      </div>

      <p className="text-lg text-center mb-4">{description}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center mb-6">
        <div>
          <strong>Ciudad:</strong> {city}
        </div>
        <div>
          <strong>Dirección:</strong> {address}
        </div>
        <div>
          <strong>Numeración:</strong> {number}
        </div>
        <div>
          <strong>Tamaño:</strong> {size} m²
        </div>
        <div>
          <strong>AC:</strong> {hasAC ? "Sí" : "No"}
        </div>
        <div>
          <strong>Año de Construcción:</strong> {yearBuilt}
        </div>
        <div>
          <strong>Valor:</strong> ${value} / mes
        </div>
        <div>
          <strong>Disponible Desde:</strong> {formatDate(availableFrom)}
        </div>
        <div>
          <strong>ID del Propietario:</strong> {flatUserId}
        </div>
      </div>

      <div className="flex justify-between">
        {isOwner && (
          <button
            onClick={handleEdit}
            className="bg-beige text-white px-4 py-2 rounded-lg shadow-md hover:bg-beige-dark transition-colors"
          >
            Editar Flat
          </button>
        )}
        <button
          onClick={toggleFavorite}
          disabled={isLoading}
          className={`px-4 py-2 rounded-lg shadow-md transition-colors ${
            isFavorite
              ? "bg-red-500 text-white hover:bg-red-600"
              : "bg-gray-300 text-black hover:bg-gray-400"
          } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          {isLoading
            ? "Cargando..."
            : isFavorite
            ? "Quitar de favoritos ♥"
            : "Añadir a favoritos ♥"}
        </button>
      </div>
    </div>
  );
};

export default FlatView;
