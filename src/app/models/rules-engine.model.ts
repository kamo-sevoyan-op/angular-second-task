export type Status = 'Active' | 'Inactive' | 'Ready' | 'Draft';

export interface RulesEngine {
  id: number;
  name: string;
  module: string;
  country: string;
  status: Status;
}
