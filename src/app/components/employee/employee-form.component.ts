import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Employee } from '../../models/user.model';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="modal">
      <div class="modal-content">
        <h3>{{employee ? 'Edit' : 'Add'}} Employee</h3>
        <form (ngSubmit)="onSubmit()" #employeeForm="ngForm">
          <div class="form-group">
            <label for="firstName">First Name *</label>
            <input
              type="text"
              id="firstName"
              [(ngModel)]="formData.firstName"
              name="firstName"
              required
            >
          </div>

          <div class="form-group">
            <label for="lastName">Last Name *</label>
            <input
              type="text"
              id="lastName"
              [(ngModel)]="formData.lastName"
              name="lastName"
              required
            >
          </div>

          <div class="form-group">
            <label for="gender">Gender</label>
            <select id="gender" [(ngModel)]="formData.gender" name="gender">
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div class="form-group">
            <label for="email">Email</label>
            <input
              type="email"
              id="email"
              [(ngModel)]="formData.email"
              name="email"
              required
            >
          </div>

          <div class="form-group">
            <label for="mobileNumber">Mobile Number</label>
            <input
              type="tel"
              id="mobileNumber"
              [(ngModel)]="formData.mobileNumber"
              name="mobileNumber"
              required
            >
          </div>

          <div class="button-group">
            <button type="submit" [disabled]="!employeeForm.form.valid">Save</button>
            <button type="button" (click)="cancel.emit()">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .modal-content {
      background-color: white;
      padding: 2rem;
      border-radius: 4px;
      width: 400px;
    }
    .form-group {
      margin-bottom: 1rem;
    }
    input, select {
      width: 100%;
      padding: 0.5rem;
      margin-top: 0.25rem;
    }
    .button-group {
      display: flex;
      gap: 1rem;
      justify-content: flex-end;
    }
    button {
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    button[type="submit"] {
      background-color: #007bff;
      color: white;
    }
    button[disabled] {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `]
})
export class EmployeeFormComponent {
  @Input() employee: Employee | null = null;
  @Output() save = new EventEmitter<Employee>();
  @Output() cancel = new EventEmitter<void>();

  formData: Employee = {
    id: 0,
    firstName: '',
    lastName: '',
    gender: '',
    email: '',
    mobileNumber: ''
  };

  ngOnInit(): void {
    if (this.employee) {
      this.formData = { ...this.employee };
    }
  }

  onSubmit(): void {
    this.save.emit(this.formData);
  }
}