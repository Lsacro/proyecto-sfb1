//Componente para listar los usuarios del sistema

import React from "react";
import { Link } from "react-router-dom";

function UserCard({ user }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center text-center">
      <img
        className="w-24 h-24 rounded-full mb-4"
        src={user.imageUrl}
        alt={`${user.firstName} ${user.lastName}`}
      />
      <h2 className="text-xl font-bold mb-2">
        {user.firstName} {user.lastName}
      </h2>
      <p className="text-gray-600 mb-2">
        E-Mail:{" "}
        <a href={`mailto:${user.email}`} className="text-blue-600">
          {user.email}
        </a>
      </p>
      <p className="text-gray-600 mb-4">Fecha Nacimiento: {user.birthDate}</p>
      <div className="flex justify-between w-full px-4">
        <span className="flex items-center gap-2">
          <img
            className="w-5"
            src="https://cdn-icons-png.flaticon.com/512/2917/2917996.png"
            alt="flats icon"
          />
          {user.flatCount}
        </span>
        <Link
          to={`/edit-profile/${user.id}`}
          className="text-beige hover:text-brown"
        >
          <img
            className="w-5"
            src="https://cdn-icons-png.flaticon.com/512/1250/1250807.png"
            alt="edit icon"
          />
        </Link>
      </div>
    </div>
  );
}

function UserList({ users }) {
  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold text-center mb-6">All Users</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}

export default UserList;
