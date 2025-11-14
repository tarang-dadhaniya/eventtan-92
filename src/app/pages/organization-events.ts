import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import {
  OrganizationService,
  OrganizationData,
} from "../services/organization.service";
import { EventService, Event } from "../services/event.service";
import { EnhancedSidebarComponent } from "../components/enhanced-sidebar";

@Component({
  selector: "app-organization-events",
  standalone: true,
  imports: [CommonModule, FormsModule, EnhancedSidebarComponent],
  template: `
    <div class="flex h-screen overflow-hidden bg-[#FCFCFE]">
      <!-- Enhanced Sidebar Component -->
      <app-enhanced-sidebar
        [sidebarOpen]="sidebarOpen"
        (toggleSidebarEvent)="toggleSidebar()"
        (logoutEvent)="onLogout()"
      ></app-enhanced-sidebar>

      <!-- Main Content -->
      <main class="flex-1 flex flex-col overflow-hidden">
        <!-- Top Header -->
        <header
          class="h-24 bg-white border-b border-[#ECECEC] flex items-center px-6 lg:px-8"
        >
          <div class="flex items-center gap-4 lg:gap-6 w-full">
            <!-- Menu Toggle Button -->
            <button
              (click)="toggleSidebar()"
              class="w-11 h-11 bg-primary-blue rounded flex items-center justify-center hover:bg-[#0385b5] transition-colors"
            >
              <svg
                width="36"
                height="36"
                viewBox="0 0 36 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M4.5 9C4.5 8.17158 5.17158 7.5 6 7.5H30C30.8284 7.5 31.5 8.17158 31.5 9C31.5 9.82842 30.8284 10.5 30 10.5H6C5.17158 10.5 4.5 9.82842 4.5 9ZM4.5 18C4.5 17.1716 5.17158 16.5 6 16.5H21C21.8284 16.5 22.5 17.1716 22.5 18C22.5 18.8285 21.8284 19.5 21 19.5H6C5.17158 19.5 4.5 18.8285 4.5 18ZM4.5 27C4.5 26.1716 5.17158 25.5 6 25.5H13.5C14.3284 25.5 15 26.1716 15 27C15 27.8285 14.3284 28.5 13.5 28.5H6C5.17158 28.5 4.5 27.8285 4.5 27Z"
                  fill="white"
                />
              </svg>
            </button>

            <!-- Breadcrumb & Title -->
            <div class="flex flex-col gap-1 flex-1">
              <div class="flex items-center gap-2 text-sm text-[#5E6278]">
                <span>Dashboard</span>
              </div>
              <h1
                class="text-xl lg:text-[22px] font-bold text-[#181C32] tracking-wide"
              >
                {{ organizationName }} Events
              </h1>
            </div>

            <!-- Back Button -->
            <button
              (click)="onBack()"
              class="h-10 px-4 bg-[#F0F0F0] hover:bg-[#E0E0E0] text-[#181C32] font-semibold rounded border border-[#DADADA] transition-colors flex items-center gap-2 whitespace-nowrap"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 8 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.12267 1.58149C7.48574 1.22948 7.49695 0.647619 7.14773 0.281872C6.7985 -0.0838756 6.22107 -0.0950086 5.85801 0.257005L0.279881 5.66534C-0.0720789 6.00658 -0.0949591 6.56654 0.227978 6.93559L5.1375 12.5461C5.47063 12.9268 6.04703 12.9632 6.42492 12.6274C6.80281 12.2916 6.8391 11.7108 6.50597 11.3301L2.17397 6.37956L7.12267 1.58149Z"
                  fill="#181C32"
                />
              </svg>
              Back to {{ organizationName }}
            </button>
          </div>
        </header>

        <!-- Content Area -->
        <div class="flex-1 overflow-auto p-4 lg:p-8">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-2xl font-bold text-gray-800">Events</h2>
            <button
              (click)="openAddEventModal()"
              class="px-6 py-2 bg-primary-blue hover:bg-[#0385b5] text-white font-semibold rounded transition-colors"
            >
              + Add Event
            </button>
          </div>

          <div class="bg-white rounded border border-[#E9E9E9] overflow-hidden">
            <!-- Table -->
            <div class="overflow-x-auto">
              <table class="w-full min-w-[1200px]">
                <thead class="border-b border-[#E9E9E9]">
                  <tr>
                    <th
                      class="py-4 px-4 text-[#181C32] font-semibold text-sm text-left"
                    >
                      Event Name
                    </th>
                    <th
                      class="py-4 px-4 text-[#181C32] font-semibold text-sm text-left"
                    >
                      Start Date
                    </th>
                    <th
                      class="py-4 px-4 text-[#181C32] font-semibold text-sm text-left"
                    >
                      End Date
                    </th>
                    <th
                      class="py-4 px-4 text-[#181C32] font-semibold text-sm text-left"
                    >
                      Last Modified By
                    </th>
                    <th
                      class="py-4 px-4 text-[#181C32] font-semibold text-sm text-left"
                    >
                      Total Visitor
                    </th>
                    <th
                      class="py-4 px-4 text-[#181C32] font-semibold text-sm text-left"
                    >
                      Status
                    </th>
                    <th
                      class="py-4 px-4 text-[#181C32] font-semibold text-sm text-center"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr *ngIf="filteredEvents.length === 0">
                    <td colspan="7" class="text-center py-8 text-[#5E6278]">
                      No events found. Click "+ Add Event" to create one.
                    </td>
                  </tr>
                  <tr
                    *ngFor="let event of filteredEvents"
                    class="border-b border-[#E9E9E9] hover:bg-gray-50 transition-colors"
                  >
                    <td class="py-4 px-4 text-[#353846] font-medium">
                      {{ event.name }}
                    </td>
                    <td class="py-4 px-4 text-[#353846]">
                      {{ event.startDate }}
                    </td>
                    <td class="py-4 px-4 text-[#353846]">
                      {{ event.endDate }}
                    </td>
                    <td class="py-4 px-4 text-[#353846]">
                      {{ event.lastModifiedBy }}
                    </td>
                    <td class="py-4 px-4 text-[#353846]">
                      {{ event.totalVisitor }}
                    </td>
                    <td class="py-4 px-4">
                      <span
                        class="px-3 py-1 rounded text-sm font-semibold"
                        [ngClass]="{
                          'bg-blue-100 text-blue-700': event.status === 'Draft',
                          'bg-green-100 text-green-700':
                            event.status === 'Published',
                        }"
                      >
                        {{ event.status }}
                      </span>
                    </td>
                    <td class="py-4 px-4">
                      <div class="flex justify-center">
                        <button
                          (click)="onViewEvent(event)"
                          class="w-8 h-8 rounded-full bg-primary-blue hover:bg-[#0385b5] flex items-center justify-center transition-colors"
                          title="View Event"
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 20 14"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M19.9245 6.6663C18.252 3.16082 14.4489 0 10 0C4.99419 0 1.39604 3.89848 0.0754883 6.6663C-0.0248233 6.87744 -0.0248233 7.12256 0.0754883 7.33369C1.74801 10.8392 5.55109 14 10 14C15.0058 14 18.604 10.1014 19.9245 7.33369C20.0252 7.12256 20.0252 6.87744 19.9245 6.6663ZM10 12.4444C6.40077 12.4444 3.41663 10.083 1.66613 7C3.40927 3.92963 6.39162 1.55556 10 1.55556C13.5989 1.55556 16.5834 3.91667 18.3339 7C16.5907 10.0702 13.6084 12.4444 10 12.4444ZM10 3.11111C7.84607 3.11111 6.09375 4.85556 6.09375 7C6.09375 9.14444 7.84607 10.8889 10 10.8889C12.1539 10.8889 13.9062 9.14444 13.9062 7C13.9062 4.85556 12.1539 3.11111 10 3.11111ZM10 9.33333C8.70771 9.33333 7.65625 8.28646 7.65625 7C7.65625 5.71333 8.70771 4.66667 10 4.66667C11.2924 4.66667 12.3438 5.71333 12.3438 7C12.3438 8.28646 11.2924 9.33333 10 9.33333Z"
                              fill="white"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      <!-- Add Event Modal -->
      <div
        *ngIf="showAddEventModal"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      >
        <div class="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
          <h2 class="text-2xl font-bold mb-4 text-gray-800">Add New Event</h2>
          <form (ngSubmit)="onSubmitEvent()" class="space-y-4">
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">
                Event Name
              </label>
              <input
                type="text"
                [(ngModel)]="newEvent.name"
                name="name"
                placeholder="Enter event name"
                class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">
                Start Date
              </label>
              <input
                type="date"
                [(ngModel)]="newEvent.startDate"
                name="startDate"
                class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">
                End Date
              </label>
              <input
                type="date"
                [(ngModel)]="newEvent.endDate"
                name="endDate"
                class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div class="flex gap-4 justify-end mt-6">
              <button
                type="button"
                (click)="closeAddEventModal()"
                class="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold rounded transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="px-4 py-2 bg-primary-blue hover:bg-[#0385b5] text-white font-semibold rounded transition-colors"
              >
                Add Event
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class OrganizationEventsComponent implements OnInit {
  sidebarOpen = true;
  searchQuery = "";
  organizationId: string = "";
  organizationName: string = "";
  events: Event[] = [];
  showAddEventModal = false;
  newEvent = {
    name: "",
    startDate: "",
    endDate: "",
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private organizationService: OrganizationService,
    private eventService: EventService,
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.organizationId = params["id"];
      this.loadOrganization();
      this.loadEvents();
    });
  }

  loadOrganization() {
    const org = this.organizationService.getOrganizationById(
      this.organizationId,
    );
    if (org) {
      this.organizationName = org.organizationName;
    }
  }

  loadEvents() {
    this.events = this.eventService.getEventsByOrganization(
      this.organizationId,
    );
  }

  get filteredEvents(): Event[] {
    if (!this.searchQuery) {
      return this.events;
    }
    const query = this.searchQuery.toLowerCase();
    return this.events.filter(
      (event) =>
        event.name.toLowerCase().includes(query) ||
        event.status.toLowerCase().includes(query) ||
        event.lastModifiedBy.toLowerCase().includes(query),
    );
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  openAddEventModal() {
    this.showAddEventModal = true;
    this.newEvent = {
      name: "",
      startDate: "",
      endDate: "",
    };
  }

  closeAddEventModal() {
    this.showAddEventModal = false;
  }

  onSubmitEvent() {
    if (
      !this.newEvent.name ||
      !this.newEvent.startDate ||
      !this.newEvent.endDate
    ) {
      return;
    }

    this.eventService.addEvent(this.organizationId, {
      name: this.newEvent.name,
      logoUrl: "",
      startDate: this.formatDate(new Date(this.newEvent.startDate)),
      endDate: this.formatDate(new Date(this.newEvent.endDate)),
      lastModifiedBy: "Current User",
      totalVisitor: "0",
      status: "Draft",
    });

    this.loadEvents();
    this.closeAddEventModal();
  }

  formatDate(date: Date): string {
    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "short" });
    const year = date.getFullYear();
    const suffix = this.getDaySuffix(day);
    return `${day}${suffix} ${month}, ${year}`;
  }

  getDaySuffix(day: number): string {
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

  onViewEvent(event: Event) {
    this.router.navigate(["/event", event.id, "dashboard"], {
      queryParams: {
        eventName: event.name,
        eventDates: `${event.startDate} - ${event.endDate}`,
      },
    });
  }

  onBack() {
    this.router.navigate(["/dashboard"]);
  }

  onLogout() {
    this.router.navigate(["/"]);
  }
}
