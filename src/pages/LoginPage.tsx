import { useState } from "react";
import LogoUPB from "../assets/Logo-UPB.png";
import { useNavigate } from "react-router-dom";
import { authenticateUser } from "../services/authService";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ErrorMessage } from "../components/common/ErrorMessage";
import SpinModal from "../components/common/SpinModal";

const LoginPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Correo electrónico inválido")
        .required("Requerido"),
      password: Yup.string()
        .min(6, "Debe tener al menos 6 caracteres")
        .required("Requerido"),
    }),
    onSubmit: async (values,  { setSubmitting }) => {
      setError("");
      setIsLoading(true);
      try {
        const isAuthenticated = await authenticateUser(values.email, values.password);
        if (isAuthenticated.data) {
          navigate("/home");
        } else {
          setError("Credenciales incorrectas");
        }
      } catch (e) {
        setError("Credenciales incorrectas");
      } finally {
        setIsLoading(false);
        setSubmitting(false);
      }
    },
  });

  return (
    isLoading ? <SpinModal/> :
    <section className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0 ">
      <div className="md:w-1/3 max-w-sm mr-10">
        <img src={LogoUPB} alt="UPB image" />
      </div>
      <div className="md:w-1/3 max-w-sm">
        <form onSubmit={formik.handleSubmit}>
          <input
            className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded"
            type="text"
            placeholder="Correo Electronico"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email ? (
             <ErrorMessage message={formik.errors.email}/>
          ) : null}
          <input
            className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
            type="password"
            placeholder="Password"
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password ? (
            <ErrorMessage message={formik.errors.password}/>
          ) : null}
          {error && <div className="text-red-500">{error}</div>}
          <div className="text-center md:text-center">
            <button
              className="mt-4 bg-primary hover:bg-blue-700 px-10 py-3 text-white uppercase rounded text-sm md:text-base tracking-wider"
              type="submit"
              disabled={formik.isSubmitting || isLoading}
            >
              {isLoading ? "Cargando..." : "Login"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default LoginPage;
