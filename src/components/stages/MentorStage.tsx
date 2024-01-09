import { useFormik } from "formik";
import { useEffect, useState, FC } from "react";
import { Mentor } from "../../models/mentorInterface";
import * as Yup from "yup";
import { getMentors } from "../../services/mentorsService";

const validationSchema = Yup.object({
  mentor: Yup.string().required("* Debe seleccionar un tutor"),
});

interface MentorStageProps {
  onPrevious: () => void;
  onNext: () => void;
}

export const MentorStage:FC<MentorStageProps> = ({ onPrevious, onNext }) => {
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getMentors();
        setMentors(response);
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, []);
  
  const formik = useFormik({
    initialValues: {
      tutorDesignationLetterSubmitted: false,
      mentor: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
      onNext();
    },
  });

  return (
    <>
      <div className="txt1">Etapa 2: Seleccionar Tutor</div>
      <form onSubmit={formik.handleSubmit} className="mx-16">
        <div className="my-5">
          <label htmlFor="mentor" className="txt2">
            Seleccione el tutor del estudiante
          </label>
          <select
            id="mentor"
            name="mentor"
            onChange={formik.handleChange}
            value={formik.values.mentor}
            className={`select-1 ${
              formik.touched.mentor && formik.errors.mentor
                ? "border-red-1"
                : "border-gray-300"
            }`}          >
            <option value="">Seleccione un Tutor</option>
            {mentors.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {formik.touched.mentor && formik.errors.mentor ? (
            <div className="text-red-1 text-xs mt-1">
              {formik.errors.mentor}
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
              Carta de Designación de Tutor Presentada
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
