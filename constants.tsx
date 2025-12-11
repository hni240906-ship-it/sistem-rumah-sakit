import React from 'react';
import { AgentConfig, AgentType } from './types';
import { 
  Activity, 
  FileText, 
  Users, 
  CreditCard, 
  LayoutDashboard,
  Stethoscope
} from 'lucide-react';

export const AGENTS: Record<string, AgentConfig> = {
  [AgentType.COORDINATOR]: {
    id: AgentType.COORDINATOR,
    name: 'System Coordinator',
    description: 'Triages requests and delegates to specialists.',
    color: 'text-slate-600',
    bgColor: 'bg-slate-100',
    iconName: 'LayoutDashboard'
  },
  [AgentType.PATIENT_MGMT]: {
    id: AgentType.PATIENT_MGMT,
    name: 'Patient Management',
    description: 'Registration, Appointments, Admissions.',
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
    iconName: 'Users'
  },
  [AgentType.MEDICAL_RECORDS]: {
    id: AgentType.MEDICAL_RECORDS,
    name: 'Medical Records',
    description: 'Clinical data, History, Diagnosis.',
    color: 'text-teal-600',
    bgColor: 'bg-teal-100',
    iconName: 'Activity'
  },
  [AgentType.STAFF_MGMT]: {
    id: AgentType.STAFF_MGMT,
    name: 'Staff Management',
    description: 'HR, Scheduling, Assignments.',
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
    iconName: 'Stethoscope'
  },
  [AgentType.BILLING_FINANCE]: {
    id: AgentType.BILLING_FINANCE,
    name: 'Billing & Finance',
    description: 'Invoices, Insurance, Claims.',
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-100',
    iconName: 'CreditCard'
  }
};

export const getIcon = (name: string, size: number = 20, className: string = '') => {
  const props = { size, className };
  switch (name) {
    case 'LayoutDashboard': return <LayoutDashboard {...props} />;
    case 'Users': return <Users {...props} />;
    case 'Activity': return <Activity {...props} />;
    case 'Stethoscope': return <Users {...props} />; // Using Users as fallback or specific icon
    case 'CreditCard': return <CreditCard {...props} />;
    default: return <FileText {...props} />;
  }
};