import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

export interface Information {
  id: string;
  eventId: string;
  title: string;
  floorPlanFor: string;
  type: "Standard" | "External";
  description?: string;
  profileImage?: string;
  featuredImages?: string[];
}

@Injectable({
  providedIn: "root",
})
export class InformationService {
  private readonly STORAGE_KEY = "eventtan_information";
  private informationSubject = new BehaviorSubject<Information[]>(
    this.loadFromStorage(),
  );

  information$: Observable<Information[]> =
    this.informationSubject.asObservable();

  constructor() {}

  private loadFromStorage(): Information[] {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  }

  private saveToStorage(information: Information[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(information));
  }

  getInformation(): Information[] {
    return this.informationSubject.value;
  }

  getInformationByEvent(eventId: string): Information[] {
    return this.getInformation().filter((info) => info.eventId === eventId);
  }

  addInformation(
    eventId: string,
    information: Omit<Information, "id" | "eventId">,
  ): Information {
    const newInformation: Information = {
      ...information,
      id: this.generateId(),
      eventId: eventId,
    };

    const informationList = [...this.getInformation(), newInformation];
    this.informationSubject.next(informationList);
    this.saveToStorage(informationList);
    return newInformation;
  }

  updateInformation(id: string, updates: Partial<Information>): void {
    const informationList = this.getInformation().map((info) => {
      if (info.id === id) {
        return { ...info, ...updates };
      }
      return info;
    });
    this.informationSubject.next(informationList);
    this.saveToStorage(informationList);
  }

  deleteInformation(id: string): void {
    const informationList = this.getInformation().filter(
      (info) => info.id !== id,
    );
    this.informationSubject.next(informationList);
    this.saveToStorage(informationList);
  }

  getInformationById(id: string): Information | undefined {
    return this.getInformation().find((info) => info.id === id);
  }

  private generateId(): string {
    return `information_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}
