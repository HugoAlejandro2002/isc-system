import { useEffect, useState } from "react";
import { InternalDefenseStage } from "./stages/InternalDefenseStage";
import { MentorStage } from "./stages/MentorStage";
import { RegistrationStage } from "./stages/RegistrationStage";
import { ReviewerStage } from "./stages/ReviewerStage";
import { ExternalDefenseStage } from "./stages/ExternalDefenseStage";

const ProgressTracker = ({ steps, currentStepIndex, status, countdown }) => {
  const [progressWidth, setProgressWidth] = useState((currentStepIndex / (steps.length - 1)) * 100);
  const [currentStage, setCurrentStage] = useState(currentStepIndex);

  const goToNextStage = () => {
    setCurrentStage((prevStage: number) => prevStage + 1);
    setProgressWidth(((currentStage + 1) / (steps.length - 1)) * 100);
  };

  const goToPreviousStage = () => {
    setCurrentStage((prevStage: number) => prevStage - 1);
    setProgressWidth(((currentStage - 1) / (steps.length - 1)) * 100);
  };


  const renderStage = () => {
    switch (currentStage) {
      case 0:
        return <RegistrationStage onNext={goToNextStage} />;
      case 1:
        return (
          <MentorStage onNext={goToNextStage} onPrevious={goToPreviousStage} />
        );
      case 2:
        return (
          <ReviewerStage
            onNext={goToNextStage}
            onPrevious={goToPreviousStage}
          />
        );
      case 3:
        return (
          <InternalDefenseStage
            onPrevious={goToPreviousStage}
            onNext={goToNextStage}
          />
        );
      case 4:
        return (
          <ExternalDefenseStage
            onPrevious={goToPreviousStage}
            onNext={goToNextStage}
          />
        );
      default:
        return <div>Etapa desconocida</div>;
    }
  };

  return (
    <div className="bg-white m-5 p-5 shadow-md rounded-lg h-full">
      <div className="flex items-center justify-between my-2 mx-5">
        <h2 className="text-lg font-semibold">Progreso</h2>
        <div className="flex items-center space-x-4 mx-5">
          <p className="text-lg font-medium text-blue-700">
            Estado: <span className="text-red-500">{status}</span>
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between m-5 p-5">
        <div className="relative w-full">
          <div className="absolute w-full bg-gray-200 rounded-full h-1.5">
            <div
              className="absolute bg-blue-500 h-1.5 rounded-full"
              style={{ width: `${progressWidth}%` }}
            />
          </div>
          {steps.map((step: string, index: number) => (
            <div
              key={step}
              className={`absolute -translate-y-1/2 ${
                index <= currentStage ? "bg-blue-500" : "bg-gray-200"
              } border-2 border-blue-500 rounded-full`}
              style={{
                left: `${(index / (steps.length - 1)) * 100}%`,
                width: "24px",
                height: "24px",
                marginTop: "0px",
                marginLeft: "-12px",
              }}
            >
              <span
                className="absolute -translate-x-1/2 -translate-y-1/2 text-xs text-blue-700 my-5"
                style={{
                  top: "100%",
                  left: "50%",
                }}
              >
                {step}
              </span>
            </div>
          ))}
        </div>
      </div>
      {renderStage()}
    </div>
  );
};

export default ProgressTracker;
