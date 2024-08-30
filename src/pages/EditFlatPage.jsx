//Pagina para editar la informacion del flat

import Navbar from "../components/Commons/Navbar";
import FlatForm from "../components/Flats/FlatForm";

const EditFlatPage = () => {
  const flatData = {
    city: "Cambia la cuidad",
    address: "Cambia la dirección",
    number: 55,
    size: 85,
    hasAC: true,
    yearBuilt: 2010,
    value: 145000,
    availableFrom: "2024-09-10",
  };

  const handleUpdateFlat = (values) => {
    // Aquí puedes manejar el envío del formulario para actualizar el flat
    console.log("Flat actualizado:", values);
  };

  return (
    <div>
      <Navbar name="Charles" />
      <FlatForm
        initialValues={flatData}
        onSubmit={handleUpdateFlat}
        buttonText="Actualizar"
      />
    </div>
  );
};

export default EditFlatPage;
