import { Datepicker } from "flowbite-react";
import { useFormik } from "formik";
import { FC } from "react";

const options = [
  { value: "0", label: "Seleccione Docente" },
  { value: "1", label: "Trabajo Dirigo" },
  { value: "2", label: "Proyecto de Grado" },
  { value: "3", label: "Tesis" },
];

interface ExternalDefenseStageProps {
  onPrevious: () => void;
  onNext: () => void;
}

export const ExternalDefenseStage: FC<ExternalDefenseStageProps>= ({ onPrevious, onNext }) => {
  const validate = (values) => {
    const errors = {};
    if (!values.mode) {
      errors.mode = "Required";
    }
    return errors;
  };
  const formik = useFormik({
    initialValues: {
      mode: "",
      date: "",
    },
    validate,
    onSubmit: (values) => {
      console.log(values);
      onNext();
    },
  });

  return (
    <>
      <div className="txt1">
        Etapa Final: Defensa Externa
      </div>

      <form onSubmit={formik.handleSubmit} className="ml-5 mt-5">
        <div className="flex space-x-4">
          <div className="flex-1 my-5">
            <label
              htmlFor="mode"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Seleccionar Presidente
            </label>
            <select
              id="mode"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name="mode"
              onChange={formik.handleChange}
              value={formik.values.mode}
            >
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <label
              htmlFor="mode"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white mt-5"
            >
              Seleccionar Secretario
            </label>
            <select
              id="mode"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name="mode"
              onChange={formik.handleChange}
              value={formik.values.mode}
            >
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-1">
            <Datepicker
              onSelectedDateChanged={(date) => {
                formik.setFieldValue("date", date);
              }}
              language="es"
              inline
              title="Seleccionar Defensa Interna"
              showClearButton={false}
              showTodayButton={false}
            />
          </div>
        </div>

        <div className="flex justify-between">
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
            Finalizar
          </button>
        </div>
      </form>
    </>
  );
};
