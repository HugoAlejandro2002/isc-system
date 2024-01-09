import { useLoaderData } from "react-router-dom";
import Checklist from "../components/Checklist";
import ProgressTracker from "../components/ProgressTracker";
import { getStage } from "../helper/process";
import { Seminar } from "../models/studentProcess";

const ProcessInfoPage = () => {
  const process = useLoaderData() as {data: Seminar};
  const { data } = process;
  const stageProcess = getStage(data);
  return (
    <div className="flex flex-row w-full p-4 h-full bg-[#D9E8F3] ">
      <div className="w-2/3 flex flex-col overflow-auto">
        <ProgressTracker
          currentStepIndex={stageProcess}
          status={"Revisor"}          
        />
      </div>
      <div className="w-1/3 flex flex-col">
        <Checklist process={data} />
      </div>
    </div>
  );
};

export default ProcessInfoPage;
