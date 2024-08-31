//Componente para mostrar el perfil o datos del usuario

import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, child, get } from "firebase/database";
import { useNavigate } from "react-router-dom";
import logo from "../../Logo.png";

const ProfileView = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();
  const user = auth.currentUser;
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      const dbRef = ref(getDatabase());
      get(child(dbRef, `users/${user.uid}`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            setUserData(snapshot.val());
          } else {
            console.log("No se encontraron datos para este usuario.");
          }
        })
        .catch((error) => {
          console.error("Error al obtener los datos del usuario:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      console.log("No hay usuario AUTENTICADO.");
      setLoading(false);
    }
  }, [user]);

  if (loading) {
    return (
      <div className="border border-black shadow-xl p-4 max-w-md mx-auto mt-10 bg-white text-beige text-center rounded-lg">
        Loading...
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="border border-black shadow-xl p-4 max-w-md mx-auto mt-10 bg-white text-beige text-center rounded-lg">
        Esta madre no reconoce el usuario autenticado, acolite conectando bien
        con firebase!.
      </div>
    );
  }

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
          {new Date(userData.birthDate).toLocaleDateString()}
        </div>
        {user.uid ===
          userData.uid /* OR: admin logic (cuando definamos la lógica de administrador*/ && (
          <div className="flex justify-center mt-6">
            <button
              onClick={() => navigate("/UpdateProfilePage")}
              className="p-4 border-2 border-beige rounded-lg bg-beige text-white w-40"
            >
              Editar mis Datos
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileView;
