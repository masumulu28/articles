import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { signalRoutes } from './signals/signal.component';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      [
        {
          path: 'input-binding/:title',
          loadComponent: () =>
            import('./input-binding/input-binding.component'),
          resolve: { title: () => 'Hello World!' },
        },
        {
          path: 'signal',
          loadComponent: () => import('./signals/signal.component'),
          loadChildren: signalRoutes,
        },
        {
          path: 'until-destroy',
          loadComponent: () =>
            import('./until-destory/until-destroy.component'),
        },
      ],
      withComponentInputBinding()
    ),
  ],
};
