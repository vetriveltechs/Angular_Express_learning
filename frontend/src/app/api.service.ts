// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
// import { environment } from 'src/environments/environment';

// @Injectable({
//   providedIn: 'root'
// })
// // export class ApiService {

// //   // apiURL=environment.apiURL+'/getProducts';
// //   // constructor(private http:HttpClient) { }

// //   // getProucts():Observable<any>{
// //   //   return this.http.get(this.apiURL)
// //   // }


// //   // apiURL='http://localhost:5000/getProductAll'


// //   apiURL=environment.apiURL+'/getProductAll'


// //   constructor(private http:HttpClient){}

// //   getProducts():Observable<any>{
// //     return this.http.get(this.apiURL)
// //   }
// // }

// export class ApiService {
//   private apiUrl = 'http://localhost:8080/employee/create/';

//   constructor(private http: HttpClient) { }

//   createEmployee(employee: any): Observable<any> {
//     return this.http.post<any>(this.apiUrl, employee);
//   }
// }


import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { httpOptions } from './properties/properties'; // Adjust the import path if necessary

@Injectable({
  providedIn: 'root'
})
export class ApiService {

    private baseUrl = environment.apiURL

//   private apiUrl = 'http://localhost:5000/api/employee'; // Update this to your Django API URL

    constructor(private http: HttpClient) {}

    createEmployee(data: any): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.post(`${this.baseUrl}/employee/createEmployee`, data,httpOptions);
    }

    updateEmployee(id: number, data: any): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.put(`${this.baseUrl}/employee/updateEmployee/${id}`, data);
    }

    getEmployeeById(id: number): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.get<any>(`${this.baseUrl}/employee/getEmployees/${id}`);
    }

    getAllEmployee(): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.get<any>(`${this.baseUrl}/employee/getAllEmployee`,httpOptions);
    }

    updateEmployeeStatus(employee_id: string, data: any): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.put<any>(`${this.baseUrl}/employee/updateEmployeeStatus/${employee_id}/status`, data);
    }

    createLov(lovData: any): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.post<any>(`${this.baseUrl}/lov/createLov`, lovData, httpOptions);
    }

    getAllLov(): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.get<any>(`${this.baseUrl}/lov/getAllLov`,httpOptions);
    }

    editLov(id: string): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.get<any>(`${this.baseUrl}/lov/editLov/${id}`,httpOptions);
    }

    updateLov(id: string, data: any): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.put<any>(`${this.baseUrl}/lov/updateLov/${id}`, data,httpOptions);
    }

    updateLovStatus(lovId: string, data: any): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.put<any>(`${this.baseUrl}/lov/updateLovStatus/${lovId}/status`, data,httpOptions);

    }

    createListTypeValues(listTypeData: any): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.post(`${this.baseUrl}/list_type_values/createListTypeValues`, listTypeData,httpOptions);
    }


    getListTypeValues(lovId: string): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.get(`${this.baseUrl}/list_type_values/getListTypeValues/${lovId}`,httpOptions);
    }

    updateListTypeValue(id: string, updatedData: any): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.put(`${this.baseUrl}/listTypeValues/updateListValues/${id}`, updatedData,httpOptions);
    }

    updateListValuesStatus(listTypeValuesId: string, status: string): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.put(`${this.baseUrl}/list_type_values/updateListValuesStatus/${listTypeValuesId}/status`, { status },httpOptions);
    }

    getLov(listName: string): Observable<any[]> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.get<any[]>(`${this.baseUrl}/common/getLov/${listName}`,httpOptions);
      }

    ///////////////// Users API start ///////////////

    createUsers(usersData: any): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.post<any>(`${this.baseUrl}/users/createUser`, usersData, httpOptions);
    }

    getAllUsers(user_name: string, active_flag: string): Observable<any> {
        // Construct the URL with proper query parameter formatting
        const url = `${this.baseUrl}/users/getAllUsers?user_name=${encodeURIComponent(user_name)}&active_flag=${encodeURIComponent(active_flag)}`;
        return this.http.get<any>(url, httpOptions);
    }


    editUsers(user_id: string): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}/users/editUsers/${user_id}`, httpOptions);
    }

    updateUsers(user_id: string, user_data: any): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.put<any>(`${this.baseUrl}/users/updateUsers/${user_id}`, user_data,httpOptions);
    }

    updateUsersStatus(user_id: string, data: any): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.put<any>(`${this.baseUrl}/users/updateUsersStatus/${user_id}/status`, data, httpOptions);

    }
    ///////////////// Users API end ////////////////

    /////////////// Roles API Start ///////////////
    createRoles(rolesData: any): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.post<any>(`${this.baseUrl}/roles/createRoles`, rolesData, httpOptions);
    }

    getAllRoles(): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.get<any>(`${this.baseUrl}/roles/getAllRoles`,httpOptions);
    }

    editRoles(role_id: string): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.get<any>(`${this.baseUrl}/roles/editRoles/${role_id}`,httpOptions);
    }

    updateRoles(role_id: string, data: any): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.put<any>(`${this.baseUrl}/roles/updateRoles/${role_id}`, data,httpOptions);
    }

    updateRolesStatus(roleId: string, data: any): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.put<any>(`${this.baseUrl}/roles/updateRolesStatus/${roleId}/status`, data,httpOptions);

    }
    ///////////////// Roles API end ///////////////

}
