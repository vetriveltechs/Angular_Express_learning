
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import * as $ from 'jquery';
import 'jquery-ui/ui/widgets/datepicker';
import { UtilsService } from './../utils/utils.service';

@Component({
  selector: 'app-appraisal',
  templateUrl: './appraisal.component.html',
  styleUrls: ['./appraisal.component.css']
})
export class AppraisalComponent implements OnInit {
    userId              : number | null = null;
    roleId              : number | null = null;
    person_id           : number | null = null;
    page_title          = 'Manage Apparasial';
    appraisalForm       : FormGroup;
    searchForm          : FormGroup;
    formAction          : 'default' | 'create' | 'edit' | 'view' = 'default';
    appraisalRecords    : any[] = [];
    showResults         : boolean = false;
    userNameOptions     : any[] = [];
    activeFlagOptions   : any[] = [];
    dropdownOpen        : { [key: string]: boolean } = {};
    constructor(
      private router: Router,
      private route: ActivatedRoute,
      private apiService: ApiService,
      private fb: FormBuilder,
      private utilsService: UtilsService
    ) {
      this.appraisalForm = this.fb.group({
        employee_name           : ['', Validators.required],
        employee_created_id     : ['', Validators.required],
        designation_id          : ['', Validators.required],
        last_review_date        : [''],
        department_id           : [''],
        reviewer_name           : [''],
        reviewer_title          : [''],
        created_date            : [''],
        roles                   : this.fb.array([])
      });

      this.searchForm = this.fb.group({
        user_name       : [''],
        active_flag     : ['']
      });
    }

    ngOnInit(): void {
        this.route.params.subscribe(params =>
        {
            this.formAction = params['action'] || 'default';
            const appraisal_id = this.route.snapshot.queryParams['edit_id'] || this.route.snapshot.queryParams['view_id'];


            if (this.formAction === 'edit' || this.formAction === 'view')
            {
                this.apiService.editAppraisal(appraisal_id).subscribe(
                (data) =>
                {
                    data.start_date = this.adjustDate(data.start_date);
                    data.end_date = this.adjustDate(data.end_date);

                    this.appraisalForm.patchValue(data);

                    if (this.formAction === 'view') {
                    this.appraisalForm.disable();
                    } else {
                    this.appraisalForm.enable();
                    }
                },
                error =>
                {
                    console.error('Error fetching appraisal record:', error);
                    alert('Error fetching appraisal record. Please try again later.');
                }
                );
            }
            else if (this.formAction === 'default')
            {
                this.appraisalForm.reset();
            }

            this.fetchLovOptions('ACTIVE STATUS');
            this.userId     = this.apiService.getUserId();
            this.roleId     = this.apiService.getRoleId();
            this.person_id  = this.apiService.getPersonId();

            if(this.person_id!=null)
            {

                this.apiService.getEmployeeDetails(this.person_id).subscribe((data) => {
                    const currentDate = new Date().toISOString().split('T')[0];

                    this.appraisalForm.patchValue({
                        employee_name           : data.first_name,
                        department_id           : data.department_name,
                        designation_id          : data.designation_name,
                        employee_created_id     : data.employee_number,
                        created_date            : currentDate
                    });
                })

            }
        });

    }

    adjustDate(dateString: string): string {
        const date = new Date(dateString);
        const userTimezoneOffset = date.getTimezoneOffset() * 60000;
        const localDate = new Date(date.getTime() - userTimezoneOffset);
        return localDate.toISOString().split('T')[0]; // Return only the date part in YYYY-MM-DD format
    }

    fetchLovOptions(listName: string) {
        this.apiService.getLov(listName).subscribe(
            response => {
                if (listName === 'ACTIVE STATUS') {
                    this.activeFlagOptions = response;
                }
            },
            error => {
                console.error('Error fetching options:', error);
            }
        );
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
                this.appraisalForm.patchValue({ start_date: formattedDate });
            } else if (elementId === 'end_date') {
                this.appraisalForm.patchValue({ end_date: formattedDate });
            }
            }
        });
    }

    searchAppraisalRecords() {
        const user_name     = this.searchForm.get('user_name')?.value || '';
        const active_flag    = this.searchForm.get('active_flag')?.value || '';

        this.apiService.getAllAppraisal(user_name,active_flag).subscribe(
            (data: any[]) => {
                this.appraisalRecords = data;
                this.showResults = true;
            },
            error => {
                console.error('Error fetching appraisal records:', error);
                alert('Error fetching appraisal records. Please try again later.');
                this.showResults = true;
            }
        );
    }


    switchForm(action: 'default' | 'create' | 'edit' | 'view', appraisal_id?: string) {
        if (action === 'edit' && appraisal_id)
        {
            this.router.navigate(['/appraisal', action], { queryParams: { edit_id: appraisal_id } });
        }
        else if (action === 'view' && appraisal_id)
        {
            this.router.navigate(['/appraisal',action], { queryParams: { view_id: appraisal_id } });
        }
        else
        {
            this.router.navigate(['/appraisal',action]);
        }
    }

    onSubmit() {
        if (this.appraisalForm.valid)
        {
            const appraisal_data = this.appraisalForm.value;
            if (this.formAction === 'edit')
            {
                const appraisal_id = this.route.snapshot.queryParams['edit_id'];
                this.apiService.updateAppraisal(appraisal_id, appraisal_data).subscribe(
                response => {
                    console.log('Appraisal updated:', response);
                    alert('Appraisal updated successfully!');
                    this.switchForm('default');
                },
                error => {
                    console.error('Error updating appraisal:', error);
                    alert('Error updating appraisal. Please check your input and try again.');
                }
                );
            }
            else
            {
                this.apiService.createAppraisal(appraisal_data).subscribe(
                    response => {
                        console.log('Appraisal created:', response);
                        alert('Appraisal created successfully!');
                        this.switchForm('default');
                    },
                    error => {
                        console.error('Error creating appraisal:', error);
                        alert('Error creating appraisal. Please check your input and try again.');
                    }
                );
            }
        }
        else
        {
            alert('Please fill out all required fields.');
        }
    }

    toggleDropdown(id: string) {
        const isOpen = this.dropdownOpen[id];
        Object.keys(this.dropdownOpen).forEach(key => this.dropdownOpen[key] = false);
        this.dropdownOpen[id] = !isOpen;
    }

    updateAppraisalStatus(appraisal_id: string, status: 'Y' | 'N') {

        this.apiService.updateAppraisalStatus(appraisal_id, { status }).subscribe(
            response => {
                this.searchAppraisalRecords();
                this.dropdownOpen = {};
            },
            error => {
                console.error('Error updating appraisal active flag:', error);
            }
        );
    }

    editAppraisal(appraisal_id: string) {
        this.switchForm('edit', appraisal_id);
    }

    toggleSection(sectionType: 'FIRST_SECTION' | 'SECOND_SECTION', showHideType: 'SHOW' | 'HIDE'): void {
        this.utilsService.sectionShow(sectionType, showHideType);
    }

    clearSearch() {
        this.searchForm.reset();
        this.appraisalRecords = [];
        this.showResults = false;
        this.router.navigate(['/appraisal','default']);
      }

}
