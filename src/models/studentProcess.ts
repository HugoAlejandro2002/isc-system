export interface Seminar {
    date_seminar_enrollment: string | null;
    id: number;
    modality_id: number;
    modality_name: string;
    period: string;
    project_name: string;
    reviewer_approval: boolean | null;
    reviewer_id: number | undefined;
    reviewer_letter: boolean | null;
    reviewer_name: string;
    seminar_enrollment: string | null;
    student_id: number;
    student_name: string;
    tutor_approval: boolean | null;
    tutor_id: number | undefined;
    tutor_letter: boolean | null;
    tutor_name: string;
}


export interface GraduationProcess {
    id?: number; // Optional for creation as it's auto-generated
    student_id: number;
    modality_id: number;
    project_name: string;
    seminar_enrollment: boolean;
    date_seminar_enrollment: Date;
    period: string;
    tutor_letter: boolean;
    tutor_id?: number;
    tutor_approval: boolean;
    reviewer_letter: boolean;
    reviewer_id?: number;
    reviewer_approval: boolean;
}
