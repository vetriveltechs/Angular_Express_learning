import { Component, OnInit,AfterViewInit,HostListener } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as $ from 'jquery';
import 'jquery-ui/ui/widgets/datepicker';

@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.css']
})
export class StateComponent implements OnInit {

    page_title                          = 'States';
    stateForm                           : FormGroup;
    searchForm                          : FormGroup;
    formAction                          : 'default' | 'create' | 'edit' | 'view' = 'default';
    stateRecords: any[]                 = [];
    showResults                         : boolean = false;
    activeFlagOptions                   : any[] = [];
    countryOptions                      : any[] = [];
    stateOptions: any[] = [];
    dropdownOpen: { [key: string]       : boolean } = {};

    constructor
    (
        private router: Router,
        private route: ActivatedRoute,
        private apiService: ApiService,
        private fb: FormBuilder
    )
    {
        this.stateForm = this.fb.group(
            {
                country_id          : ['', Validators.required],
                state_name          : ['', Validators.required],
                state_code          : ['', Validators.required],
                state_number        : ['', Validators.required],
            }
        );
        this.searchForm = this.fb.group(
            {
                country_id          : [''],
                state_id            : [''],
                active_flag         : ['']
            }
        );
    }

    ngOnInit(): void
    {
        this.route.params.subscribe(params =>
        {
            this.formAction     = params['action'] || 'default';
            const state_id      = this.route.snapshot.queryParams['edit_id'] || this.route.snapshot.queryParams['view_id'];

            if (this.formAction === 'edit' || this.formAction === 'view')
            {
                this.apiService.editState(state_id).subscribe(
                    (response) => {
                        console.log("API Response:", response);

                        if (response && response.data) {
                            this.stateForm.patchValue({
                                country_id: response.data.country_id,
                                state_name: response.data.state_name,
                                state_code: response.data.state_code,
                                state_number: response.data.state_number,
                            });

                            if (this.formAction === 'view') {
                                this.stateForm.disable();
                            } else {
                                this.stateForm.enable();
                            }
                        } else {
                            console.error("Invalid response format");
                            alert("Error: Invalid response format.");
                        }
                    },
                    (error) => {
                        console.error("Error fetching state record:", error);
                        alert("Error fetching state record. Please try again later.");
                    }
                );
            }
            else if (this.formAction === 'default')
            {
                this.stateForm.reset();
            }

            this.fetchLovOptions('ACTIVE STATUS');
            this.fetchCountryOptions();
            this.fetchStateOptions();

        });
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

    fetchCountryOptions() {
        this.apiService.getCountryAll().subscribe(
            response => {

                if (response && Array.isArray(response.data)) {
                    this.countryOptions = response.data;
                } else {
                    console.error('Error: response.data is not an array', response.data);
                    this.countryOptions = []; // Fallback to empty array
                }
            },
            error => {
                console.error('Error fetching country options:', error);
                this.countryOptions = [];
            }
        );
    }
    fetchStateOptions() {
        this.apiService.getStateAll().subscribe(
            response => {

                if (response && Array.isArray(response.data)) {
                    this.stateOptions = response.data;
                } else {
                    console.error('Error: response.data is not an array', response.data);
                    this.stateOptions = []; // Fallback to empty array
                }
            },
            error => {
                console.error('Error fetching state options:', error);
                this.stateOptions = [];
            }
        );
    }



    searchStateRecords() {
        const country_id  = this.searchForm.get('country_id')?.value || '';
        const state_id    = this.searchForm.get('state_id')?.value || '';
        const active_flag = this.searchForm.get('active_flag')?.value || '';

        this.apiService.getAllStates(country_id, state_id, active_flag).subscribe(
            response => {

                if (response && response.data && Array.isArray(response.data)) {
                    this.stateRecords = response.data;
                    this.showResults = true;
                } else {
                    console.error('Invalid response structure:', response);
                    this.stateRecords = [];
                    this.showResults = false;
                }
            },
            error => {
                console.error('Error fetching state records:', error);
                alert('Error fetching state records. Please try again later.');
                this.stateRecords = []; // Reset in case of error
                this.showResults = false;
            }
        );
    }


    switchForm(action: 'default' | 'create' | 'edit' | 'view', state_id?: string)
    {
        if (action === 'edit' && state_id) {
        this.router.navigate(['/state', action], { queryParams: { edit_id: state_id } });
        }
        else if (action === 'view' && state_id)
        {
          this.router.navigate(['/state', action], { queryParams: { view_id: state_id } });
        } else {
        this.router.navigate(['/state', action]);
        }
    }



    onSubmit()
    {
        if (this.stateForm.valid)
        {
            const stateData = this.stateForm.value;
            if (this.formAction === 'edit')
            {
                const stateForm = this.route.snapshot.queryParams['edit_id'];
                this.apiService.updateState(stateForm, stateData).subscribe(response =>
                    {
                        alert('State updated successfully!');
                        this.switchForm('default');
                        this.searchStateRecords();
                        this.dropdownOpen = {};
                    },
                    error => {
                        console.error('Error updating state:', error);
                        alert('Error updating state. Please check your input and try again.');
                    }
                );
            }
            else
            {
                this.apiService.createState(stateData).subscribe(
                    response =>
                    {
                        this.switchForm('default');
                        this.searchStateRecords();
                        this.dropdownOpen = {};
                    },
                    error => {
                        console.error('Error creating state:', error);
                        alert('Error creating state. Please check your input and try again.');
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


    editState(state_id: string)
    {
        this.switchForm('edit', state_id);
    }

    updateStateStatus(state_id: string, status: 'Y' | 'N')
    {
        this.apiService.updateStateStatus(state_id, { status }).subscribe(
            response => {
                this.searchStateRecords();
                this.dropdownOpen = {};
            },
            error => {
            console.error('Error updating state active flag:', error);
            }
        );
    }

    clearSearch()
    {
        this.searchForm.reset(
            {
                country_id  : '',
                state_id    : '',
                active_flag : this.activeFlagOptions?.length ? this.activeFlagOptions[0].list_code : ''
            }
        );
        this.stateRecords = [];
        this.showResults = false;
        this.router.navigate(['/state','default']);
    }

}
