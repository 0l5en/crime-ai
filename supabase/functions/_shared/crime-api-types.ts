
// Updated shared types for the new OpenAPI schema

export interface CrimeCaseDto {
  id: string;
  title: string;
  description: string;
  summary: string;
  language: string;
  imageUrl?: string;
  textToImage: string;
  status: "UNPUBLISHED" | "PUBLISHED" | "PREMIUM";
}

export interface ResultSetCrimeCase {
  items?: CrimeCaseDto[];
}

// Define query parameters for listCrimeCases operation
export interface ListCrimeCasesParams {
  maxResults?: string;
  caseGeneratorFormType?: string;
  userId?: string;
}

// Define Crime API Paths for type-safe API calls
export interface CrimeApiPaths {
  "/crimecase": {
    get: {
      parameters: {
        query?: ListCrimeCasesParams;
      };
      responses: {
        200: {
          content: {
            "application/json": ResultSetCrimeCase;
          };
        };
      };
    };
  };
  "/crimecase/{id}": {
    patch: {
      parameters: {
        path: {
          id: string;
        };
      };
      requestBody: {
        content: {
          "application/json": CrimeCaseDto;
        };
      };
      responses: {
        204: {
          content?: never;
        };
      };
    };
  };
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

export interface CreateCaseGeneratorFormBasicDto {
  caseGeneratorForm: "BASIC" | "VACATION_RENTAL";
  language: string;
  epoch: "TWENTIES" | "PRESENT" | "FUTURE";
  theme: "MURDER" | "ROBBERY" | "KIDNAPPING";
  additionalThemeDetails?: string;
  fullAddress: string;
  venueName: string;
  venueDescription: string;
  nearbySightseeingAttractions: CreateSightseeingAttractionDto[];
  approximateYearOfConstruction?: number;
  historicalFeaturesAndLegends?: string;
  historicalCulturalContext?: string;
}

export interface CreateCaseGeneratorFormVacationRentalDto {
  formBase: CreateCaseGeneratorFormBasicDto;
  venueFloors: number;
  venueBedrooms: number;
  venueBathrooms: number;
  maxGuests: number;
  roomLayoutDescription?: string;
  userId: string;
}

export interface CreateSightseeingAttractionDto {
  attractionName: string;
  distanceToVenue: number;
}

export interface Violations {
  violations?: Violation[];
}

export interface Violation {
  message?: string;
  propertyPath?: string;
}

export interface CrimeSceneDto {
  id: number;
  title: string;
  description: string;
  textToImage: string;
  imageUrl: string;
}

export interface EvidenceDto {
  id: number;
  title: string;
  description: string;
  location: string;
  analysisResult: string;
  evidenceType: "FORENSIC" | "BALLISTIC" | "DIGITAL" | "DOCUMENT" | "TRACE" | "OTHER";
  textToImage: string;
  documentContent?: string;
  imageUrl: string;
}

export interface ResultSetEvidence {
  items?: EvidenceDto[];
}

export interface EvidenceReportDto {
  id: number;
  analysis: string;
  methods: string;
  conclusion: string;
  personId: number;
}

export interface ResultSetEvidenceReport {
  items?: EvidenceReportDto[];
}

// Updated CreateEvidenceReportDto to match OpenAPI spec - only evidenceId and personId
export interface CreateEvidenceReportDto {
  evidenceId: number;
  personId: number;
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

export interface SolutionSpoilerDto {
  evidenceTitles: string[];
  motiveTitles: string[];
  personNames: string[];
}

export interface AlibiDto {
  id: number;
  content: string;
}

export interface PersonDto {
  id: number;
  name: string;
  roles: ("VICTIM" | "WITNESS" | "SUSPECT" | "DIGITAL_EXPERT" | "FORENSIC_EXPERT" | "BALLISTIC_EXPERT" | "DOCUMENT_EXPERT" | "TRACE_EXPERT" | "FORENSIC_PATHOLOGIST" | "CRIMINAL_ASSISTANT" | "PERPETRATOR")[];
  age: number;
  profession: string;
  gender: string;
  personality: string;
  maritalStatus: string;
  financialSituation: string;
  previousConvictions: string[];
  relationshipToCase: string;
  lifeStatus: "DEAD" | "ALIVE";
  alibi?: AlibiDto;
  textToImage: string;
  imageUrl?: string;
}

export interface ResultSetPerson {
  items?: PersonDto[];
}

export interface AutopsyReportDto {
  id: number;
  reportAuthorId: number;
  externalExamination: string;
  internalExamination: string;
  causeOfDeath: string;
  conclusionsAndAssessment: string;
  timeOfDeathFrom: string;
  timeOfDeathTo: string;
}

export interface ResultSetAutopsyReport {
  items?: AutopsyReportDto[];
}

export interface CreateAutopsyReportDto {
  reportAuthorId: number;
  victimId: number;
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
  key: string;
  value: string;
}

export interface CriminalPoliceTeamDto {
  personType: "VICTIM" | "WITNESS" | "SUSPECT" | "DIGITAL_EXPERT" | "FORENSIC_EXPERT" | "BALLISTIC_EXPERT" | "DOCUMENT_EXPERT" | "TRACE_EXPERT" | "FORENSIC_PATHOLOGIST" | "CRIMINAL_ASSISTANT" | "PERPETRATOR";
  contactPersonId: number;
}

export interface ResultSetCriminalPoliceTeamDto {
  items?: CriminalPoliceTeamDto[];
}

export interface TaskInfoDto {
  id: string;
  taskStatus: "PENDING" | "COMPLETED";
  createdAt: string;
  completedAt?: string;
}

export interface NotificationDto {
  id: number;
  notificationContextType: "AUTOPSY_REPORT";
  recipientId: string;
  nameOfSender: string;
  subject: string;
  read: boolean;
  createdAt: string;
}

export interface ResultSetNotification {
  items?: NotificationDto[];
}

export interface CreateAutopsyReportRequestDto {
  userId: string;
  victimId: number;
}
