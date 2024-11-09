import { Component, OnInit,AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as $ from 'jquery';
import 'jquery-ui/ui/widgets/datepicker';

@Component({
  selector: 'app-designation',
  templateUrl: './designation.component.html',
  styleUrls: ['./designation.component.css']
})
export class DesignationComponent implements OnInit {

    page_title                  = 'Manage Designation';
    designationForm             : FormGroup;
    searchForm                  : FormGroup;
    formAction                  : 'default' | 'create' | 'edit' | 'view' = 'default'; // Added
    designationRecords: any[]   = []; // Array to hold fetched designation records
    showResults                 : boolean = false; // Flag to control results visibility
    activeFlagOptions           : any[] = [];
    designationName             : any[] = [];
    constructor(
      private router: Router,
      private route: ActivatedRoute,
      private apiService: ApiService,
      private fb: FormBuilder // Inject FormBuilder
    )
    {
      // Initialize the form with FormBuilder
      this.designationForm = this.fb.group({
        designation_name     : ['', Validators.required],
        description         : ['']
      });
      this.searchForm = this.fb.group({
        designation_id          : [''],
        active_flag             : ['']
      });
    }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
          this.formAction = params['action'] || 'default';
          const designation_id = this.route.snapshot.queryParams['edit_id'] || this.route.snapshot.queryParams['view_id']; // Check both IDs

          if (this.formAction === 'edit' || this.formAction === 'view') {
            this.apiService.editDesignation(designation_id).subscribe(
              (data) => {
                this.designationForm.patchValue(data);

                if (this.formAction === 'view') {
                  this.designationForm.disable(); // Disable all fields for view mode
                } else {
                  this.designationForm.enable(); // Enable fields for edit mode
                }
              },
              error => {
                console.error('Error fetching designation record:', error);
                alert('Error fetching designation record. Please try again later.');
              }
            );
          } else if (this.formAction === 'default') {
            this.designationForm.reset(); // Reset the form if in default state
          }
          this.fetchLovOptions('ACTIVE STATUS');
          this.fetchDesignationOptions();
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
                console.error('Error fetching lov options:', error);
            }
        );
    }

    fetchDesignationOptions() {
        this.apiService.getDesignationAll().subscribe(
            response => {

                this.designationName = response;
            },
            error => {
                console.error('Error fetching options:', error);
            }
        );
    }


    searchDesignationRecords() {
        const designation_id    = this.searchForm.get('designation_id')?.value || '';
        const active_flag       = this.searchForm.get('active_flag')?.value || '';

        this.apiService.getAllDesignations(designation_id, active_flag).subscribe(
            (data: any[]) => {
                this.designationRecords = data;
                this.showResults = true;
            },
            error => {
                console.error('Error fetching designation records:', error);
                alert('Error fetching designation records. Please try again later.');
                this.showResults = true;
            }
        );
    }


    switchForm(action: 'default' | 'create' | 'edit' | 'view', designation_id?: string) {
        if (action === 'edit' && designation_id) {
          this.router.navigate(['/designation', action], { queryParams: { edit_id: designation_id } });
        } else if (action === 'view' && designation_id) {
          this.router.navigate(['/designation', action], { queryParams: { view_id: designation_id } });
        } else {
          this.router.navigate(['/designation', action]);
        }
      }



    onSubmit() {
      if (this.designationForm.valid) {
        const designationData = this.designationForm.value;
        if (this.formAction === 'edit') {
            const designationForm = this.route.snapshot.queryParams['edit_id'];
            this.apiService.updateDesignation(designationForm, designationData).subscribe(
              response => {
                alert('Designation updated successfully!');
                this.switchForm('default');
                this.searchDesignationRecords();
                this.dropdownOpen = {};
              },
              error => {
                console.error('Error updating designation:', error);
                alert('Error updating designation. Please check your input and try again.');
              }
            );
          } else {
            this.apiService.createDesignation(designationData).subscribe(
                response =>
                {
                    this.switchForm('default');
                    this.searchDesignationRecords();
                    this.dropdownOpen = {};
                },
                error => {
                    console.error('Error creating designation:', error);
                    alert('Error creating designation. Please check your input and try again.');
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


    editLov(designation_id: string) {
        this.switchForm('edit', designation_id);
      }

    updateDesignationStatus(designation_id: string, status: 'Y' | 'N') {
    this.apiService.updateDesignationStatus(designation_id, { status }).subscribe(
        response => {
            this.searchDesignationRecords();
            this.dropdownOpen = {};
        },
        error => {
        console.error('Error updating designation active flag:', error);
        }
    );
    }

    clearSearch() {
        this.searchForm.reset({
            designation_id: '',
            active_flag: this.activeFlagOptions?.length ? this.activeFlagOptions[0].list_code : ''
        });
        this.designationRecords = [];
        this.showResults = false;
        this.router.navigate(['/designation','default']);
      }
}
