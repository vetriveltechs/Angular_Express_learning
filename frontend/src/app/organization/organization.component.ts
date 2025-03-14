import { Component, OnInit, AfterViewInit, HostListener } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as $ from 'jquery';
import 'jquery-ui/ui/widgets/datepicker';
import { switchMap } from 'rxjs/operators';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css'],
  providers: [DatePipe]
})
export class OrganizationComponent implements OnInit {

    page_title                                  = 'Organizations';
    organizationForm                            : FormGroup;
    searchForm                                  : FormGroup;
    formAction                                  : 'default' | 'create' | 'edit' | 'view' = 'default';
    organizationRecords                         : any[] = [];
    showResults                                 : boolean = false;
    activeFlagOptions                           : any[] = [];
    industryOptions                             : any[] = [];
    locationOptions                             : any[] = [];
    organizationOptions                         : any[] = [];
    dropdownOpen: { [key: string]               : boolean } = {};
    formSubmitted                               = false;
    previewImage: string | ArrayBuffer | null   = null; // To display preview

    constructor
    (
        private router      : Router,
        private route       : ActivatedRoute,
        private apiService  : ApiService,
        private fb          : FormBuilder,
        private datePipe    : DatePipe
    )
    {
        this.organizationForm = this.fb.group(
            {
                organization_name           : ['', Validators.required],
                organization_description    : [''],
                location_id                 : ['', Validators.required],
                start_date                  : [''],
                end_date                    : [''],
                industry_type               : [''],
                contact_person              : ['', Validators.required],
                mobile_number               : ['', Validators.required],
                email                       : [''],
                user_name                   : [''],
                password                    : [''],
                organization_image          : ['']
            }
        );
        this.searchForm = this.fb.group(
            {
                organization_id     : [''],
                active_flag         : ['']
            }
        );
    }

