export interface Seminar {
    date_seminar_enrollment: string | null;
    id: number;
    modality_id: number;
    modality_name: string;
    period: string;
    project_name: string;
    reviewer_approval: boolean | null;
    reviewer_id: number;
    reviewer_letter: boolean | null;
    reviewer_name: string;
    seminar_enrollment: string | null;
    student_id: number;
    student_name: string;
    tutor_approval: boolean | null;
    tutor_id: number;
    tutor_letter: boolean | null;
    tutor_name: string;
}
