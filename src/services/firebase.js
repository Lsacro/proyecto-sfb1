//En este archivo van a definir todas las funciones para interactuar con firebase

//CRUD C - Create R - Rea U - Updat D - Delete

import {
  addDoc,
  collection,
  getDocs,
  doc,
  updateDoc,
  getDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../config/firebase";

//Vamos a definir el nombre de la colección que vamos a utilizar de esa base de datos

const collectionName = "users";

//Vamos a definir la referencia a la coleción que vamos a utilizar

const usersCollectionRef = collection(db, collectionName);

//Vamos a definir la función de lectura de datos

export const getUsers = async () => {
  const data = await getDocs(usersCollectionRef);
  const users = data.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return users;
};

//Vamos a definir la función de creación de datos
export const createUser = async (user) => {
  await addDoc(usersCollectionRef, user);
};

//Vamos a definir la función de actualización de datos
export const updateUser = async (id, updateUserData) => {
  const userRef = doc(db, collectionName, id);
  await updateDoc(userRef, updateUserData);
};

//Vamos buscar un usuario por su ID

export const getUserById = async (id) => {
  const userRef = doc(db, collectionName, id);
  const user = await getDoc(userRef);
  return user.data();
};

//Eliminar usuarios

export const deleteUser = async (id) => {
  await deleteDoc(doc(db, collectionName, id));
};