    ngOnInit(): void
    {
        this.route.params.subscribe(params =>
        {
            this.formAction         = params['action'] || 'default';
            const organization_id   = this.route.snapshot.queryParams['edit_id'] || this.route.snapshot.queryParams['view_id'];

            if (this.formAction === 'edit' || this.formAction === 'view')
            {
                this.apiService.editOrganization(organization_id).subscribe(
                    (response) => {

                        if (response && response.data) {
                            console.log(response.data);

                            response.data.start_date    = this.adjustDate(response.data.start_date);
                            response.data.end_date      = this.adjustDate(response.data.end_date);

                            this.organizationForm.patchValue({
                                organization_name           : response.data.organization_name,
                                organization_description    : response.data.organization_description,
                                location_id                 : response.data.location_id,
                                start_date                  : response.data.start_date,
                                end_date                    : response.data.end_date,
                                industry_type               : response.data.industry_type,
                                contact_person              : response.data.contact_person,
                                mobile_number               : response.data.mobile_number,
                                email                       : response.data.email,
                                user_name                   : response.data.user_name,
                                password                    : response.data.password,
                                organization_image          : response.data.organization_image
                            });

                            if (this.formAction === 'view') {
                                this.organizationForm.disable();
                            } else {
                                this.organizationForm.enable();
                            }
                        } else {
                            console.error("Invalid response format");
                            alert("Error: Invalid response format.");
                        }
                    },
                    (error) => {
                        console.error("Error fetching location record:", error);
                        alert("Error fetching location record. Please try again later.");
                    }
                );
            }
            else if (this.formAction === 'default')
            {
                this.organizationForm.reset();
            }

            this.fetchLovOptions('ACTIVE STATUS');
            this.fetchLocationOptions();
            this.fetchOrganizationOptions();

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
            const selectedDate = new Date(dateText);
            const formattedDate = selectedDate.toISOString().split('T')[0];

            if (elementId === 'start_date') {
              this.organizationForm.patchValue({ start_date: formattedDate });
            } else if (elementId === 'end_date') {
              this.organizationForm.patchValue({ end_date: formattedDate });
            }
          }
        });
      }

    adjustDate(dateString: string): string {
        const date = new Date(dateString);
        const userTimezoneOffset = date.getTimezoneOffset() * 60000;
        const localDate = new Date(date.getTime() - userTimezoneOffset);
        return localDate.toISOString().split('T')[0]; // Return only the date part in YYYY-MM-DD format
        }

    fetchLovOptions(listName: string)
    {
        this.apiService.getLov(listName).subscribe(response =>
            {
                if (listName === 'ACTIVE STATUS')
                {
                    this.activeFlagOptions = response;

                    if (this.activeFlagOptions.length > 0)
                    {
                        this.searchForm.patchValue(
                            {
                                active_flag: this.activeFlagOptions[0].list_code
                            }
                        );
                    }
                }
            },
            error => {
                console.error('Error fetching options:', error);
            }
        );
    }

    fetchLocationOptions() {
        this.apiService.getLocationAll().subscribe(
            response => {

                if (response && Array.isArray(response.data)) {

                    this.locationOptions = response.data;

                    console.log(this.locationOptions);

                } else {
                    console.error('Error: response.data is not an array', response.data);
                    this.locationOptions = []; // Fallback to empty array
                }
            },
            error => {
                console.error('Error fetching location options:', error);
                this.locationOptions = [];
            }
        );
    }

    fetchOrganizationOptions() {
        this.apiService.getOrganizationAll().subscribe(
            response => {

                if (response && Array.isArray(response.data)) {
                    this.organizationOptions = response.data;
                } else {
                    console.error('Error: response.data is not an array', response.data);
                    this.organizationOptions = []; // Fallback to empty array
                }
            },
            error => {
                console.error('Error fetching location options:', error);
                this.organizationOptions = [];
            }
        );
    }

    searchOrganizationRecords() {
        const organization_id   = this.searchForm.get('organization_id')?.value || '';
        const active_flag       = this.searchForm.get('active_flag')?.value || '';

        this.apiService.getAllOrganizations(organization_id, active_flag).subscribe(
            response => {

                if (response && response.data && Array.isArray(response.data)) {
                    this.organizationRecords = response.data;
                    this.showResults = true;
                } else {
                    console.error('Invalid response structure:', response);
                    this.organizationRecords = [];
                    this.showResults = false;
                }
            },
            error => {
                console.error('Error fetching organization records:', error);
                alert('Error fetching organization records. Please try again later.');
                this.organizationRecords = []; // Reset in case of error
                this.showResults = false;
            }
        );
    }


    switchForm(action: 'default' | 'create' | 'edit' | 'view', organization_id?: string)
    {
        if (action === 'edit' && organization_id) {
        this.router.navigate(['/organization', action], { queryParams: { edit_id: organization_id } });
        }
        else if (action === 'view' && organization_id)
        {
          this.router.navigate(['/organization', action], { queryParams: { view_id: organization_id } });
        } else {
        this.router.navigate(['/organization', action]);
        }
    }

    onFileChange(event: any) {
        const file = event.target.files[0];

        if (file)
        {
            const reader = new FileReader();
            reader.readAsDataURL(file);

            reader.onload = () =>
            {
                this.previewImage = reader.result;
                this.organizationForm.patchValue({ organization_image: reader.result });
            };
        }
    }

    onSubmit()
    {
        if (this.organizationForm.valid)
        {
            this.formSubmitted = true;

            const organizationData = this.organizationForm.value;
            if (this.formAction === 'edit')
            {
                const organizationForm = this.route.snapshot.queryParams['edit_id'];
                this.apiService.updateOrganization(organizationForm, organizationData).subscribe(response =>
                    {
                        alert('Organization updated successfully!');
                        this.switchForm('default');
                        this.searchOrganizationRecords();
                        this.dropdownOpen = {};
                    },
                    error => {
                        console.error('Error updating location:', error);
                        alert('Error updating organization. Please check your input and try again.');
                        this.formSubmitted = false;
                    }
                );
            }
            else
            {
                this.apiService.createOrganization(organizationData).subscribe(
                    response =>
                    {
                        this.switchForm('default');
                        this.searchOrganizationRecords();
                        this.dropdownOpen = {};
                    },
                    error => {
                        console.error('Error creating organization:', error);
                        alert('Error creating organization. Please check your input and try again.');
                        this.formSubmitted = false;
                    }
                );
            }

        }
        else {
            alert('Please fill out all required fields.');
        }
    }

    toggleDropdown(id: string): void
    {
        this.dropdownOpen[id] = !this.dropdownOpen[id];
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


    editOrganization(organization_id: string)
    {
        this.switchForm('edit', organization_id);
    }

    updateOrganizationStatus(organization_id: string, status: 'Y' | 'N')
    {
        this.apiService.updateOrganizationStatus(organization_id, { status }).subscribe(
            response => {
                this.searchOrganizationRecords();
                this.dropdownOpen = {};
            },
            error => {
            console.error('Error updating location active flag:', error);
            }
        );
    }

    clearSearch()
    {
        this.searchForm.reset(
            {
                organization_id : '',
                active_flag     : this.activeFlagOptions?.length ? this.activeFlagOptions[0].list_code : ''
            }
        );
        this.organizationRecords = [];
        this.showResults = false;
        this.router.navigate(['/orgnization','default']);
    }

}
