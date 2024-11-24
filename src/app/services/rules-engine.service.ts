import { inject, Injectable } from '@angular/core';
import { RulesEngine } from '../models/rules-engine.model';
import { Status } from '../models/rules-engine.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RulesEngineService {
  private data: RulesEngine[] = [];
  private httpClient = inject(HttpClient);

  constructor() {
    const N = 13;
    this.generateMockData(N);
  }

  /**
   * Generates mock data from the predefined sets of values.
   *
   * @param count The number of data is being generated.
   */
  private generateMockData(count: number) {
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

  /**
   *
   * @returns Generated data.
   */
  getData() {
    const result = [...this.data];
    return result;
  }

  /**
   * Filter and return data for given Rules Engine.
   * @param rulesEngineId Id of a Rules Engine.
   * @returns Data for given Rules Engine.
   */
  getDataByRulesEngineId(rulesEngineId: string) {
    const result = this.data.filter(
      (item) => item.id === parseFloat(rulesEngineId)
    );
    return result[0];
  }

  /**
   * Get country name from its country code using restcountries API.
   * @param rulesEngineId Country code.
   * @returns An observable of http request.
   */
  getCountryName(rulesEngineId: string) {
    const rulesEngine = this.getDataByRulesEngineId(rulesEngineId);
    const apiTemplate = 'https://restcountries.com/v3.1/alpha';
    const apiUrl = `${apiTemplate}/${rulesEngine.country}`;
    return this.httpClient.get(apiUrl);
  }

  /**
   * Checks whether data exists for a given `rulesEngineId`.
   * @param rulesEngineId Rules engine id.
   */
  contains(rulesEngineId: string) {
    const id = parseFloat(rulesEngineId);
    return this.data.some((elem) => elem.id === id);
  }
}
