import { Component, OnInit,AfterViewInit,HostListener  } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as $ from 'jquery';
import 'jquery-ui/ui/widgets/datepicker';

@Component({
  selector: 'app-staff-details',
  templateUrl: './staff-details.component.html',
  styleUrls: ['./staff-details.component.css']
})
export class StaffDetailsComponent implements OnInit {

    page_title                      = 'Staff Details';
    staffDetailForm                 : FormGroup;
    searchForm                      : FormGroup;
    formAction                      : 'default' | 'create' | 'edit' | 'view' = 'default';
    staffDetailsRecords: any[]      = [];
    showResults                     : boolean = false;
    activeFlagOptions               : any[] = [];
    dropdownOpen: { [key: string]   : boolean } = {};
    departmentOptions               : any[] = [];
    academicYearOptions             : any[] = [];
    positionNameOptions             : any[] = [];
    staffDetailsOptions             : any[] = [];


    constructor
    (
        private router: Router,
        private route: ActivatedRoute,
        private apiService: ApiService,
        private fb: FormBuilder // Inject FormBuilder
    )
    {
        this.staffDetailForm    = this.fb.group({
            staff_roll_number       : ['', Validators.required],
            staff_name              : ['', Validators.required],
            department_id           : ['', Validators.required],
            academic_year           : ['', Validators.required],
            email_id                : ['', Validators.required],
            contact_number          : ['', Validators.required],
            position_name           : ['', Validators.required],
            staff_photo             : [''],
        });
        this.searchForm = this.fb.group({
            staff_id            : [''],
            department_id       : [''],
            academic_year       : [''],
            active_flag         : ['']
        });
    }

    ngOnInit(): void
    {
        this.route.params.subscribe(params => {
            this.formAction     = params['action'] || 'default';
            const staff_id      = this.route.snapshot.queryParams['edit_id'] || this.route.snapshot.queryParams['view_id']; // Check both IDs

            if (this.formAction === 'edit' || this.formAction === 'view') {
              this.apiService.editStaffDetails(staff_id).subscribe(
                (response) => {
                  this.staffDetailForm.patchValue(response.data);

                  if (this.formAction === 'view') {
                    this.staffDetailForm.disable(); // Disable all fields for view mode
                  } else {
                    this.staffDetailForm.enable(); // Enable fields for edit mode
                  }
                },
                error => {
                  console.error('Error fetching lov record:', error);
                  alert('Error fetching lov record. Please try again later.');
                }
              );
            }
            else if (this.formAction === 'create') {
                this.getDocumentNumberByType('STAFF'); // Add this line for 'create'
            }
            else if (this.formAction === 'default') {
              this.staffDetailForm.reset(); // Reset the form if in default state
            }
            this.fetchLovOptions('ACTIVE STATUS');
            this.fetchLovOptions('POSITION NAME');
            this.fetchLovOptions('ACADEMIC YEAR');
            this.fetchStaffDetailsOptions();
            this.apiService.getDepartmentAll().subscribe(response =>
            {
                this.departmentOptions = response
            });


          });
    }

    getDocumentNumberByType(listName: string): void {
        this.apiService.getDocumentNumberByType(listName).subscribe((response: any) => {
          this.staffDetailForm.get('staff_roll_number')?.setValue(response.documentNumber);
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
                else if (listName === 'ACADEMIC YEAR') {

                    this.academicYearOptions = response;
                }
                else if (listName === 'POSITION NAME') {
                    this.positionNameOptions = response;
                }
            },
            error => {
                console.error('Error fetching options:', error);
            }
        );
    }

    fetchStaffDetailsOptions() {
        this.apiService.getStaffDetailsAll().subscribe(
            response => {

                if (response && Array.isArray(response.data)) {

                    this.staffDetailsOptions = response.data;
                } else {
                    console.error('Error: response.data is not an array', response.data);
                    this.staffDetailsOptions = []; // Fallback to empty array
                }
            },
            error => {
                console.error('Error fetching staff details options:', error);
                this.staffDetailsOptions = [];
            }
        );
    }

    searchStaffDetailsRecords() {
        const staff_id          = this.searchForm.get('staff_id')?.value || '';
        const department_id     = this.searchForm.get('department_id')?.value || '';
        const academic_year     = this.searchForm.get('academic_year')?.value || '';
        const active_flag       = this.searchForm.get('active_flag')?.value || '';

        this.apiService.getAllStaffDetails(staff_id,department_id,academic_year,active_flag).subscribe(
          (response: any) => {

            if (response && Array.isArray(response.data)) {
                this.staffDetailsRecords = response.data; // This is the array of staff details
                this.showResults = true;
              }
          },
          error => {
            console.error('Error fetching users records:', error);
            alert('Error fetching users records. Please try again later.');
            this.showResults = true;
          }
        );
    }

    switchForm(action: 'default' | 'create' | 'edit' | 'view', staff_id?: string)
    {
        if (action === 'edit' && staff_id)
        {
          this.router.navigate(['/staffDetails', action], { queryParams: { edit_id: staff_id } });
        }
        else if (action === 'view' && staff_id)
        {
          this.router.navigate(['/staffDetails', action], { queryParams: { view_id: staff_id } });
        }
        else
        {
          this.router.navigate(['/staffDetails', action]);
        }
    }

    onSubmit()
    {
        if (this.staffDetailForm.valid)
        {
            const staffDetailsData = this.staffDetailForm.value;

            console.log(staffDetailsData);

            if (this.formAction === 'edit')
            {
                const staff_id = this.route.snapshot.queryParams['edit_id'];
                this.apiService.updateStaffDetails(staff_id, staffDetailsData).subscribe(response =>
                    {
                        alert('Staff details updated successfully!');
                        this.switchForm('default');
                        this.searchStaffDetailsRecords();
                        this.dropdownOpen = {};
                    },
                    error => {
                        console.error('Error updating country:', error);
                        alert('Error updating country. Please check your input and try again.');
                    }
                );
            }
            else
            {
                this.apiService.createStaffDetails(staffDetailsData).subscribe(
                    response =>
                    {
                        this.switchForm('default');
                        this.searchStaffDetailsRecords();
                        this.dropdownOpen = {};
                    },
                    error => {
                        console.error('Error creating country:', error);
                        alert('Error creating staff. Please check your input and try again.');
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


    editStaffDetails(staff_id: string)
    {
        this.switchForm('edit', staff_id);
    }

    updateStaffDetailsStatus(staff_id: string, status: 'Y' | 'N')
    {
        this.apiService.updateStaffDetailsStatus(staff_id, { status }).subscribe(
            response => {
                this.searchStaffDetailsRecords();
                this.dropdownOpen = {};
            },
            error => {
            console.error('Error updating country active flag:', error);
            }
        );
    }

    clearSearch()
    {
        this.searchForm.reset(
            {
                staff_id        : '',
                department_id   : '',
                academic_year            : '',
                active_flag     : this.activeFlagOptions?.length ? this.activeFlagOptions[0].list_code : ''
            }
        );
        this.staffDetailsRecords = [];
        this.showResults = false;
        this.router.navigate(['/staffDetails','default']);
    }

}
