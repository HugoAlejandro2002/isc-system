import { useFormik } from "formik";
import { FC, useEffect, useState } from "react";
import * as Yup from "yup";
import { getMentors } from "../../services/mentorsService";
import { Mentor } from "../../models/mentorInterface";

const validationSchema = Yup.object({
  reviewer: Yup.string().required("* El revisor es obligatorio"),
});

interface ReviewerStageProps {
  onPrevious: () => void;
  onNext: () => void;
}

export const ReviewerStage: FC<ReviewerStageProps> = ({
  onPrevious,
  onNext,
}) => {
  const [reviewers, setReviewers] = useState<Mentor[]>([]);
  const [, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getMentors();
        setReviewers(response.data);
      } catch (error) {
        setError("Error getting mentors");
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
      <div className="txt1">Etapa 3: Seleccionar Revisor</div>
      <form onSubmit={formik.handleSubmit} className="mx-16">
        <div className="my-5">
          <label
            htmlFor="reviewer"
            className="txt2"
          >
            Seleccione el revisor del estudiante
          </label>
          <select
            id="reviewer"
            name="reviewer"
            onChange={formik.handleChange}
            value={formik.values.reviewer}
            className={`bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-2 block w-full p-2.5 mt-2 ${
              formik.touched.reviewer && formik.errors.reviewer
                ? "border-red-1"
                : "border-gray-300"
            }`}
          >
            <option value="">Seleccione un Revisor</option>
            {reviewers.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
          {formik.touched.reviewer && formik.errors.reviewer ? (
            <div className="text-red-1 text-xs mt-1">
              {formik.errors.reviewer}
            </div>
          ) : null}
        </div>
        <div className="mt-5 mx-5">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              name="tutorDesignationLetterSubmitted"
              checked={formik.values.tutorDesignationLetterSubmitted}
              onChange={formik.handleChange}
              className="checkbox"
            />
            <span className="ml-2 text-gray-700">
              Carta de Designación de Revisor Presentada
            </span>
          </label>
        </div>

        <div className="flex justify-between mt-4">
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
