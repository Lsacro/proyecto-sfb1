//Componente para ver los detalles del flat

import React from "react";
import { useNavigate } from "react-router-dom";

const FlatView = ({ flatData, isOwner }) => {
  const navigate = useNavigate();

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
    userId = "",
  } = flatData || {};

  const handleEdit = () => {
    navigate(`/edit-flat/${id}`);
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
        <h2 className="text-3xl font-bold mb-2">{title || "Sin título"}</h2>
      </div>

      <p className="text-lg text-center mb-4">
        {description || "Sin descripción"}
      </p>

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
          <strong>ID del Propietario:</strong> {userId}
        </div>
      </div>

      <div className="flex justify-between">
        {isOwner && (
          <button
            onClick={handleEdit}
            className="bg-beige text-white px-4 py-2 rounded-lg shadow-md"
          >
            Editar Flat
          </button>
        )}
        <button className="bg-gray-300 text-black px-4 py-2 rounded-lg shadow-md">
          Añadir a favoritos ♥
        </button>
      </div>
    </div>
  );
};

export default FlatView;
