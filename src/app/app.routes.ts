import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { PageNotFound } from './pages/page-not-found/page-not-found';
import { Layout } from './components/layout/layout';
import { AddTask } from './pages/add-task/add-task';
import { Tasks } from './pages/tasks/tasks';
import { SignUp } from './pages/sign-up/sign-up';
import { Login } from './pages/login/login';
import { authGuard } from './auth-guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'layout',
    pathMatch: 'full',
  },
  {
    path: 'layout',
    component: Layout,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        component: Home,
        canActivate: [authGuard],
      },
      {
        path: 'addTask',
        component: AddTask,
        canActivate: [authGuard],
      },
      {
        path: 'tasks',
        component: Tasks,
        canActivate: [authGuard],
      },
    ],
  },
  {
    path: 'signUp',
    component: SignUp,
  },
  {
    path: 'login',
    component: Login,
  },
  {
    path: '**',
    component: PageNotFound,
  },
];
