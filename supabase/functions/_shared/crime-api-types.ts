
// Shared types extracted from the OpenAPI schema for Edge Functions
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

export interface CreateInterrogationAnswerDto {
  question: string;
  userId: string;
  personId: number;
}

export interface QuestionAndAnswerDto {
  question: string;
  answer: string;
  createdAt: string;
}

export interface ResultSetQuestionAndAnswer {
  items?: QuestionAndAnswerDto[];
}

// OpenAPI paths for type-safe requests
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
          "application/json": CreateCrimeCaseDto;
        };
      };
      responses: {
        201: {
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
}
