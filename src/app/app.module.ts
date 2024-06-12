import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms'; // Importa FormsModule

import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { MembershipsComponent } from './memberships/memberships.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MembershipsComponent,
    ScheduleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, // Agrega FormsModule aquí
    HttpClientModule,
    CommonModule  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
