export enum ParticipantStatus {
  READY_FOR_BOOKING = 'READY_FOR_BOOKING',
  BOOKED = 'BOOKED',
  AUDIT_COMPLETED = 'AUDIT_COMPLETED',
  READY_FOR_TECH_TEAM = 'READY_FOR_TECH_TEAM',
  READY_FOR_CONTRACTOR_QUOTE = 'READY_FOR_CONTRACTOR_QUOTE',
  WORKORDERS_SENT = 'WORKORDERS_SENT',
  READY_FOR_FINAL_AUDIT = 'READY_FOR_FINAL_AUDIT',
  FINAL_AUDIT_BOOKED = 'FINAL_AUDIT_BOOKED',
  COMPLETED = 'COMPLETED',
  ON_HOLD = 'ON_HOLD'
}

export interface ParticipantStatusUpdate {
  status: ParticipantStatus;
  assignedTo?: string;
  notes?: string;
  updatedAt: string;
  updatedBy: string;
}

export interface Participant {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  program: string;
  status: ParticipantStatus;
  createdAt: string;
  propertyType: string;
  notes: string;
  assignedAdvisor?: string;
  onHold: boolean;
  statusHistory?: ParticipantStatusUpdate[];
  initialAuditDate?: string;
  finalAuditDate?: string;
  reportUploaded?: boolean;
  completedAt?: string;
  priority?: 'high' | 'medium' | 'low';
}