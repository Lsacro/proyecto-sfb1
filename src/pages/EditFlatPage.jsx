import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Commons/Navbar";
import FlatForm from "../components/Flats/FlatForm";
import { getFlats, updateFlat } from "../services/firebase";

const EditFlatPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [flatData, setFlatData] = useState(null);

  useEffect(() => {
    const fetchFlat = async () => {
      const flats = await getFlats();
      const flat = flats.find((f) => f.id === id);
      if (flat) {
        setFlatData({
          ...flat,
          availableFrom: flat.availableFrom
            .toDate()
            .toISOString()
            .split("T")[0],
        });
      } else {
        console.error("Flat not found");
        navigate("/");
      }
    };

    fetchFlat();
  }, [id, navigate]);

  const handleUpdateFlat = async (values) => {
    try {
      await updateFlat(id, values);
      console.log("Flat actualizado:", values);
      navigate("/my-flats");
    } catch (error) {
      console.error("Error al actualizar el flat:", error);
    }
  };

  if (!flatData) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <Navbar />
      <FlatForm
        initialValues={flatData}
        onSubmit={handleUpdateFlat}
        buttonText="Actualizar"
      />
    </div>
  );
};

export default EditFlatPage;
