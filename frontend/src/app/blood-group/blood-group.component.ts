import { Component, OnInit,AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as $ from 'jquery';
import 'jquery-ui/ui/widgets/datepicker';

@Component({
  selector: 'app-blood-group',
  templateUrl: './blood-group.component.html',
  styleUrls: ['./blood-group.component.css']
})
export class BloodGroupComponent implements OnInit {

    page_title                  = 'Manage Blood Groups';
    bloodGroupForm              : FormGroup;
    searchForm                  : FormGroup;
    formAction                  : 'default' | 'create' | 'edit' | 'view' = 'default'; // Added
    bloodGroupRecords: any[]    = []; // Array to hold fetched blood group records
    showResults                 : boolean = false; // Flag to control results visibility
    activeFlagOptions           : any[] = [];

    constructor(
      private router: Router,
      private route: ActivatedRoute,
      private apiService: ApiService,
      private fb: FormBuilder // Inject FormBuilder
    )
    {
      // Initialize the form with FormBuilder
      this.bloodGroupForm = this.fb.group({
        blood_group_name     : ['', Validators.required]
      });
      this.searchForm = this.fb.group({
        blood_group_name        : [''],
        active_flag             : ['']
      });
    }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
          this.formAction = params['action'] || 'default';
          const blood_group_id = this.route.snapshot.queryParams['edit_id'] || this.route.snapshot.queryParams['view_id']; // Check both IDs

          if (this.formAction === 'edit' || this.formAction === 'view') {
            this.apiService.editBloodGroup(blood_group_id).subscribe(
              (data) => {
                this.bloodGroupForm.patchValue(data);

                if (this.formAction === 'view') {
                  this.bloodGroupForm.disable(); // Disable all fields for view mode
                } else {
                  this.bloodGroupForm.enable(); // Enable fields for edit mode
                }
              },
              error => {
                console.error('Error fetching blood group record:', error);
                alert('Error fetching blood group record. Please try again later.');
              }
            );
          } else if (this.formAction === 'default') {
            this.bloodGroupForm.reset(); // Reset the form if in default state
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

    searchBloodGroupRecords() {
        const blood_group_name  = this.searchForm.get('blood_group_name')?.value || '';
        const active_flag       = this.searchForm.get('active_flag')?.value || '';

        this.apiService.getAllBloodGroups(blood_group_name,active_flag).subscribe(
            (data: any[]) =>
            {
                this.bloodGroupRecords = data;
                this.showResults = true;
            },
            error => {
                console.error('Error fetching blood group records:', error);
                alert('Error fetching blood group records. Please try again later.');
                this.showResults = true;
            }
        );
    }

    switchForm(action: 'default' | 'create' | 'edit' | 'view', blood_group_id?: string) {
        if (action === 'edit' && blood_group_id) {
          this.router.navigate(['/blood_group', action], { queryParams: { edit_id: blood_group_id } });
        } else if (action === 'view' && blood_group_id) {
          this.router.navigate(['/blood_group', action], { queryParams: { view_id: blood_group_id } });
        } else {
          this.router.navigate(['/blood_group', action]);
        }
    }

    onSubmit() {
      if (this.bloodGroupForm.valid) {
        const bloodGroupData = this.bloodGroupForm.value;
        if (this.formAction === 'edit') {
            const bloodGroupForm = this.route.snapshot.queryParams['edit_id'];
            this.apiService.updateBloodGroup(bloodGroupForm, bloodGroupData).subscribe(
              response => {
                alert('Blood group updated successfully!');
                this.switchForm('default');
                this.searchBloodGroupRecords();
                this.dropdownOpen = {};
              },
              error => {
                console.error('Error updating blood group:', error);
                alert('Error updating blood group. Please check your input and try again.');
              }
            );
          } else {
            this.apiService.createBloodGroup(bloodGroupData).subscribe(
                response =>
                {
                    this.switchForm('default');
                    this.searchBloodGroupRecords();
                    this.dropdownOpen = {};
                },
                error => {
                    console.error('Error creating blood group:', error);
                    alert('Error creating blood group. Please check your input and try again.');
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


    editLov(blood_group_id: string) {
        this.switchForm('edit', blood_group_id);
      }

    updateBloodGroupStatus(blood_group_id: string, status: 'Y' | 'N') {
    this.apiService.updateBloodGroupStatus(blood_group_id, { status }).subscribe(
        response =>
        {
            this.searchBloodGroupRecords();
            this.dropdownOpen = {};
        },
        error => {
        console.error('Error updating blood group active flag:', error);
        }
    );
    }

    clearSearch() {
        this.searchForm.reset({
            blood_group_name: '',
            active_flag: this.activeFlagOptions?.length ? this.activeFlagOptions[0].list_code : ''
        });
        this.bloodGroupRecords = [];
        this.showResults = false;
        this.router.navigate(['/blood_group','default']);
      }

}
