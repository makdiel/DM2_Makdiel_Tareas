import { Routes } from '@angular/router';
import { sesionActiveGuard } from './guards/auth/sesion-active-guard';
import { authGuard } from './guards/auth/auth-guard';

export const routes: Routes = [
 /* {
    path: 'home',
    loadComponent: () => import('../app/pages/home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'transactions',
    loadComponent: () => import('./pages/transactions/transactions/transactions.page').then( m => m.TransactionsPage)
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/transactions/register/register.page').then( m => m.RegisterPage)
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/transactions/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'tabs',
    loadComponent: () => import('./pages/shared/tabs/tabs.page').then( m => m.TabsPage)
  },
  {
    path: 'perfiles',
    loadComponent: () => import('./pages/Account/perfiles/perfiles.page').then( m => m.PerfilesPage)
  },*/
    {
    path: 'login',
    loadComponent: () =>
      import('./pages/auth/login/login.page').then((m) => m.LoginPage),
    canActivate: [sesionActiveGuard],
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./pages/Account/register/register.page').then((m) => m.RegisterPage),
    canActivate: [sesionActiveGuard],
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./pages/Account/perfiles/perfiles.page').then((m) => m.PerfilesPage),
    canActivate: [sesionActiveGuard],
  },
  {
    path: '',
    loadChildren: () =>
      import('./pages/shared/tabs/tabs.routes').then((m) => m.routes),
    canActivate: [authGuard],
  },
   {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full',
  },

];
