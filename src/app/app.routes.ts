import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'transactions',
    loadComponent: () => import('./pages/transactions/transactions/transactions.page').then( m => m.TransactionsPage)
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/transactions/register/register.page').then( m => m.RegisterPage)
  },  {
    path: 'login',
    loadComponent: () => import('./pages/transactions/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'tabs',
    loadComponent: () => import('./pages/shared/tabs/tabs.page').then( m => m.TabsPage)
  },

];
