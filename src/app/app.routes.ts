import { Routes } from '@angular/router';
import { MainpageComponent } from './pages/main/main.component';
import { RulesEngineComponent } from './components/rules-engine/rules-engine.component';
import { NotImplementedComponent } from './components/not-implemented/not-implemented.component';

export const routes: Routes = [
  {
    path: '',
    component: MainpageComponent,
    children: [
      {
        path: 'routes-engine',
        component: RulesEngineComponent,
      },
      {
        path: '**',
        component: NotImplementedComponent,
      },
    ],
  },
];
