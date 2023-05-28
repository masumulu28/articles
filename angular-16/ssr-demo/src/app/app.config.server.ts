import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import { REQ_TOKEN } from './req.token';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    {
      provide: REQ_TOKEN,
      useValue: 'https://jsonplaceholder.typicode.com/users',
    },
  ],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
