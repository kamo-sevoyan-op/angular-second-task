export type Status = 'Active' | 'Inactive' | 'Ready';
export type Validity = 'Limited' | 'Unlimited';

export interface Rule {
  id: number;
  rulesEngineId: number;
  name: string;
  validity: Validity;
  status: Status;
}
