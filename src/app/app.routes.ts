import { Routes } from '@angular/router';
import { MainpageComponent } from './pages/main/main.component';
import { RulesEngineComponent } from './components/rules-engine/rules-engine.component';
import { NotImplementedComponent } from './components/not-implemented/not-implemented.component';
import { RuleComponent } from './components/rule/rule.component';
import { NewRuleComponent } from './components/new-rule/new-rule.component';

export const routes: Routes = [
  {
    path: '',
    component: MainpageComponent,
    title: 'Olive Admin',
    children: [
      {
        path: 'rules-engine',
        component: RulesEngineComponent,
        title: 'Rules Engine',
      },
      {
        path: 'rules-engine/:rulesEngineId',
        component: RuleComponent,
        title: 'Rule',
      },
      {
        path: 'rules-engine/:rulesEngineId/new-rule',
        component: NewRuleComponent,
        title: 'New Rule',
      },
      {
        path: '**',
        component: NotImplementedComponent,
        title: 'Not Implemented',
      },
    ],
  },
];
