import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { remoteConfig } from './remote.config';

bootstrapApplication(AppComponent, remoteConfig)
  .catch(err => console.error(err));