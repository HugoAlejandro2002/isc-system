import {
  FaEnvelope,
  FaCalendarCheck,
  FaUserTie,
  FaUserSecret,
  FaUserShield,
  FaUserGraduate,
} from "react-icons/fa";

const Checklist = ({ process }) => {
  const { student_name,tutor_name,reviewer_name,modality_name,  project_name, period} = process;

  const telegramLink = `https://t.me/+59176517816`;
  return (
    <div className="h-full bg-white rounded-lg shadow-lg p-4 m-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">{student_name}</h2>
          <p className="text-gray-600">{project_name}</p>
          <p className="text-gray-500 text-sm">{modality_name}</p>
        </div>
      </div>

      <div className="flex space-x-4 my-4">
        <a href={telegramLink} target="_blank" rel="noopener noreferrer">
          <button className="flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-md">
            <FaEnvelope className="mr-2" /> Enviar Mensaje
          </button>
        </a>
      </div>

      <div className="border-t pt-4">
        <div className="flex items-center justify-between text-gray-800 text-md">
          <button>Etapas de Graduación</button>
        </div>
      </div>

      <ol className="ml-5 mt-2 relative border-s border-gray-200 dark:border-gray-700">
        <li className="mb-10 ms-6">
          <span className="absolute flex items-center justify-center w-7 h-7 bg-blue-100 rounded-full -start-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
            <FaCalendarCheck className="text-blue-800" />
          </span>
          <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white">
            Seminario de Grado
          </h3>
          { period ? (
            <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
              Inscripción {period}
            </time>
          ) : (
            <span>No inscrito aun</span>
          )}
        </li>
        <li className="mb-10 ms-6">
          <span className="absolute flex items-center justify-center w-7 h-7 bg-blue-100 rounded-full -start-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
            <FaUserTie className="text-blue-800" />
          </span>
          <h3 className="mb-1 text-lg font-semibold text-gray-900 dark:text-white">
            Tutor: {tutor_name || "Sin Asignacion"}
          </h3>
          {/* {tutorStage.passed ? (
            <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
              Aprobación del Tutor on {tutorStage.date}
            </time>
          ) : (
            <span>Fase de Tutor no Aprobada</span>
          )} */}
        </li>
        <li className="mb-10 ms-6">
          <span className="absolute flex items-center justify-center w-7 h-7 bg-blue-100 rounded-full -start-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
            <FaUserSecret className="text-blue-800" />
          </span>
          <h3 className="mb-1 text-lg font-semibold text-gray-900 dark:text-white">
            Revisor: {reviewer_name || "Sin Asignacion"}
          </h3>
          {/* {reviewerStage.passed ? (
            <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
              Aprobación del Revisor on {reviewerStage.date}
            </time>
          ) : (
            <span>Fase de Revisor no Aprobada</span>
          )} */}
        </li>
        <li className="mb-10 ms-6">
          <span className="absolute flex items-center justify-center w-7 h-7 bg-blue-100 rounded-full -start-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
            <FaUserShield className="text-blue-800" />
          </span>
          <h3 className="mb-1 text-lg font-semibold text-gray-900 dark:text-white">
            Defensa Interna
          </h3>
          {/* {internalDefenseStage.passed ? (
            <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
              Defensa Interna on December 2nd, 2021
            </time>
          ) : (
            <span className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
              Sin defensa Interna
            </span>
          )} */}
        </li>
        <li className="ms-6">
          <span className="absolute flex items-center justify-center w-7 h-7 bg-blue-100 rounded-full -start-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
            <FaUserGraduate className="text-blue-800"/>
          </span>
          <h3 className="mb-1 text-lg font-semibold text-gray-900 dark:text-white">
            Defensa Externa
          </h3>
          {/* {internalDefenseStage.passed ? (
            <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
              Defensa Interna on December 2nd, 2021
            </time>
          ) : (
            <span className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
              Sin defensa Externa
            </span>
          )} */}
        </li>
      </ol>
    </div>
  );
};

export default Checklist;
