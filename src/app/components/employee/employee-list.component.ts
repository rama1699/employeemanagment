import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Employee } from '../../models/user.model';
import { EmployeeService } from '../../services/employee.service';
import { AuthService } from '../../services/auth.service';
import { EmployeeFormComponent } from './employee-form.component';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, EmployeeFormComponent],
  template: `
    <div class="employee-container">
      <div class="header">
        <h2>Employee Details</h2>
        <button *ngIf="isAdmin" (click)="showAddForm = true">Add Employee</button>
      </div>

      <table>
        <thead>
          <tr>
            <th *ngIf="isAdmin"></th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Gender</th>
            <th>Email</th>
            <th>Mobile Number</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let employee of employees">
            <td *ngIf="isAdmin">
              <button (click)="editEmployee(employee)">✏️</button>
            </td>
            <td>{{employee.firstName}}</td>
            <td>{{employee.lastName}}</td>
            <td>{{employee.gender}}</td>
            <td>{{maskEmail(employee.email)}}</td>
            <td>{{maskMobileNumber(employee.mobileNumber)}}</td>
          </tr>
        </tbody>
      </table>

      <app-employee-form
        *ngIf="showAddForm"
        [employee]="selectedEmployee"
        (save)="onSave($event)"
        (cancel)="onCancel()"
      ></app-employee-form>
    </div>
  `,
  styles: [`
    .employee-container {
      padding: 2rem;
    }
    .header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 1rem;
    }
    table {
      width: 100%;
      border-collapse: collapse;
    }
    th, td {
      padding: 0.5rem;
      border: 1px solid #ccc;
    }
    button {
      padding: 0.5rem 1rem;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
  `]
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  showAddForm = false;
  selectedEmployee: Employee | null = null;
  isAdmin = false;

  constructor(
    private employeeService: EmployeeService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe(employees => {
      this.employees = employees;
    });
    this.isAdmin = this.authService.isAdmin();
  }

  editEmployee(employee: Employee): void {
    this.selectedEmployee = { ...employee };
    this.showAddForm = true;
  }

  onSave(employee: Employee): void {
    if (employee.id) {
      this.employeeService.updateEmployee(employee);
    } else {
      this.employeeService.addEmployee(employee);
    }
    this.showAddForm = false;
    this.selectedEmployee = null;
  }

  onCancel(): void {
    this.showAddForm = false;
    this.selectedEmployee = null;
  }

  maskEmail(email: string): string {
    return this.employeeService.maskEmail(email);
  }

  maskMobileNumber(number: string): string {
    return this.employeeService.maskMobileNumber(number);
  }
}