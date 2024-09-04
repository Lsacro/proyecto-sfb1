import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase"; // Asegúrate de que esta ruta sea correcta
import UserForm from "../components/Users/UserForm";

function UpdateProfilePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log("Current URL:", location.pathname);
  console.log("ID from useParams:", id);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!id) {
        console.error("No se proporcionó un ID de usuario");
        setError("No se proporcionó un ID de usuario");
        setLoading(false);
        return;
      }

      try {
        console.log("Intentando obtener datos para el usuario con ID:", id);
        const userDocRef = doc(db, "users", id);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const data = userDoc.data();
          console.log("Datos del usuario obtenidos:", data);
          setUserData({
            id: userDoc.id,
            ...data,
            birthDate: data.birthDate ? data.birthDate.toDate() : null,
          });
        } else {
          console.log("No se encontró el usuario");
          setError("No se encontró el usuario");
        }
      } catch (error) {
        console.error("Error al obtener los datos del usuario:", error);
        setError("Error al obtener los datos del usuario");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [id]);

  const handleSubmit = async (values) => {
    try {
      console.log("Intentando actualizar usuario con ID:", id);
      console.log("Valores a actualizar:", values);
      const userDocRef = doc(db, "users", id);
      await updateDoc(userDocRef, {
        ...values,
        birthDate: values.birthDate ? new Date(values.birthDate) : null,
      });
      console.log("Usuario actualizado con éxito");
      navigate("/allusers");
    } catch (error) {
      console.error("Error al actualizar el usuario:", error);
      setError("Error al actualizar el usuario");
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

  if (loading) {
    return <div>Cargando datos del usuario...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Actualizar Perfil</h1>
      {userData ? (
        <UserForm
          isUpdate={true}
          initialValues={userData}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      ) : (
        <div>No se pudieron cargar los datos del usuario</div>
      )}
    </div>
  );
}

export default UpdateProfilePage;
