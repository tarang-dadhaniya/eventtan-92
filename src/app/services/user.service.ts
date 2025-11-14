import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

export interface UserData {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: "active" | "inactive";
  lastLogin: string;
}

@Injectable({
  providedIn: "root",
})
export class UserService {
  private usersSubject = new BehaviorSubject<UserData[]>([]);

  users$ = this.usersSubject.asObservable();

  getUsers(): UserData[] {
    return this.usersSubject.value;
  }

  addUser(user: Omit<UserData, "id" | "status" | "lastLogin">): void {
    const newUser: UserData = {
      ...user,
      id: Date.now().toString(),
      status: "active",
      lastLogin: new Date().toLocaleString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
    };
    const users = [...this.usersSubject.value, newUser];
    this.usersSubject.next(users);
  }

  deleteUser(id: string): void {
    const users = this.usersSubject.value.filter((user) => user.id !== id);
    this.usersSubject.next(users);
  }

  updateUser(
    id: string,
    updates: Omit<UserData, "id" | "status" | "lastLogin">,
  ): void {
    const users = this.usersSubject.value.map((user) =>
      user.id === id
        ? {
            ...user,
            ...updates,
          }
        : user,
    );
    this.usersSubject.next(users);
  }
}
