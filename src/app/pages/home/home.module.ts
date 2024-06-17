import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { HeaderComponent } from './components/header/header.component';
import { LandingComponent } from './components/landing/landing.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { RegistryComponent } from './components/registry/registry.component';
import { RsvpComponent } from './components/rsvp/rsvp.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { CountdownComponent } from './components/countdown/countdown.component';
import { MapModule } from 'src/app/shared/map/map.module';
import { AttireComponent } from './components/attire/attire.component';
import { FaqsComponent } from './components/faqs/faqs.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    LandingComponent,
    ScheduleComponent,
    RegistryComponent,
    RsvpComponent,
    CountdownComponent,
    AttireComponent,
    FaqsComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatRadioModule,
    MapModule,
    MatTooltipModule,
  ],
  exports: [
    HeaderComponent,
    LandingComponent,
    ScheduleComponent,
    RegistryComponent,
    RsvpComponent,
    CountdownComponent,
    AttireComponent,
  ],
})
export class HomeModule {}
