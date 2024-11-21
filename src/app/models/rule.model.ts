export type Status = 'Active' | 'Inactive' | 'Ready' | 'Draft';

export interface Rule {
  id: number;
  name: string;
  module: string;
  country: string;
  status: Status;
}
