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

// const routes: Routes = [
//   { path: '', component: EmployeeComponent }, // Adjust as necessary
//   { path: 'employee', component: EmployeeComponent },
//   { path: 'employee:action', component: EmployeeComponent },
//   { path: 'setups', component: SetupsComponent }
// ];

const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' }, // Default route redirects to 'employee'
    { path: 'login', component: AdminLoginComponent, pathMatch: 'full' }, // Default route for EmployeeComponent
    { path: 'employee', component: EmployeeComponent, pathMatch: 'full' }, // Default route for EmployeeComponent
    { path: 'employee/:action/:formType', component: EmployeeComponent, pathMatch: 'full' }, // Handles actions and form types
    { path: 'setups', component: SetupsComponent,pathMatch: 'full' }, // Route for SetupsComponent
    { path: 'setups/lov', component: LovComponent,pathMatch: 'full' }, // Route for LovComponent
    { path: 'setups/lov/:action', component: LovComponent,pathMatch: 'full' }, // Handles actions like 'create', 'edit'
    { path: 'users', component: UsersComponent,pathMatch: 'full' }, // Route for LovComponent
    { path: 'users/:action', component: UsersComponent,pathMatch: 'full' }, // Handles actions like 'create', 'edit'
    { path: 'list_type_values/:lov_id', component: ListTypeValuesComponent},// Route for List Type Value
    { path: 'roles/:action', component: RolesComponent,pathMatch: 'full' }, // Handles actions like 'create', 'edit'
    { path: 'admin_login/:action', component: AdminLoginComponent,pathMatch: 'full' },
    { path: 'appraisal', component: AppraisalComponent,pathMatch: 'full' },
    { path: 'appraisal/:action', component: AppraisalComponent,pathMatch: 'full' }, // Handles actions like 'create', 'edit'
    { path: 'department/:action', component: DepartmentComponent,pathMatch: 'full' }, // Handles actions like 'create', 'edit'
    { path: 'designation/:action', component: DesignationComponent,pathMatch: 'full' }, // Handles actions like 'create', 'edit'
    { path: 'blood_group/:action', component: BloodGroupComponent,pathMatch: 'full' }, // Handles actions like 'create', 'edit'
    { path: '**', redirectTo: '/employee' }, // Wildcard route redirects to 'employee' if no match is found

  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
