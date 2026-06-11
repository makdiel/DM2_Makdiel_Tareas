import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('../../home/home.page').then((m) => m.HomePage),
      },
      /* {
       path: 'camera',
        loadComponent: () =>
          import('../../gallery/camera/camera.page').then((m) => m.CameraPage),
      },*/
      {
        path: 'profile',
        loadComponent: () =>
          import('../../Account/perfiles/perfiles.page').then(
            (m) => m.PerfilesPage
          ),
      },
      // Ruta comodín para redirigir a 'home' si no se encuentra la ruta
      {
        path: '**',
        redirectTo: '/tabs/home',
        pathMatch: 'full',
      },
    ],
  },
  // Ruta comodín para redirigir a 'home' si no se encuentra la ruta
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full',
  },
];
