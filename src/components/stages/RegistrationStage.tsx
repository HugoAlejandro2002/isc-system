import { FC, useEffect, useState } from "react";
import { Datepicker } from "flowbite-react";
import { useFormik } from "formik";
import * as Yup from "yup";

import { Modes } from "../../models/modeInterface";
import { getModes } from "../../services/modesService";

const validationSchema = Yup.object({
  mode: Yup.string().required("* La modalidad es obligatoria"),
  date: Yup.date().required("* La fecha es obligatoria"),
});

interface RegistrationStageProps {
  onNext: () => void;
}

export const RegistrationStage: FC<RegistrationStageProps> = ({ onNext }) => {
  const [modes, setModes] = useState<Modes[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [, setError] = useState<any | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getModes();
        setModes(response.data);
      } catch (error) {
        console.log(error)
        setError(error);
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
      <div className="txt1">Etapa 1: Seminario de Grado</div>
      <form onSubmit={formik.handleSubmit} className="mt-5 mx-16">
        <div className="flex flex-row space-x-4">
          <div className="flex-1">
            <label className="txt2">
              1. Seleccione la modalidad
            </label>
            <div className="flex flex-col space-y-2 mt-2 mx-2">
              {modes.map((option) => (
                <label key={option.id} className="flex items-center">
                  <input
                    type="radio"
                    name="mode"
                    value={option.id}
                    onChange={formik.handleChange}
                    className="w-4 h-4 text-secondary bg-gray-100 border-gray-300 focus:ring-secondary dark:focus:ring-secondary"
                  />
                  <span className="ml-2 text-md font-normal text-neutral-600">
                    {option.name}
                  </span>
                </label>
              ))}
            </div>
            {formik.touched.mode && formik.errors.mode ? (
              <div className="text-red-1 text-xs font-medium mt-1">
                {formik.errors.mode}
              </div>
            ) : null}
          </div>
          <div className="flex-1">
            <label className="txt2">
              2. Seleccione la fecha de inscripción
            </label>
            <Datepicker
              onSelectedDateChanged={(date) => {
                formik.setFieldValue("date", date);
              }}
              language="es"
              inline
              showClearButton={false}
              showTodayButton={false}
              autoHide={true}
            />
            {formik.touched.date && formik.errors.date ? (
              <div className="text-red-1 text-xs font-medium mt-1">
                {formik.errors.date}
              </div>
            ) : null}
          </div>
        </div>

        <div className="flex justify-end pt-5">
          <button type="submit" className="btn">
            Siguiente
          </button>
        </div>
      </form>
    </>
  );
};
