import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { definePreset } from '@primeuix/styled';

import { routes } from './app.routes';

const preset = definePreset(Aura, {
  semantic: {
    primary: {
      50:  '{blue.50}',
      100: '{blue.100}',
      200: '{blue.200}',
      300: '{blue.300}',
      400: '{blue.400}',
      500: '#003399',
      600: '#002b80',
      700: '#002266',
      800: '#001a4d',
      900: '#001133',
      950: '#000a1a',
    },
    colorScheme: {
      light: {
        primary: {
          color:         '#003399',
          contrastColor: '#ffffff',
          hoverColor:    '#002b80',
          activeColor:   '#002266',
        },
        highlight: {
          background: 'rgba(255,204,0,0.18)',
          focusBackground: 'rgba(255,204,0,0.28)',
          color:      '#003399',
          focusColor: '#002266',
        },
      },
    },
  },
});

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: preset,
        options: {
          prefix: 'p',
          darkModeSelector: false,
          cssLayer: false,
        },
      },
    }),
  ],
};
