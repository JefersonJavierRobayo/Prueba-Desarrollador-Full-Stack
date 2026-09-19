import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserKey = 'app_current_user';
  private usersKey = 'app_registered_users';

  constructor(private router: Router) {}

  register(user: User): boolean {
    const users = this.getRegisteredUsers();
    const exists = users.some(u => u.email === user.email);
    if (exists) {
      return false;
    }
    user.id = Date.now().toString();
    users.push(user);
    localStorage.setItem(this.usersKey, JSON.stringify(users));
    this.setCurrentUser(user);
    return true;
  }

  login(email: string, pass: string): boolean {
    const users = this.getRegisteredUsers();
    const found = users.find(u => u.email === email && u.password === pass);
    if (found) {
      this.setCurrentUser(found);
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem(this.currentUserKey);
    this.router.navigate(['/login']);
  }

  getCurrentUser(): User | null {
    const data = localStorage.getItem(this.currentUserKey);
    return data ? JSON.parse(data) : null;
  }

  isAuthenticated(): boolean {
    return this.getCurrentUser() !== null;
  }

  private setCurrentUser(user: User): void {
    const userWithoutPassword = { id: user.id, name: user.name, email: user.email };
    localStorage.setItem(this.currentUserKey, JSON.stringify(userWithoutPassword));
  }

  private getRegisteredUsers(): User[] {
    const data = localStorage.getItem(this.usersKey);
    return data ? JSON.parse(data) : [];
  }
}