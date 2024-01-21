import { Datepicker } from "flowbite-react";
import { useFormik } from "formik";
import { FC, useEffect, useState } from "react";
import { getMentors } from "../../services/mentorsService";
import { Mentor } from "../../models/mentorInterface";
import * as Yup from "yup";
import ConfirmModal from "../common/ConfirmModal";
import { steps } from "../../data/steps";

const validationSchema = Yup.object({
  president: Yup.string().required("* Debe seleccionar un presidente"),
  secretary: Yup.string().required("* Debe seleccionar un secretario"),
  date: Yup.string().required("* Debe seleccionar una fecha"),
});

interface ExternalDefenseStageProps {
  onPrevious: () => void;
  onNext: () => void;
}

export const ExternalDefenseStage: FC<ExternalDefenseStageProps> = ({
  onPrevious,
  onNext,
}) => {

  const [secretaries, setSecretaries] = useState<Mentor[]>([]);
  const [presidents, setPresidents] = useState<Mentor[]>([]);
  const [, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

  
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
      mode: "",
      date: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
      setShowModal(true);
      //onNext();
    },
  });

  return (
    <>
      <div className="txt1">Etapa Final: Defensa Externa</div>

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
              {presidents.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
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
              {secretaries.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
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
          <button type="button" onClick={onPrevious} className="btn2">
            Anterior
          </button>
          <button type="submit" className="btn">
            Finalizar
          </button>
        </div>
      </form>
      {showModal && 
            <ConfirmModal step={steps[4]} nextStep="Resumen" setShowModal={setShowModal} onNext={onNext}/>

      }
    </>
  );
};
