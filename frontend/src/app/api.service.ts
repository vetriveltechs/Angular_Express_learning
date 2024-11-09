import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators'; // Import tap from rxjs/operators
import { environment } from 'src/environments/environment';

import { httpOptions } from './properties/properties'; // Adjust the import path if necessary

@Injectable({
  providedIn: 'root'
})
export class ApiService {

    private baseUrl = environment.apiURL

//   private apiUrl = 'http://localhost:5000/api/employee'; // Update this to your Django API URL

    constructor(private http: HttpClient) {}


    login(user_name: string, password: string): Observable<any> {
        return this.http.post(`${this.baseUrl}/admin_login`, { user_name, password }, httpOptions)
          .pipe(
            tap((response: any) => {
              console.log('Login response:', response); // Log for debugging

              const { user_id, roles, role_id, token,person_id } = response;


              if (user_id != null && roles != null && role_id != null) {

                this.storeUserData(token, user_id, roles, role_id,person_id);
              } else {
                console.error('Error: Missing userId, roles, or roleId in the response.');
              }
            })
          );
      }

      // Store user data globally in localStorage
      storeUserData(token: string, userId: number, roles: string[], roleId: number,person_id:number) {
        localStorage.setItem('token', token);
        localStorage.setItem('user_id', userId.toString());
        localStorage.setItem('roles', JSON.stringify(roles));
        localStorage.setItem('role_id', roleId.toString());
        localStorage.setItem('person_id', person_id.toString());
      }

      // Get user_id from localStorage
      getUserId(): number | null {
        const userId = localStorage.getItem('user_id');
        return userId ? parseInt(userId, 10) : null;
      }


    getUserRoles(): string[]
    {
        const token = localStorage.getItem('token');
        if (token)
        {
            const payload = JSON.parse(atob(token.split('.')[1]));
            return payload.roles;
        }
        return [];
    }

    // Get role_id from localStorage
  getRoleId(): number | null {
    const roleId = localStorage.getItem('role_id');
    return roleId ? parseInt(roleId, 10) : null;
  }

  // Get token from localStorage
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getPersonId(): number | null {
    const person_id = localStorage.getItem('person_id');
    return person_id ? parseInt(person_id, 10) : null;
  }

  // Clear all stored user data (on logout)
  clearUserData() {
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
    localStorage.removeItem('roles');
    localStorage.removeItem('role_id');
    localStorage.removeItem('person_id');
  }

    createEmployee(data: any): Observable<any>
    {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.post(`${this.baseUrl}/employee/createEmployee`, data,httpOptions);
    }

    updateEmployee(id: number, data: any): Observable<any>
    {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.put(`${this.baseUrl}/employee/updateEmployee/${id}`, data,httpOptions);
    }

    getEmployeeById(id: number): Observable<any>
    {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.get<any>(`${this.baseUrl}/employee/getEmployees/${id}`,httpOptions);
    }
    getEmployeeDetails(id: number): Observable<any>
    {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.get<any>(`${this.baseUrl}/employee/getEmployeeDetails/${id}`,httpOptions);
    }

    getAllEmployee(): Observable<any>
    {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.get<any>(`${this.baseUrl}/employee/getAllEmployee`,httpOptions);
    }

    updateEmployeeStatus(employee_id: string, data: any): Observable<any>
    {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.put<any>(`${this.baseUrl}/employee/updateEmployeeStatus/${employee_id}/status`, data);
    }

    getBloodGroupAll(): Observable<any[]>
    {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.get<any[]>(`${this.baseUrl}/blood_group/getBloodGroupAll`,httpOptions);
    }

    getDepartmentAll(): Observable<any[]>
    {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.get<any[]>(`${this.baseUrl}/department/getDepartmentAll`,httpOptions);
    }

    createLov(lovData: any): Observable<any>
    {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.post<any>(`${this.baseUrl}/lov/createLov`, lovData, httpOptions);
    }

    getAllLov(): Observable<any>
    {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.get<any>(`${this.baseUrl}/lov/getAllLov`,httpOptions);
    }

    editLov(id: string): Observable<any>
    {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.get<any>(`${this.baseUrl}/lov/editLov/${id}`,httpOptions);
    }

