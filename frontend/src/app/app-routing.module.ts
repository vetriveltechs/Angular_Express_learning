import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component'; // Adjust as necessary
import { SetupsComponent } from './setups/setups.component'; // Adjust as necessary
import { LovComponent } from './lov/lov.component';
import { ListTypeValuesComponent } from './list-type-values/list-type-values.component';
import { UsersComponent } from './users/users.component';
import { RolesComponent } from './roles/roles.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AppraisalComponent } from './appraisal/appraisal.component';
import { DepartmentComponent } from './department/department.component';
import { BloodGroupComponent } from './blood-group/blood-group.component';
import { DesignationComponent } from './designation/designation.component';
import { DocumentNumberingComponent } from './document-numbering/document-numbering.component';
import { CountryComponent } from './country/country.component';
import { StateComponent } from './state/state.component';
import { CityComponent } from './city/city.component';
import { LocationComponent } from './location/location.component';
import { OrganizationComponent } from './organization/organization.component';

const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: AdminLoginComponent, pathMatch: 'full' },
    { path: 'employee', component: EmployeeComponent, pathMatch: 'full' },
    { path: 'employee/:action/:formType', component: EmployeeComponent, pathMatch: 'full' },
    { path: 'setups', component: SetupsComponent,pathMatch: 'full' },
    { path: 'setups/lov', component: LovComponent,pathMatch: 'full' },
    { path: 'setups/lov/:action', component: LovComponent,pathMatch: 'full' },
    { path: 'users', component: UsersComponent,pathMatch: 'full' },
    { path: 'users/:action', component: UsersComponent,pathMatch: 'full' },
    { path: 'list_type_values/:lov_id', component: ListTypeValuesComponent},
    { path: 'roles/:action', component: RolesComponent,pathMatch: 'full' }, // Handles actions like 'create', 'edit'
    { path: 'admin_login/:action', component: AdminLoginComponent,pathMatch: 'full' },
    { path: 'appraisal', component: AppraisalComponent,pathMatch: 'full' },
    { path: 'appraisal/:action', component: AppraisalComponent,pathMatch: 'full' },
    { path: 'department/:action', component: DepartmentComponent,pathMatch: 'full' },
    { path: 'designation/:action', component: DesignationComponent,pathMatch: 'full' },
    { path: 'document-numbering/:action', component: DocumentNumberingComponent,pathMatch: 'full' },
    { path: 'blood_group/:action', component: BloodGroupComponent,pathMatch: 'full' },
    { path: 'country/:action', component: CountryComponent,pathMatch: 'full' },
    { path: 'state/:action', component: StateComponent,pathMatch: 'full' },
    { path: 'city/:action', component: CityComponent,pathMatch: 'full' },
    { path: 'location/:action', component: LocationComponent,pathMatch: 'full' },
    { path: 'organization/:action', component: OrganizationComponent,pathMatch: 'full' },
    { path: '**', redirectTo: '/employee' },

  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
