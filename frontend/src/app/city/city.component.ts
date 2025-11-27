import { Component, OnInit,AfterViewInit,HostListener } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as $ from 'jquery';
import 'jquery-ui/ui/widgets/datepicker';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {

    page_title                          = 'Cities';
    cityForm                            : FormGroup;
    searchForm                          : FormGroup;
    formAction                          : 'default' | 'create' | 'edit' | 'view' = 'default';
    cityRecords                         : any[] = [];
    showResults                         : boolean = false;
    activeFlagOptions                   : any[] = [];
    countryOptions                      : any[] = [];
    stateOptions                        : any[] = [];
    cityOptions                         : any[] = [];
    dropdownOpen: { [key: string]       : boolean } = {};
    formSubmitted                       = false;

    constructor
    (
        private router: Router,
        private route: ActivatedRoute,
        private apiService: ApiService,
        private fb: FormBuilder
    )
    {
        this.cityForm = this.fb.group(
            {
                country_id          : ['', Validators.required],
                state_id            : ['', Validators.required],
                city_name           : ['', Validators.required],
            }
        );
        this.searchForm = this.fb.group(
            {
                country_id          : [''],
                state_id            : [''],
                city_id             : [''],
                active_flag         : ['']
            }
        );
    }

    ngOnInit(): void
    {
        this.route.params.subscribe(params =>
        {
            this.formAction     = params['action'] || 'default';
            const city_id      = this.route.snapshot.queryParams['edit_id'] || this.route.snapshot.queryParams['view_id'];

            if (this.formAction === 'edit' || this.formAction === 'view')
            {
                this.apiService.editCity(city_id).subscribe(
                    (response) => {

                        if (response && response.data) {
                            this.cityForm.patchValue({
                                country_id      : response.data.country_id,
                                state_id        : response.data.state_id,
                                city_name       : response.data.city_name
                            });

                            if (this.formAction === 'view') {
                                this.cityForm.disable();
                            } else {
                                this.cityForm.enable();
                            }
                        } else {
                            console.error("Invalid response format");
                            alert("Error: Invalid response format.");
                        }
                    },
                    (error) => {
                        console.error("Error fetching city record:", error);
                        alert("Error fetching state record. Please try again later.");
                    }
                );
            }
            else if (this.formAction === 'default')
            {
                this.cityForm.reset();
            }

            this.fetchLovOptions('ACTIVE STATUS');
            this.fetchCountryOptions();
            this.fetchStateOptions();
            this.fetchCityOptions();

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

    fetchCityOptions() {
        this.apiService.getCityAll().subscribe(
            response => {

                if (response && Array.isArray(response.data)) {
                    this.cityOptions = response.data;
                } else {
                    console.error('Error: response.data is not an array', response.data);
                    this.cityOptions = []; // Fallback to empty array
                }
            },
            error => {
                console.error('Error fetching city options:', error);
                this.cityOptions = [];
            }
        );
    }



    searchCityRecords() {
        const country_id    = this.searchForm.get('country_id')?.value || '';
        const state_id      = this.searchForm.get('state_id')?.value || '';
        const city_id       = this.searchForm.get('city_id')?.value || '';
        const active_flag   = this.searchForm.get('active_flag')?.value || '';

        this.apiService.getAllCities(country_id, state_id,city_id, active_flag).subscribe(
            response => {

                if (response && response.data && Array.isArray(response.data)) {
                    this.cityRecords = response.data;
                    this.showResults = true;
                } else {
                    console.error('Invalid response structure:', response);
                    this.cityRecords = [];
                    this.showResults = false;
                }
            },
            error => {
                console.error('Error fetching state records:', error);
                alert('Error fetching state records. Please try again later.');
                this.cityRecords = []; // Reset in case of error
                this.showResults = false;
            }
        );
    }


    switchForm(action: 'default' | 'create' | 'edit' | 'view', city_id?: string)
    {
        if (action === 'edit' && city_id) {
        this.router.navigate(['/city', action], { queryParams: { edit_id: city_id } });
        }
        else if (action === 'view' && city_id)
        {
          this.router.navigate(['/city', action], { queryParams: { view_id: city_id } });
        } else {
        this.router.navigate(['/city', action]);
        }
    }



    onSubmit()
    {
        if (this.cityForm.valid)
        {
            this.formSubmitted = true;

            const cityData = this.cityForm.value;
            if (this.formAction === 'edit')
            {
                const cityForm = this.route.snapshot.queryParams['edit_id'];
                this.apiService.updateCity(cityForm, cityData).subscribe(response =>
                    {
                        alert('City updated successfully!');
                        this.switchForm('default');
                        this.searchCityRecords();
                        this.dropdownOpen = {};
                    },
                    error => {
                        console.error('Error updating city:', error);
                        alert('Error updating state. Please check your input and try again.');
                        this.formSubmitted = false;
                    }
                );
            }
            else
            {
                this.apiService.createCity(cityData).subscribe(
                    response =>
                    {
                        this.switchForm('default');
                        this.searchCityRecords();
                        this.dropdownOpen = {};
                    },
                    error => {
                        console.error('Error creating state:', error);
                        alert('Error creating state. Please check your input and try again.');
                        this.formSubmitted = false;
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


    editCity(city_id: string)
    {
        this.switchForm('edit', city_id);
    }

    updateCityStatus(city_id: string, status: 'Y' | 'N')
    {
        this.apiService.updateCityStatus(city_id, { status }).subscribe(
            response => {
                this.searchCityRecords();
                this.dropdownOpen = {};
            },
            error => {
            console.error('Error updating city active flag:', error);
            }
        );
    }

    clearSearch()
    {
        this.searchForm.reset(
            {
                country_id  : '',
                state_id    : '',
                city_id     : '',
                active_flag : this.activeFlagOptions?.length ? this.activeFlagOptions[0].list_code : ''
            }
        );
        this.cityRecords = [];
        this.showResults = false;
        this.router.navigate(['/city','default']);
    }

}
