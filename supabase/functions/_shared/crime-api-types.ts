// Updated shared types for the new OpenAPI schema

export interface CrimeCaseDto {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
}

export interface ResultSetCrimeCase {
  items?: CrimeCaseDto[];
}

export interface CreateCrimeCaseDto {
  amountEvidences: number;
  amountPersons: number;
  difficultyLevel: number;
  era: string;
  language: string;
  location: string;
  maxAmountMotivesPerSuspect: number;
}

export interface CrimeSceneDto {
  id: number;
  title: string;
  description: string;
}

export interface EvidenceDto {
  id: number;
  title: string;
  description: string;
  location: string;
  analysisResult: string;
  evidenceType: "FORENSIC" | "BALLISTIC" | "DIGITAL" | "DOCUMENT" | "TRACE" | "OTHER";
}

export interface ResultSetEvidence {
  items?: EvidenceDto[];
}

export interface EvidenceReportDto {
  id: number;
  report: string;
  personId: number;
}

export interface ResultSetEvidenceReport {
  items?: EvidenceReportDto[];
}

export interface CreateEvidenceReportDto {
  evidenceId: number;
  reportType: string;
  content: string;
  createdBy: string;
}

export interface MotiveDto {
  id: number;
  title: string;
  description: string;
}

export interface ResultSetMotive {
  items?: MotiveDto[];
}

export interface SolutionAttemptDto {
  id: number;
  userId: string;
  success: boolean;
  createdAt: string;
}

export interface ResultSetSolutionAttempt {
  items?: SolutionAttemptDto[];
}

export interface CreateSolutionAttemptDto {
  solution: SolutionDto;
  userId: string;
}

export interface SolutionDto {
  evidenceIds: number[];
  motiveIds: number[];
  personIds: number[];
}

export interface PersonDto {
  id: number;
  name: string;
  type: "VICTIM" | "WITNESS" | "SUSPECT";
  age: number;
  profession: string;
  gender: string;
  personality: string;
  maritalStatus: string;
  financialSituation: string;
  previousConvictions: string[];
  relationshipToCase: string;
}

export interface ResultSetPerson {
  items?: PersonDto[];
}

export interface InterrogationDto {
  id: number;
  userId: string;
  personId: number;
}

export interface ResultSetInterrogation {
  items?: InterrogationDto[];
}

export interface CreateReferenceDto {
  referenceId: number;
  referenceType: "EVIDENCE_REPORT";
}

export interface CreateInterrogationAnswerDto {
  question: string;
  userId: string;
  personId: number;
  reference?: CreateReferenceDto;
}

export interface QuestionAndAnswerDto {
  question: string;
  answer: string;
  createdAt: string;
}

export interface ResultSetQuestionAndAnswer {
  items?: QuestionAndAnswerDto[];
}

export interface CreatePromptTemplateDto {
  name: string;
  template: string;
}

export interface PromptTemplateVersionDto {
  id: number;
  createdAt: string;
}

export interface ResultSetPromptTemplateVersion {
  items?: PromptTemplateVersionDto[];
}

export interface PromptTemplateIdentifierDto {
  id: number;
  name: string;
}

export interface ResultSetPromptTemplateIdentifier {
  items?: PromptTemplateIdentifierDto[];
}

export interface PromptTemplateDto {
  id: number;
  name: string;
  template: string;
  createdAt: string;
}

export interface TemplateContextDto {
  variables?: TemplateVariableDto[];
}

export interface TemplateVariableDto {
  key?: string;
  value?: string;
}
