import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from './details/details.component';
import { DriveFormComponent } from './drive-form/drive-form.component';
import { DriveComponent } from './drive.component';

const routes: Routes = [ 
  { path: '', component: DriveComponent },
  { path: 'driveForm', component: DriveFormComponent },
  { path: 'details/:id', component: DetailsComponent }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class DriveRoutingModule { }
