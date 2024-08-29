import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as $ from 'jquery';
import 'jquery-ui/ui/widgets/datepicker';
import { UtilsService } from './../utils/utils.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, AfterViewInit {

    page_title          = 'Manage Users';
    usersForm           : FormGroup;
    formAction          : 'default' | 'create' | 'edit' | 'view' = 'default';
    usersRecords        : any[] = [];
    showResults         : boolean = false;
    usersTypeOptions    : any[] = [];
    roleOptions         : any[] = [];
    roleStatusOptions   : any[] = [];
    selectedRoles       : any[] = [];
    dropdownOpen        : { [key: string]: boolean } = {};

    constructor(
      private router: Router,
      private route: ActivatedRoute,
      private apiService: ApiService,
      private fb: FormBuilder,
      private utilsService: UtilsService
    ) {
      this.usersForm = this.fb.group({
        user_type           : ['', Validators.required],
        user_name           : ['', Validators.required],
        password            : ['', Validators.required],
        from_date           : [''],
        to_date             : [''],
        role_id             : ['']
      });
    }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
          this.formAction = params['action'] || 'default';
          const user_id = this.route.snapshot.queryParams['edit_id'] || this.route.snapshot.queryParams['view_id'];

          if (this.formAction === 'edit' || this.formAction === 'view') {
            this.apiService.editUsers(user_id).subscribe(
              (data) => {
                data.from_date  = new Date(data.from_date).toISOString().split('T')[0];
                data.to_date    = new Date(data.to_date).toISOString().split('T')[0];

                this.usersForm.patchValue(data);

                if (this.formAction === 'view') {
                  this.usersForm.disable();
                } else {
                  this.usersForm.enable();
                }
              },
              error => {
                console.error('Error fetching users record:', error);
                alert('Error fetching users record. Please try again later.');
              }
            );
          } else if (this.formAction === 'default') {
            this.usersForm.reset();
          }

          this.fetchLovOptions('USERS TYPE');
          this.fetchRoleOptions();
          this.fetchLovOptions('ROLE STATUS');
        });
    }

    fetchLovOptions(listName: string) {
        this.apiService.getLov(listName).subscribe(
            response => {
                if (listName === 'USERS TYPE') {
                    this.usersTypeOptions = response;
                } else if (listName === 'ROLE STATUS') {
                    this.roleStatusOptions = response;
                }
            },
            error => {
                console.error('Error fetching options:', error);
            }
        );
    }

    removeRole(roleToRemove: any) {
        this.selectedRoles = this.selectedRoles.filter(role => role !== roleToRemove);
    }

    fetchRoleOptions() {
        this.apiService.getAllRoles().subscribe(
            response => {
                this.roleOptions = response;
            },
            error => {
                console.error('Error fetching options:', error);
            }
        );
    }

    onRoleChange(roleId: number) {
        const selectedRole = this.roleOptions.find(role => role.role_id === roleId);
        if (selectedRole) {
          this.selectedRoles.push(selectedRole);
        }
        
        this.usersForm.get('role_id')?.setValue('');
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

          if (elementId === 'from_date') {
            this.usersForm.patchValue({ from_date: formattedDate });
          } else if (elementId === 'to_date') {
            this.usersForm.patchValue({ to_date: formattedDate });
          }
        }
      });
    }

    searchUsersRecords() {
        this.apiService.getAllUsers().subscribe(
        (data: any[]) => {
            this.usersRecords = data;
            this.showResults = true;
        },
        error => {
            console.error('Error fetching users records:', error);
            alert('Error fetching users records. Please try again later.');
            this.showResults = true;
        }
        );
    }

    switchForm(action: 'default' | 'create' | 'edit' | 'view', lovId?: string) {
        if (action === 'edit' && lovId) {
          this.router.navigate(['/users', action], { queryParams: { edit_id: lovId } });
        } else if (action === 'view' && lovId) {
          this.router.navigate(['/users',action], { queryParams: { view_id: lovId } });
        } else {
          this.router.navigate(['/users',action]);
        }
    }

    onSubmit() {
      if (this.usersForm.valid) {
        const usersData = this.usersForm.value;
        if (this.formAction === 'edit') {
            const lovId = this.route.snapshot.queryParams['edit_id'];
            this.apiService.updateLov(lovId, usersData).subscribe(
              response => {
                console.log('Users updated:', response);
                alert('Users updated successfully!');
                this.switchForm('default');
              },
              error => {
                console.error('Error updating lov:', error);
                alert('Error updating lov. Please check your input and try again.');
              }
            );
        } else {
            this.apiService.createUsers(usersData).subscribe(
              response => {
                console.log('Users created:', response);
                alert('Users created successfully!');
                this.switchForm('default');
              },
              error => {
                console.error('Error creating users:', error);
                alert('Error creating users. Please check your input and try again.');
              }
            );
        }
      } else {
        alert('Please fill out all required fields.');
      }
    }

    toggleDropdown(id: string) {
        const isOpen = this.dropdownOpen[id];
        Object.keys(this.dropdownOpen).forEach(key => this.dropdownOpen[key] = false);
        this.dropdownOpen[id] = !isOpen;
    }

    updateUsersStatus(user_id: string, status: 'Y' | 'N') {
        this.apiService.updateUsersStatus(user_id, { status }).subscribe(
            response => {
                this.searchUsersRecords();
                this.dropdownOpen = {};
            },
            error => {
                console.error('Error updating users active flag:', error);
            }
        );
    }

    editUsers(user_id: string) {
        this.switchForm('edit', user_id);
    }

    toggleSection(sectionType: 'FIRST_SECTION' | 'SECOND_SECTION', showHideType: 'SHOW' | 'HIDE'): void {
        this.utilsService.sectionShow(sectionType, showHideType);
    }

}
