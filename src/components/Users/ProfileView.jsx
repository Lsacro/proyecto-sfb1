//Componente para mostrar el perfil o datos del usuario

import { getToken } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import logo from "../../Logo.png";
import { valdiateEmail } from "../../services/firebase";

const ProfileView = () => {
  const tokenLocalStorage = getToken();
  const userData = valdiateEmail(tokenLocalStorage);
  const birthDate = new Date(userData.birthDate.seconds);
  const birthDateFormatted = birthDate.toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const navigate = useNavigate();

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
            onClick={() => navigate("/UpdateProfilePage")}
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
