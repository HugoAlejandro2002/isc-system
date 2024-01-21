import { FC, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import { Modes } from "../../models/modeInterface";
import { getModes } from "../../services/modesService";
import { Seminar } from "../../models/studentProcess";
import { Modal } from "../common/Modal";
import ConfirmModal from "../common/ConfirmModal";
import { steps } from "../../data/steps";

const validationSchema = Yup.object({
  mode: Yup.string().required("* La modalidad es obligatoria"),
  date: Yup.date().required("* La fecha es obligatoria"),
});

interface RegistrationStageProps {
  onNext: () => void;
  studentProcess: Seminar;
}

const periods = [
  {
    id: 1,
    value: "Primero 2023",
  },
  {
    id: 2,
    value: "Segundo 2023",
  },
  {
    id: 3,
    value: "Primero 2024",
  },
  {
    id: 4,
    value: "Segundo 2024",
  },
];

const getIdFromValue = (value: string) => {
  const period = periods.find((period) => period.value === value);
  return period ? period.id : "";
};

export const RegistrationStage: FC<RegistrationStageProps> = ({
  onNext,
  studentProcess,
}) => {
  const [modes, setModes] = useState<Modes[]>([]);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [, setError] = useState<any | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getModes();
        setModes(response.data);
      } catch (error) {
        console.log(error);
        setError(error);
      }
    };

    fetchData();
  }, []);

  const formik = useFormik({
    initialValues: {
      mode: Number(studentProcess.modality_id),
      date: getIdFromValue(studentProcess.period),
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
      <div className="txt1">Etapa 1: Seminario de Grado</div>
      <form onSubmit={formik.handleSubmit} className="mt-5 mx-16">
        <div className="flex flex-row space-x-4">
          <div className="flex-1">
            <label className="txt2">1. Seleccione la modalidad</label>
            <div className="flex flex-col space-y-2 mt-2 mx-2">
              {modes.map((option) => (
                <label key={option.id} className="flex items-center">
                  <input
                    type="radio"
                    name="mode"
                    value={option.id}
                    disabled
                    onChange={formik.handleChange}
                    checked={formik.values.mode === option.id}
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
            <label className="txt2">2. Seleccione periodo de inscripción</label>
            <select
              id="date"
              name="date"
              onChange={formik.handleChange}
              value={formik.values.date}
              disabled
              className={`select-1 ${
                formik.touched.date && formik.errors.date
                  ? "border-red-1"
                  : "border-gray-300"
              }`}
            >
              <option value="">Seleccione un Tutor</option>
              {periods.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.value}
                </option>
              ))}
            </select>
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
      {showModal && 
            <ConfirmModal step={steps[0]} nextStep={steps[1]} setShowModal={setShowModal} onNext={onNext}/>

      }
      <Modal isVisible={isVisible} setIsVisible={setIsVisible} />
    </>
  );
};
