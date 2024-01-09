import { Seminar } from "../models/studentProcess";

export const getStage = (seminar: Seminar) => {
  const { tutor_name, reviewer_name } = seminar;
  if (!tutor_name) {
    return 0;
  }
  if (!reviewer_name) {
    return 1;
  }
  return 2;
};
