import { Component, OnInit,AfterViewInit,HostListener } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as $ from 'jquery';
import 'jquery-ui/ui/widgets/datepicker';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {

    page_title                      = 'Manage Departments';
    departmentForm                  : FormGroup;
    searchForm                      : FormGroup;
    formAction                      : 'default' | 'create' | 'edit' | 'view' = 'default'; // Added
    departmentRecords: any[]        = []; // Array to hold fetched LOV records
    showResults                     : boolean = false; // Flag to control results visibility
    activeFlagOptions               : any[] = [];
    dropdownOpen: { [key: string]   : boolean } = {};

    constructor(
      private router: Router,
      private route: ActivatedRoute,
      private apiService: ApiService,
      private fb: FormBuilder // Inject FormBuilder
    )
    {
      // Initialize the form with FormBuilder
      this.departmentForm = this.fb.group({
        department_name     : ['', Validators.required]
      });
      this.searchForm = this.fb.group({
        department_name         : [''],
        active_flag             : ['']
      });
    }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
          this.formAction = params['action'] || 'default';
          const department_id = this.route.snapshot.queryParams['edit_id'] || this.route.snapshot.queryParams['view_id']; // Check both IDs

          if (this.formAction === 'edit' || this.formAction === 'view') {
            this.apiService.editDepartment(department_id).subscribe(
              (data) => {
                this.departmentForm.patchValue(data);

                if (this.formAction === 'view') {
                  this.departmentForm.disable(); // Disable all fields for view mode
                } else {
                  this.departmentForm.enable(); // Enable fields for edit mode
                }
              },
              error => {
                console.error('Error fetching lov record:', error);
                alert('Error fetching lov record. Please try again later.');
              }
            );
          } else if (this.formAction === 'default') {
            this.departmentForm.reset(); // Reset the form if in default state
          }
          this.fetchLovOptions('ACTIVE STATUS');

        });
      }

    fetchLovOptions(listName: string) {
        this.apiService.getLov(listName).subscribe(
            response => {
                if (listName === 'ACTIVE STATUS') {
                    this.activeFlagOptions = response;

                    if (this.activeFlagOptions.length > 0) {
                        this.searchForm.patchValue({
                            active_flag: this.activeFlagOptions[0].list_code
                        });
                    }
                }
            },
            error => {
                console.error('Error fetching options:', error);
            }
        );
    }


    searchDepartmentRecords() {
        const department_name     = this.searchForm.get('department_name')?.value || '';
        const active_flag    = this.searchForm.get('active_flag')?.value || '';

        this.apiService.getAllDepartments(department_name,active_flag).subscribe(
          (data: any[]) => {
            this.departmentRecords = data;
            this.showResults = true;
          },
          error => {
            console.error('Error fetching users records:', error);
            alert('Error fetching users records. Please try again later.');
            this.showResults = true;
          }
        );
    }

    switchForm(action: 'default' | 'create' | 'edit' | 'view', department_id?: string) {
        if (action === 'edit' && department_id) {
          this.router.navigate(['/department', action], { queryParams: { edit_id: department_id } });
        } else if (action === 'view' && department_id) {
          this.router.navigate(['/department', action], { queryParams: { view_id: department_id } });
        } else {
          this.router.navigate(['/department', action]);
        }
      }



    onSubmit() {
      if (this.departmentForm.valid) {
        const departmentData = this.departmentForm.value;
        if (this.formAction === 'edit') {
            const departmentForm = this.route.snapshot.queryParams['edit_id'];
            this.apiService.updateDepartmentStatus(departmentForm, departmentData).subscribe(
              response => {
                alert('LOV updated successfully!');
                this.switchForm('default');
                this.searchDepartmentRecords();
                this.dropdownOpen = {};
              },
              error => {
                console.error('Error updating lov:', error);
                alert('Error updating lov. Please check your input and try again.');
              }
            );
          } else {
            this.apiService.createDepartment(departmentData).subscribe(
                response =>
                {
                    this.switchForm('default');
                    this.searchDepartmentRecords();
                    this.dropdownOpen = {};
                },
                error => {
                    console.error('Error creating department:', error);
                    alert('Error creating department. Please check your input and try again.');
                }
            );
          }

      }
      else {
        alert('Please fill out all required fields.');
      }
    }

    toggleDropdown(id: string): void {
      const isOpen = this.dropdownOpen[id];

      // Close all
      this.dropdownOpen = {};

      // Toggle the clicked one
      if (!isOpen) {
        this.dropdownOpen[id] = true;
      }
    }

    @HostListener('document:click', ['$event'])
        closeDropdownOnClickOutside(event: MouseEvent): void
        {
            const targetElement = event.target as HTMLElement;
            if (!targetElement.closest('.dropdown'))
            {
                this.dropdownOpen = {};
            }
    }


    editLov(department_id: string) {
        this.switchForm('edit', department_id);
      }

    updateDepartmentStatus(department_id: string, status: 'Y' | 'N') {
    this.apiService.updateDepartmentStatus(department_id, { status }).subscribe(
        response => {
            this.searchDepartmentRecords();
            this.dropdownOpen = {};
        },
        error => {
        console.error('Error updating LOV active flag:', error);
        }
    );
    }

    clearSearch() {
        this.searchForm.reset({
            department_name: '',
            active_flag: this.activeFlagOptions?.length ? this.activeFlagOptions[0].list_code : ''
        });
        this.departmentRecords = [];
        this.showResults = false;
        this.router.navigate(['/department','default']);
      }
}
