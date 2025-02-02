import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { registerLicense } from '@syncfusion/ej2-base';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes, withComponentInputBinding()),provideHttpClient(withInterceptorsFromDi())]
};

registerLicense('Ngo9BigBOggjHTQxAR8/V1NMaF5cXmBCfUx1WmFZfVtgdV9DZlZTTGY/P1ZhSXxWdkdjWH5ddXNWR2ZfVEY=');

