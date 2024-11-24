import { Routes } from '@angular/router';
import { MainpageComponent } from './pages/main/main.component';
import { RulesEngineComponent } from './components/rules-engine/rules-engine.component';
import { NotImplementedComponent } from './components/not-implemented/not-implemented.component';
import { RuleComponent } from './components/rule/rule.component';

export const routes: Routes = [
  {
    path: '',
    component: MainpageComponent,
    children: [
      {
        path: 'rules-engine',
        component: RulesEngineComponent,
      },
      {
        path: 'rules-engine/:rulesEngineId',
        component: RuleComponent
      },
      {
        path: '**',
        component: NotImplementedComponent,
      },
    ],
  },
];
