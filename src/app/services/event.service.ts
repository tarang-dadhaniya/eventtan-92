import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

export interface Event {
  id: string;
  organizationId: string;
  name: string;
  logoUrl: string;
  startDate: string;
  endDate: string;
  lastModifiedBy: string;
  totalVisitor: string;
  status: string;
}

@Injectable({
  providedIn: "root",
})
export class EventService {
  private readonly STORAGE_KEY = "eventtan_events";
  private eventsSubject = new BehaviorSubject<Event[]>(this.loadFromStorage());

  events$: Observable<Event[]> = this.eventsSubject.asObservable();

  constructor() {}

  private loadFromStorage(): Event[] {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  }

  private saveToStorage(events: Event[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(events));
  }

  getEvents(): Event[] {
    return this.eventsSubject.value;
  }

  getEventsByOrganization(organizationId: string): Event[] {
    return this.getEvents().filter(
      (event) => event.organizationId === organizationId,
    );
  }

  addEvent(
    organizationId: string,
    event: Omit<Event, "id" | "organizationId">,
  ): Event {
    const newEvent: Event = {
      ...event,
      id: this.generateId(),
      organizationId: organizationId,
    };

    const events = [...this.getEvents(), newEvent];
    this.eventsSubject.next(events);
    this.saveToStorage(events);
    return newEvent;
  }

  updateEvent(id: string, updates: Partial<Event>): void {
    const events = this.getEvents().map((event) =>
      event.id === id ? { ...event, ...updates } : event,
    );
    this.eventsSubject.next(events);
    this.saveToStorage(events);
  }

  deleteEvent(id: string): void {
    const events = this.getEvents().filter((event) => event.id !== id);
    this.eventsSubject.next(events);
    this.saveToStorage(events);
  }

  getEventById(id: string): Event | undefined {
    return this.getEvents().find((event) => event.id === id);
  }

  private generateId(): string {
    return `event_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}
