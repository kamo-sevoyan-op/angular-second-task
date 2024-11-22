import { TemplateRef } from '@angular/core';

export interface Column {
  value: string;
  name: string;
  template?: TemplateRef<any>;
}
