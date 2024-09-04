import { useFormik } from "formik";
import * as Yup from "yup";
import { createFlat, updateFlat } from "../../services/firebase";
import { getToken } from "../../services/authService";
import { useNavigate } from "react-router-dom";

const FlatForm = ({ initialValues, buttonText, onSubmit }) => {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    title: Yup.string().required("Campo obligatorio"),
    description: Yup.string().required("Campo obligatorio"),
    city: Yup.string().required("Campo obligatorio"),
    address: Yup.string().required("Campo obligatorio"),
    number: Yup.string().required("Campo obligatorio"),
    size: Yup.number()
      .typeError("Debe ser número")
      .required("Campo obligatorio"),
    hasAC: Yup.boolean(),
    yearBuilt: Yup.number()
      .typeError("Debe ser un número")
      .required("Campo obligatorio"),
    value: Yup.number()
      .typeError("Debe ser un número")
      .required("Campo obligatorio"),
    availableFrom: Yup.date().required("Campo obligatorio"),
  });

  const formik = useFormik({
    initialValues: initialValues || {
      title: "",
      description: "",
      city: "",
      address: "",
      number: "",
      size: "",
      hasAC: false,
      yearBuilt: "",
      value: "",
      availableFrom: "",
      userId: getToken(),
    },
    validationSchema,
    onSubmit: async (values) => {
      const flatData = {
        ...values,
        availableFrom: new Date(values.availableFrom),
        userId: getToken(),
      };

      if (onSubmit) {
        await onSubmit(flatData);
      } else {
        await createFlat(flatData);
        alert("Flat creado");
        navigate("/");
      }
    },
  });

  return (
    <div className="border border-black shadow-xl p-4 max-w-md mx-auto mt-10 bg-white rounded-lg">
      <h2 className="text-center font-bold text-2xl mb-4">
        {buttonText === "Actualizar" ? "Edita tu Flat" : "Nuevo Flat"}
      </h2>
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div className="form-group text-center">
          <label htmlFor="title" className="block font-semibold">
            Título:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="text-center w-fit px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-beige"
          />
          {formik.touched.title && formik.errors.title ? (
            <div className="text-red-500">{formik.errors.title}</div>
          ) : null}
        </div>

        <div className="form-group text-center">
          <label htmlFor="description" className="block font-semibold">
            Descripción:
          </label>
          <textarea
            id="description"
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="text-center w-90% px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-beige"
          />
          {formik.touched.description && formik.errors.description ? (
            <div className="text-red-500">{formik.errors.description}</div>
          ) : null}
        </div>

        <div className="form-group text-center">
          <label htmlFor="city" className="block font-semibold">
            Ciudad:
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={formik.values.city}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="text-center w-fit px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-beige"
          />
          {formik.touched.city && formik.errors.city ? (
            <div className="text-red-500">{formik.errors.city}</div>
          ) : null}
        </div>

        <div className="form-group text-center">
          <label htmlFor="address" className="block font-semibold">
            Dirección:
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={formik.values.address}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="text-center w-fit px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-beige"
          />
          {formik.touched.address && formik.errors.address ? (
            <div className="text-red-500">{formik.errors.address}</div>
          ) : null}
        </div>

        <div className="form-group text-center">
          <label htmlFor="number" className="block font-semibold">
            Numeración:
          </label>
          <input
            type="text"
            id="number"
            name="number"
            value={formik.values.number}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="text-center w-fit px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-beige"
          />
          {formik.touched.number && formik.errors.number ? (
            <div className="text-red-500">{formik.errors.number}</div>
          ) : null}
        </div>

        <div className="form-group text-center">
          <label htmlFor="size" className="block font-semibold">
            Tamaño (m²):
          </label>
          <input
            type="number"
            id="size"
            name="size"
            value={formik.values.size}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="text-center w-fit px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-beige"
          />
          {formik.touched.size && formik.errors.size ? (
            <div className="text-red-500">{formik.errors.size}</div>
          ) : null}
        </div>

        <div className="form-group text-center">
          <label htmlFor="hasAC" className="block font-semibold">
            ¿Tiene AC?
          </label>
          <input
            type="checkbox"
            id="hasAC"
            name="hasAC"
            checked={formik.values.hasAC}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="mx-auto block"
          />
        </div>

        <div className="form-group text-center">
          <label htmlFor="yearBuilt" className="block font-semibold">
            Año de Construcción:
          </label>
          <input
            type="number"
            id="yearBuilt"
            name="yearBuilt"
            value={formik.values.yearBuilt}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="text-center w-fit px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-beige"
          />
          {formik.touched.yearBuilt && formik.errors.yearBuilt ? (
            <div className="text-red-500">{formik.errors.yearBuilt}</div>
          ) : null}
        </div>

        <div className="form-group text-center">
          <label htmlFor="value" className="block font-semibold">
            Valor ($):
          </label>
          <input
            type="number"
            id="value"
            name="value"
            value={formik.values.value}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="text-center w-fit px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-beige"
          />
          {formik.touched.value && formik.errors.value ? (
            <div className="text-red-500">{formik.errors.value}</div>
          ) : null}
        </div>

        <div className="form-group text-center">
          <label htmlFor="availableFrom" className="block font-semibold">
            Disponible Desde:
          </label>
          <input
            type="date"
            id="availableFrom"
            name="availableFrom"
            value={formik.values.availableFrom}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="text-center w-fit px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-beige"
          />
          {formik.touched.availableFrom && formik.errors.availableFrom ? (
            <div className="text-red-500">{formik.errors.availableFrom}</div>
          ) : null}
        </div>

        <button
          type="submit"
          className="mt-4 p-4 border-2 border-beige rounded-lg mx-auto flex justify-center bg-beige text-white w-40"
        >
          {buttonText}
        </button>
      </form>
    </div>
  );
};

export default FlatForm;
