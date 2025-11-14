import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { OrganizationService } from "../services/organization.service";
import { EnhancedSidebarComponent } from "../components/enhanced-sidebar";

interface CreateOrganizationForm {
  logoFile: File | null;
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
  };
}

@Component({
  selector: "app-create-organization",
  standalone: true,
  imports: [CommonModule, FormsModule, EnhancedSidebarComponent],
  template: `
    <div class="flex h-screen overflow-hidden bg-main-bg">
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
                Create Organization
              </h1>
            </div>
          </div>
        </header>

        <!-- Form Content -->
        <div class="flex-1 overflow-auto p-4 lg:p-8">
          <form (ngSubmit)="onSave()" class="space-y-5">
            <!-- Main Details Section -->
            <div class="bg-white rounded border border-[#E9E9E9] p-6 lg:p-8">
              <!-- Logo and Organization Details Layout -->
              <div class="flex flex-col lg:flex-row gap-8 mb-8">
                <!-- Logo Upload - Left -->
                <div class="flex-shrink-0">
                  <label class="block text-[#212529] font-medium text-base mb-4"
                    >Add Application Logo</label
                  >
                  <div
                    class="relative w-[120px] h-[120px] rounded-full border-2 border-[#8B8B8B] overflow-hidden bg-gray-100 cursor-pointer group hover:bg-gray-200 transition-colors"
                    (click)="fileInput.click()"
                  >
                    <img
                      *ngIf="logoPreview"
                      [src]="logoPreview"
                      alt="Logo preview"
                      class="w-full h-full object-cover"
                    />
                    <div
                      *ngIf="!logoPreview"
                      class="w-full h-full flex items-center justify-center"
                    >
                      <svg
                        width="40"
                        height="40"
                        viewBox="0 0 40 40"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M20 5C19.3096 5 18.75 5.55964 18.75 6.25V18.75H6.25C5.55964 18.75 5 19.3096 5 20C5 20.6904 5.55964 21.25 6.25 21.25H18.75V33.75C18.75 34.4404 19.3096 35 20 35C20.6904 35 21.25 34.4404 21.25 33.75V21.25H33.75C34.4404 21.25 35 20.6904 35 20C35 19.3096 34.4404 18.75 33.75 18.75H21.25V6.25C21.25 5.55964 20.6904 5 20 5Z"
                          fill="#8B8B8B"
                        />
                      </svg>
                    </div>
                    <div
                      class="absolute bottom-0 right-0 w-6 h-6 bg-primary-blue rounded-full flex items-center justify-center"
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8.97656 3.16992L10.8301 5.02344M9.91992 2.22656C10.3223 1.82422 10.9707 1.82422 11.373 2.22656C11.7754 2.62891 11.7754 3.27734 11.373 3.67969L4.66211 10.3906L2 11.0625L2.67188 8.40039L9.91992 2.22656Z"
                          stroke="white"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                  <input
                    #fileInput
                    type="file"
                    accept="image/*"
                    class="hidden"
                    (change)="onFileSelected($event)"
                  />
                </div>

                <!-- Organization Details - Right -->
                <div class="flex-1">
                  <!-- Organization Name & Website -->
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label
                        class="block text-[#212529] font-medium text-base mb-2"
                        >Organization Name<span class="text-red-600"
                          >*</span
                        ></label
                      >
                      <input
                        type="text"
                        [(ngModel)]="formData.organizationName"
                        name="organizationName"
                        required
                        placeholder="Enter Organization Name"
                        class="w-full h-[50px] px-5 rounded border-2 border-[#E9EBEC] text-[#434349] placeholder-[#434349] focus:outline-none focus:border-primary-blue"
                      />
                    </div>
                    <div>
                      <label
                        class="block text-[#212529] font-medium text-base mb-2"
                        >Website</label
                      >
                      <input
                        type="url"
                        [(ngModel)]="formData.website"
                        name="website"
                        placeholder="Enter Website Link"
                        class="w-full h-[50px] px-5 rounded border-2 border-[#E9EBEC] text-[#434349] placeholder-[#434349] focus:outline-none focus:border-primary-blue"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <!-- Registration Options & Allowed Functionality -->
              <div
                class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 pl-0 lg:pl-[160px]"
              >
                <div>
                  <label class="block text-[#212529] font-medium text-base mb-2"
                    >Registration Option</label
                  >
                  <div class="flex flex-wrap gap-6">
                    <label class="flex items-center gap-2 cursor-pointer">
                      <div class="relative">
                        <input
                          type="checkbox"
                          [(ngModel)]="
                            formData.registrationOptions.requireRegistration
                          "
                          name="requireRegistration"
                          class="sr-only peer"
                        />
                        <div
                          class="w-5 h-5 rounded border-2 border-[#BFC3C5] peer-checked:bg-primary-blue peer-checked:border-primary-blue flex items-center justify-center"
                        >
                          <svg
                            class="hidden peer-checked:block w-3.5 h-3.5"
                            viewBox="0 0 14 14"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M12.0246 3.295C12.2695 3.50933 12.2917 3.88271 12.0738 4.12452L5.94074 10.9319C5.72173 11.175 5.3457 11.1904 5.10749 10.9662L1.55847 7.6251C1.33714 7.41673 1.31595 7.06953 1.50585 6.83217C1.71538 6.57026 2.10558 6.53421 2.35495 6.7585L5.10851 9.23527C5.3478 9.45052 5.71622 9.43127 5.93181 9.19228L11.2072 3.34325C11.4206 3.10656 11.7847 3.0851 12.0246 3.295Z"
                              fill="white"
                            />
                          </svg>
                        </div>
                      </div>
                      <span class="text-[#212529] font-medium text-base"
                        >Require Registration</span
                      >
                    </label>
                    <label class="flex items-center gap-2 cursor-pointer">
                      <div class="relative">
                        <input
                          type="checkbox"
                          [(ngModel)]="
                            formData.registrationOptions.enableFBRegistration
                          "
                          name="enableFBRegistration"
                          class="sr-only peer"
                        />
                        <div
                          class="w-5 h-5 rounded border-2 border-[#BFC3C5] peer-checked:bg-primary-blue peer-checked:border-primary-blue flex items-center justify-center"
                        >
                          <svg
                            class="hidden peer-checked:block w-3.5 h-3.5"
                            viewBox="0 0 14 14"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M12.0246 3.295C12.2695 3.50933 12.2917 3.88271 12.0738 4.12452L5.94074 10.9319C5.72173 11.175 5.3457 11.1904 5.10749 10.9662L1.55847 7.6251C1.33714 7.41673 1.31595 7.06953 1.50585 6.83217C1.71538 6.57026 2.10558 6.53421 2.35495 6.7585L5.10851 9.23527C5.3478 9.45052 5.71622 9.43127 5.93181 9.19228L11.2072 3.34325C11.4206 3.10656 11.7847 3.0851 12.0246 3.295Z"
                              fill="white"
                            />
                          </svg>
                        </div>
                      </div>
                      <span class="text-[#212529] font-medium text-base"
                        >Enable FB Registration</span
                      >
                    </label>
                    <label class="flex items-center gap-2 cursor-pointer">
                      <div class="relative">
                        <input
                          type="checkbox"
                          [(ngModel)]="
                            formData.registrationOptions
                              .enableGoogleRegistration
                          "
                          name="enableGoogleRegistration"
                          class="sr-only peer"
                        />
                        <div
                          class="w-5 h-5 rounded border-2 border-[#BFC3C5] peer-checked:bg-primary-blue peer-checked:border-primary-blue flex items-center justify-center"
                        >
                          <svg
                            class="hidden peer-checked:block w-3.5 h-3.5"
                            viewBox="0 0 14 14"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M12.0246 3.295C12.2695 3.50933 12.2917 3.88271 12.0738 4.12452L5.94074 10.9319C5.72173 11.175 5.3457 11.1904 5.10749 10.9662L1.55847 7.6251C1.33714 7.41673 1.31595 7.06953 1.50585 6.83217C1.71538 6.57026 2.10558 6.53421 2.35495 6.7585L5.10851 9.23527C5.3478 9.45052 5.71622 9.43127 5.93181 9.19228L11.2072 3.34325C11.4206 3.10656 11.7847 3.0851 12.0246 3.295Z"
                              fill="white"
                            />
                          </svg>
                        </div>
                      </div>
                      <span class="text-[#212529] font-medium text-base"
                        >Enable Google Registration</span
                      >
                    </label>
                  </div>
                </div>
                <div>
                  <label class="block text-[#212529] font-medium text-base mb-2"
                    >Allowed functionality</label
                  >
                  <div class="flex flex-wrap gap-6">
                    <label class="flex items-center gap-2 cursor-pointer">
                      <div class="relative">
                        <input
                          type="checkbox"
                          [(ngModel)]="
                            formData.allowedFunctionality.enableActivityFeed
                          "
                          name="enableActivityFeed"
                          class="sr-only peer"
                        />
                        <div
                          class="w-5 h-5 rounded border-2 border-[#BFC3C5] peer-checked:bg-primary-blue peer-checked:border-primary-blue flex items-center justify-center"
                        >
                          <svg
                            class="hidden peer-checked:block w-3.5 h-3.5"
                            viewBox="0 0 14 14"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M12.0246 3.295C12.2695 3.50933 12.2917 3.88271 12.0738 4.12452L5.94074 10.9319C5.72173 11.175 5.3457 11.1904 5.10749 10.9662L1.55847 7.6251C1.33714 7.41673 1.31595 7.06953 1.50585 6.83217C1.71538 6.57026 2.10558 6.53421 2.35495 6.7585L5.10851 9.23527C5.3478 9.45052 5.71622 9.43127 5.93181 9.19228L11.2072 3.34325C11.4206 3.10656 11.7847 3.0851 12.0246 3.295Z"
                              fill="white"
                            />
                          </svg>
                        </div>
                      </div>
                      <span class="text-[#212529] font-medium text-base"
                        >Enable Activity Feed</span
                      >
                    </label>
                    <label class="flex items-center gap-2 cursor-pointer">
                      <div class="relative">
                        <input
                          type="checkbox"
                          [(ngModel)]="
                            formData.allowedFunctionality.enableUserFollow
                          "
                          name="enableUserFollow"
                          class="sr-only peer"
                        />
                        <div
                          class="w-5 h-5 rounded border-2 border-[#BFC3C5] peer-checked:bg-primary-blue peer-checked:border-primary-blue flex items-center justify-center"
                        >
                          <svg
                            class="hidden peer-checked:block w-3.5 h-3.5"
                            viewBox="0 0 14 14"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M12.0246 3.295C12.2695 3.50933 12.2917 3.88271 12.0738 4.12452L5.94074 10.9319C5.72173 11.175 5.3457 11.1904 5.10749 10.9662L1.55847 7.6251C1.33714 7.41673 1.31595 7.06953 1.50585 6.83217C1.71538 6.57026 2.10558 6.53421 2.35495 6.7585L5.10851 9.23527C5.3478 9.45052 5.71622 9.43127 5.93181 9.19228L11.2072 3.34325C11.4206 3.10656 11.7847 3.0851 12.0246 3.295Z"
                              fill="white"
                            />
                          </svg>
                        </div>
                      </div>
                      <span class="text-[#212529] font-medium text-base"
                        >Enable User Follow</span
                      >
                    </label>
                    <label class="flex items-center gap-2 cursor-pointer">
                      <div class="relative">
                        <input
                          type="checkbox"
                          [(ngModel)]="
                            formData.allowedFunctionality.enableMultiLanguages
                          "
                          name="enableMultiLanguages"
                          class="sr-only peer"
                        />
                        <div
                          class="w-5 h-5 rounded border-2 border-[#BFC3C5] peer-checked:bg-primary-blue peer-checked:border-primary-blue flex items-center justify-center"
                        >
                          <svg
                            class="hidden peer-checked:block w-3.5 h-3.5"
                            viewBox="0 0 14 14"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M12.0246 3.295C12.2695 3.50933 12.2917 3.88271 12.0738 4.12452L5.94074 10.9319C5.72173 11.175 5.3457 11.1904 5.10749 10.9662L1.55847 7.6251C1.33714 7.41673 1.31595 7.06953 1.50585 6.83217C1.71538 6.57026 2.10558 6.53421 2.35495 6.7585L5.10851 9.23527C5.3478 9.45052 5.71622 9.43127 5.93181 9.19228L11.2072 3.34325C11.4206 3.10656 11.7847 3.0851 12.0246 3.295Z"
                              fill="white"
                            />
                          </svg>
                        </div>
                      </div>
                      <span class="text-[#212529] font-medium text-base"
                        >Enable Multi Languages</span
                      >
                    </label>
                  </div>
                </div>
              </div>

              <!-- Address, Country, State, City -->
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <label class="block text-[#212529] font-medium text-base mb-2"
                    >Address</label
                  >
                  <input
                    type="text"
                    [(ngModel)]="formData.address"
                    name="address"
                    placeholder="Enter Address"
                    class="w-full h-[50px] px-5 rounded border-2 border-[#E9EBEC] text-[#434349] placeholder-[#434349] focus:outline-none focus:border-primary-blue"
                  />
                </div>
                <div>
                  <label class="block text-[#212529] font-medium text-base mb-2"
                    >Country</label
                  >
                  <div class="relative">
                    <select
                      [(ngModel)]="formData.country"
                      name="country"
                      class="w-full h-[50px] px-5 rounded border-2 border-[#E9EBEC] text-[#434349] appearance-none focus:outline-none focus:border-primary-blue bg-white"
                    >
                      <option value="" disabled>Select Country</option>
                      <option value="USA">United States</option>
                      <option value="UK">United Kingdom</option>
                      <option value="India">India</option>
                      <option value="Canada">Canada</option>
                      <option value="Australia">Australia</option>
                    </select>
                    <svg
                      class="absolute right-5 top-1/2 -translate-y-1/2 w-2.5 h-1.5 pointer-events-none"
                      viewBox="0 0 10 6"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8.19518 0.193799C8.45553 -0.0645672 8.87764 -0.0645672 9.13799 0.193799C9.39834 0.452165 9.39834 0.871059 9.13799 1.12942L5.13799 5.09895C4.8856 5.34941 4.47921 5.35818 4.2161 5.11883L0.216102 1.4801C-0.0553106 1.2332 -0.073645 0.814699 0.17515 0.545355C0.423944 0.27601 0.845656 0.257814 1.11707 0.504713L4.64654 3.71541L8.19518 0.193799Z"
                        fill="#434349"
                      />
                    </svg>
                  </div>
                </div>
                <div>
                  <label class="block text-[#212529] font-medium text-base mb-2"
                    >State</label
                  >
                  <div class="relative">
                    <select
                      [(ngModel)]="formData.state"
                      name="state"
                      class="w-full h-[50px] px-5 rounded border-2 border-[#E9EBEC] text-[#434349] appearance-none focus:outline-none focus:border-primary-blue bg-white"
                    >
                      <option value="" disabled>Select State</option>
                      <option value="California">California</option>
                      <option value="New York">New York</option>
                      <option value="Texas">Texas</option>
                      <option value="Florida">Florida</option>
                    </select>
                    <svg
                      class="absolute right-5 top-1/2 -translate-y-1/2 w-2.5 h-1.5 pointer-events-none"
                      viewBox="0 0 10 6"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8.19518 0.193799C8.45553 -0.0645672 8.87764 -0.0645672 9.13799 0.193799C9.39834 0.452165 9.39834 0.871059 9.13799 1.12942L5.13799 5.09895C4.8856 5.34941 4.47921 5.35818 4.2161 5.11883L0.216102 1.4801C-0.0553106 1.2332 -0.073645 0.814699 0.17515 0.545355C0.423944 0.27601 0.845656 0.257814 1.11707 0.504713L4.64654 3.71541L8.19518 0.193799Z"
                        fill="#434349"
                      />
                    </svg>
                  </div>
                </div>
                <div>
                  <label class="block text-[#212529] font-medium text-base mb-2"
                    >City</label
                  >
                  <div class="relative">
                    <select
                      [(ngModel)]="formData.city"
                      name="city"
                      class="w-full h-[50px] px-5 rounded border-2 border-[#E9EBEC] text-[#434349] appearance-none focus:outline-none focus:border-primary-blue bg-white"
                    >
                      <option value="" disabled>Select City</option>
                      <option value="Los Angeles">Los Angeles</option>
                      <option value="San Francisco">San Francisco</option>
                      <option value="San Diego">San Diego</option>
                    </select>
                    <svg
                      class="absolute right-5 top-1/2 -translate-y-1/2 w-2.5 h-1.5 pointer-events-none"
                      viewBox="0 0 10 6"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8.19518 0.193799C8.45553 -0.0645672 8.87764 -0.0645672 9.13799 0.193799C9.39834 0.452165 9.39834 0.871059 9.13799 1.12942L5.13799 5.09895C4.8856 5.34941 4.47921 5.35818 4.2161 5.11883L0.216102 1.4801C-0.0553106 1.2332 -0.073645 0.814699 0.17515 0.545355C0.423944 0.27601 0.845656 0.257814 1.11707 0.504713L4.64654 3.71541L8.19518 0.193799Z"
                        fill="#434349"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <!-- Organization Details Section -->
            <div class="bg-white rounded border border-[#E9E9E9] p-6 lg:p-8">
              <h2 class="text-[#212529] font-medium text-[22px] mb-4">
                Organization Details
              </h2>
              <div class="border border-form-border rounded">
                <textarea
                  [(ngModel)]="formData.organizationDetails"
                  name="organizationDetails"
                  rows="6"
                  placeholder="Enter organization description..."
                  class="w-full p-4 text-[#686868] text-base leading-6 focus:outline-none focus:ring-2 focus:ring-primary-blue rounded"
                ></textarea>
              </div>
            </div>

            <!-- Personal Details Section -->
            <div class="bg-white rounded border border-[#E9E9E9] p-6 lg:p-8">
              <h2 class="text-[#212529] font-medium text-[22px] mb-6">
                Personal Details
              </h2>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <label class="block text-[#212529] font-medium text-base mb-2"
                    >First Name</label
                  >
                  <input
                    type="text"
                    [(ngModel)]="formData.personalDetails.firstName"
                    name="firstName"
                    placeholder="Enter First Name"
                    class="w-full h-[50px] px-5 rounded border-2 border-[#E9EBEC] text-[#434349] placeholder-[#434349] focus:outline-none focus:border-primary-blue"
                  />
                </div>
                <div>
                  <label class="block text-[#212529] font-medium text-base mb-2"
                    >Last Name</label
                  >
                  <input
                    type="text"
                    [(ngModel)]="formData.personalDetails.lastName"
                    name="lastName"
                    placeholder="Enter Last Name"
                    class="w-full h-[50px] px-5 rounded border-2 border-[#E9EBEC] text-[#434349] placeholder-[#434349] focus:outline-none focus:border-primary-blue"
                  />
                </div>
                <div>
                  <label class="block text-[#212529] font-medium text-base mb-2"
                    >Email</label
                  >
                  <input
                    type="email"
                    [(ngModel)]="formData.personalDetails.email"
                    name="email"
                    placeholder="Enter Email ID"
                    class="w-full h-[50px] px-5 rounded border-2 border-[#E9EBEC] text-[#434349] placeholder-[#434349] focus:outline-none focus:border-primary-blue"
                  />
                </div>
                <div>
                  <label class="block text-[#212529] font-medium text-base mb-2"
                    >Contact</label
                  >
                  <input
                    type="tel"
                    [(ngModel)]="formData.personalDetails.contact"
                    name="contact"
                    placeholder="Enter Contact Number"
                    class="w-full h-[50px] px-5 rounded border-2 border-[#E9EBEC] text-[#434349] placeholder-[#434349] focus:outline-none focus:border-primary-blue"
                  />
                </div>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex justify-end gap-4 py-4">
              <button
                type="button"
                (click)="onBack()"
                class="h-9 px-5 bg-[#DEE1EB] hover:bg-[#c9cdd9] text-[#4C546C] font-semibold rounded transition-colors flex items-center gap-2"
              >
                <svg
                  width="8"
                  height="13"
                  viewBox="0 0 8 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.12267 1.58149C7.48574 1.22948 7.49695 0.647619 7.14773 0.281872C6.7985 -0.0838756 6.22107 -0.0950086 5.85801 0.257005L0.279881 5.66534C-0.0720789 6.00658 -0.0949591 6.56654 0.227978 6.93559L5.1375 12.5461C5.47063 12.9268 6.04703 12.9632 6.42492 12.6274C6.80281 12.2916 6.8391 11.7108 6.50597 11.3301L2.17397 6.37956L7.12267 1.58149Z"
                    fill="#434349"
                  />
                </svg>
                Back
              </button>
              <button
                type="submit"
                class="h-9 px-5 bg-primary-blue hover:bg-[#0385b5] text-white font-semibold rounded transition-colors flex items-center gap-2"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M13.7425 3.76582C14.0224 4.01076 14.0478 4.43749 13.7988 4.71384L6.78952 12.4937C6.53923 12.7715 6.10948 12.7892 5.83723 12.5329L1.78121 8.7145C1.52827 8.47637 1.50405 8.07957 1.72107 7.8083C1.96054 7.50897 2.40648 7.46777 2.69147 7.7241L5.8384 10.5547C6.11188 10.8007 6.53293 10.7787 6.77932 10.5056L12.8083 3.82096C13.0523 3.55046 13.4683 3.52594 13.7425 3.76582Z"
                    fill="white"
                  />
                </svg>
                Save
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  `,
  styles: [],
})
export class CreateOrganizationComponent {
  sidebarOpen = true;
  logoPreview: string | null = null;

