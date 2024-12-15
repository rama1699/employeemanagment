import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="navbar">
      <div class="nav-brand">Employee Portal</div>
      <div class="nav-items">
        <ng-container *ngIf="!isAuthenticated">
          <a routerLink="/login" class="nav-link">Login</a>
        </ng-container>
        <ng-container *ngIf="isAuthenticated">
          <a routerLink="/employees" class="nav-link">Employees</a>
          <button (click)="logout()" class="nav-link logout-btn">Logout</button>
        </ng-container>
      </div>
    </nav>
  `,
  styles: [`
    .navbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 2rem;
      background-color: #f8f9fa;
      border-bottom: 1px solid #dee2e6;
    }
    .nav-brand {
      font-size: 1.25rem;
      font-weight: bold;
      color: #007bff;
    }
    .nav-items {
      display: flex;
      gap: 1rem;
    }
    .nav-link {
      text-decoration: none;
      color: #495057;
      padding: 0.5rem 1rem;
      border-radius: 4px;
    }
    .nav-link:hover {
      background-color: #e9ecef;
    }
    .logout-btn {
      border: none;
      background: none;
      cursor: pointer;
      font-size: 1rem;
    }
  `]
})
export class NavComponent {
  constructor(private authService: AuthService) {}

  get isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  logout(): void {
    this.authService.logout();
  }
}