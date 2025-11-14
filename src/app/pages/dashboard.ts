import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import {
  OrganizationService,
  OrganizationData,
} from "../services/organization.service";
import { EnhancedSidebarComponent } from "../components/enhanced-sidebar";

@Component({
  selector: "app-dashboard",
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
              class="w-11 h-11 bg-primary-blue rounded flex items-center justify-center lg:flex hover:bg-[#0385b5] transition-colors"
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
            <div class="flex flex-col gap-1">
              <div class="flex items-center gap-2 text-sm text-[#5E6278]">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    opacity="0.4"
                    d="M2.36548 1.10166C4.38277 -0.3673 7.11764 -0.367138 9.13501 1.10166C9.24369 1.1808 9.3593 1.27367 9.552 1.42783L11.219 2.76084C11.5424 3.01957 11.5949 3.49208 11.3362 3.81553C11.0774 4.13897 10.6049 4.19147 10.2815 3.93271L8.61548 2.59873C8.41099 2.43514 8.32663 2.36876 8.2522 2.31455C6.76108 1.22893 4.73933 1.22877 3.24829 2.31455C3.17382 2.36879 3.08972 2.43496 2.88501 2.59873L1.21899 3.93271C0.895548 4.19147 0.423064 4.13897 0.164307 3.81553C-0.0941452 3.49209 -0.0418402 3.01951 0.281494 2.76084L1.94849 1.42783C2.14138 1.27352 2.25674 1.18084 2.36548 1.10166Z"
                    fill="#5E6278"
                  />
                  <path
                    d="M11.498 0.281509C11.7568 -0.0415426 12.2284 -0.0940473 12.5518 0.164322L12.8848 0.430923C14.1161 1.416 14.833 2.90774 14.833 4.48463V8.34987C14.8329 10.605 13.0051 12.4339 10.75 12.4339C9.59961 12.4337 8.66707 11.5003 8.66699 10.3499V7.68385C8.66699 6.99361 8.1072 6.43403 7.41699 6.43385C6.72679 6.43403 6.16699 6.99361 6.16699 7.68385V10.3499C6.16692 11.5004 5.23356 12.4339 4.08301 12.4339C1.82819 12.4335 7.41071e-05 10.6047 0 8.34987V4.48463C0 2.90786 0.717062 1.416 1.94824 0.430923L2.28125 0.164322C2.60467 -0.0944144 3.07717 -0.0418673 3.33594 0.281509C3.59469 0.604956 3.5422 1.07744 3.21875 1.3362L2.88477 1.6028C2.00963 2.30322 1.5 3.36369 1.5 4.48463V8.34987C1.50007 9.77632 2.65662 10.9335 4.08301 10.9339C4.40513 10.9339 4.66692 10.672 4.66699 10.3499V7.68385C4.66699 6.16518 5.89836 4.93403 7.41699 4.93385C8.93563 4.93403 10.167 6.16518 10.167 7.68385V10.3499C10.1671 10.6719 10.428 10.9337 10.75 10.9339C12.1767 10.9339 13.3329 9.77654 13.333 8.34987V4.48463C13.333 3.36349 12.8237 2.30322 11.9482 1.6028L11.6152 1.3362C11.292 1.07748 11.2395 0.604904 11.498 0.281509Z"
                    fill="#5E6278"
                  />
                </svg>
                <svg
                  width="7"
                  height="12"
                  viewBox="0 0 4 7"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-1 h-3"
                >
                  <path
                    d="M0.146446 0.853553C-0.0488157 0.658291 -0.0488157 0.341709 0.146446 0.146447C0.341709 -0.0488155 0.658291 -0.0488155 0.853553 0.146447L3.85355 3.14645C4.04284 3.33573 4.04946 3.64053 3.86858 3.83786L1.11858 6.83786C0.931981 7.04142 0.615697 7.05517 0.412137 6.86857C0.208578 6.68198 0.194827 6.36569 0.381423 6.16213L2.80793 3.51504L0.146446 0.853553Z"
                    fill="#5E6278"
                  />
                </svg>
                <span>Dashboard</span>
              </div>
              <h1
                class="text-xl lg:text-[22px] font-bold text-[#181C32] tracking-wide"
              >
                Eventtan Dashboard
              </h1>
            </div>
          </div>
        </header>

        <!-- Content Area -->
        <div class="flex-1 overflow-auto p-4 lg:p-8">
          <div class="bg-white rounded border border-[#E9E9E9] overflow-hidden">
            <!-- Table Header with Search & Create Button -->
            <div
              class="bg-[#FCFCFC] border-b border-[#ECECEC] p-4 lg:p-8 flex flex-col lg:flex-row gap-4 lg:justify-between lg:items-center"
            >
              <!-- Search Box -->
              <div class="relative w-full lg:w-[328px]">
                <input
                  type="text"
                  [(ngModel)]="searchQuery"
                  placeholder="Search Organization"
                  class="w-full h-12 px-5 pr-12 rounded border border-[#DADADA] bg-[#FBFBFB] text-base placeholder-[#C8C7C7] focus:outline-none focus:border-primary-blue"
                />
                <svg
                  class="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5"
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    opacity="0.4"
                    d="M0.219727 0.219673C0.51262 -0.0732201 0.98738 -0.0732201 1.28027 0.219673L4.48828 3.42768C4.78079 3.7206 4.78105 4.19546 4.48828 4.48823C4.19552 4.78099 3.72066 4.78074 3.42773 4.48823L0.219727 1.28022C-0.0731667 0.987327 -0.0731667 0.512566 0.219727 0.219673Z"
                    fill="#B1B1B1"
                  />
                  <path
                    d="M9 0C13.9705 0 17.9998 4.02959 18 9C18 13.9706 13.9706 18 9 18C4.02959 17.9998 0 13.9705 0 9C0.000175931 4.0297 4.0297 0.000175935 9 0ZM9 1.5C4.85812 1.50018 1.50018 4.85812 1.5 9C1.5 13.142 4.85801 16.4998 9 16.5C13.1421 16.5 16.5 13.1421 16.5 9C16.4998 4.85801 13.142 1.5 9 1.5Z"
                    fill="#B1B1B1"
                  />
                </svg>
              </div>

              <!-- Create Organization Button -->
              <button
                (click)="onCreateOrganization()"
                class="h-12 px-6 bg-primary-blue hover:bg-[#0385b5] text-white font-bold rounded transition-colors whitespace-nowrap"
              >
                Create Organization
              </button>
            </div>

            <!-- Table -->
            <div class="overflow-x-auto">
              <table class="w-full min-w-[1200px]">
                <thead class="border-b border-[#E9E9E9]">
                  <tr>
                    <th
                      class="py-6 px-4 text-[#181C32] font-semibold text-base text-center border-r border-[#E9E9E9]"
                    >
                      Sr. No
                    </th>
                    <th
                      class="py-6 px-4 text-[#181C32] font-semibold text-base text-left pl-12 border-r border-[#E9E9E9]"
                    >
                      Organization
                    </th>
                    <th
                      class="py-6 px-4 text-[#181C32] font-semibold text-base text-left pl-6 border-r border-[#E9E9E9]"
                    >
                      Admin Person Name
                    </th>
                    <th
                      class="py-6 px-4 text-[#181C32] font-semibold text-base text-center border-r border-[#E9E9E9]"
                    >
                      Publish Event
                    </th>
                    <th
                      class="py-6 px-4 text-[#181C32] font-semibold text-base text-center border-r border-[#E9E9E9]"
                    >
                      Created Date
                    </th>
                    <th
                      class="py-6 px-4 text-[#181C32] font-semibold text-base text-left pl-6 border-r border-[#E9E9E9]"
                    >
                      Upcoming Event
                    </th>
                    <th
                      class="py-6 px-4 text-[#181C32] font-semibold text-base text-center"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr *ngIf="filteredOrganizations.length === 0">
                    <td colspan="7" class="text-center py-20 text-[#5E6278]">
                      No organizations found. Click "Create Organization" to get
                      started.
                    </td>
                  </tr>
                  <tr
                    *ngFor="let org of filteredOrganizations; let i = index"
                    class="border-b border-[#E9E9E9] hover:bg-gray-50 transition-colors"
                  >
                    <td
                      class="py-4 px-4 text-[#353846] font-medium text-center border-r border-[#E9E9E9]"
                    >
                      {{ i + 1 }}
                    </td>
                    <td class="py-4 px-4 border-r border-[#E9E9E9]">
                      <div class="flex items-center gap-3 pl-8">
                        <div
                          class="w-[70px] h-10 rounded bg-[#F5F5F5] flex items-center justify-center flex-shrink-0 overflow-hidden"
                        >
                          <img
                            *ngIf="org.logoUrl"
                            [src]="org.logoUrl"
                            [alt]="org.organizationName"
                            class="w-full h-full object-contain"
                          />
                          <span
                            *ngIf="!org.logoUrl"
                            class="text-xs text-gray-400"
                            >Logo</span
                          >
                        </div>
                        <span class="text-[#353846] font-medium">{{
                          org.organizationName
                        }}</span>
                      </div>
                    </td>
                    <td class="py-4 px-4 border-r border-[#E9E9E9]">
                      <div class="flex items-center gap-3 pl-2">
                        <div
                          class="w-[50px] h-[50px] rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold flex-shrink-0"
                        >
                          {{
                            getInitials(
                              org.personalDetails.firstName,
                              org.personalDetails.lastName
                            )
                          }}
                        </div>
                        <div class="flex flex-col gap-0.5">
                          <span class="text-[#353846] font-medium">
                            {{ org.personalDetails.firstName }}
                            {{ org.personalDetails.lastName }}
                          </span>
                          <span class="text-[#353846] text-xs">{{
                            org.personalDetails.contact
                          }}</span>
                          <span class="text-[#353846] text-xs">{{
                            org.personalDetails.email
                          }}</span>
                        </div>
                      </div>
                    </td>
                    <td
                      class="py-4 px-4 text-[#353846] font-medium text-center border-r border-[#E9E9E9]"
                    >
                      {{ org.publishedEvents }}
                    </td>
                    <td
                      class="py-4 px-4 text-[#353846] font-medium text-center border-r border-[#E9E9E9]"
                    >
                      {{ org.createdDate }}
                    </td>
                    <td class="py-4 px-4 border-r border-[#E9E9E9]">
                      <div
                        *ngIf="org.upcomingEvents.length > 0"
                        class="flex items-center gap-3 pl-2"
                      >
                        <div
                          class="w-[70px] h-10 rounded bg-[#F5F5F5] flex items-center justify-center flex-shrink-0"
                        >
                          <svg
                            width="36"
                            height="36"
                            viewBox="0 0 36 36"
                            fill="none"
                          >
                            <circle cx="18" cy="18" r="18" fill="#E8F4F8" />
                            <path
                              d="M18 12V18L22 22"
                              stroke="#009FD8"
                              stroke-width="2"
                              stroke-linecap="round"
                            />
                          </svg>
                        </div>
                        <span class="text-[#353846] font-medium">{{
                          org.upcomingEvents[0].name
                        }}</span>
                      </div>
                      <span
                        *ngIf="org.upcomingEvents.length === 0"
                        class="text-gray-400 text-sm pl-2"
                        >No events</span
                      >
                    </td>
                    <td class="py-4 px-4">
                      <div class="flex justify-center">
                        <button
                          (click)="onViewOrganization(org)"
                          class="w-10 h-10 rounded-full bg-primary-blue hover:bg-[#0385b5] flex items-center justify-center transition-colors"
                        >
                          <svg
                            width="20"
                            height="14"
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
    </div>
  `,
  styles: [],
})
export class DashboardComponent implements OnInit {
  sidebarOpen = true;
  searchQuery = "";
  organizations: OrganizationData[] = [];

  constructor(
    private router: Router,
    private organizationService: OrganizationService,
  ) {}

  ngOnInit() {
    this.loadOrganizations();
    this.organizationService.organizations$.subscribe((orgs) => {
      this.organizations = orgs;
    });
  }

  loadOrganizations() {
    this.organizations = this.organizationService.getOrganizations();
  }

  get filteredOrganizations(): OrganizationData[] {
    if (!this.searchQuery) {
      return this.organizations;
    }
    const query = this.searchQuery.toLowerCase();
    return this.organizations.filter(
      (org) =>
        org.organizationName.toLowerCase().includes(query) ||
        org.personalDetails.firstName.toLowerCase().includes(query) ||
        org.personalDetails.lastName.toLowerCase().includes(query) ||
        org.personalDetails.email.toLowerCase().includes(query),
    );
  }

  getInitials(firstName: string, lastName: string): string {
    const first = firstName ? firstName.charAt(0).toUpperCase() : "";
    const last = lastName ? lastName.charAt(0).toUpperCase() : "";
    return `${first}${last}` || "U";
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  onCreateOrganization() {
    this.router.navigate(["/create-organization"]);
  }

  onViewOrganization(org: OrganizationData) {
    this.router.navigate(["/organization", org.id, "events"]);
  }

  onLogout() {
    this.router.navigate(["/"]);
  }
}
