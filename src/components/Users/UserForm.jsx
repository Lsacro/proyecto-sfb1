import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const UserForm = ({ isUpdate = false, initialValues, onSubmit, onCancel }) => {
  console.log("UserForm received initialValues:", initialValues); // Debugging log

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Correo electrónico inválido")
      .required("Campo obligatorio"),
    password: isUpdate
      ? Yup.string()
      : Yup.string()
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

  const formatDate = (date) => {
    if (!date) return "";
    if (date instanceof Date) {
      return date.toISOString().split("T")[0];
    }
    if (typeof date === "object" && date.seconds) {
      // Manejar Timestamp de Firestore
      return new Date(date.seconds * 1000).toISOString().split("T")[0];
    }
    return date;
  };

  const formik = useFormik({
    initialValues: {
      email: initialValues?.email || "",
      password: initialValues?.password || "",
      firstName: initialValues?.firstName || "",
      lastName: initialValues?.lastName || "",
      birthDate: formatDate(initialValues?.birthDate) || "",
    },
    validationSchema,
    onSubmit: (values) => {
      // Convertir birthDate de nuevo a Timestamp antes de enviar
      const submittedValues = {
        ...values,
        birthDate: values.birthDate ? new Date(values.birthDate) : null,
      };
      onSubmit(submittedValues);
    },
    enableReinitialize: true,
  });

  useEffect(() => {
    console.log("Current formik values:", formik.values); // Debugging log
  }, [formik.values]);

  return (
    <div className="border border-black shadow-xl p-4 max-w-md mx-auto mt-10 bg-white rounded-lg">
      <h2 className="text-center font-bold text-2xl mb-4">
        {isUpdate ? "Actualizar Perfil" : "Registro"}
      </h2>
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
            disabled={isUpdate}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="text-red-500">{formik.errors.email}</div>
          ) : null}
        </div>

        {!isUpdate && (
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
        )}

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

        <div className="flex justify-center space-x-4">
          <button
            type="submit"
            className="mt-4 p-4 border-2 border-beige rounded-lg bg-beige text-white w-40 hover:bg-beige-dark"
          >
            {isUpdate ? "Actualizar" : "Registrar"}
          </button>
          {isUpdate && (
            <button
              type="button"
              onClick={onCancel}
              className="mt-4 p-4 border-2 border-gray-300 rounded-lg bg-white text-gray-700 w-40 hover:bg-gray-100"
            >
              Cancelar
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default UserForm;
