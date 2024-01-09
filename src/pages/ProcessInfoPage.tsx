import { useLoaderData } from "react-router-dom";
import Checklist from "../components/Checklist";
import ProgressTracker from "../components/ProgressTracker";

const steps = [
  "Seminario de Grado",
  "Tutor",
  "Revisor",
  "Defensa Interna",
  "Defensa Externa",
];

const ProcessInfoPage = () => {
  const countdown = 22;
  const process = useLoaderData();
  const { graduationSteps, state } = process;
  const passedCount: number = Object.values(graduationSteps).reduce((count: number, stage) => {
    return count + (stage.passed ? 1 : 0);
  }, 0);

  return (
    <div className="flex flex-row w-full p-4 h-full bg-[#D9E8F3] ">
      <div className="w-2/3 flex flex-col overflow-auto">
          <ProgressTracker
            steps={steps}
            currentStepIndex={passedCount - 1}
            status={state}
            countdown={countdown}
          />
      </div>
      <div className="w-1/3 flex flex-col">
        <Checklist process={process} />
      </div>
    </div>
  );
};

export default ProcessInfoPage;
