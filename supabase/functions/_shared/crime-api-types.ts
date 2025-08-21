
// Updated shared types for the new OpenAPI schema
export interface CrimeCaseDto {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  language?: string;
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
}

export interface ResultSetEvidence {
  items?: EvidenceDto[];
}

export interface MotiveDto {
  id: number;
  title: string;
  description: string;
}

export interface ResultSetMotive {
  items?: MotiveDto[];
}

export interface PersonDto {
  id: number;
  name: string;
  type: "VICTIM" | "WITNESS" | "SUSPECT" | "INVESTIGATOR" | "EXPERT" | "FAMILY_MEMBER" | "NEIGHBOR" | "COLLEAGUE" | "FRIEND" | "ACQUAINTANCE" | "STRANGER" | "OTHER";
  age: number;
  profession: string;
  gender: string;
  personality: string;
  maritalStatus: string;
  financialSituation: string;
  previousConvictions: string[];
  relationshipToCase: string;
  lifeStatus?: "ALIVE" | "DEAD" | "MISSING" | "UNKNOWN";
}

export interface ResultSetPerson {
  items?: PersonDto[];
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

export interface SolutionDto {
  evidenceIds: number[];
  motiveIds: number[];
  personIds: number[];
}

export interface CreateSolutionAttemptDto {
  solution: SolutionDto;
  userId: string;
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
  type: string;
  id: number;
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

// New DTOs for task management
export interface TaskInfoDto {
  id: string;
  status: "PENDING" | "RUNNING" | "COMPLETED" | "FAILED";
  createdAt: string;
  updatedAt?: string;
  result?: any;
  error?: string;
}

// New DTOs for criminal police teams
export interface CriminalPoliceTeamDto {
  id: number;
  name: string;
  description: string;
  members: PersonDto[];
}

export interface ResultSetCriminalPoliceTeam {
  items?: CriminalPoliceTeamDto[];
}

// New DTOs for evidence reports
export interface EvidenceReportDto {
  id: number;
  evidenceId: number;
  reportType: string;
  content: string;
  createdAt: string;
  createdBy: string;
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

// New DTOs for autopsy reports
export interface AutopsyReportDto {
  id: number;
  victimId: number;
  causeOfDeath: string;
  timeOfDeath?: string;
  additionalFindings: string;
  performedBy: string;
  createdAt: string;
}

export interface ResultSetAutopsyReport {
  items?: AutopsyReportDto[];
}

export interface CreateAutopsyReportDto {
  victimId: number;
  causeOfDeath: string;
  timeOfDeath?: string;
  additionalFindings: string;
  performedBy: string;
}

// Prompt Template Types
export interface PromptTemplateIdentifierDto {
  id: number;
  name: string;
}

export interface ResultSetPromptTemplateIdentifier {
  items?: PromptTemplateIdentifierDto[];
}

export interface PromptTemplateVersionDto {
  id: number;
  createdAt: string;
}

export interface ResultSetPromptTemplateVersion {
  items?: PromptTemplateVersionDto[];
}

export interface PromptTemplateDto {
  id: number;
  name: string;
  template: string;
  createdAt: string;
}

export interface TemplateVariableDto {
  key?: string;
  value?: string;
}

export interface TemplateContextDto {
  variables?: TemplateVariableDto[];
}

// Updated OpenAPI paths for type-safe requests
export interface CrimeApiPaths {
  "/crimecase": {
    get: {
      responses: {
        200: {
          content: {
            "application/json": ResultSetCrimeCase;
          };
        };
      };
    };
    post: {
      requestBody: {
        content: {
          "application/json": TemplateContextDto;
        };
      };
      responses: {
        202: {
          headers: {
            Location: string;
          };
          content?: never;
        };
      };
    };
  };
  "/crimecase/{id}": {
    get: {
      parameters: {
        path: {
          id: string;
        };
      };
      responses: {
        200: {
          content: {
            "application/json": CrimeCaseDto;
          };
        };
      };
    };
    delete: {
      parameters: {
        path: {
          id: string;
        };
      };
      responses: {
        204: {
          content?: never;
        };
      };
    };
  };
  "/crimecase/{id}/victim": {
    get: {
      parameters: {
        path: {
          id: string;
        };
      };
      responses: {
        200: {
          content: {
            "application/json": ResultSetPerson;
          };
        };
      };
    };
  };
  "/crimecase/{id}/criminal-police-teams": {
    get: {
      parameters: {
        path: {
          id: string;
        };
      };
      responses: {
        200: {
          content: {
            "application/json": ResultSetCriminalPoliceTeam;
          };
        };
      };
    };
  };
  "/crimecase/{id}/crimescene": {
    get: {
      parameters: {
        path: {
          id: string;
        };
      };
      responses: {
        200: {
          content: {
            "application/json": CrimeSceneDto;
          };
        };
      };
    };
  };
  "/crimecase/{id}/evidence": {
    get: {
      parameters: {
        path: {
          id: string;
        };
      };
      responses: {
        200: {
          content: {
            "application/json": ResultSetEvidence;
          };
        };
      };
    };
  };
  "/crimecase/{id}/motive": {
    get: {
      parameters: {
        path: {
          id: string;
        };
      };
      responses: {
        200: {
          content: {
            "application/json": ResultSetMotive;
          };
        };
      };
    };
  };
  "/crimecase/{id}/solution-attempt": {
    get: {
      parameters: {
        path: {
          id: string;
        };
        query?: {
          "user-id"?: string;
          success?: string;
        };
      };
      responses: {
        200: {
          content: {
            "application/json": ResultSetSolutionAttempt;
          };
        };
      };
    };
    post: {
      parameters: {
        path: {
          id: string;
        };
      };
      requestBody: {
        content: {
          "application/json": CreateSolutionAttemptDto;
        };
      };
      responses: {
        201: {
          content?: never;
        };
      };
    };
  };
  "/crimecase/{id}/suspect": {
    get: {
      parameters: {
        path: {
          id: string;
        };
      };
      responses: {
        200: {
          content: {
            "application/json": ResultSetPerson;
          };
        };
      };
    };
  };
  "/crimecase/{id}/witness": {
    get: {
      parameters: {
        path: {
          id: string;
        };
      };
      responses: {
        200: {
          content: {
            "application/json": ResultSetPerson;
          };
        };
      };
    };
  };
  "/task/{id}": {
    get: {
      parameters: {
        path: {
          id: string;
        };
      };
      responses: {
        200: {
          content: {
            "application/json": TaskInfoDto;
          };
        };
      };
    };
  };
  "/evidence-report": {
    get: {
      responses: {
        200: {
          content: {
            "application/json": ResultSetEvidenceReport;
          };
        };
      };
    };
    post: {
      requestBody: {
        content: {
          "application/json": CreateEvidenceReportDto;
        };
      };
      responses: {
        201: {
          content?: never;
        };
      };
    };
  };
  "/autopsy-report": {
    get: {
      responses: {
        200: {
          content: {
            "application/json": ResultSetAutopsyReport;
          };
        };
      };
    };
    post: {
      requestBody: {
        content: {
          "application/json": CreateAutopsyReportDto;
        };
      };
      responses: {
        201: {
          content?: never;
        };
      };
    };
  };
  "/interrogation": {
    get: {
      parameters?: {
        query?: {
          "user-id"?: string;
          "person-id"?: string;
        };
      };
      responses: {
        200: {
          content: {
            "application/json": ResultSetInterrogation;
          };
        };
      };
    };
    post: {
      requestBody: {
        content: {
          "application/json": CreateInterrogationAnswerDto;
        };
      };
      responses: {
        201: {
          content?: never;
        };
      };
    };
  };
  "/interrogation/{id}/question-and-answer": {
    get: {
      parameters: {
        path: {
          id: string;
        };
      };
      responses: {
        200: {
          content: {
            "application/json": ResultSetQuestionAndAnswer;
          };
        };
      };
    };
  };
  "/prompt-template-identifier": {
    get: {
      responses: {
        200: {
          content: {
            "application/json": ResultSetPromptTemplateIdentifier;
          };
        };
      };
    };
  };
  "/prompt-template-history": {
    get: {
      parameters: {
        query: {
          name: string;
        };
      };
      responses: {
        200: {
          content: {
            "application/json": ResultSetPromptTemplateVersion;
          };
        };
      };
    };
  };
  "/prompt-template/{id}": {
    get: {
      parameters: {
        path: {
          id: string;
        };
      };
      responses: {
        200: {
          content: {
            "application/json": PromptTemplateDto;
          };
        };
      };
    };
  };
  "/prompt-template/{id}/template-context": {
    get: {
      parameters: {
        path: {
          id: string;
        };
      };
      responses: {
        200: {
          content: {
            "application/json": TemplateContextDto;
          };
        };
      };
    };
  };
}
