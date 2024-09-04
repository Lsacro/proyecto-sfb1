//Pagina para crear un nuevo flat

import React from "react";
import { useNavigate } from "react-router-dom";
import FlatForm from "../components/Flats/FlatForm";
import Navbar from "../components/Commons/Navbar";
import { createFlat } from "../services/firebase";
import { getToken } from "../services/authService";

const NewFlatPage = () => {
  const navigate = useNavigate();

  const handleCreateFlat = async (values) => {
    try {
      const flatWithUserId = {
        ...values,
        userId: getToken(), // Asumiendo que getToken() devuelve el ID del usuario actual
        createdAt: new Date(),
      };
      const newFlatId = await createFlat(flatWithUserId);
      console.log("Nuevo flat creado:", newFlatId);
      navigate(`/flat/${newFlatId}`);
    } catch (error) {
      console.error("Error al crear el flat:", error);
      // Aquí puedes mostrar un mensaje de error al usuario
    }
  };

  return (
    <div>
      <Navbar />
      <FlatForm
        initialValues={{
          title: "",
          description: "",
          city: "",
          address: "",
          number: "",
          size: "",
          hasAC: false,
          yearBuilt: "",
          value: "",
          availableFrom: "",
        }}
        onSubmit={handleCreateFlat}
        buttonText="Registrar"
      />
    </div>
  );
};

export default NewFlatPage;
