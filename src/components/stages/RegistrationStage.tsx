import { FC, useEffect, useState } from "react";
import { Datepicker } from "flowbite-react";
import { useFormik } from "formik";
import * as Yup from "yup";

import { Modes } from "../../models/modeInterface";
import { getModes } from "../../services/modesService";

const validationSchema = Yup.object({
  mode: Yup.string().required("La modalidad es obligatoria"),
  date: Yup.date().required("La fecha es obligatoria"),
});

interface RegistrationStageProps {
  onNext: () => void;
}

export const RegistrationStage: FC<RegistrationStageProps> = ({ onNext }) => {
  const [modes, setModes] = useState<Modes[]>([]);
  const [error, setError] = useState<string>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getModes();
        setModes(response);
      } catch (err) {
        console.log(error);
        setError("Error");
      }
    };

    fetchData();
  }, []);

  const formik = useFormik({
    initialValues: {
      mode: "",
      date: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
      onNext();
    },
  });

  return (
    <>
      <div className="text-xl text-gray-800 font-bold divide-y divide-gray-300 mt-10 pt-5">
        Seminario de Grado
      </div>

      <form onSubmit={formik.handleSubmit} className="mt-5 ml-5">
        <div className="flex space-x-4">
          <div className="flex-1">
            <label
              htmlFor="mode"
              className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
            >
              Seleccionar Modalidad
            </label>
            <div className="flex flex-col space-y-2">
              {modes.map((option) => (
                <label key={option.value} className="flex items-center">
                  <input
                    type="radio"
                    name="mode"
                    value={option.value}
                    onChange={formik.handleChange}
                    
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <span className="ml-2 text-sm text-gray-900 dark:text-gray-300">
                    {option.label}
                  </span>
                </label>
              ))}
            </div>
            {formik.touched.mode && formik.errors.mode ? (
              <div className="text-red-500 text-xs mt-1">
                {formik.errors.mode}
              </div>
            ) : null}
          </div>
          <div className="flex-1">
            <Datepicker
              onSelectedDateChanged={(date) => {
                formik.setFieldValue("date", date);
              }}
              language="es"
              inline
              title="Fecha de Inscripción"
              showClearButton={false}
              showTodayButton={false}
            />
          </div>
        </div>

        <div className="flex justify-end pt-5">
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
