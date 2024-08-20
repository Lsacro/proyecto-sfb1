//Componente para registrar el usuario o para actualizar el perfil
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import logo from "../../Logo.png";

const UserForm = () => {
  const navigate = useNavigate();

  //Yup acolita para manejar el esquema de validación
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Correo electrónico inválido")
      .required("Campo obligatorio"),
    password: Yup.string()
      .required("Campo obligatorio")
      .min(6, "La contraseña debe tener al menos 6 caracteres")
      .matches(/[a-zA-Z]/, "La contraseña debe contener letras")
      .matches(/[0-9]/, "La contraseña debe contener números")
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        "La contraseña debe contener un caracter especial"
      ),
    firstName: Yup.string()
      .min(2, "El nombre debe tener al menos 2 caracteres")
      .required("Campo obligatorio"),
    lastName: Yup.string()
      .min(2, "El apellido debe tener al menos 2 caracteres")
      .required("Campo obligatorio"),
    birthDate: Yup.date()
      .required("Campo obligatorio")
      .test("age", "Debes tener entre 18 y 120 años", (value) => {
        const today = new Date();
        const birthDate = new Date(value);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();
        if (
          monthDifference < 0 ||
          (monthDifference === 0 && today.getDate() < birthDate.getDate())
        ) {
          age--;
        }
        return age >= 18 && age <= 120;
      }),
  });

  //Con formik vacilamos el estdo y la validacion de usuario.
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      birthDate: "",
    },
    validationSchema,
    onSubmit: (values) => {
      // Guardamos los datos del usuario en localStorage
      localStorage.setItem("user", JSON.stringify(values));
      alert("Registro exitoso");
      navigate("/login"); //Pal Login (pilas, poner al home cuando esté)
    },
  });

  return (
    <div className="border border-black shadow-xl p-4 max-w-md mx-auto mt-10 bg-white rounded-lg">
      <img src={logo} alt="Logo" className="w-60 mx-auto mb-10" />
      <h2 className="text-center font-bold text-2xl mb-4">Register</h2>
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div className="form-group text-center">
          <label htmlFor="email" className="block font-semibold">
            E-mail:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="text-center w-fit px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-beige"
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="text-red-500">{formik.errors.email}</div>
          ) : null}
        </div>

        <div className="form-group text-center">
          <label htmlFor="password" className="block font-semibold">
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-fit px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-beige"
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="text-red-500">{formik.errors.password}</div>
          ) : null}
        </div>

        <div className="form-group text-center">
          <label htmlFor="firstName" className="block font-semibold">
            Nombre:
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-fit px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-beige"
          />
          {formik.touched.firstName && formik.errors.firstName ? (
            <div className="text-red-500">{formik.errors.firstName}</div>
          ) : null}
        </div>

        <div className="form-group text-center">
          <label htmlFor="lastName" className="block font-semibold">
            Apellido:
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-fit px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-beige"
          />
          {formik.touched.lastName && formik.errors.lastName ? (
            <div className="text-red-500">{formik.errors.lastName}</div>
          ) : null}
        </div>

        <div className="form-group text-center">
          <label htmlFor="birthDate" className="block font-semibold">
            Fecha de Nacimiento:
          </label>
          <input
            type="date"
            id="birthDate"
            name="birthDate"
            value={formik.values.birthDate}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-fit px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-beige"
          />
          {formik.touched.birthDate && formik.errors.birthDate ? (
            <div className="text-red-500">{formik.errors.birthDate}</div>
          ) : null}
        </div>

        <button
          type="submit"
          className="mt-4 p-4 border-2 border-beige rounded-lg mx-auto flex justify-center bg-beige text-white w-40"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default UserForm;
