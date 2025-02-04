import { Datepicker } from "flowbite-react";
import { useFormik } from "formik";
import { FC, useEffect, useState } from "react";
import * as Yup from "yup";
import { Secretary } from "../../models/secretaryInterface";
import { President } from "../../models/presidentInterface";
import { getSecretaries } from "../../services/secretariesService";
import { getPresidents } from "../../services/presidentsService";


const validationSchema = Yup.object({
  president: Yup.string().required("* Debe seleccionar un presidente"),
  secretary: Yup.string().required("* Debe seleccionar un secretario"),
  date: Yup.string().required("* Debe seleccionar una fecha"),
});

interface ExternalDefenseStageProps {
  onPrevious: () => void;
  onNext: () => void;
}

export const ExternalDefenseStage: FC<ExternalDefenseStageProps>= ({ onPrevious, onNext }) => {
  /*const validate = (values) => {
    const errors = {};
    if (!values.mode) {
      errors.mode = "Required";
    }
    return errors;
  };*/
  const [secretaries, setSecretaries] = useState<Secretary[]>([]);
  const [presidents, setPresidents] = useState<President[]>([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseS = await getSecretaries();
        const responseP = await getPresidents();
        setSecretaries(responseS);
        setPresidents(responseP);
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, []);

  const formik = useFormik({
    initialValues: {
      president: "",
      secretary: "",
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
      <div className="txt1">
        Etapa Final: Defensa Externa
      </div>

      <form onSubmit={formik.handleSubmit} className="mx-16 ">
        <div className="flex flex-col">
          <div className="flex-1 my-5 ">
            <label htmlFor="president" className="txt2">
              1. Seleccione un presidente
            </label>
            <select
              id="president"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-4 mt-1"
              name="president"
              onChange={formik.handleChange}
              value={formik.values.president}
            >
              <option value="">Seleccione un Presidente</option>

              {presidents.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {formik.touched.president && formik.errors.president ? (
            <div className="text-red-1 text-xs mt-1">
              {formik.errors.president}
            </div>
          ) : null}
            <label htmlFor="secretary" className="txt2">
              2. Seleccione un secretario
            </label>
            <select
              id="secretary"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mt-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name="secretary"
              onChange={formik.handleChange}
              value={formik.values.secretary}
            >
              <option value="">Seleccione un secretario</option>

              {secretaries.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {formik.touched.secretary && formik.errors.secretary ? (
            <div className="text-red-1 text-xs mt-1">
              {formik.errors.secretary}
            </div>
          ) : null}
          </div>
          <div className="flex-1">
            <label htmlFor="date" className="txt2">
              3. Seleccione una fecha
            </label>
            <input
              type="date"
              onChange={formik.handleChange}
              id="date"
              name="date"
              className="select-1 border-gray-300"/>
            {formik.touched.date && formik.errors.date ? (
            <div className="text-red-1 text-xs mt-1">
              {formik.errors.date}
            </div>
          ) : null}
          </div>
        </div>

        <div className="flex justify-between pt-5">
          <button type="button" onClick={onPrevious} className="btn2">
            Anterior
          </button>
          <button type="submit" className="btn">
            Siguiente
          </button>
        </div>
      </form>
    </>
  );
};
