import { useLoaderData } from "react-router-dom";
import Checklist from "../components/Checklist";
// import ProgressTracker from "../components/ProgressTracker";
// import Stage from "../components/stages/Stage";

// const steps = [
//   "Seminario Grado",
//   "Tutor",
//   "Revisor",
//   "Defensa Interna",
//   "Defensa Externa",
// ];

interface processInterface{
  data: [];
  message: string;
}
const ProcessInfoPage = () => {
  // const countdown = 22;
  const response = useLoaderData() as processInterface;
  const {data: process} = response;
  console.log(process);
  // const { graduationSteps, state } = process;
  // const passedCount: number = 0;

  return (
    <div className="flex flex-row w-full p-10 h-full bg-sky-50 ">
      <div className="w-2/3 flex flex-col overflow-auto">
          {/* <ProgressTracker
            steps={steps}
            currentStepIndex={passedCount - 1}
            status={state}
            countdown={countdown}
          /> */}
      </div>
      <div className="w-1/3 flex flex-col">
        <Checklist process={process} />
      </div>
    </div>
  );
};

export default ProcessInfoPage;
