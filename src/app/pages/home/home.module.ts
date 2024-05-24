import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { HeaderComponent } from './components/header/header.component';
import { LandingComponent } from './components/landing/landing.component';
import { RsvpLinkComponent } from './components/rsvp-link/rsvp-link.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { RegistryComponent } from './components/registry/registry.component';
import { RsvpComponent } from './components/rsvp/rsvp.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';

@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    LandingComponent,
    RsvpLinkComponent,
    ScheduleComponent,
    RegistryComponent,
    RsvpComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatRadioModule,
  ],
  exports: [
    HeaderComponent,
    LandingComponent,
    RsvpLinkComponent,
    ScheduleComponent,
    RegistryComponent,
    RsvpComponent,
  ],
})
export class HomeModule {}
