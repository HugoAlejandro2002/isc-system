import { FC } from "react";
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

// Props Type
interface TableProps {
  data: any[]; // Asume una estructura de datos genérica
  pageSize: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  tableHeaders: any[];
}

// El componente Table
const Table: FC<TableProps> = ({
  data,
  pageSize,
  currentPage,
  onPageChange,
  tableHeaders,
}) => {
  // Calcular el rango de datos para la página actual
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedData = data.slice(startIndex, startIndex + pageSize);
  const navigate = useNavigate();
  const goStudentProcess = () => {
    console.log('asdasd')
    navigate("/studentProfile");
  }
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg m-10">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {tableHeaders.map((header) => (
              <th key={header.key} scope="col" className="px-6 py-3">
                {header.isCheckbox ? (
                  <div className="flex items-center">
                    <input
                      id="checkbox-all-search"
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label htmlFor="checkbox-all-search" className="sr-only">
                      checkbox
                    </label>
                  </div>
                ) : (
                  header.label
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((item, index) => (
            <tr
              key={index}
              className="px-6 bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {item.studentName}
              </th>
              <td className="px-6 py-4">{item.tutorName}</td>
              <td className="px-6 py-4">{item.reviewerName}</td>
              <td className="px-6 py-4">
                <button onClick={goStudentProcess} className="text-gray-600 hover:text-gray-900">
                  <FaEye />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Paginación */}
      <nav
        className="flex items-center justify-end p-5"
        aria-label="Table navigation"
      >
        <ul className="inline-flex -space-x-px">
          {/* Botón Anterior */}
          <li>
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 border rounded-l-lg"
            >
              Anterior
            </button>
          </li>
          {/* Números de página */}
          {Array.from({ length: Math.ceil(data.length / pageSize) }, (_, i) => (
            <li key={i}>
              <button
                onClick={() => onPageChange(i + 1)}
                className={`px-3 py-1 border ${
                  currentPage === i + 1 ? "bg-blue-200" : ""
                }`}
              >
                {i + 1}
              </button>
            </li>
          ))}
          {/* Botón Siguiente */}
          <li>
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === Math.ceil(data.length / pageSize)}
              className="px-3 py-1 border rounded-r-lg"
            >
              Siguiente
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Table;
