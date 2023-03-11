import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesComponent } from './courses.component';
import { AddcourseComponent } from './addcourse/addcourse.component';
import { DataTablesModule } from 'angular-datatables';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    CoursesComponent,
    AddcourseComponent
  ],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    DataTablesModule,
    SharedModule
  ]
})
export class CoursesModule { }
