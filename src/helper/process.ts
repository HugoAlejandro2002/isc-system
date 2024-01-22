import { GraduationProcess, Seminar } from "../models/studentProcess";

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


export function convertSeminarToGraduationProcess(seminar: Seminar): GraduationProcess {
  const graduationProcess: GraduationProcess = {
    student_id: seminar.student_id,
    modality_id: seminar.modality_id,
    project_name: seminar.project_name,
    seminar_enrollment: seminar.seminar_enrollment === 'true',
    date_seminar_enrollment: new Date(seminar.date_seminar_enrollment || ''),
    period: seminar.period,
    tutor_letter: seminar.tutor_letter || false, 
    tutor_id: seminar.tutor_id || undefined, 
    tutor_approval: seminar.tutor_approval || false, 
    reviewer_letter: seminar.reviewer_letter || false, 
    reviewer_id: seminar.reviewer_id || undefined, 
    reviewer_approval: seminar.reviewer_approval || false,
  };

  return graduationProcess;
}