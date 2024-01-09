import { Datepicker } from "flowbite-react";
import { useFormik } from "formik";
import { FC, useEffect, useState } from "react";
import * as Yup from "yup";
import { getMentors } from "../../services/mentorsService";
import { Mentor } from "../../models/mentorInterface";

const validationSchema = Yup.object({
  president: Yup.string().required("* Debe seleccionar un presidente"),
  secretary: Yup.string().required("* Debe seleccionar un secretario"),
  date: Yup.string().required("* Debe seleccionar una fecha"),
});

interface InternalDefenseStageProps {
  onPrevious: () => void;
  onNext: () => void;
}

export const InternalDefenseStage: FC<InternalDefenseStageProps> = ({
  onPrevious,
  onNext,
}) => {
  const [secretaries, setSecretaries] = useState<Mentor[]>([]);
  const [presidents, setPresidents] = useState<Mentor[]>([]);
  const [, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getMentors();
        setSecretaries(response.data);
        setPresidents(response.data);
      } catch (error) {
        setError("error");
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
      <div className="txt1">Etapa 4: Defensa Interna</div>

      <form onSubmit={formik.handleSubmit} className="mx-16 ">
        <div className="flex space-x-4">
          <div className="flex-1 my-5 ">
            <label htmlFor="president" className="txt2">
              1. Seleccione un presidente
            </label>
            <select
              id="president"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-4"
              name="president"
              onChange={formik.handleChange}
              value={formik.values.president}
            >
              <option value="">Seleccione un Presidente</option>

              {presidents.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
            <label htmlFor="secretary" className="txt2">
              2. Seleccione un secretario
            </label>
            <select
              id="secretary"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name="secretary"
              onChange={formik.handleChange}
              value={formik.values.secretary}
            >
              <option value="">2. Seleccione un secretario</option>

              {secretaries.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-1">
            <label htmlFor="secretary" className="txt2">
              3. Seleccione una fecha
            </label>
            <Datepicker
              onSelectedDateChanged={(date) => {
                formik.setFieldValue("date", date);
              }}
              language="es"
              inline
              showClearButton={false}
              showTodayButton={false}
            />
          </div>
        </div>

        <div className="flex justify-between">
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
