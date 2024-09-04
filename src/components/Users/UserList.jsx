import React from "react";
import { Link } from "react-router-dom";
import { Trash2, Edit, User } from "lucide-react";

const formatDate = (timestamp) => {
  if (timestamp && timestamp.seconds) {
    // Handle Firestore Timestamp
    return new Date(timestamp.seconds * 1000).toLocaleDateString();
  } else if (timestamp && timestamp instanceof Date) {
    return timestamp.toLocaleDateString();
  } else if (timestamp && typeof timestamp === "string") {
    return new Date(timestamp).toLocaleDateString();
  }
  return "Fecha no disponible";
};

function UserCard({ user, onDeleteUser }) {
  console.log("UserCard received user:", user); // Debugging log

  const handleDelete = () => {
    if (
      window.confirm(
        `¿Estás seguro de que quieres eliminar a ${user.firstName} ${user.lastName}?`
      )
    ) {
      onDeleteUser(user.id);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center text-center">
      {user.imageUrl ? (
        <img
          className="w-24 h-24 rounded-full mb-4 object-cover"
          src={user.imageUrl}
          alt={`${user.firstName} ${user.lastName}`}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://via.placeholder.com/150?text=No+Image";
          }}
        />
      ) : (
        <User className="w-24 h-24 text-gray-400 mb-4" />
      )}
      <h2 className="text-xl font-bold mb-2">
        {user.firstName || "N/A"} {user.lastName || "N/A"}
      </h2>
      <p className="text-gray-600 mb-2">
        E-Mail:{" "}
        <a href={`mailto:${user.email}`} className="text-blue-600">
          {user.email || "N/A"}
        </a>
      </p>
      <p className="text-gray-600 mb-4">
        Fecha Nacimiento: {formatDate(user.birthDate)}
      </p>
      <div className="flex justify-between w-full px-4">
        <button
          onClick={handleDelete}
          className="text-red-500 hover:text-red-700"
        >
          <Trash2 className="w-5 h-5" />
        </button>
        <Link
          to={`/edit-user/${user.id}`}
          className="text-beige hover:text-brown"
        >
          <Edit className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
}

function UserList({ users, onDeleteUser }) {
  console.log("UserList received users:", users); // Debugging log

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6 text-center">Lista de Usuarios</h2>
      {!users || users.length === 0 ? (
        <p className="text-center text-gray-500">
          No hay usuarios registrados.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((user) => (
            <UserCard key={user.id} user={user} onDeleteUser={onDeleteUser} />
          ))}
        </div>
      )}
    </div>
  );
}

export default UserList;
