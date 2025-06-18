
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
}
