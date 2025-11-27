import { Component, OnInit, AfterViewInit, HostListener } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as $ from 'jquery';
import 'jquery-ui/ui/widgets/datepicker';

@Component({
  selector: 'app-document-numbering',
  templateUrl: './document-numbering.component.html',
  styleUrls: ['./document-numbering.component.css']
})
export class DocumentNumberingComponent implements OnInit, AfterViewInit {

  page_title: string = 'Manage Document Numbering';
  documentNumberingForm: FormGroup;
  searchForm: FormGroup;
  formAction: 'default' | 'create' | 'edit' | 'view' = 'default'; // Form action (default, create, edit, view)
  documentNumberingRecords: any[] = []; // Array to hold fetched LOV records
  showResults: boolean = false; // Flag to control results visibility
  documentNumberingTypeOptions: any[] = [];
  activeFlagOptions: any[] = [];
  preview: string = '';
  documentNumberingOptions: any[] = [];
  dropdownOpen: { [key: string]: boolean } = {};
  datePickerInitialized: boolean = false; // Flag to check date picker initialization

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private fb: FormBuilder // Inject FormBuilder
  ) {
    // Initialize forms
    this.documentNumberingForm = this.fb.group({
      document_numbering_type: ['', Validators.required],
      document_type: [''],
      prefix: [''],
      next_number: ['', Validators.required],
      suffix: [''],
      from_date: [''],
      to_date: [''],
    });
    this.searchForm = this.fb.group({
      document_numbering_type: [''],
      active_flag: ['']
    });
  }

  ngOnInit(): void {
    // Fetch necessary data when the component initializes
    this.fetchLovOptions('ACTIVE STATUS');
    this.fetchDocumentNumberingOptions();
    this.fetchLovOptions('MODULES');

    // Route param subscription
    this.route.params.subscribe(params => {
      this.formAction = params['action'] || 'default';
      const document_numbering_id = this.route.snapshot.queryParams['edit_id'] || this.route.snapshot.queryParams['view_id'];

      // If action is edit or view, fetch data and patch to form
      if (this.formAction === 'edit' || this.formAction === 'view') {
        this.apiService.editDocumentNumbering(document_numbering_id).subscribe(
          (data) => {
            data.from_date = this.adjustDate(data.from_date);
            data.to_date = this.adjustDate(data.to_date);

            this.documentNumberingForm.patchValue(data);

            if (this.formAction === 'view') {
              this.documentNumberingForm.disable(); // Disable all fields for view mode
            } else {
              this.documentNumberingForm.enable(); // Enable fields for edit mode
            }
          },
          error => {
            console.error('Error fetching document numbering record:', error);
            alert('Error fetching document numbering record. Please try again later.');
          }
        );
      } else if (this.formAction === 'default') {
        this.documentNumberingForm.reset(); // Reset the form if in default state
      }
    });

    // Preview update logic
    this.documentNumberingForm.valueChanges.subscribe(values => {
      const { prefix, next_number, suffix } = values;
      this.preview = `${prefix || ''}${next_number || ''}${suffix || ''}`;
    });
  }

  // Fetching LOV options
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
        } else if (listName === 'MODULES') {
          this.documentNumberingTypeOptions = response;

          if (this.documentNumberingTypeOptions.length > 0) {
            this.documentNumberingForm.patchValue({
              document_numbering_type: this.documentNumberingTypeOptions
            });
          }
        }
      },
      error => {
        console.error('Error fetching options:', error);
      }
    );
  }

  // Fetch all document numbering records
  fetchDocumentNumberingOptions() {
    this.apiService.getDocumentNumberingAll().subscribe(
      response => {
        if (response && Array.isArray(response)) {
          this.documentNumberingOptions = response;
        } else {
          this.documentNumberingOptions = [];
        }
      },
      error => {
        console.error('Error fetching document numbering options:', error);
        alert('Error fetching document numbering options. Please try again later.');
      }
    );
  }

  // Search document numbering records
  searchDocumentNumberingRecords() {
    const document_numbering_type = this.searchForm.get('document_numbering_type')?.value || '';
    const active_flag = this.searchForm.get('active_flag')?.value || '';

    this.apiService.getAllDocumentNumbering(document_numbering_type, active_flag).subscribe(
      (data: any[]) => {
        this.documentNumberingRecords = data;
        this.showResults = true;
      },
      error => {
        console.error('Error fetching records:', error);
        alert('Error fetching records. Please try again later.');
        this.showResults = true;
      }
    );
  }

  // Switch form between default, create, edit, and view
  switchForm(action: 'default' | 'create' | 'edit' | 'view', document_numbering_id?: string) {
    if (action === 'edit' && document_numbering_id) {
      this.router.navigate(['/document-numbering', action], { queryParams: { edit_id: document_numbering_id } });
    } else if (action === 'view' && document_numbering_id) {
      this.router.navigate(['/document-numbering', action], { queryParams: { view_id: document_numbering_id } });
    } else {
      this.router.navigate(['/document-numbering', action]);
    }
  }

  // Initialize datepicker in AfterViewInit
  ngAfterViewInit(): void {
    if (!this.datePickerInitialized) {
      ($(".previous_date") as any).datepicker({
        changeMonth: true,
        changeYear: true,
        yearRange: "1950:" + (new Date().getFullYear() + 10),
        dateFormat: "yy-mm-dd",
        minDate: 0,
        onSelect: (dateText: string, inst: any) => {
          const elementId = $(inst.input).attr('id');
          const selectedDate = new Date(dateText);
          const formattedDate = selectedDate.toISOString().split('T')[0];

          if (elementId === 'from_date') {
            this.documentNumberingForm.patchValue({ from_date: formattedDate });
          } else if (elementId === 'to_date') {
            this.documentNumberingForm.patchValue({ to_date: formattedDate });
          }
        }
      });
      this.datePickerInitialized = true;
    }
  }

  // Adjust date to match local timezone
  adjustDate(dateString: string): string {
    const date = new Date(dateString);
    const userTimezoneOffset = date.getTimezoneOffset() * 60000;
    const localDate = new Date(date.getTime() - userTimezoneOffset);
    return localDate.toISOString().split('T')[0]; // Return only the date part in YYYY-MM-DD format
  }

  // Submit form
  onSubmit() {
    if (this.documentNumberingForm.valid) {
      const documentNumberingData = this.documentNumberingForm.value;
      if (this.formAction === 'edit') {
        const document_numbering_id = this.route.snapshot.queryParams['edit_id'];
        this.apiService.updateDocumentNumbering(document_numbering_id, documentNumberingData).subscribe(
          response => {
            alert('Document Numbering updated successfully!');
            this.switchForm('default');
            this.searchDocumentNumberingRecords();
            this.dropdownOpen = {}; // Close all dropdowns
          },
          error => {
            console.error('Error updating document numbering:', error);
            alert('Error updating document numbering. Please check your input and try again.');
          }
        );
      } else {
        this.apiService.createDocumentNumbering(documentNumberingData).subscribe(
          response => {
            const createdId = response.document_numbering_id;
            this.router.navigate(['/document-numbering/edit'], { queryParams: { edit_id: createdId } });
          },
          error => {
            console.error('Error creating document numbering:', error);
            alert('Error creating document numbering. Please check your input and try again.');
          }
        );
      }
    } else {
      alert('Please fill out all required fields.');
    }
  }

  // Toggle dropdown open/close
  // toggleDropdown(id: string): void {
  //   this.dropdownOpen[id] = !this.dropdownOpen[id]; // Toggle dropdown state
  // }

  toggleDropdown(id: string): void {
    const isOpen = this.dropdownOpen[id];

    // Close all
    this.dropdownOpen = {};

    // Toggle the clicked one
    if (!isOpen) {
      this.dropdownOpen[id] = true;
    }
  }

  // Close dropdowns when clicking outside
  @HostListener('document:click', ['$event'])
  closeDropdownOnClickOutside(event: MouseEvent): void {
    const targetElement = event.target as HTMLElement;
    if (!targetElement.closest('.dropdown')) {
      this.dropdownOpen = {}; // Reset the dropdown state for all records
    }
  }

  // Edit the document numbering record
  editLov(document_numbering_id: string) {
    this.switchForm('edit', document_numbering_id);
  }

  // Update the status of document numbering record (active/inactive)
  updateDocumentNumberingStatus(document_numbering_id: string, status: 'Y' | 'N') {
    this.apiService.updateDocumentNumberingStatus(document_numbering_id, { status }).subscribe(
      response => {
        this.searchDocumentNumberingRecords();
        this.dropdownOpen = {}; // Close all dropdowns
      },
      error => {
        console.error('Error updating document numbering status:', error);
      }
    );
  }

  // Clear search filter
  clearSearch() {
    this.searchForm.reset({
      document_numbering_type: '',
      active_flag: this.activeFlagOptions?.length ? this.activeFlagOptions[0].list_code : ''
    });
    this.documentNumberingRecords = [];
    this.showResults = false;
    this.router.navigate(['/document-numbering', 'default']);
  }
}