    updateLov(id: string, data: any): Observable<any>
    {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.put<any>(`${this.baseUrl}/lov/updateLov/${id}`, data,httpOptions);
    }

    updateLovStatus(lovId: string, data: any): Observable<any>
    {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.put<any>(`${this.baseUrl}/lov/updateLovStatus/${lovId}/status`, data,httpOptions);

    }

    createListTypeValues(listTypeData: any): Observable<any>
    {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.post(`${this.baseUrl}/list_type_values/createListTypeValues`, listTypeData,httpOptions);
    }


    getListTypeValues(lovId: string): Observable<any>
    {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.get(`${this.baseUrl}/list_type_values/getListTypeValues/${lovId}`,httpOptions);
    }

    updateListTypeValue(id: string, updatedData: any): Observable<any>
    {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.put(`${this.baseUrl}/listTypeValues/updateListValues/${id}`, updatedData,httpOptions);
    }

    updateListValuesStatus(listTypeValuesId: string, status: string): Observable<any>
    {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.put(`${this.baseUrl}/list_type_values/updateListValuesStatus/${listTypeValuesId}/status`, { status },httpOptions);
    }

    getLov(listName: string): Observable<any[]>
    {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.get<any[]>(`${this.baseUrl}/common/getLov/${listName}`,httpOptions);
    }

    ///////////////// Users API start ///////////////

    createUsers(usersData: any): Observable<any>
    {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.post<any>(`${this.baseUrl}/users/createUser`, usersData, httpOptions);
    }

    getAllUsers(user_name: string, active_flag: string): Observable<any>
    {
        // Construct the URL with proper query parameter formatting
        const url = `${this.baseUrl}/users/getAllUsers?user_name=${encodeURIComponent(user_name)}&active_flag=${encodeURIComponent(active_flag)}`;
        return this.http.get<any>(url, httpOptions);
    }


    editUsers(user_id: string): Observable<any>
    {
        return this.http.get<any>(`${this.baseUrl}/users/editUsers/${user_id}`, httpOptions);
    }

    updateUsers(user_id: string, user_data: any): Observable<any>
    {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.put<any>(`${this.baseUrl}/users/updateUsers/${user_id}`, user_data,httpOptions);
    }

    updateUsersStatus(user_id: string, data: any): Observable<any>
    {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.put<any>(`${this.baseUrl}/users/updateUsersStatus/${user_id}/status`, data, httpOptions);

    }
    ///////////////// Users API end ////////////////

    /////////////// Roles API Start ///////////////
    createRoles(rolesData: any): Observable<any>
    {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.post<any>(`${this.baseUrl}/roles/createRoles`, rolesData, httpOptions);
    }

    getAllRoles(): Observable<any>
    {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.get<any>(`${this.baseUrl}/roles/getAllRoles`,httpOptions);
    }

    editRoles(role_id: string): Observable<any>
    {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.get<any>(`${this.baseUrl}/roles/editRoles/${role_id}`,httpOptions);
    }

    updateRoles(role_id: string, data: any): Observable<any>
    {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.put<any>(`${this.baseUrl}/roles/updateRoles/${role_id}`, data,httpOptions);
    }

    updateRolesStatus(roleId: string, data: any): Observable<any>
    {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.put<any>(`${this.baseUrl}/roles/updateRolesStatus/${roleId}/status`, data,httpOptions);

    }
    ///////////////// Roles API end ///////////////

    ///////////////// Department API start ////////
    createDepartment(departmentData: any): Observable<any>
    {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.post<any>(`${this.baseUrl}/department/createDepartment`, departmentData, httpOptions);
    }


    getAllDepartments(department_name: string, active_flag: string): Observable<any>
    {
        // Construct the URL with proper query parameter formatting
        const url = `${this.baseUrl}/department/getAllDepartments?department_name=${encodeURIComponent(department_name)}&active_flag=${encodeURIComponent(active_flag)}`;
        return this.http.get<any>(url, httpOptions);
    }

    editDepartment(department_id: string): Observable<any>
    {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.get<any>(`${this.baseUrl}/department/editDepartment/${department_id}`,httpOptions);
    }

    updateDepartment(department_id: string, data: any): Observable<any>
    {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.put<any>(`${this.baseUrl}/department/updateDepartment/${department_id}`, data,httpOptions);
    }

