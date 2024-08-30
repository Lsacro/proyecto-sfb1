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

const collectionNameFlats = "flats";

//Vamos a definir la referencia a la coleción que vamos a utilizar

const usersCollectionRef = collection(db, collectionName);

const flatsCollectionRef = collection(db, collectionNameFlats);

//Vamos a definir la función de lectura de datos

export const getUsers = async () => {
  const data = await getDocs(usersCollectionRef);
  const users = data.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return users;
};

//! Vamos a definir la función de lectura de flats

const getFlats = async () => {
  const data = await getDocs(flatsCollectionRef);
  const flats = data.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return flats;
};

export const flatsArray = await getFlats();

//Vamos a definir la función de creación de usuarios
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

//Vamos a definir la función para validar usuarios registrados
const usersFirebase = await getUsers();
export const valdiateEmail = (email) => {
  const user = usersFirebase.find((user) => user.email === email);
  return user;
};

//Vamos a definir la función para validar el Login

export const validateLogin = (email, password) => {
  const user = usersFirebase.find((user) => user.email === email);
  if (user && user.password === password) {
    return true;
  } else {
    return false;
  }
};

//Vamos a definir la fucnión para crear un flat

export const createFlat = async (flat) => {
  await addDoc(flatsCollectionRef, flat);
};

//Vamos a buscar First Name por Email

export const findNameByEmail = (emailInput) => {
  const user = usersFirebase.find(({ email }) => email === emailInput);
  return user;
};
