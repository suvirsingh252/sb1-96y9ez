interface DocumentRequirement {
  id: string;
  name: string;
  description: string;
  type: 'IMAGE' | 'PDF' | 'HOT2000' | 'OTHER';
  required: boolean;
  maxSize?: number; // in MB
  allowedFormats?: string[];
  stage: 'INITIAL_AUDIT' | 'FINAL_AUDIT' | 'POST_RETROFIT';
}

interface HOT2000Value {
  id: string;
  name: string;
  unit: string;
  category: 'HEATING' | 'COOLING' | 'VENTILATION' | 'ENVELOPE' | 'OTHER';
  value: number | null;
  targetValue?: number;
  recommendations?: string[];
}

export interface Program {
  id: string;
  name: string;
  description: string;
  documentRequirements: DocumentRequirement[];
  hot2000Requirements: HOT2000Value[];
  status: 'ACTIVE' | 'INACTIVE';
}

export interface ProgramDocument {
  id: string;
  programId: string;
  requirementId: string;
  participantId: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  uploadedAt: string;
  uploadedBy: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  notes?: string;
  url: string;
}

export interface HOT2000Data {
  id: string;
  participantId: string;
  programId: string;
  values: {
    [key: string]: {
      before: number;
      after?: number;
      target: number;
      recommendations: string[];
    };
  };
  uploadedAt: string;
  uploadedBy: string;
  status: 'DRAFT' | 'SUBMITTED' | 'APPROVED' | 'REJECTED';
  notes?: string;
}