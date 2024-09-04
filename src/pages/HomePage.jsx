//Pagina principal donde vamos a mostrar los flats

import React from "react";
import Navbar from "../components/Commons/Navbar";
import FlatList from "../components/Flats/FlatList";

function HomePage() {
  return (
    <>
      <Navbar />
      <FlatList showOnlyUserFlats={false} />
    </>
  );
}

export default HomePage;
