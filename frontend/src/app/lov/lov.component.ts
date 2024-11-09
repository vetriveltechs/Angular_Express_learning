import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as $ from 'jquery';
import 'jquery-ui/ui/widgets/datepicker';

@Component({
  selector: 'app-lov',
  templateUrl: './lov.component.html',
  styleUrls: ['./lov.component.css']
})
export class LovComponent implements OnInit,AfterViewInit {

    page_title = 'Manage LOV';
    lovForm: FormGroup;
    formAction: 'default' | 'create' | 'edit' | 'view' = 'default'; // Added
    lovRecords: any[] = []; // Array to hold fetched LOV records
    showResults: boolean = false; // Flag to control results visibility

    constructor(
      private router: Router,
      private route: ActivatedRoute,
      private apiService: ApiService,
      private fb: FormBuilder // Inject FormBuilder
    )
    {
      // Initialize the form with FormBuilder
      this.lovForm = this.fb.group({
        list_name           : ['', Validators.required],
        from_date           : [''],
        list_description    : [''],
        to_date             : [''],
      });
    }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
          this.formAction = params['action'] || 'default';
          const lovId = this.route.snapshot.queryParams['edit_id'] || this.route.snapshot.queryParams['view_id']; // Check both IDs

          if (this.formAction === 'edit' || this.formAction === 'view') {
            this.apiService.editLov(lovId).subscribe(
              (data) => {
                // Format dates to yyyy-mm-dd
                data.from_date = new Date(data.from_date).toISOString().split('T')[0];
                data.to_date = new Date(data.to_date).toISOString().split('T')[0];

                this.lovForm.patchValue(data);

                // Disable fields if viewing
                if (this.formAction === 'view') {
                  this.lovForm.disable(); // Disable all fields for view mode
                } else {
                  this.lovForm.enable(); // Enable fields for edit mode
                }
              },
              error => {
                console.error('Error fetching lov record:', error);
                alert('Error fetching lov record. Please try again later.');
              }
            );
          } else if (this.formAction === 'default') {
            this.lovForm.reset(); // Reset the form if in default state
          }
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

          // Format the date to yyyy-mm-dd
          const formattedDate = selectedDate.toISOString().split('T')[0];

          if (elementId === 'from_date') {
            this.lovForm.patchValue({ from_date: formattedDate });
          } else if (elementId === 'to_date') {
            this.lovForm.patchValue({ to_date: formattedDate });
          }
        }
      });
    }

    // Method to fetch LOV records from the API based on the search criteria
    searchLovRecords() {
        this.apiService.getAllLov().subscribe(
        (data: any[]) => {
            this.lovRecords = data; // Store the fetched records
            this.showResults = true; // Show results after fetching
        },
        error => {
            console.error('Error fetching LOV records:', error);
            alert('Error fetching LOV records. Please try again later.');
            this.showResults = true; // Show results even if an error occurs, but no records will be shown
        }
        );
    }
    switchForm(action: 'default' | 'create' | 'edit' | 'view', lovId?: string) {
        if (action === 'edit' && lovId) {
          this.router.navigate(['/setups', 'lov', action], { queryParams: { edit_id: lovId } });
        } else if (action === 'view' && lovId) {
          this.router.navigate(['/setups', 'lov', action], { queryParams: { view_id: lovId } });
        } else {
          this.router.navigate(['/setups', 'lov', action]);
        }
      }



    onSubmit() {
      if (this.lovForm.valid) {
        const lovData = this.lovForm.value;
        if (this.formAction === 'edit') {
            const lovId = this.route.snapshot.queryParams['edit_id'];
            this.apiService.updateLov(lovId, lovData).subscribe(
              response => {
                console.log('LOV updated:', response);
                alert('LOV updated successfully!');
                this.switchForm('default');
              },
              error => {
                console.error('Error updating lov:', error);
                alert('Error updating lov. Please check your input and try again.');
              }
            );
          } else {
            this.apiService.createLov(lovData).subscribe(
              response => {
                console.log('LOV created:', response);
                alert('LOV created successfully!');
                this.switchForm('default');
              },
              error => {
                console.error('Error creating lov:', error);
                alert('Error creating lov. Please check your input and try again.');
              }
            );
          }
        // this.apiService.createLov(lovData).subscribe(
        //   response => {
        //     console.log('LOV created:', response);
        //     alert('LOV created successfully!');
        //     this.switchForm('default');
        //   },
        //   error => {
        //     console.error('Error creating lov:', error);
        //     alert('Error creating lov. Please check your input and try again.');
        //   }
        // );
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


    editLov(lovId: string) {
        this.switchForm('edit', lovId);
      }

      updateLovStatus(lovId: string, status: 'Y' | 'N') {
        this.apiService.updateLovStatus(lovId, { status }).subscribe(
            response => {
            console.log('LOV active flag updated:', response);
            location.reload();
            },
            error => {
            console.error('Error updating LOV active flag:', error);
            }
        );
}
}
