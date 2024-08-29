import { Component, OnInit,AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as $ from 'jquery';
import 'jquery-ui/ui/widgets/datepicker';

@Component({
  selector: 'app-manage-appraisal',
  templateUrl: './manage-appraisal.component.html',
  styleUrls: ['./manage-appraisal.component.css']
})
export class ManageAppraisalComponent implements OnInit, AfterViewInit {
        page_title = 'Manage Employees';
        employeeForm: FormGroup;
        formAction: 'default' | 'create' | 'edit' = 'default';

        constructor(
          private router: Router,
          private route: ActivatedRoute,
          private apiService: ApiService,
          private fb: FormBuilder // Inject FormBuilder
        ) {
          // Initialize the form with FormBuilder
          this.employeeForm = this.fb.group({
            user_name: ['', Validators.required],
            from_date: ['', Validators.required],
            password: ['', Validators.required,Validators.maxLength(8)],
            to_date: ['', Validators.required],
          });
        }

        ngOnInit(): void {
          this.route.params.subscribe(params => {
            this.formAction = params['action'] || 'default';
            if (this.formAction === 'default') {
              this.employeeForm.reset(); // Reset the form if in default state
            }
          });
        }

        ngAfterViewInit(): void {
          ($(".default_date") as any).datepicker({
            changeMonth: true,
            changeYear: true,
            yearRange: "1950:" + (new Date().getFullYear() + 10),
            dateFormat: "yy-mm-dd",
            onSelect: (dateText: string, inst: any) => {
              const elementId = $(inst.input).attr('id');
              if (elementId === 'from_date') {
                this.employeeForm.patchValue({ from_date: dateText });
              } else if (elementId === 'to_date') {
                this.employeeForm.patchValue({ to_date: dateText });
              }
            }
          });
        }

        switchForm(action: 'default' | 'create' | 'edit') {
          this.router.navigate(['/employee', action]);
        }

        onSubmit() {
          if (this.employeeForm.valid) {
            const employeeData = this.employeeForm.value;
            this.apiService.createEmployee(employeeData).subscribe(
              response => {
                console.log('Employee created:', response);
                alert('Employee created successfully!');
                this.switchForm('default');
              },
              error => {
                console.error('Error creating employee:', error);
                alert('Error creating employee. Please check your input and try again.');
              }
            );
          }
          else {
            alert('Please fill out all required fields.');
          }
        }
      }
