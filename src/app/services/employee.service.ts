import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Employee } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private employees: Employee[] = [];
  private employeesSubject = new BehaviorSubject<Employee[]>([]);

  getEmployees(): Observable<Employee[]> {
    return this.employeesSubject.asObservable();
  }

  addEmployee(employee: Employee): void {
    employee.id = this.employees.length + 1;
    this.employees.push(employee);
    this.employeesSubject.next([...this.employees]);
  }

  updateEmployee(employee: Employee): void {
    const index = this.employees.findIndex(e => e.id === employee.id);
    if (index !== -1) {
      this.employees[index] = employee;
      this.employeesSubject.next([...this.employees]);
    }
  }

  maskEmail(email: string): string {
    const [username, domain] = email.split('@');
    return `${username.substring(0, 4)}${'X'.repeat(username.length - 4)}@${domain}`;
  }

  maskMobileNumber(number: string): string {
    return `${number.substring(0, 2)}${'X'.repeat(number.length - 4)}${number.slice(-2)}`;
  }
}