import { useLoaderData } from "react-router-dom";
import Checklist from "../components/Checklist";
import ProgressTracker from "../components/ProgressTracker";
import Stage from "../components/stages/Stage";

const steps = [
  "Seminario Grado",
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
    <div className="flex flex-col md:flex-row p-10 h-screen bg-sky-50">
      <div className="w-2/3 flex flex-col">
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
