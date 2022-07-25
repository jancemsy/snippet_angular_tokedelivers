import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/components/shared.module';

import { ProfileRoutingModule } from './profile-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ProfileComponent } from './profile.component';

// Angular Material Table
import { MatTableModule } from '@angular/material/table'

// Service Providers
import { ProfileService } from './profile.service';

@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    MatTableModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule
  ],
  providers: [
    ProfileService
  ]
})
export class ProfileModule { }
