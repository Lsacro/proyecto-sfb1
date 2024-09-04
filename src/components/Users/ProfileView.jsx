//Componente para mostrar el perfil o datos del usuario

import { useState, useEffect } from "react";
import { getToken } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import logo from "../../Logo.png";
import { valdiateEmail } from "../../services/firebase";

const ProfileView = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const tokenLocalStorage = getToken();
        if (!tokenLocalStorage) {
          throw new Error("No se encontró el token de autenticación");
        }
        const user = await valdiateEmail(tokenLocalStorage);
        if (!user) {
          throw new Error("No se pudo validar el usuario");
        }
        setUserData(user);
      } catch (err) {
        console.error("Error al obtener datos del usuario:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <div>Cargando perfil...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!userData) {
    return <div>No se encontraron datos del usuario</div>;
  }

  const birthDate =
    userData.birthDate && new Date(userData.birthDate.seconds * 1000);
  const birthDateFormatted = birthDate
    ? birthDate.toLocaleDateString("es-ES", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "No disponible";

  return (
    <div className="border border-black shadow-xl p-4 max-w-md mx-auto mt-10 bg-white rounded-lg">
      <img src={logo} alt="Logo" className="w-60 mx-auto mb-10" />
      <h2 className="text-center font-bold text-2xl mb-4">Mi Perfil</h2>
      <div className="space-y-4">
        <div className="text-center">
          <strong>Email: </strong>
          {userData.email}
        </div>
        <div className="text-center">
          <strong>Nombre: </strong>
          {userData.firstName}
        </div>
        <div className="text-center">
          <strong>Apellido: </strong>
          {userData.lastName}
        </div>
        <div className="text-center">
          <strong>Fecha de Nacimiento: </strong>
          {birthDateFormatted}
        </div>

        <div className="flex justify-center mt-6">
          <button
            onClick={() => navigate(`/edit-user/${userData.id}`)}
            className="p-4 border-2 border-beige rounded-lg bg-beige text-white w-40"
          >
            Editar mis Datos
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
