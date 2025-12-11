export enum AgentType {
  COORDINATOR = 'COORDINATOR',
  PATIENT_MGMT = 'PATIENT_MGMT',
  MEDICAL_RECORDS = 'MEDICAL_RECORDS',
  STAFF_MGMT = 'STAFF_MGMT',
  BILLING_FINANCE = 'BILLING_FINANCE',
  USER = 'USER'
}

export interface AgentResponseSchema {
  coordinator_thought: string;
  target_agent: AgentType;
  response_content: string;
  generated_document?: {
    type: 'pdf' | 'docx' | 'xlsx' | 'pptx';
    title: string;
  } | null;
  sources?: Array<{ title: string; uri: string }>;
}

export interface Message {
  id: string;
  role: 'user' | 'model';
  content: string; // Raw text for user, parsed text for model
  metadata?: AgentResponseSchema; // Only for model
  timestamp: Date;
}

export interface AgentConfig {
  id: AgentType;
  name: string;
  description: string;
  color: string;
  bgColor: string;
  iconName: string;
}