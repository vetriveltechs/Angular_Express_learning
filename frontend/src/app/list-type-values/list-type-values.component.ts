import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
declare var $: any; // Import jQuery for modal handling

@Component({
  selector: 'app-list-type-values',
  templateUrl: './list-type-values.component.html',
  styleUrls: ['./list-type-values.component.css']
})
export class ListTypeValuesComponent implements OnInit {
  page_title = 'Manage List Type Values';
  listTypeValuesForm: FormGroup;
  editListTypeValuesForm: FormGroup; // Form group for editing
  lovId: string = '';
  listTypeValues: any[] = [];
  dropdownOpen: { [key: string]: boolean } = {}; // For managing dropdown state
  currentEditRecordId: string = ''; // To hold the ID of the record being edited

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private fb: FormBuilder
  ) {
    this.listTypeValuesForm = this.fb.group({
      list_name: [''],
      list_description: [''],
      from_date: [''],
      to_date: [''],
      list_code: ['', Validators.required],
      list_value: ['', Validators.required],
      order_sequence: [''],
      short_description: [''],
      start_date: [''],
      end_date: ['']
    });

    // Initialize form for editing
    this.editListTypeValuesForm = this.fb.group({
      list_code: ['', Validators.required],
      list_value: ['', Validators.required],
      order_sequence: [''],
      short_description: [''],
      start_date: [''],
      end_date: ['']
    });
  }

  ngOnInit(): void {
    this.lovId = this.route.snapshot.paramMap.get('lov_id') || '';
    this.fetchListTypeValues();

    this.apiService.editLov(this.lovId).subscribe(
      data => {
        const fromDate = new Date(data.from_date).toISOString().split('T')[0];
        const toDate = new Date(data.to_date).toISOString().split('T')[0];

        this.listTypeValuesForm.patchValue({
          list_name: data.list_name,
          list_description: data.list_description,
          from_date: fromDate,
          to_date: toDate
        });

        this.listTypeValuesForm.get('list_name')?.disable();
        this.listTypeValuesForm.get('list_description')?.disable();
        this.listTypeValuesForm.get('from_date')?.disable();
        this.listTypeValuesForm.get('to_date')?.disable();
      },
      error => {
        console.error('Error fetching lov record:', error);
        alert('Error fetching lov record. Please try again later.');
      }
    );
  }

  fetchListTypeValues() {
    this.apiService.getListTypeValues(this.lovId).subscribe(
      data => {
        this.listTypeValues = data;
      },
      error => {
        console.error('Error fetching list type values:', error);
      }
    );
  }

  toggleDropdown(lovId: string) {
    Object.keys(this.dropdownOpen).forEach(key => {
      this.dropdownOpen[key] = false;
    });
    this.dropdownOpen[lovId] = !this.dropdownOpen[lovId];
  }

  updateListValuesStatus(listTypeValuesId: string, status: string) {
    this.apiService.updateListValuesStatus(listTypeValuesId, status).subscribe(
      response => {
        alert('Status updated successfully!');
        location.reload()
        this.fetchListTypeValues();
      },
      error => {
        console.error('Error updating status:', error);
        alert('Error updating status. Please try again.');
      }
    );
  }

  onSubmit() {
    if (this.listTypeValuesForm.get('list_code')?.valid && this.listTypeValuesForm.get('list_value')?.valid) {
      const lov_Id = this.route.snapshot.paramMap.get('lov_id') || '';
      const listTypeData = {
        lov_id: lov_Id,
        list_code: this.listTypeValuesForm.value.list_code,
        list_value: this.listTypeValuesForm.value.list_value,
        order_sequence: this.listTypeValuesForm.value.order_sequence || null,
        short_description: this.listTypeValuesForm.value.short_description || null,
        start_date: this.listTypeValuesForm.value.start_date || null,
        end_date: this.listTypeValuesForm.value.end_date || null
      };

      this.apiService.createListTypeValues(listTypeData).subscribe(
        response => {
          location.reload();
          this.fetchListTypeValues();
          this.listTypeValuesForm.reset();
        },
        error => {
          console.error('Error creating list type:', error);
        }
      );
    } else {
      alert('Please fill out all required fields.');
    }
  }

  // Open edit modal
  openEditModal(record: any) {
    this.currentEditRecordId = record.list_type_values_id;
    this.editListTypeValuesForm.patchValue({
      list_code: record.list_code,
      list_value: record.list_value,
      order_sequence: record.order_sequence,
      short_description: record.short_description,
      start_date: record.start_date,
      end_date: record.end_date
    });
    $('#editListTypeValuesModal').modal('show'); // Open the modal
  }

  // Save edited values
  saveEditedListTypeValue() {
    if (this.editListTypeValuesForm.valid) {
      const updatedData = {
        list_code: this.editListTypeValuesForm.value.list_code,
        list_value: this.editListTypeValuesForm.value.list_value,
        order_sequence: this.editListTypeValuesForm.value.order_sequence,
        short_description: this.editListTypeValuesForm.value.short_description,
        start_date: this.editListTypeValuesForm.value.start_date,
        end_date: this.editListTypeValuesForm.value.end_date
      };

      this.apiService.updateListTypeValue(this.currentEditRecordId, updatedData).subscribe(
        response => {
          alert('List Type Value updated successfully!');
          this.fetchListTypeValues();
          $('#editListTypeValuesModal').modal('hide'); // Close the modal
          location.reload()
        },
        error => {
          console.error('Error updating List Type Value:', error);
        }
      );
    } else {
      alert('Please fill out all required fields.');
    }
  }

  closeModal() {
    $('#editListTypeValuesModal').modal('hide');
    location.reload()
  }
}
