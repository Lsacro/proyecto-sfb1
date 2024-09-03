//Pagina para crear un nuevo flat
import FlatForm from "../components/Flats/FlatForm";
import Navbar from "../components/Commons/Navbar";

const NewFlatPage = () => {
  const handleCreateFlat = (values) => {
    // Aquí se getiona el envío del formulario para crear un nuevo flat
    console.log("Nuevo flat creado:", values);
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
