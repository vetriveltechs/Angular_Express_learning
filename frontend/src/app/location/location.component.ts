import { Component, OnInit,AfterViewInit,HostListener } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as $ from 'jquery';
import 'jquery-ui/ui/widgets/datepicker';
import { switchMap } from 'rxjs/operators';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css'],
  providers: [DatePipe]
})
export class LocationComponent implements OnInit {

    page_title                            = 'Locations';
    locationForm                        : FormGroup;
    searchForm                          : FormGroup;
    formAction                          : 'default' | 'create' | 'edit' | 'view' = 'default';
    locationRecords                     : any[] = [];
    showResults                         : boolean = false;
    activeFlagOptions                   : any[] = [];
    countryOptions                      : any[] = [];
    stateOptions                        : any[] = [];
    cityOptions                         : any[] = [];
    locationOptions                     : any[] = [];
    dropdownOpen: { [key: string]       : boolean } = {};
    formSubmitted                       = false;

    constructor
    (
        private router: Router,
        private route: ActivatedRoute,
        private apiService: ApiService,
        private fb: FormBuilder,
        private datePipe: DatePipe
    )
    {
        this.locationForm = this.fb.group(
            {
                location_name       : ['', Validators.required],
                start_date          : [''],
                end_date            : [''],
                country_id          : ['', Validators.required],
                state_id            : ['', Validators.required],
                city_id             : ['', Validators.required],
                address_1           : ['', Validators.required],
                address_2           : [''],
                address_3           : [''],
                pin_code            : ['', [Validators.required]],
            }
        );
        this.searchForm = this.fb.group(
            {
                location_id         : [''],
                active_flag         : ['']
            }
        );
    }

    ngOnInit(): void
    {
        this.route.params.subscribe(params =>
        {
            this.formAction     = params['action'] || 'default';
            const location_id   = this.route.snapshot.queryParams['edit_id'] || this.route.snapshot.queryParams['view_id'];

            if (this.formAction === 'edit' || this.formAction === 'view')
            {
                this.apiService.editLocation(location_id).subscribe(
                    (response) => {

                        if (response && response.data) {
                            response.data.start_date    = this.adjustDate(response.data.start_date);
                            response.data.end_date      = this.adjustDate(response.data.end_date);

                            this.locationForm.patchValue({
                                location_name   : response.data.location_name,
                                start_date      : response.data.start_date,
                                end_date        : response.data.end_date,
                                country_id      : response.data.country_id,
                                state_id        : response.data.state_id,
                                city_id         : response.data.city_id,
                                address_1       : response.data.address_1,
                                address_2       : response.data.address_2,
                                address_3       : response.data.address_3,
                                pin_code        : response.data.pin_code,
                            });

                            if (this.formAction === 'view') {
                                this.locationForm.disable();
                            } else {
                                this.locationForm.enable();
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
                this.locationForm.reset();
            }

            this.fetchLovOptions('ACTIVE STATUS');
            this.fetchCountryOptions();
            this.fetchStateOptions();
            this.fetchCityOptions();
            this.fetchLocationOptions();

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
              this.locationForm.patchValue({ start_date: formattedDate });
            } else if (elementId === 'end_date') {
              this.locationForm.patchValue({ end_date: formattedDate });
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

    fetchLocationOptions() {
        this.apiService.getLocationAll().subscribe(
            response => {

                if (response && Array.isArray(response.data)) {
                    this.locationOptions = response.data;
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



    searchLocationRecords() {
        const location_id       = this.searchForm.get('location_id')?.value || '';
        const active_flag       = this.searchForm.get('active_flag')?.value || '';

        this.apiService.getAllLocations(location_id, active_flag).subscribe(
            response => {

                if (response && response.data && Array.isArray(response.data)) {
                    this.locationRecords = response.data;
                    this.showResults = true;
                } else {
                    console.error('Invalid response structure:', response);
                    this.locationRecords = [];
                    this.showResults = false;
                }
            },
            error => {
                console.error('Error fetching location records:', error);
                alert('Error fetching location records. Please try again later.');
                this.locationRecords = []; // Reset in case of error
                this.showResults = false;
            }
        );
    }


    switchForm(action: 'default' | 'create' | 'edit' | 'view', location_id?: string)
    {
        if (action === 'edit' && location_id) {
        this.router.navigate(['/location', action], { queryParams: { edit_id: location_id } });
        }
        else if (action === 'view' && location_id)
        {
          this.router.navigate(['/location', action], { queryParams: { view_id: location_id } });
        } else {
        this.router.navigate(['/location', action]);
        }
    }



    onSubmit()
    {
        console.log(this.locationForm.valid);

        if (this.locationForm.valid)
        {
            this.formSubmitted = true;

            const locationData = this.locationForm.value;
            if (this.formAction === 'edit')
            {
                const locationForm = this.route.snapshot.queryParams['edit_id'];
                this.apiService.updateLocation(locationForm, locationData).subscribe(response =>
                    {
                        alert('Location updated successfully!');
                        this.switchForm('default');
                        this.searchLocationRecords();
                        this.dropdownOpen = {};
                    },
                    error => {
                        console.error('Error updating location:', error);
                        alert('Error updating location. Please check your input and try again.');
                        this.formSubmitted = false;
                    }
                );
            }
            else
            {
                this.apiService.createLocation(locationData).subscribe(
                    response =>
                    {
                        this.switchForm('default');
                        this.searchLocationRecords();
                        this.dropdownOpen = {};
                    },
                    error => {
                        console.error('Error creating location:', error);
                        alert('Error creating location. Please check your input and try again.');
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


    editLocation(location_id: string)
    {
        this.switchForm('edit', location_id);
    }

    updateLocationStatus(location_id: string, status: 'Y' | 'N')
    {
        this.apiService.updateLocationStatus(location_id, { status }).subscribe(
            response => {
                this.searchLocationRecords();
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
                location_id     : '',
                active_flag : this.activeFlagOptions?.length ? this.activeFlagOptions[0].list_code : ''
            }
        );
        this.locationRecords = [];
        this.showResults = false;
        this.router.navigate(['/location','default']);
    }

}
