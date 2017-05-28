import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {SharedModule} from './shared/shared.module';
import {SitesModule} from './sites/sites.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule, MdListModule} from '@angular/material';

import 'hammerjs';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpModule,
    SharedModule,
    SitesModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
