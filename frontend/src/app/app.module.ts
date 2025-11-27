import { MatSelectModule } from '@angular/material/select';
import {Amplify} from 'aws-amplify';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import awsConfig from '../config/aws-exports';
import { EmployeeComponent } from './employee/employee.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { ManageAppraisalComponent } from './manage-appraisal/manage-appraisal.component';
import { SetupsComponent } from './setups/setups.component';
import { LovComponent } from './lov/lov.component';
import { ListTypeValuesComponent } from './list-type-values/list-type-values.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { UsersComponent } from './users/users.component';
import { RolesComponent } from './roles/roles.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AppraisalComponent } from './appraisal/appraisal.component';
import { DepartmentComponent } from './department/department.component';
// import { DestinationComponent } from './destination/destination.component';
import { BloodGroupComponent } from './blood-group/blood-group.component';
import { DesignationComponent } from './designation/designation.component';
import { DocumentNumberingComponent } from './document-numbering/document-numbering.component';
import { OrganizationComponent } from './organization/organization.component';
import { CountryComponent } from './country/country.component';
import { StateComponent } from './state/state.component';
import { CityComponent } from './city/city.component';
import { CommonModulesModule } from './commonmodules/commonmodules.module';
import { LocationComponent } from './location/location.component';
import { StaffDetailsComponent } from './staff-details/staff-details.component';
import { StudentDetailsComponent } from './student-details/student-details.component'; // Ensure the path is correct

@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    // ManageAppraisalComponent,
    SetupsComponent,
    LovComponent,
    ListTypeValuesComponent,
    UsersComponent,
    RolesComponent,
    AdminLoginComponent,
    AppraisalComponent,
    DepartmentComponent,
    BloodGroupComponent,
    DesignationComponent,
    DocumentNumberingComponent,
    OrganizationComponent,
    CountryComponent,
    StateComponent,
    CityComponent,
    LocationComponent,
    StaffDetailsComponent,
    StudentDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatFormFieldModule,
    HomeComponent,
    CommonModulesModule
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule {

 }
