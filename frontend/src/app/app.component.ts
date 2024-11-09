import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './api.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    roles: string[] = [];

    constructor(private router: Router,private apiService: ApiService) {}

    ngOnInit() {
        this.roles = this.apiService.getUserRoles(); // Retrieve roles from stored data
      }

      // Method to check if the current route is /login
    isLoginPage(): boolean {
        return this.router.url === '/login';
    }

    hasRole(role: string): boolean {
        return this.roles.includes(role);

    }

    handleClick(linkName: string) {
        alert(`You clicked: ${linkName}`);
        console.log(`${linkName} link clicked`);
    }


}