  formData: CreateOrganizationForm = {
    logoFile: null,
    organizationName: "",
    website: "",
    registrationOptions: {
      requireRegistration: true,
      enableFBRegistration: false,
      enableGoogleRegistration: false,
    },
    allowedFunctionality: {
      enableActivityFeed: true,
      enableUserFollow: false,
      enableMultiLanguages: false,
    },
    address: "",
    country: "",
    state: "",
    city: "",
    organizationDetails: "",
    personalDetails: {
      firstName: "",
      lastName: "",
      email: "",
      contact: "",
    },
  };

  constructor(
    private router: Router,
    private organizationService: OrganizationService,
  ) {}

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.formData.logoFile = file;

      const reader = new FileReader();
      reader.onload = (e) => {
        this.logoPreview = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onBack() {
    this.router.navigate(["/dashboard"]);
  }

  onLogout() {
    this.router.navigate(["/"]);
  }

  onSave() {
    if (!this.formData.organizationName) {
      alert("Please fill in the required fields (Organization Name)");
      return;
    }

    this.organizationService.addOrganization({
      logoUrl: this.logoPreview || "",
      organizationName: this.formData.organizationName,
      website: this.formData.website,
      registrationOptions: this.formData.registrationOptions,
      allowedFunctionality: this.formData.allowedFunctionality,
      address: this.formData.address,
      country: this.formData.country,
      state: this.formData.state,
      city: this.formData.city,
      organizationDetails: this.formData.organizationDetails,
      personalDetails: this.formData.personalDetails,
      publishedEvents: 0,
      upcomingEvents: [{ name: "IFEX", icon: "" }],
    });

    alert("Organization created successfully!");
    this.router.navigate(["/dashboard"]);
  }
}
