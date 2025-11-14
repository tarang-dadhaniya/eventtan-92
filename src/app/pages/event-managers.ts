import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import {
  EventManagerService,
  EventManagerData,
} from "../services/event-manager.service";
import { EnhancedSidebarComponent } from "../components/enhanced-sidebar";

@Component({
  selector: "app-event-managers",
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
                    d="M11.498 0.281509C11.7568 -0.0415426 12.2284 -0.0940473 12.5518 0.164322L12.8848 0.430923C14.1161 1.416 14.833 2.90774 14.833 4.48463V8.34987C14.8329 10.605 13.0051 12.4339 10.75 12.4339C9.59961 12.4337 8.66707 11.5003 8.66699 10.3499V7.68385C8.66699 6.99361 8.1072 6.43403 7.41699 6.43385C6.72679 6.43403 6.16699 6.99361 6.16699 7.68385V10.3499C6.16692 11.5004 5.23356 12.4339 4.08301 12.4339C1.82819 12.4335 7.41071e-05 10.6047 0 8.34987V4.48463C0 2.90786 0.717062 1.416 1.94824 0.430923L2.28125 0.164322C2.60467 -0.0944144 3.07717 -0.0418673 3.33594 0.281509C3.59469 0.605185 3.5422 1.07744 3.21875 1.3362L2.88477 1.60303C2.00963 2.30345 1.5 3.36392 1.5 4.48463V8.34987C1.50007 9.77632 2.65662 10.9337 4.08301 10.9341C4.40513 10.9341 4.66692 10.672 4.66699 10.3499V7.68385C4.66699 6.16518 5.89836 4.93403 7.41699 4.93385C8.93563 4.93403 10.167 6.16518 10.167 7.68385V10.3499C10.1671 10.6719 10.428 10.9337 10.75 10.9339C12.1767 10.9339 13.3329 9.77654 13.333 8.34987V4.48463C13.333 3.36349 12.8237 2.30322 11.9482 1.60303L11.6152 1.3362C11.292 1.07748 11.2395 0.604904 11.498 0.281509Z"
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
                Manage User
              </h1>
            </div>
          </div>
        </header>

        <!-- Content Area -->
        <div class="flex-1 overflow-auto p-4 lg:p-8">
          <!-- Tabs -->
          <div class="flex items-center justify-center mb-8 gap-0">
            <!-- Admin Tab -->
            <button
              (click)="navigateToManageUser()"
              class="px-6 py-3 font-medium rounded-l transition-colors border-2 border-primary-blue text-primary-blue bg-white"
            >
              Organization Administrator
            </button>

            <!-- Connector Line -->
            <div class="h-12 w-12 flex items-center justify-center">
              <div class="w-full h-0.5 bg-primary-blue"></div>
            </div>

            <!-- Managers Tab (Active) -->
            <button
              class="px-6 py-3 font-semibold rounded-r transition-colors bg-primary-blue text-white shadow-md"
            >
              Event Managers
            </button>
          </div>

          <div
            class="bg-white rounded border border-[#E9E9E9] overflow-hidden max-w-[1520px] mx-auto"
          >
            <!-- Table Header with Search & Add Button -->
            <div
              class="bg-[#FCFCFC] border-b border-[#ECECEC] p-4 lg:p-8 flex flex-col lg:flex-row gap-4 lg:justify-between lg:items-center"
            >
              <!-- Search Box -->
              <div class="relative w-full lg:w-[328px]">
                <input
                  type="text"
                  [(ngModel)]="searchQuery"
                  placeholder="Search Event"
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

              <!-- Add Person Button -->
              <button
                (click)="openAddPersonModal()"
                class="h-12 px-6 bg-primary-blue hover:bg-[#0385b5] text-white font-bold rounded transition-colors whitespace-nowrap"
              >
                Add Person
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
                      Name
                    </th>
                    <th
                      class="py-6 px-4 text-[#181C32] font-semibold text-base text-left pl-6 border-r border-[#E9E9E9]"
                    >
                      Email
                    </th>
                    <th
                      class="py-6 px-4 text-[#181C32] font-semibold text-base text-center border-r border-[#E9E9E9]"
                    >
                      Phone
                    </th>
                    <th
                      class="py-6 px-4 text-[#181C32] font-semibold text-base text-center border-r border-[#E9E9E9]"
                    >
                      Event
                    </th>
                    <th
                      class="py-6 px-4 text-[#181C32] font-semibold text-base text-center border-r border-[#E9E9E9]"
                    >
                      Status
                    </th>
                    <th
                      class="py-6 px-4 text-[#181C32] font-semibold text-base text-center"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr *ngIf="filteredEventManagers.length === 0">
                    <td colspan="7" class="text-center py-20 text-[#5E6278]">
                      No event managers found.
                    </td>
                  </tr>
                  <tr
                    *ngFor="let manager of filteredEventManagers; let i = index"
                    class="border-b border-[#E9E9E9] hover:bg-gray-50 transition-colors"
                  >
                    <td
                      class="py-4 px-4 text-[#353846] font-semibold text-center border-r border-[#E9E9E9]"
                    >
                      {{ i + 1 }}
                    </td>
                    <td
                      class="py-4 px-4 text-[#353846] font-semibold pl-12 border-r border-[#E9E9E9]"
                    >
                      {{ manager.name }}
                    </td>
                    <td
                      class="py-4 px-4 text-[#353846] font-semibold pl-6 border-r border-[#E9E9E9]"
                    >
                      {{ manager.email }}
                    </td>
                    <td
                      class="py-4 px-4 text-[#353846] font-semibold text-center border-r border-[#E9E9E9]"
                    >
                      {{ manager.phone }}
                    </td>
                    <td
                      class="py-4 px-4 text-[#353846] font-semibold text-center border-r border-[#E9E9E9]"
                    >
                      {{ manager.eventCount }}
                    </td>
                    <td class="py-4 px-4 text-center border-r border-[#E9E9E9]">
                      <div class="flex justify-center">
                        <div
                          class="w-11 h-5 rounded-full bg-[#E6E6E6] relative flex items-center"
                        >
                          <div
                            class="w-4 h-4 rounded-full transition-all"
                            [class.ml-auto]="manager.status === 'active'"
                            [class.bg-[#06A947]]="manager.status === 'active'"
                            [class.bg-gray-400]="manager.status !== 'active'"
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td class="py-4 px-4">
                      <div class="flex justify-center gap-2">
                        <button
                          (click)="editEventManager(manager)"
                          class="w-10 h-10 rounded-full bg-primary-blue hover:bg-[#0385b5] flex items-center justify-center transition-colors"
                        >
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M19.1479 1.6403L19.125 1.61947C18.6877 1.21997 18.1208 0.999756 17.5288 0.999756C16.8651 0.999756 16.2278 1.28094 15.7804 1.77073L7.32001 11.0332C7.24283 11.1176 7.18429 11.2173 7.14822 11.3257L6.15337 14.3079C6.03829 14.6527 6.09608 15.0341 6.30783 15.3279C6.52106 15.624 6.86494 15.801 7.22743 15.801C7.38422 15.801 7.53746 15.7687 7.68274 15.7052L10.5632 14.4451C10.6679 14.3992 10.7619 14.332 10.839 14.2476L19.2994 4.98513C20.1798 4.0213 20.1119 2.52095 19.1479 1.6403ZM8.05939 13.7571L8.64319 12.0071L8.69243 11.9531L9.79881 12.9637L9.74961 13.0176L8.05939 13.7571ZM18.0932 3.88324L10.9007 11.7574L9.79433 10.7469L16.9867 2.87265C17.1274 2.71868 17.3199 2.63372 17.5288 2.63372C17.7121 2.63372 17.8876 2.70195 18.0234 2.82594L18.0463 2.84677C18.3449 3.11967 18.3659 3.58458 18.0932 3.88324Z"
                              fill="white"
                            />
                            <path
                              d="M17.5065 8.53628C17.0553 8.53628 16.6896 8.90199 16.6896 9.35316V16.2885C16.6896 17.434 15.7576 18.366 14.6121 18.366H4.71133C3.56577 18.366 2.63379 17.434 2.63379 16.2885V6.46809C2.63379 5.32253 3.56587 4.39055 4.71133 4.39055H11.8775C12.3287 4.39055 12.6944 4.02484 12.6944 3.57368C12.6944 3.12251 12.3287 2.7568 11.8775 2.7568H4.71133C2.66477 2.7568 1 4.42157 1 6.46809V16.2884C1 18.3349 2.66487 19.9997 4.71133 19.9997H14.612C16.6585 19.9997 18.3233 18.3348 18.3233 16.2884V9.35316C18.3234 8.90199 17.9576 8.53628 17.5065 8.53628Z"
                              fill="white"
                            />
                          </svg>
                        </button>
                        <button
                          (click)="deleteEventManager(manager.id)"
                          class="w-10 h-10 rounded-full bg-[#BF0505] hover:bg-red-700 flex items-center justify-center transition-colors"
                        >
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M15.8335 5.8335C15.6125 5.8335 15.4005 5.92129 15.2442 6.07757C15.088 6.23385 15.0002 6.44582 15.0002 6.66683V15.9927C14.9763 16.4141 14.7868 16.809 14.4731 17.0913C14.1593 17.3737 13.7467 17.5206 13.3252 17.5002H6.67516C6.25358 17.5206 5.84098 17.3737 5.52725 17.0913C5.21352 16.809 5.02407 16.4141 5.00016 15.9927V6.66683C5.00016 6.44582 4.91237 6.23385 4.75608 6.07757C4.5998 5.92129 4.38784 5.8335 4.16683 5.8335C3.94582 5.8335 3.73385 5.92129 3.57757 6.07757C3.42129 6.23385 3.3335 6.44582 3.3335 6.66683V15.9927C3.35728 16.8562 3.72231 17.6751 4.34865 18.27C4.97498 18.865 5.81156 19.1874 6.67516 19.1668H13.3252C14.1888 19.1874 15.0253 18.865 15.6517 18.27C16.278 17.6751 16.643 16.8562 16.6668 15.9927V6.66683C16.6668 6.44582 16.579 6.23385 16.4228 6.07757C16.2665 5.92129 16.0545 5.8335 15.8335 5.8335Z"
                              fill="white"
                            />
                            <path
                              d="M16.6667 3.3335H13.3333V1.66683C13.3333 1.44582 13.2455 1.23385 13.0893 1.07757C12.933 0.921293 12.721 0.833496 12.5 0.833496H7.5C7.27899 0.833496 7.06702 0.921293 6.91074 1.07757C6.75446 1.23385 6.66667 1.44582 6.66667 1.66683V3.3335H3.33333C3.11232 3.3335 2.90036 3.42129 2.74408 3.57757C2.5878 3.73385 2.5 3.94582 2.5 4.16683C2.5 4.38784 2.5878 4.5998 2.74408 4.75609C2.90036 4.91237 3.11232 5.00016 3.33333 5.00016H16.6667C16.8877 5.00016 17.0996 4.91237 17.2559 4.75609C17.4122 4.5998 17.5 4.38784 17.5 4.16683C17.5 3.94582 17.4122 3.73385 17.2559 3.57757C17.0996 3.42129 16.8877 3.3335 16.6667 3.3335ZM8.33333 3.3335V2.50016H11.6667V3.3335H8.33333Z"
                              fill="white"
                            />
                            <path
                              d="M9.16667 14.1667V8.33333C9.16667 8.11232 9.07887 7.90036 8.92259 7.74408C8.76631 7.5878 8.55435 7.5 8.33333 7.5C8.11232 7.5 7.90036 7.5878 7.74408 7.74408C7.5878 7.90036 7.5 8.11232 7.5 8.33333V14.1667C7.5 14.3877 7.5878 14.5996 7.74408 14.7559C7.90036 14.9122 8.11232 15 8.33333 15C8.55435 15 8.76631 14.9122 8.92259 14.7559C9.07887 14.5996 9.16667 14.3877 9.16667 14.1667Z"
                              fill="white"
                            />
                            <path
                              d="M12.5002 14.1667V8.33333C12.5002 8.11232 12.4124 7.90036 12.2561 7.74408C12.0998 7.5878 11.8878 7.5 11.6668 7.5C11.4458 7.5 11.2339 7.5878 11.0776 7.74408C10.9213 7.90036 10.8335 8.11232 10.8335 8.33333V14.1667C10.8335 14.3877 10.9213 14.5996 11.0776 14.7559C11.2339 14.9122 11.4458 15 11.6668 15C11.8878 15 12.0998 14.9122 12.2561 14.7559C12.4124 14.5996 12.5002 14.3877 12.5002 14.1667Z"
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

    <!-- Add Person Modal -->
    <div
      *ngIf="showAddPersonModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      (click)="closeAddPersonModal()"
    >
      <div
        class="bg-white rounded shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        (click)="$event.stopPropagation()"
      >
        <div class="p-9 border border-[#E9E9E9] rounded bg-white">
          <h2 class="text-[22px] font-medium text-[#212529] mb-12">
            Invite Event Manager
          </h2>

          <form (ngSubmit)="onSubmit()" #addPersonForm="ngForm">
            <!-- First Name & Last Name Row -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <!-- First Name -->
              <div>
                <label
                  for="firstName"
                  class="block text-base font-medium text-[#212529] mb-2"
                  >First Name</label
                >
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  [(ngModel)]="newManager.firstName"
                  required
                  placeholder="Enter First Name"
                  class="w-full h-[50px] px-5 border-2 border-[#E9EBEC] rounded text-base font-medium text-[#434349] placeholder-[#434349] focus:outline-none focus:border-primary-blue"
                />
              </div>

              <!-- Last Name -->
              <div>
                <label
                  for="lastName"
                  class="block text-base font-medium text-[#212529] mb-2"
                  >Last Name</label
                >
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  [(ngModel)]="newManager.lastName"
                  required
                  placeholder="Enter Last Name"
                  class="w-full h-[50px] px-5 border-2 border-[#E9EBEC] rounded text-base font-medium text-[#434349] placeholder-[#434349] focus:outline-none focus:border-primary-blue"
                />
              </div>
            </div>

            <!-- Email & Phone Row -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <!-- Email -->
              <div>
                <label
                  for="email"
                  class="block text-base font-medium text-[#212529] mb-2"
                  >Email</label
                >
                <input
                  type="email"
                  id="email"
                  name="email"
                  [(ngModel)]="newManager.email"
                  required
                  placeholder="Enter Email ID"
                  class="w-full h-[50px] px-5 border-2 border-[#E9EBEC] rounded text-base font-medium text-[#434349] placeholder-[#434349] focus:outline-none focus:border-primary-blue"
                />
              </div>

              <!-- Phone -->
              <div>
                <label
                  for="phone"
                  class="block text-base font-medium text-[#212529] mb-2"
                  >Phone</label
                >
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  [(ngModel)]="newManager.phone"
                  required
                  placeholder="Enter Phone Number"
                  class="w-full h-[50px] px-5 border-2 border-[#E9EBEC] rounded text-base font-medium text-[#434349] placeholder-[#434349] focus:outline-none focus:border-primary-blue"
                />
              </div>
            </div>

            <!-- Event Dropdown Section -->
            <div class="mb-8">
              <label
                for="event"
                class="block text-base font-medium text-[#212529] mb-2"
                >Event</label
              >

              <!-- Dropdown Header -->
              <div
                class="relative w-full h-[50px] px-5 border-2 border-[#E9EBEC] rounded-t flex items-center justify-between cursor-pointer bg-white"
                (click)="showEventDropdown = !showEventDropdown"
              >
                <span class="text-base font-medium text-[#434349]"
                  >Select Event</span
                >
                <svg
                  class="w-[9px] h-[5px] transition-transform"
                  [class.rotate-180]="showEventDropdown"
                  width="10"
                  height="6"
                  viewBox="0 0 10 6"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.19518 0.193555C8.45553 -0.0648114 8.87764 -0.0648114 9.13799 0.193555C9.39834 0.451921 9.39834 0.870815 9.13799 1.12918L5.13799 5.09871C4.8856 5.34917 4.47921 5.35793 4.2161 5.11858L0.216102 1.47985C-0.0553106 1.23295 -0.073645 0.814455 0.17515 0.545111C0.423944 0.275766 0.845656 0.25757 1.11707 0.504469L4.64654 3.71516L8.19518 0.193555Z"
                    fill="#434349"
                  />
                </svg>
              </div>

              <!-- Dropdown Content -->
              <div
                *ngIf="showEventDropdown"
                class="w-full border-2 border-t-0 border-[#E9EBEC] rounded-b bg-white p-5 space-y-5"
              >
                <div
                  *ngFor="let option of eventOptions"
                  class="flex items-center gap-3"
                >
                  <div class="relative flex items-center">
                    <input
                      type="checkbox"
                      [id]="option.id"
                      [(ngModel)]="option.checked"
                      [name]="option.id"
                      class="appearance-none w-5 h-5 border-2 border-[#BFC3C5] rounded cursor-pointer checked:bg-[#009FD8] checked:border-[#009FD8] transition-all"
                    />
                    <svg
                      *ngIf="option.checked"
                      class="absolute left-0.5 top-0.5 w-3.5 h-3.5 pointer-events-none"
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M12.0248 3.29524C12.2697 3.50957 12.292 3.88296 12.0741 4.12477L5.94098 10.9321C5.72198 11.1752 5.34595 11.1907 5.10773 10.9664L1.55871 7.62534C1.33738 7.41698 1.3162 7.06978 1.50609 6.83242C1.71562 6.5705 2.10582 6.53445 2.35519 6.75874L5.10875 9.23552C5.34805 9.45077 5.71646 9.43152 5.93206 9.19253L11.2074 3.3435C11.4209 3.1068 11.7849 3.08535 12.0248 3.29524Z"
                        fill="white"
                      />
                    </svg>
                  </div>
                  <label
                    [for]="option.id"
                    class="text-base font-normal text-black cursor-pointer select-none"
                    >{{ option.label }}</label
                  >
                </div>
              </div>
            </div>

            <!-- Cancel & Send Buttons -->
            <div class="flex justify-end gap-4">
              <button
                type="button"
                (click)="closeAddPersonModal()"
                class="h-9 px-8 border-2 border-gray-300 text-gray-700 text-base font-semibold rounded hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                [disabled]="!addPersonForm.valid"
                class="h-9 px-8 bg-[#009FD8] hover:bg-[#0385b5] text-white text-base font-semibold rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class EventManagersComponent implements OnInit {
  sidebarOpen = true;
  searchQuery = "";
  eventManagers: EventManagerData[] = [];
  showAddPersonModal = false;
  isEditMode = false;
  editingManagerId: string | null = null;

  newManager = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    selectedEvents: [] as string[],
  };

  eventOptions = [
    { id: "event1", label: "Lorem Ipsum is simply dummy text", checked: true },
    { id: "event2", label: "Lorem Ipsum is simply dummy text", checked: false },
    { id: "event3", label: "Lorem Ipsum is simply dummy text", checked: false },
  ];

  showEventDropdown = false;

  constructor(
    private router: Router,
    private eventManagerService: EventManagerService,
  ) {}

  ngOnInit() {
    this.loadEventManagers();
    this.eventManagerService.eventManagers$.subscribe((managers) => {
      this.eventManagers = managers;
    });
  }

  loadEventManagers() {
    this.eventManagers = this.eventManagerService.getEventManagers();
  }

  get filteredEventManagers(): EventManagerData[] {
    if (!this.searchQuery) {
      return this.eventManagers;
    }
    const query = this.searchQuery.toLowerCase();
    return this.eventManagers.filter(
      (manager) =>
        manager.name.toLowerCase().includes(query) ||
        manager.email.toLowerCase().includes(query) ||
        manager.phone.includes(query),
    );
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  openAddPersonModal() {
    this.showAddPersonModal = true;
    this.isEditMode = false;
    this.editingManagerId = null;
    this.showEventDropdown = false;
    this.resetForm();
  }

  editEventManager(manager: EventManagerData) {
    this.isEditMode = true;
    this.editingManagerId = manager.id;
    const nameParts = manager.name.split(" ");
    this.newManager = {
      firstName: nameParts[0] || "",
      lastName: nameParts.slice(1).join(" ") || "",
      email: manager.email,
      phone: manager.phone,
      selectedEvents: [],
    };
    this.showEventDropdown = false;
    this.showAddPersonModal = true;
  }

  closeAddPersonModal() {
    this.showAddPersonModal = false;
    this.showEventDropdown = false;
    this.resetForm();
  }

  resetForm() {
    this.newManager = {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      selectedEvents: [],
    };
    this.eventOptions.forEach((option) => (option.checked = false));
    this.eventOptions[0].checked = true;
    this.showEventDropdown = false;
    this.isEditMode = false;
    this.editingManagerId = null;
  }

  onSubmit() {
    if (
      this.newManager.firstName &&
      this.newManager.lastName &&
      this.newManager.email &&
      this.newManager.phone
    ) {
      const fullName = `${this.newManager.firstName} ${this.newManager.lastName}`;
      const selectedEventIds = this.eventOptions
        .filter((option) => option.checked)
        .map((option) => option.id);

      if (this.isEditMode && this.editingManagerId) {
        this.eventManagerService.updateEventManager(this.editingManagerId, {
          name: fullName,
          email: this.newManager.email,
          phone: this.newManager.phone,
        });
      } else {
        this.eventManagerService.addEventManager({
          name: fullName,
          email: this.newManager.email,
          phone: this.newManager.phone,
        });
      }
      this.closeAddPersonModal();
    }
  }

  deleteEventManager(id: string) {
    if (confirm("Are you sure you want to delete this event manager?")) {
      this.eventManagerService.deleteEventManager(id);
    }
  }

  navigateToManageUser() {
    this.router.navigate(["/manage-user"]);
  }

  onLogout() {
    this.router.navigate(["/"]);
  }
}
