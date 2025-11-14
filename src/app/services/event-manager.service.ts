import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

export interface EventManagerData {
  id: string;
  name: string;
  email: string;
  phone: string;
  eventCount: number;
  status: "active" | "inactive";
}

@Injectable({
  providedIn: "root",
})
export class EventManagerService {
  private eventManagersSubject = new BehaviorSubject<EventManagerData[]>([]);

  eventManagers$ = this.eventManagersSubject.asObservable();

  getEventManagers(): EventManagerData[] {
    return this.eventManagersSubject.value;
  }

  addEventManager(
    manager: Omit<EventManagerData, "id" | "status" | "eventCount">,
  ): void {
    const newManager: EventManagerData = {
      ...manager,
      id: Date.now().toString(),
      status: "active",
      eventCount: 0,
    };
    const managers = [...this.eventManagersSubject.value, newManager];
    this.eventManagersSubject.next(managers);
  }

  deleteEventManager(id: string): void {
    const managers = this.eventManagersSubject.value.filter(
      (manager) => manager.id !== id,
    );
    this.eventManagersSubject.next(managers);
  }

  updateEventManager(
    id: string,
    updates: Omit<EventManagerData, "id" | "status" | "eventCount">,
  ): void {
    const managers = this.eventManagersSubject.value.map((manager) =>
      manager.id === id
        ? {
            ...manager,
            ...updates,
          }
        : manager,
    );
    this.eventManagersSubject.next(managers);
  }
}
