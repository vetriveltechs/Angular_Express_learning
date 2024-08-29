import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as $ from 'jquery';
import 'jquery-ui/ui/widgets/datepicker';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {

    page_title      = 'Manage Roles';
    rolesForm       : FormGroup;
    formAction      : 'default' | 'create' | 'edit' | 'view' = 'default'; // Added
    rolesRecords    : any[] = []; // Array to hold fetched LOV records
    showResults     : boolean = false; // Flag to control results visibility

    constructor(
      private router        : Router,
      private route         : ActivatedRoute,
      private apiService    : ApiService,
      private fb            : FormBuilder // Inject FormBuilder
    )
    {
      // Initialize the form with FormBuilder
      this.rolesForm = this.fb.group({
        role_name           : ['', Validators.required],
        role_description    : ['']
      });
    }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
          this.formAction = params['action'] || 'default';
          const role_id = this.route.snapshot.queryParams['edit_id'] || this.route.snapshot.queryParams['view_id']; // Check both IDs

          if (this.formAction === 'edit' || this.formAction === 'view') {
            this.apiService.editRoles(role_id).subscribe(
              (data) => {

                this.rolesForm.patchValue(data);

                if (this.formAction === 'view') {
                  this.rolesForm.disable(); // Disable all fields for view mode
                } else {
                  this.rolesForm.enable(); // Enable fields for edit mode
                }
              },
              error => {
                console.error('Error fetching roles record:', error);
                alert('Error fetching roles record. Please try again later.');
              }
            );
          } else if (this.formAction === 'default') {
            this.rolesForm.reset(); // Reset the form if in default state
          }
        });
      }

    // Method to fetch LOV records from the API based on the search criteria
    searchRolesRecords() {
        this.apiService.getAllRoles().subscribe(
        (data: any[]) => {
            this.rolesRecords = data; // Store the fetched records
            this.showResults = true; // Show results after fetching
        },
        error => {
            console.error('Error fetching Roles records:', error);
            alert('Error fetching Roles records. Please try again later.');
            this.showResults = true; // Show results even if an error occurs, but no records will be shown
        }
        );
    }
    switchForm(action: 'default' | 'create' | 'edit' | 'view', role_id?: string) {
        if (action === 'edit' && role_id) {
          this.router.navigate(['/roles', action], { queryParams: { edit_id: role_id } });
        } else if (action === 'view' && role_id) {
          this.router.navigate(['/roles', action], { queryParams: { view_id: role_id } });
        } else {
          this.router.navigate(['/roles', action]);
        }
      }

    onSubmit() {
      if (this.rolesForm.valid) {
        const rolesData = this.rolesForm.value;
        if (this.formAction === 'edit') {
            const roleId = this.route.snapshot.queryParams['edit_id'];
            this.apiService.updateRoles(roleId, rolesData).subscribe(
              response => {
                console.log('Roles updated:', response);
                alert('Roles updated successfully!');
                this.switchForm('default');
              },
              error => {
                console.error('Error updating roles:', error);
                alert('Error updating roles. Please check your input and try again.');
              }
            );
          } else {
            this.apiService.createRoles(rolesData).subscribe(
              response => {
                console.log('Roles created:', response);
                alert('Roles created successfully!');
                this.switchForm('default');
              },
              error => {
                console.error('Error creating roles:', error);
                alert('Error creating roles. Please check your input and try again.');
              }
            );
          }

      }
      else {
        alert('Please fill out all required fields.');
      }
    }

    dropdownOpen: { [key: string]: boolean } = {};

    toggleDropdown(id: string) {
        // Check if the clicked dropdown is already open
        const isOpen = this.dropdownOpen[id];

        // Close all dropdowns
        Object.keys(this.dropdownOpen).forEach(key => {
          this.dropdownOpen[key] = false;
        });

        // If it was not open, open it
        if (!isOpen) {
          this.dropdownOpen[id] = true;
        }
      }

    editRoles(roleId: string) {
        this.switchForm('edit', roleId);
    }

    updateRolesStatus(roleId: string, status: 'Y' | 'N') {
    this.apiService.updateRolesStatus(roleId, { status }).subscribe(
        response => {
            this.searchRolesRecords();
            this.dropdownOpen = {};
        },
        error => {
        console.error('Error updating roles active flag:', error);
        }
    );
}

}
