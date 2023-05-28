import { ApplicationConfig } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { REQ_TOKEN } from './req.token';

export const appConfig: ApplicationConfig = {
  providers: [
    provideClientHydration(),
    {
      provide: REQ_TOKEN,
      useValue: 'https://api.github.com/users',
    },
  ],
};
