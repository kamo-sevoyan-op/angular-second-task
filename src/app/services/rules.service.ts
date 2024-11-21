import { Injectable } from '@angular/core';
import { Rule } from '../models/rule.model';
import { Status } from '../models/rule.model';

@Injectable({
  providedIn: 'root',
})
export class RulesService {
  private data: Rule[] = [];

  /**
   * Generates mock data from the predefined sets of values.
   *
   * @param count The number of data is being generated.
   */
  generateMockData(count: number) {
    const ruleNameChoices = ['Leave Types', 'Country General', 'Time Tracking'];
    const moduleChoices = ['Leaves', 'Attendance'];
    const countryChoices = ['AM', 'US', 'JO', 'UA', 'GB', 'AE', 'IR', 'IT'];
    const statusChoices = ['Active', 'Inactive', 'Ready', 'Draft'];

    for (let i = 0; i < count; i++) {
      let randomIndex = Math.floor(Math.random() * ruleNameChoices.length);
      const name = ruleNameChoices[randomIndex];

      randomIndex = Math.floor(Math.random() * moduleChoices.length);
      const module = moduleChoices[randomIndex];

      randomIndex = Math.floor(Math.random() * countryChoices.length);
      const country = countryChoices[randomIndex];

      randomIndex = Math.floor(Math.random() * statusChoices.length);
      const status = statusChoices[randomIndex];

      this.data.push({
        id: i,
        name,
        module,
        country,
        status: status as Status,
      });
    }
  }
  constructor() {
    const N = 40;
    this.generateMockData(N);
  }
  /**
   *
   * @returns Generated data.
   */
  getData() {
    const result = [...this.data];
    return result;
  }
}
