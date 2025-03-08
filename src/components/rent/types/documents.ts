
export type DocumentType = 'id_card' | 'income_proof' | 'student_id' | 'guarantor_form';
export type DocumentStatus = 'pending' | 'approved' | 'rejected';
export type PaymentStatus = 'pending' | 'paid' | 'overdue';

export interface StudentDocument {
  id: string;
  documentType: DocumentType;
  status: DocumentStatus;
  filePath: string;
  uploadedAt: string;
  verifiedAt?: string;
  rejectionReason?: string;
}

export interface PaymentSchedule {
  id: string;
  dueDate: string;
  amount: number;
  status: PaymentStatus;
  isExempt: boolean;
  exemptionReason?: string;
}
