import { useFormik } from "formik";
import { FC, useEffect, useState } from "react";
import * as Yup from "yup";

import { getReviewers } from "../../services/reviewersService";
import { Reviewer } from "../../models/reviewerInterface";

const validationSchema = Yup.object({
  reviewer: Yup.string().required("El revisor es obligatorio"),
});

interface ReviewerStageProps {
  onPrevious: () => void;
  onNext: () => void;
}

export const ReviewerStage: FC<ReviewerStageProps> = ({
  onPrevious,
  onNext,
}) => {
  const [reviewers, setReviewers] = useState<Reviewer[]>([]);
  const [error, setError] = useState<string>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getReviewers();
        setReviewers(response);
      } catch (err) {
        console.log(error);
        setError("error");
      }
    };

    fetchData();
  }, []);

  const formik = useFormik({
    initialValues: {
      tutorDesignationLetterSubmitted: false,
      reviewer: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
      onNext();
    },
  });

  return (
    <>
      <div className="text-gray-800 font-bold divide-y divide-gray-300 mt-10 p-5">
        Etapa Revisor
      </div>
      <form onSubmit={formik.handleSubmit} className="ml-5">
        <div className="mt-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              name="tutorDesignationLetterSubmitted"
              checked={formik.values.tutorDesignationLetterSubmitted}
              onChange={formik.handleChange}
              className="form-checkbox"
            />
            <span className="ml-2 text-gray-700">
              Carta de Designación de Revisor Presentada
            </span>
          </label>
        </div>

        <div className="mt-4">
          <label
            htmlFor="reviewer"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Seleccionar Revisor *
          </label>
          <select
            id="reviewer"
            name="reviewer"
            onChange={formik.handleChange}
            value={formik.values.reviewer}
            className={`bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 ${
              formik.touched.reviewer && formik.errors.reviewer
                ? "border-red-500"
                : "border-gray-300"
            }`}
          >
            <option value="">Seleccione un Revisor</option>
            {reviewers.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {formik.touched.reviewer && formik.errors.reviewer ? (
            <div className="text-red-500 text-xs mt-1">
              {formik.errors.reviewer}
            </div>
          ) : null}
        </div>

        <div className="flex justify-between mt-4">
          <button
            type="button"
            onClick={onPrevious}
            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-l"
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
