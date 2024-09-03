//Pagina para mostrar todo los usuarios registrados (solo la puede ver el admin)

import React, { useEffect, useState } from "react";
import Navbar from "../components/Commons/Navbar";
import UserList from "../components/Users/UserList"; // Asegúrate de importar correctamente

// Suponiendo que tienes una función para obtener los usuarios
import { getUsers } from "../services/firebase";

function AllUsersPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers().then((data) => setUsers(data));
  }, []);

  return (
    <>
      <Navbar />
      <UserList users={users} />
    </>
  );
}

export default AllUsersPage;
