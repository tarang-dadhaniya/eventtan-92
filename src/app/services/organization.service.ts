import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

export interface OrganizationData {
  id: string;
  logoUrl: string;
  organizationName: string;
  website: string;
  registrationOptions: {
    requireRegistration: boolean;
    enableFBRegistration: boolean;
    enableGoogleRegistration: boolean;
  };
  allowedFunctionality: {
    enableActivityFeed: boolean;
    enableUserFollow: boolean;
    enableMultiLanguages: boolean;
  };
  address: string;
  country: string;
  state: string;
  city: string;
  organizationDetails: string;
  personalDetails: {
    firstName: string;
    lastName: string;
    email: string;
    contact: string;
    avatarUrl?: string;
  };
  publishedEvents: number;
  upcomingEvents: Array<{
    name: string;
    icon: string;
  }>;
  createdDate: string;
}

@Injectable({
  providedIn: "root",
})
export class OrganizationService {
  private readonly STORAGE_KEY = "eventtan_organizations";
  private organizationsSubject = new BehaviorSubject<OrganizationData[]>(
    this.loadFromStorage(),
  );

  organizations$: Observable<OrganizationData[]> =
    this.organizationsSubject.asObservable();

  constructor() {}

  private loadFromStorage(): OrganizationData[] {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  }

  private saveToStorage(organizations: OrganizationData[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(organizations));
  }

  getOrganizations(): OrganizationData[] {
    return this.organizationsSubject.value;
  }

  addOrganization(
    organization: Omit<OrganizationData, "id" | "createdDate">,
  ): OrganizationData {
    const newOrganization: OrganizationData = {
      ...organization,
      id: this.generateId(),
      createdDate: this.formatDate(new Date()),
      publishedEvents: organization.publishedEvents || 0,
      upcomingEvents: organization.upcomingEvents || [],
    };

    const organizations = [...this.getOrganizations(), newOrganization];
    this.organizationsSubject.next(organizations);
    this.saveToStorage(organizations);
    return newOrganization;
  }

  updateOrganization(id: string, updates: Partial<OrganizationData>): void {
    const organizations = this.getOrganizations().map((org) =>
      org.id === id ? { ...org, ...updates } : org,
    );
    this.organizationsSubject.next(organizations);
    this.saveToStorage(organizations);
  }

  deleteOrganization(id: string): void {
    const organizations = this.getOrganizations().filter(
      (org) => org.id !== id,
    );
    this.organizationsSubject.next(organizations);
    this.saveToStorage(organizations);
  }

  getOrganizationById(id: string): OrganizationData | undefined {
    return this.getOrganizations().find((org) => org.id === id);
  }

  private generateId(): string {
    return `org_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private formatDate(date: Date): string {
    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "short" });
    const year = date.getFullYear();
    const suffix = this.getDaySuffix(day);
    return `${day}${suffix} ${month} ${year}`;
  }

  private getDaySuffix(day: number): string {
    if (day >= 11 && day <= 13) return "th";
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  }
}
