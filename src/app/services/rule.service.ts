import { Injectable } from '@angular/core';
import { Rule, Validity, Status } from '../models/rule.model';

@Injectable({
  providedIn: 'root',
})
export class RuleService {
  private data: Rule[] = [];

  constructor() {
    const numRule = 40;
    const numRulesEngines = 13;
    this.generateMockData(numRule, numRulesEngines);
  }

  /**
   * Generates mock data from the predefined sets of values.
   * @param count The number of data is being generated.
   * @param rulesEngineCount Max id of Rules Engine in the generated data.
   */
  private generateMockData(count: number, rulesEngineCount: number) {
    const typeNameChoices = [
      'Annual',
      'Sick',
      'Maternity',
      'Pilgrimage',
      'Not Paid',
    ];
    const validityChoices = ['Limited', 'Unlimited'];
    const statusChoices = ['Active', 'Inactive', 'Draft'];

    for (let i = 0; i < count; i++) {
      let randomIndex = Math.floor(Math.random() * typeNameChoices.length);
      const name = typeNameChoices[randomIndex];

      randomIndex = Math.floor(Math.random() * validityChoices.length);
      const validity = validityChoices[randomIndex];

      randomIndex = Math.floor(Math.random() * statusChoices.length);
      const status = statusChoices[randomIndex];

      const randomRulesEngineId = Math.floor(Math.random() * rulesEngineCount);

      this.data.push({
        id: i,
        rulesEngineId: randomRulesEngineId,
        name,
        validity: validity as Validity,
        status: status as Status,
      });
    }
  }

  /**
   * Filter and return data for given Rules Engine.
   * @param rulesEngineId Id of a Rules Engine.
   * @returns Data for given Rules Engine.
   */
  getDataByRulesEngineId(rulesEngineId: string) {
    const result = this.data.filter(
      (item) => item.rulesEngineId === parseFloat(rulesEngineId)
    );
    return result;
  }

  /**
   *
   * @returns Entire rules data.
   */
  getData() {
    const result = [...this.data];
    return result;
  }
}
