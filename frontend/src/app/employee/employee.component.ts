import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as $ from 'jquery';
import 'jquery-ui/ui/widgets/datepicker';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})


export class EmployeeComponent implements OnInit{
    page_title = 'Manage Employees';
    basicForm: FormGroup;
    employeeDetailForm: FormGroup;
    identityForm: FormGroup;
    addressForm: FormGroup;
    bankDetailsForm: FormGroup;
    formAction: 'default' | 'create' | 'edit' = 'default';
    formType: 'basic-info' | 'employee_details' | 'identity' | 'address' | 'bank_details' = 'basic-info';
    employeeTypeOptions : any[] = [];
    genderOptions       : any[] = [];
    departmentOptions   : any[] = [];
    payFrequencyOptions : any[] = [];
    selectedValue       : string = ''; // Variable to hold the selected value
    employeeRecords     : any[] = []; // Array to hold fetched LOV records
    showResults         : boolean = false; // Flag to control results visibility
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private apiService: ApiService,
        private fb: FormBuilder,


    ) {
        this.basicForm = this.fb.group({
            employee_type       : ['', Validators.required],
            first_name          : ['', Validators.required],
            middle_name         : [''],
            last_name           : [''],
            mobile_number       : ['', [Validators.required,Validators.minLength(10),Validators.maxLength(10)]],
            alt_mobile_number   : [''],
            email               : ['', [Validators.required]],
            alt_email           : [''],
            father_name         : ['',[Validators.required]],
            mother_name         : ['',[Validators.required]],
            date_of_birth       : [''],
            gender              : ['',[Validators.required]],
            blood_group         : [''],
        });

        this.employeeDetailForm = this.fb.group({
            department          : ['', [Validators.required]],
            date_of_joining     : [''],
            date_of_relieving   : [''],
            previous_experience : [''],
            rate_per_hour       : [''],
            rate_per_day        : [''],
            pay_frequency       : ['']
        });

        this.identityForm = this.fb.group({
            aadhar_number           : ['', [Validators.required, Validators.maxLength(12)]],
            pan_number              : ['', [Validators.required, Validators.maxLength(10)]],
            driving_licence         : [''],
            passport_number         : [''],
            passport_issue_date     : [''],
            passport_expiry_date    : [''],
            pf_number               : [''],
            esi_number              : [''],
            uan_number              : ['']
        });

        this.addressForm = this.fb.group({
            address_1       : ['', [Validators.required]],
            address_2       : ['', [Validators.required]],
            address_3       : ['', [Validators.required]],
            postal_code     : ['', [Validators.required, Validators.maxLength(6)]]
        });

        this.bankDetailsForm = this.fb.group({
            account_number          : ['', [Validators.required, Validators.maxLength(18)]],
            account_holder_number   : ['', [Validators.required]],
            bank_name               : ['', [Validators.required]],
            branch_name             : ['', [Validators.required]],
            ifsc_code               : ['', [Validators.required, Validators.maxLength(11)]],
            micr_code               : ['', [Validators.required, Validators.maxLength(9)]],
            address                 : ['']
        });
    }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.formAction = params['action'] || 'default';
            this.formType = params['formType'] || 'basic-info';

            if (this.formAction === 'default') {
                this.basicForm.reset();
                this.identityForm.reset();
            }

            if (this.formAction === 'edit') {
                const editId = this.route.snapshot.queryParams['edit_id'];
                if (editId) {
                    this.apiService.getEmployeeById(editId).subscribe(employee => {
                        this.basicForm.patchValue({
                            employee_type       : employee.employee_type,
                            first_name          : employee.first_name,
                            middle_name         : employee.middle_name,
                            last_name           : employee.last_name,
                            mobile_number       : employee.mobile_number,
                            alt_mobile_number   : employee.alt_mobile_number,
                            email               : employee.email,
                            alt_email           : employee.alt_email,
                            father_name         : employee.father_name,
                            mother_name         : employee.mother_name,
                            date_of_birth       : employee.date_of_birth,
                            gender              : employee.gender,
                            blood_group         : employee.blood_group,
                        });
                        this.employeeDetailForm.patchValue({
                            department          : employee.department,
                            date_of_joining     : employee.date_of_joining,
                            date_of_relieving   : employee.date_of_relieving,
                            previous_experience : employee.previous_experience,
                            rate_per_hour       : employee.rate_per_hour,
                            rate_per_day        : employee.rate_per_day,
                            pay_frequency       : employee.pay_frequency
                        });

                        console.log(this.identityForm.controls['uan_number']);  // Check if the control exists and its current value

                        try {
                            this.identityForm.patchValue({
                                aadhar_number           : employee.aadhar_number,
                                pan_number              : employee.pan_number,
                                driving_licence         : employee.driving_licence,
                                passport_number         : employee.passport_number,
                                passport_issue_date     : employee.passport_issue_date,
                                passport_expiry_date    : employee.passport_expiry_date,
                                pf_number               : employee.pf_number,
                                uan_number              : employee.uan_number
                            });

                        } catch (error) {
                            console.error('Error patching value:', error);
                        }
                        this.addressForm.patchValue({
                            address_1           : employee.address_1,
                            address_2           : employee.address_2,
                            address_3           : employee.address_3,
                            postal_code         : employee.postal_code
                        });
                        this.bankDetailsForm.patchValue({
                            account_number          : employee.account_number,
                            account_holder_number   : employee.account_holder_number,
                            bank_name               : employee.bank_name,
                            branch_name             : employee.branch_name,
                            ifsc_code               : employee.ifsc_code,
                            micr_code               : employee.micr_code,
                            address                 : employee.address
                        });
                    });
                }
            }

            this.loadDropdownOptions();
        });
    }



    // ngAfterViewInit(): void {
    //     // Apply datepicker to all elements with class 'default_date'
    //     ($(".default_date") as any).datepicker({
    //         changeMonth: true,
    //         changeYear: true,
    //         yearRange: "1950:" + (new Date().getFullYear() + 10),
    //         dateFormat: "yy-mm-dd",
    //         onSelect: (dateText: string, inst: any) => {
    //             const elementId = $(inst.input).attr('id');
    //             if (elementId) {
    //                 // Check and update the corresponding form control
    //                 if (elementId === 'date_of_birth') {
    //                     this.basicForm.patchValue({ date_of_birth: dateText });
    //                 }
    //                 else if (elementId === 'date_of_joining') {
    //                     this.employeeDetailForm.patchValue({ date_of_joining: dateText });
    //                 }
    //                 else if (elementId === 'date_of_relieving') {
    //                     this.employeeDetailForm.patchValue({ date_of_relieving: dateText });
    //                 }
    //                 else if (elementId === 'passport_issue_date') {
    //                     this.identityForm.patchValue({ passport_issue_date: dateText });
    //                 } else if (elementId === 'passport_expiry_date') {
    //                     this.identityForm.patchValue({ passport_expiry_date: dateText });
    //                 }
    //             }
    //         }
    //     });
    // }


    loadDropdownOptions() {
        if (this.formType === 'basic-info') {
            this.fetchLovOptions('EMPLOYEE TYPE');
            this.fetchLovOptions('GENDER');
        } else if (this.formType === 'employee_details') {
            this.fetchLovOptions('DEPARTMENT');
            this.fetchLovOptions('PAY FREQUENCY');
        }

    }

    fetchLovOptions(listName: string) {
        this.apiService.getLov(listName).subscribe(
            response => {
                if (listName === 'EMPLOYEE TYPE') {
                    this.employeeTypeOptions = response;
                } else if (listName === 'GENDER') {
                    this.genderOptions = response;

                } else if (listName === 'DEPARTMENT') {
                    this.departmentOptions = response;
                }
                 else if (listName === 'PAY FREQUENCY') {
                    this.payFrequencyOptions = response;
                }
            },
            error => {
                console.error('Error fetching options:', error);
            }
        );
    }

    switchForm(action: 'default' | 'create' | 'edit', formType: 'basic-info' | 'employee_details' | 'identity' | 'address' | 'bank_details') {
        this.formAction = action;
        this.formType = formType;
        this.router.navigate(['/employee', action, formType], { queryParamsHandling: 'preserve' });

        // Reinitialize the datepicker after switching the form
        setTimeout(() => {
            this.initializeDatepicker();
        }, 0); // Wait for the DOM to update before initializing the datepicker
    }

    initializeDatepicker() {
        ($(".default_date") as any).datepicker({
            changeMonth: true,
            changeYear: true,
            yearRange: "1950:" + (new Date().getFullYear() + 10),
            dateFormat: "yy-mm-dd",
            onSelect: (dateText: string, inst: any) => {
                const elementId = $(inst.input).attr('id');
                if (elementId) {
                    // Update the corresponding form control based on the datepicker's element ID
                    switch (elementId) {
                        case 'date_of_birth':
                            this.basicForm.patchValue({ date_of_birth: dateText });
                            break;
                        case 'date_of_joining':
                            this.employeeDetailForm.patchValue({ date_of_joining: dateText });
                            break;
                        case 'date_of_relieving':
                            this.employeeDetailForm.patchValue({ date_of_relieving: dateText });
                            break;
                        case 'passport_issue_date':
                            this.identityForm.patchValue({ passport_issue_date: dateText });
                            break;
                        case 'passport_expiry_date':
                            this.identityForm.patchValue({ passport_expiry_date: dateText });
                            break;
                        // Add more cases if you have more date fields
                    }
                }
            }
        });
    }

    checkBasicFormBeforeNavigating() {
        if (this.basicForm.valid || this.formAction === 'edit') {
            this.switchForm(this.formAction, 'identity');
        } else {
            alert('Please complete Basic Info before navigating to Identity.');
        }
    }

    onBasicSubmit() {
        if (this.basicForm.valid) {
            this.switchForm(this.formAction, 'employee_details');
        } else {
            alert('Please fill out all required fields in Basic Info.');
        }
    }

    onEmployeeDetailsSubmit() {

        if (this.employeeDetailForm.valid) {
            this.switchForm(this.formAction, 'identity');
        } else {
            alert('Please fill out all required fields in Employment Details.');
        }
    }

    onIdentitySubmit() {
        if (this.identityForm.valid) {
            this.switchForm(this.formAction, 'address');
        } else {
            alert('Please fill out all required fields in Identity Info.');
        }
    }

    onAddressSubmit() {
        if (this.addressForm.valid) {
            this.switchForm(this.formAction, 'bank_details');
        } else {
            alert('Please fill out all required fields in Address Info.');
        }
    }

    onBankDetailsSubmit() {
        if (this.bankDetailsForm.valid) {
            const employeeData = {
                ...this.basicForm.value,
                ...this.employeeDetailForm.value,
                ...this.identityForm.value,
                ...this.addressForm.value,
                ...this.bankDetailsForm.value
            };

            console.log(employeeData);

            if (this.formAction === 'create') {
                this.apiService.createEmployee(employeeData).subscribe(
                    response => {
                        alert('Employee created successfully!');
                        this.router.navigate(['/employee']);
                    },
                    error => {
                        console.error('Error creating employee:', error);
                        alert('Error creating employee. Please check your input and try again.');
                    }
                );
            } else if (this.formAction === 'edit') {
                const editId = this.route.snapshot.queryParams['edit_id'];
                this.apiService.updateEmployee(editId, employeeData).subscribe(
                    response => {
                        alert('Employee updated successfully!');
                        this.router.navigate(['/employee']);
                    },
                    error => {
                        console.error('Error updating employee:', error);
                        alert('Error updating employee. Please check your input and try again.');
                    }
                );
            }
        } else {
            alert('Please fill out all required fields in Bank Details.');
        }
    }

    searchEmployeeRecords() {
        this.apiService.getAllEmployee().subscribe(
            (data: any[]) => {
                this.employeeRecords = data; // Store the fetched records
                this.showResults = true; // Show results after fetching
            },
            error => {
                console.error('Error fetching LOV records:', error);
                alert('Error fetching LOV records. Please try again later.');
                this.showResults = true; // Show results even if an error occurs, but no records will be shown
            }
        );
    }
    dropdownOpen: { [key: string]: boolean } = {};

    toggleDropdown(id: string) {
        const isOpen = this.dropdownOpen[id];
        Object.keys(this.dropdownOpen).forEach(key => this.dropdownOpen[key] = false);
        this.dropdownOpen[id] = !isOpen;
      }

    // editEmployee(lovId: string) {
    //     this.switchForm('edit', lovId);
    //   }

    updateEmployeeStatus(employee_id: string, status: 'Y' | 'N') {
        this.apiService.updateEmployeeStatus(employee_id, { status }).subscribe(
            response => {
                this.searchEmployeeRecords();
                this.dropdownOpen = {};
            },
            error => {
            console.error('Error updating Employee active flag:', error);
            }
        );
    }
}
