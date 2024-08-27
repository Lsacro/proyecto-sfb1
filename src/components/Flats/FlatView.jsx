//Componente para ver los detalles del flat

import { useNavigate } from "react-router-dom";

const FlatView = ({ flatData, isOwner }) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/edit-flat/${flatData.id}`);
  };

  return (
    <div className="border-beige border-gray-300 shadow-lg p-6 max-w-4xl mx-auto mt-10 bg-white rounded-lg">
      <div className="flex flex-col items-center mb-6">
        <h2 className="text-3xl font-bold mb-2">{flatData.title}</h2>
        <div className="flex space-x-4">
          {flatData.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Flat image ${index + 1}`}
              className="w-52 h-36 object-cover rounded-md"
            />
          ))}
        </div>
      </div>

      <p className="text-lg text-center mb-4">{flatData.description}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center mb-6">
        <div>
          <strong>Ciudad:</strong> {flatData.city}
        </div>
        <div>
          <strong>Dirección:</strong> {flatData.address}
        </div>
        <div>
          <strong>Numeración:</strong> {flatData.number}
        </div>
        <div>
          <strong>Tamaño:</strong> {flatData.size} m²
        </div>
        <div>
          <strong>AC:</strong> {flatData.hasAC ? "Sí" : "No"}
        </div>
        <div>
          <strong>Año de Construcción:</strong> {flatData.yearBuilt}
        </div>
        <div>
          <strong>Valor:</strong> ${flatData.value} / mes
        </div>
        <div>
          <strong>Disponible Desde:</strong> {flatData.availableFrom}
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
