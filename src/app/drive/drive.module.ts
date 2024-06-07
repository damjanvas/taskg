import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DriveComponent } from './drive.component';
import { DriveFormComponent } from './drive-form/drive-form.component';
import { DetailsComponent } from './details/details.component';
import { DriveRoutingModule } from './drive-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    DriveComponent,
    DriveFormComponent,
    DetailsComponent
  ],
  imports: [
    CommonModule,
    DriveRoutingModule,
    SharedModule
  ]
})
export class DriveModule { }
