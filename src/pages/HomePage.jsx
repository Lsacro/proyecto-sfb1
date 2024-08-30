//Pagina principal donde vamos a mostrar los flats
import Navbar from "../components/Commons/Navbar";
import FlatList from "../components/Flats/FlatList";

function HomePage() {
  return (
    <>
      <Navbar name="Bienvenido Carlos" />
      <FlatList />
    </>
  );
}

export default HomePage;
