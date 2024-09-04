//Pagina para mostrar todo los usuarios registrados (solo la puede ver el admin)

import { useEffect, useState } from "react";
import Navbar from "../components/Commons/Navbar";
import UserList from "../components/Users/UserList";
import UserForm from "../components/Users/UserForm";
import { getUsers, deleteUser, updateUser } from "../services/firebase";

function AllUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await getUsers();
      setUsers(data);
    } catch (err) {
      console.error("Error fetching users:", err);
      setError("Failed to load users. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await deleteUser(userId);
      setUsers(users.filter((user) => user.id !== userId));
    } catch (err) {
      console.error("Error deleting user:", err);
      alert("Failed to delete user. Please try again.");
    }
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
  };

  const handleUpdateUser = async (updatedUserData) => {
    try {
      await updateUser(editingUser.id, updatedUserData);
      const updatedUsers = users.map((user) =>
        user.id === editingUser.id ? { ...user, ...updatedUserData } : user
      );
      setUsers(updatedUsers);
      setEditingUser(null);
    } catch (err) {
      console.error("Error updating user:", err);
      alert("Failed to update user. Please try again.");
    }
  };

  const handleCancelEdit = () => {
    setEditingUser(null);
  };

  if (loading) return <div>Loading users...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <Navbar />
      {editingUser ? (
        <UserForm
          isUpdate={true}
          initialValues={editingUser}
          onSubmit={handleUpdateUser}
          onCancel={handleCancelEdit}
        />
      ) : (
        <UserList
          users={users}
          onDeleteUser={handleDeleteUser}
          onEditUser={handleEditUser}
        />
      )}
    </>
  );
}

export default AllUsersPage;