    updateDepartmentStatus(department_id: string, data: any): Observable<any>
    {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.put<any>(`${this.baseUrl}/department/updateDepartmentStatus/${department_id}/status`, data,httpOptions);

    }
    ///////////////// Department API end //////////

    ///////////////// Designation API start ////////
    createDesignation(designationData: any): Observable<any>
    {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.post<any>(`${this.baseUrl}/designation/createDesignation`, designationData, httpOptions);
    }


    getAllDesignations(designation_id: string, active_flag: string): Observable<any>
    {
        const url = `${this.baseUrl}/designation/getAllDesignations?designation_id=${encodeURIComponent(designation_id)}&active_flag=${encodeURIComponent(active_flag)}`;
        return this.http.get<any>(url, httpOptions);
    }


    editDesignation(designation_id: string): Observable<any>
    {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.get<any>(`${this.baseUrl}/designation/editDesignation/${designation_id}`,httpOptions);
    }

    updateDesignation(designation_id: string, data: any): Observable<any>
    {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.put<any>(`${this.baseUrl}/designation/updateDesignation/${designation_id}`, data,httpOptions);
    }

    updateDesignationStatus(designation_id: string, data: any): Observable<any>
    {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.put<any>(`${this.baseUrl}/designation/updateDesignationStatus/${designation_id}/status`, data,httpOptions);
    }

    getDesignationAll(): Observable<any>
    {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.get<any>(`${this.baseUrl}/designation/getDesignationAll`,httpOptions);
    }
    ///////////////// Designation API end //////////

    ///////////////// Appraisal API start ///////////////

    getEmployeeData(appraisal_id: string): Observable<any>
    {
        return this.http.get<any>(`${this.baseUrl}/employee/editUsers/${appraisal_id}`, httpOptions);
    }

    createAppraisal(appraisalData: any): Observable<any>
    {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.post<any>(`${this.baseUrl}/users/createUser`, appraisalData, httpOptions);
    }

    getAllAppraisal(user_name: string, active_flag: string): Observable<any>
    {
        // Construct the URL with proper query parameter formatting
        const url = `${this.baseUrl}/users/getAllUsers?user_name=${encodeURIComponent(user_name)}&active_flag=${encodeURIComponent(active_flag)}`;
        return this.http.get<any>(url, httpOptions);
    }


    editAppraisal(appraisal_id: string): Observable<any>
    {
        return this.http.get<any>(`${this.baseUrl}/users/editUsers/${appraisal_id}`, httpOptions);
    }

    updateAppraisal(appraisal_id: string, user_data: any): Observable<any>
    {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.put<any>(`${this.baseUrl}/users/updateUsers/${appraisal_id}`, user_data,httpOptions);
    }

    updateAppraisalStatus(appraisal_id: string, data: any): Observable<any>
    {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.put<any>(`${this.baseUrl}/users/updateUsersStatus/${appraisal_id}/status`, data, httpOptions);

    }
    ///////////////// Users API end ////////////////

    ///////////////// Blood group API start ////////
    createBloodGroup(bloodGroupData: any): Observable<any>
    {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.post<any>(`${this.baseUrl}/blood_group/createBloodGroup`, bloodGroupData, httpOptions);
    }


    getAllBloodGroups(bloodGroupData: string, active_flag: string): Observable<any>
    {
        const url = `${this.baseUrl}/blood_group/getAllBloodGroups?department_name=${encodeURIComponent(bloodGroupData)}&active_flag=${encodeURIComponent(active_flag)}`;
        return this.http.get<any>(url, httpOptions);
    }

    editBloodGroup(blood_group_id: string): Observable<any>
    {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.get<any>(`${this.baseUrl}/blood_group/editBloodGroup/${blood_group_id}`,httpOptions);
    }

    updateBloodGroup(blood_group_id: string, data: any): Observable<any>
    {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.put<any>(`${this.baseUrl}/blood_group/updateBloodGroup/${blood_group_id}`, data,httpOptions);
    }

    updateBloodGroupStatus(blood_group_id: string, data: any): Observable<any>
    {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.put<any>(`${this.baseUrl}/blood_group/updateBloodGroupStatus/${blood_group_id}/status`, data,httpOptions);

    }
    ///////////////// Blood group API end //////////

}
