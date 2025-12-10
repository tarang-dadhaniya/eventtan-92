import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { EnhancedSidebarComponent } from "../components/enhanced-sidebar";

interface Testimonial {
  id: string;
  srNo: number;
  name: string;
  company: string;
  designation: string;
  testimonialsFor: string[];
}

@Component({
  selector: "app-testimonials",
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
                Testimonials
              </h1>
            </div>
          </div>
        </header>

        <!-- Content Area -->
        <div class="flex-1 overflow-auto p-4 lg:p-8">
          <div
            class="bg-white rounded border border-[#CED4DA] overflow-hidden max-w-full mx-auto"
          >
            <!-- Table Header with Search & Add Button -->
            <div
              class="bg-white border-b border-[#CED4DA] p-4 lg:p-8 flex flex-col lg:flex-row gap-4 lg:justify-between lg:items-center"
            >
              <!-- Title -->
              <h2 class="text-[20px] font-medium text-[#686868]">
                Testimonials
              </h2>

              <!-- Search Box & Add Button Container -->
              <div class="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center">
                <!-- Search Box -->
                <div class="relative w-full lg:w-[328px]">
                  <input
                    type="text"
                    [(ngModel)]="searchQuery"
                    placeholder="Search"
                    class="w-full h-12 px-5 pr-12 rounded border border-[#DADADA] bg-white text-base placeholder-[#878A99] focus:outline-none focus:border-primary-blue"
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

                <!-- Add Testimonials Button -->
                <button
                  (click)="openAddTestimonialModal()"
                  class="h-12 px-6 bg-primary-blue hover:bg-[#0385b5] text-white font-bold rounded transition-colors whitespace-nowrap flex items-center justify-center gap-2"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 5V19"
                      stroke="white"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M5 12H19"
                      stroke="white"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <span class="hidden sm:inline">Add Testimonials</span>
                </button>
              </div>
            </div>

            <!-- Table Header Row -->
            <div
              class="hidden lg:grid grid-cols-12 gap-4 bg-white border-b border-[#CED4DA] px-8 py-6"
            >
              <div class="col-span-1 text-center text-[#181C32] font-semibold text-base">
                Sr. No
              </div>
              <div class="col-span-2 text-left text-[#181C32] font-semibold text-base">
                Name
              </div>
              <div class="col-span-2 text-left text-[#181C32] font-semibold text-base">
                Company
              </div>
              <div class="col-span-2 text-left text-[#181C32] font-semibold text-base">
                Designation
              </div>
              <div class="col-span-3 text-left text-[#181C32] font-semibold text-base">
                Testimonials For
              </div>
              <div class="col-span-2 text-center text-[#181C32] font-semibold text-base">
                Action
              </div>
            </div>

            <!-- Table Body / Empty State -->
            <div
              *ngIf="filteredTestimonials.length === 0"
              class="text-center py-20 text-[#5E6278]"
            >
              <p>No testimonials found. Click "Add Testimonials" to create one.</p>
            </div>

            <!-- Table Rows -->
            <div *ngIf="filteredTestimonials.length > 0">
              <!-- Desktop View -->
              <div class="hidden lg:contents">
                <div
                  *ngFor="let testimonial of filteredTestimonials; let i = index"
                  class="grid grid-cols-12 gap-4 bg-white border-b border-[#E9EBEC] px-8 py-4 hover:bg-gray-50 transition-colors items-center"
                >
                  <div class="col-span-1 text-center text-[#353846] font-semibold text-base">
                    {{ i + 1 }}
                  </div>
                  <div class="col-span-2 text-left text-[#353846] font-semibold text-base">
                    {{ testimonial.name }}
                  </div>
                  <div class="col-span-2 text-left text-[#353846] font-semibold text-base">
                    {{ testimonial.company }}
                  </div>
                  <div class="col-span-2 text-left text-[#353846] font-semibold text-base">
                    {{ testimonial.designation }}
                  </div>
                  <div class="col-span-3 text-left text-[#353846] font-semibold text-base">
                    <div class="flex gap-2 flex-wrap">
                      <svg
                        *ngIf="testimonial.testimonialsFor.includes('mobile')"
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M13.0156 1.83325H10.8156C10.5117 1.83325 10.2656 2.07929 10.2656 2.38325C10.2656 2.68721 10.5117 2.93325 10.8156 2.93325H13.0156C13.3196 2.93325 13.5656 2.68721 13.5656 2.38325C13.5656 2.07929 13.3196 1.83325 13.0156 1.83325Z"
                          fill="black"
                        />
                        <path
                          d="M15.3984 0H6.59844C5.38552 0 4.39844 0.987078 4.39844 2.2V19.8C4.39844 21.0129 5.38552 22 6.59844 22H15.3984C16.6114 22 17.5984 21.0129 17.5984 19.8V2.2C17.5984 0.987078 16.6114 0 15.3984 0ZM16.4984 19.8C16.4984 20.4076 16.006 20.9 15.3984 20.9H6.59844C5.99086 20.9 5.49844 20.4076 5.49844 19.8V2.2C5.49844 1.59242 5.99086 1.1 6.59844 1.1H15.3984C16.006 1.1 16.4984 1.59242 16.4984 2.2V19.8Z"
                          fill="black"
                        />
                        <path
                          d="M10.9984 20.1666C11.606 20.1666 12.0984 19.6741 12.0984 19.0666C12.0984 18.459 11.606 17.9666 10.9984 17.9666C10.3909 17.9666 9.89844 18.459 9.89844 19.0666C9.89844 19.6741 10.3909 20.1666 10.9984 20.1666Z"
                          fill="black"
                        />
                        <path
                          d="M8.98359 2.93325C9.28735 2.93325 9.53359 2.68701 9.53359 2.38325C9.53359 2.0795 9.28735 1.83325 8.98359 1.83325C8.67984 1.83325 8.43359 2.0795 8.43359 2.38325C8.43359 2.68701 8.67984 2.93325 8.98359 2.93325Z"
                          fill="black"
                        />
                      </svg>
                      <svg
                        *ngIf="testimonial.testimonialsFor.includes('desktop')"
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M21.5417 15.5834H20.1667V5.5001C20.1667 4.489 19.3444 3.66675 18.3333 3.66675H3.66665C2.65555 3.66675 1.8333 4.48896 1.8333 5.5001V15.5834H0.458305C0.205004 15.5834 0 15.7884 0 16.0417V16.5001C0 17.5112 0.822207 18.3334 1.83335 18.3334H20.1667C21.1778 18.3334 22 17.5112 22 16.5001V16.0417C22 15.7884 21.795 15.5834 21.5417 15.5834ZM2.75 5.5001C2.75 4.99478 3.16134 4.58344 3.66665 4.58344H18.3333C18.8386 4.58344 19.25 4.99478 19.25 5.5001V15.5834H13.2917H8.70835H2.75V5.5001ZM20.1667 17.4167H1.83335C1.32804 17.4167 0.916695 17.0054 0.916695 16.5001H2.2917H8.51855L8.84263 16.8242C8.92856 16.9101 9.04492 16.9584 9.1667 16.9584H12.8333C12.9551 16.9584 13.0715 16.9101 13.1574 16.8242L13.4814 16.5001H19.7083H21.0833C21.0833 17.0054 20.672 17.4167 20.1667 17.4167Z"
                          fill="black"
                        />
                      </svg>
                    </div>
                  </div>
                  <div class="col-span-2 text-center">
                    <div class="flex justify-center gap-2">
                      <button
                        (click)="editTestimonial(testimonial)"
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
                        (click)="deleteTestimonial(testimonial.id)"
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
                  </div>
                </div>
              </div>

              <!-- Mobile View -->
              <div class="lg:hidden space-y-4">
                <div
                  *ngFor="let testimonial of filteredTestimonials; let i = index"
                  class="bg-white border border-[#E9EBEC] rounded p-4"
                >
                  <div class="space-y-3">
                    <div class="flex justify-between items-start">
                      <span class="text-sm text-[#5E6278] font-medium">Sr. No</span>
                      <span class="text-sm font-semibold text-[#353846]">{{ i + 1 }}</span>
                    </div>
                    <div class="flex justify-between items-start">
                      <span class="text-sm text-[#5E6278] font-medium">Name</span>
                      <span class="text-sm font-semibold text-[#353846]">{{ testimonial.name }}</span>
                    </div>
                    <div class="flex justify-between items-start">
                      <span class="text-sm text-[#5E6278] font-medium">Company</span>
                      <span class="text-sm font-semibold text-[#353846]">{{ testimonial.company }}</span>
                    </div>
                    <div class="flex justify-between items-start">
                      <span class="text-sm text-[#5E6278] font-medium">Designation</span>
                      <span class="text-sm font-semibold text-[#353846]">{{ testimonial.designation }}</span>
                    </div>
                    <div class="flex justify-between items-start">
                      <span class="text-sm text-[#5E6278] font-medium">Testimonials For</span>
                      <div class="flex gap-2">
                        <svg
                          *ngIf="testimonial.testimonialsFor.includes('mobile')"
                          width="16"
                          height="16"
                          viewBox="0 0 22 22"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M13.0156 1.83325H10.8156C10.5117 1.83325 10.2656 2.07929 10.2656 2.38325C10.2656 2.68721 10.5117 2.93325 10.8156 2.93325H13.0156C13.3196 2.93325 13.5656 2.68721 13.5656 2.38325C13.5656 2.07929 13.3196 1.83325 13.0156 1.83325Z"
                            fill="black"
                          />
                          <path
                            d="M15.3984 0H6.59844C5.38552 0 4.39844 0.987078 4.39844 2.2V19.8C4.39844 21.0129 5.38552 22 6.59844 22H15.3984C16.6114 22 17.5984 21.0129 17.5984 19.8V2.2C17.5984 0.987078 16.6114 0 15.3984 0ZM16.4984 19.8C16.4984 20.4076 16.006 20.9 15.3984 20.9H6.59844C5.99086 20.9 5.49844 20.4076 5.49844 19.8V2.2C5.49844 1.59242 5.99086 1.1 6.59844 1.1H15.3984C16.006 1.1 16.4984 1.59242 16.4984 2.2V19.8Z"
                            fill="black"
                          />
                          <path
                            d="M10.9984 20.1666C11.606 20.1666 12.0984 19.6741 12.0984 19.0666C12.0984 18.459 11.606 17.9666 10.9984 17.9666C10.3909 17.9666 9.89844 18.459 9.89844 19.0666C9.89844 19.6741 10.3909 20.1666 10.9984 20.1666Z"
                            fill="black"
                          />
                          <path
                            d="M8.98359 2.93325C9.28735 2.93325 9.53359 2.68701 9.53359 2.38325C9.53359 2.0795 9.28735 1.83325 8.98359 1.83325C8.67984 1.83325 8.43359 2.0795 8.43359 2.38325C8.43359 2.68701 8.67984 2.93325 8.98359 2.93325Z"
                            fill="black"
                          />
                        </svg>
                        <svg
                          *ngIf="testimonial.testimonialsFor.includes('desktop')"
                          width="16"
                          height="16"
                          viewBox="0 0 22 22"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M21.5417 15.5834H20.1667V5.5001C20.1667 4.489 19.3444 3.66675 18.3333 3.66675H3.66665C2.65555 3.66675 1.8333 4.48896 1.8333 5.5001V15.5834H0.458305C0.205004 15.5834 0 15.7884 0 16.0417V16.5001C0 17.5112 0.822207 18.3334 1.83335 18.3334H20.1667C21.1778 18.3334 22 17.5112 22 16.5001V16.0417C22 15.7884 21.795 15.5834 21.5417 15.5834ZM2.75 5.5001C2.75 4.99478 3.16134 4.58344 3.66665 4.58344H18.3333C18.8386 4.58344 19.25 4.99478 19.25 5.5001V15.5834H13.2917H8.70835H2.75V5.5001ZM20.1667 17.4167H1.83335C1.32804 17.4167 0.916695 17.0054 0.916695 16.5001H2.2917H8.51855L8.84263 16.8242C8.92856 16.9101 9.04492 16.9584 9.1667 16.9584H12.8333C12.9551 16.9584 13.0715 16.9101 13.1574 16.8242L13.4814 16.5001H19.7083H21.0833C21.0833 17.0054 20.672 17.4167 20.1667 17.4167Z"
                            fill="black"
                          />
                        </svg>
                      </div>
                    </div>
                    <div class="flex justify-end gap-2 pt-2 border-t border-[#E9EBEC]">
                      <button
                        (click)="editTestimonial(testimonial)"
                        class="flex-1 h-8 rounded-full bg-primary-blue hover:bg-[#0385b5] flex items-center justify-center transition-colors"
                      >
                        <svg
                          width="16"
                          height="16"
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
                        (click)="deleteTestimonial(testimonial.id)"
                        class="flex-1 h-8 rounded-full bg-[#BF0505] hover:bg-red-700 flex items-center justify-center transition-colors"
                      >
                        <svg
                          width="16"
                          height="16"
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  `,
  styles: [],
})
export class TestimonialsComponent implements OnInit {
  sidebarOpen = true;
  searchQuery = "";
  testimonials: Testimonial[] = [];
  showAddModal = false;
  isEditMode = false;
  editingId: string | null = null;

  newTestimonial = {
    name: "",
    company: "",
    designation: "",
    testimonialsFor: [] as string[],
  };

  constructor(private router: Router) {}

  ngOnInit() {
    this.loadTestimonials();
  }

  loadTestimonials() {
    this.testimonials = [];
  }

  get filteredTestimonials(): Testimonial[] {
    if (!this.searchQuery) {
      return this.testimonials;
    }
    const query = this.searchQuery.toLowerCase();
    return this.testimonials.filter(
      (testimonial) =>
        testimonial.name.toLowerCase().includes(query) ||
        testimonial.company.toLowerCase().includes(query) ||
        testimonial.designation.toLowerCase().includes(query)
    );
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  openAddTestimonialModal() {
    this.showAddModal = true;
    this.isEditMode = false;
    this.editingId = null;
    this.resetForm();
  }

  editTestimonial(testimonial: Testimonial) {
    this.isEditMode = true;
    this.editingId = testimonial.id;
    this.newTestimonial = {
      name: testimonial.name,
      company: testimonial.company,
      designation: testimonial.designation,
      testimonialsFor: [...testimonial.testimonialsFor],
    };
    this.showAddModal = true;
  }

  closeAddModal() {
    this.showAddModal = false;
    this.resetForm();
  }

  resetForm() {
    this.newTestimonial = {
      name: "",
      company: "",
      designation: "",
      testimonialsFor: [],
    };
    this.isEditMode = false;
    this.editingId = null;
  }

  deleteTestimonial(id: string) {
    if (confirm("Are you sure you want to delete this testimonial?")) {
      this.testimonials = this.testimonials.filter((t) => t.id !== id);
    }
  }

  onLogout() {
    this.router.navigate(["/"]);
  }
}
