//Pagina para ver el listado de flats del usuario

import React from "react";
import Navbar from "../components/Commons/Navbar";
import FlatList from "../components/Flats/FlatList";

function MyFlats() {
  return (
    <>
      <Navbar />
      <FlatList showOnlyUserFlats={true} />
    </>
  );
}

export default MyFlats;
