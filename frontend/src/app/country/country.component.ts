import { Component, OnInit,AfterViewInit,HostListener } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as $ from 'jquery';
import 'jquery-ui/ui/widgets/datepicker';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit
{

    page_title                          = 'Countries';
    countryFrom                         : FormGroup;
    searchForm                          : FormGroup;
    formAction                          : 'default' | 'create' | 'edit' | 'view' = 'default';
    countryRecords: any[]               = [];
    showResults                         : boolean = false;
    activeFlagOptions                   : any[] = [];
    countryName                         : any[] = [];
    dropdownOpen: { [key: string]       : boolean } = {};

    constructor
    (
        private router: Router,
        private route: ActivatedRoute,
        private apiService: ApiService,
        private fb: FormBuilder
    )
    {
        this.countryFrom = this.fb.group(
            {
                country_name        : ['', Validators.required],
                country_code        : ['', Validators.required],
                currency_symbol     : ['', Validators.required],
                currency_code       : ['', Validators.required],
            }
        );
        this.searchForm = this.fb.group(
            {
                country_id          : [''],
                active_flag         : ['']
            }
        );
    }

    ngOnInit(): void
    {
        this.route.params.subscribe(params =>
        {
            this.formAction     = params['action'] || 'default';
            const country_id    = this.route.snapshot.queryParams['edit_id'] || this.route.snapshot.queryParams['view_id'];

            if (this.formAction === 'edit' || this.formAction === 'view')
            {
                this.apiService.editCountry(country_id).subscribe((data) =>
                    {
                        this.countryFrom.patchValue(
                            {
                                country_name        : data.country_name,
                                country_code        : data.country_code,
                                currency_symbol      : data.currency_symbol,
                                currency_code       : data.currency_code,
                            }
                        );

                        if (this.formAction === 'view')
                        {
                            this.countryFrom.disable();
                        }
                        else
                        {
                            this.countryFrom.enable();
                        }
                    },
                    error =>
                    {
                        console.error('Error fetching county record:', error);
                        alert('Error fetching county record. Please try again later.');
                    }
                );
            }
            else if (this.formAction === 'default')
            {
                this.countryFrom.reset();
            }

            this.fetchLovOptions('ACTIVE STATUS');
            this.fetchCountryOptions();

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

                this.countryName = response;
            },
            error => {
                console.error('Error fetching options:', error);
            }
        );
    }


    searchCountryRecords()
    {
        const country_id        = this.searchForm.get('country_id')?.value || '';
        const active_flag       = this.searchForm.get('active_flag')?.value || '';

        this.apiService.getAllCountrys(country_id,active_flag).subscribe(
        (data: any[]) => {
            this.countryRecords = data;
            this.showResults = true;
        },
        error => {
            console.error('Error fetching country records:', error);
            alert('Error fetching country records. Please try again later.');
            this.showResults = true;
        }
        );
    }

    switchForm(action: 'default' | 'create' | 'edit' | 'view', country_id?: string)
    {
        if (action === 'edit' && country_id) {
        this.router.navigate(['/country', action], { queryParams: { edit_id: country_id } });
        } else if (action === 'view' && country_id) {
        this.router.navigate(['/country', action], { queryParams: { view_id: country_id } });
        } else {
        this.router.navigate(['/country', action]);
        }
    }



    onSubmit()
    {
        if (this.countryFrom.valid)
        {
            const countryData = this.countryFrom.value;
            if (this.formAction === 'edit')
            {
                const countryFrom = this.route.snapshot.queryParams['edit_id'];
                this.apiService.updateCountry(countryFrom, countryData).subscribe(response =>
                    {
                        alert('Country updated successfully!');
                        this.switchForm('default');
                        this.searchCountryRecords();
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
                this.apiService.createCountry(countryData).subscribe(
                    response =>
                    {
                        this.switchForm('default');
                        this.searchCountryRecords();
                        this.dropdownOpen = {};
                    },
                    error => {
                        console.error('Error creating country:', error);
                        alert('Error creating country. Please check your input and try again.');
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


    editCountry(country_id: string)
    {
        this.switchForm('edit', country_id);
    }

    updateCountryStatus(country_id: string, status: 'Y' | 'N')
    {
        this.apiService.updateCountryStatus(country_id, { status }).subscribe(
            response => {
                this.searchCountryRecords();
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
                country_id  : '',
                active_flag : this.activeFlagOptions?.length ? this.activeFlagOptions[0].list_code : ''
            }
        );
        this.countryRecords = [];
        this.showResults = false;
        this.router.navigate(['/country','default']);
    }

}
