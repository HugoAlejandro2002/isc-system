import LogoUPB from '../assets/Logo-UPB.png';
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const goHome = () => {
    navigate("/home");
  };

  return (
    <section className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
      <div className="md:w-1/3 max-w-sm mr-10">
        <img
           src={LogoUPB}
            alt="UPB image"
        />
      </div>
      <div className="md:w-1/3 max-w-sm">
        <input
          className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded"
          type="text"
          placeholder="Correo Electronico"
        />
        <input
          className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
          type="password"
          placeholder="Password"
        />
        <div className="text-center md:text-center">
          <button
            className="mt-4 bg-primary hover:bg-blue-700 px-10 py-3 text-white uppercase rounded text-sm md:text-base tracking-wider"
            type="submit"
            onClick={goHome}
          >
            Login
          </button>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
