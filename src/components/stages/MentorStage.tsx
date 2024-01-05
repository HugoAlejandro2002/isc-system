import { useFormik } from "formik";

const tutorOptions = [
  { value: "tutor1", label: "Tutor 1" },
  { value: "tutor2", label: "Tutor 2" },
  // ... más opciones de tutores ...
];

export const MentorStage = ({ onPrevious, onNext }) => {
  const formik = useFormik({
    initialValues: {
      mode: "",
      date: "",
      tutorDesignationLetterSubmitted: false,
      tutor: "",
    },
    onSubmit: (values) => {
      console.log(values);
      onNext();
    },
  });

  return (
    <>
      <div className="txt1">
        Etapa 2: Seleccionar Tutor
      </div>
      <form onSubmit={formik.handleSubmit} className="mx-5">
        <div className="mt-5">
          <label
            htmlFor="tutor"
            className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
          >
            Seleccione el tutor del estudiante
          </label>
          <select
            id="tutor"
            name="tutor"
            onChange={formik.handleChange}
            value={formik.values.tutor}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="">Seleccione un Tutor</option>
            {tutorOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-5">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              name="tutorDesignationLetterSubmitted"
              checked={formik.values.tutorDesignationLetterSubmitted}
              onChange={formik.handleChange}
              className="form-checkbox"
            />
            <span className="ml-2 text-gray-700">
              Carta de Designación de Tutor Presentada
            </span>
          </label>
        </div>

        <div className="flex justify-between mt-4">
          <button
            type="button"
            onClick={onPrevious}
            className="btn2"
          >
            Anterior
          </button>
          <button
            type="submit"
            className="btn"
          >
            Siguiente
          </button>
        </div>
      </form>
    </>
  );
};
