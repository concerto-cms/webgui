import { Component } from '@angular/core';
import {AuthService} from './shared/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    constructor(
      public auth: AuthService
    ) {
      auth.handleAuthentication();
      if (!auth.isAuthenticated()) {
        auth.login();
      }
    }
}
