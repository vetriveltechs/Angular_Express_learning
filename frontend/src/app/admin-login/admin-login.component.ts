import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import * as $ from 'jquery';
import 'jquery-ui/ui/widgets/datepicker';
import { UtilsService } from './../utils/utils.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {
    loginForm: FormGroup;
    errorMessage = '';

    constructor(
      private router: Router,
      private apiService: ApiService,
      private fb: FormBuilder
    ) {
      this.loginForm = this.fb.group({
        user_name: ['', Validators.required],
        password: ['', Validators.required]
      });
    }

    onLogin() {
        const { user_name, password } = this.loginForm.value;
        this.apiService.login(user_name, password).subscribe(
          (response) => {
            // Handle successful login
            console.log('Login successful:', response);
            if (response.token) {
              // Token and user details are already stored in localStorage
              this.router.navigate(['/employee']);  // Navigate after login
            }
          },
          (error) => {
            // Handle error case
            console.error('Login error:', error);
            this.errorMessage = 'Invalid login credentials';
          }
        );
      }

}
