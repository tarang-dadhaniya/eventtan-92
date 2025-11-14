import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import { OrganizationService } from "../../services/organization.service";

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
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="flex h-screen overflow-hidden bg-main-bg">
      <!-- Sidebar -->
      <aside
        [class.hidden]="!sidebarOpen"
        class="w-[340px] bg-sidebar-dark border-r border-[#717171] flex flex-col fixed lg:static h-full z-50 lg:z-auto transition-transform lg:translate-x-0"
        [class.-translate-x-full]="!sidebarOpen"
      >
        <!-- Logo -->
        <div class="px-14 py-5">
          <div class="text-primary-blue text-3xl font-bold">eventtan</div>
        </div>

        <!-- Navigation -->
        <nav class="flex-1 px-2.5 mt-8">
          <a
            routerLink="/dashboard"
            class="flex items-center gap-3 h-12 px-4 rounded bg-primary-blue text-white font-medium"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                opacity="0.4"
                d="M5.60266 0.367271C6.90622 -0.122468 8.344 -0.122386 9.64758 0.367271C10.5306 0.69908 11.3328 1.35259 12.6769 2.42782L14.9689 4.26083C15.2923 4.51956 15.3448 4.99207 15.0861 5.31551C14.8273 5.63896 14.3548 5.69146 14.0314 5.4327L11.7404 3.59872C10.3111 2.45529 9.72528 1.99899 9.12024 1.77157C8.15674 1.40968 7.09348 1.4096 6.13 1.77157C5.52496 1.99902 4.93931 2.45518 3.50989 3.59872L1.21887 5.4327C0.895426 5.69146 0.422942 5.63896 0.164185 5.31551C-0.0942824 4.99208 -0.0419678 4.5195 0.281372 4.26083L2.57336 2.42782C3.91753 1.35249 4.7196 0.69912 5.60266 0.367271Z"
                fill="white"
              />
              <path
                d="M15.748 0.281395C16.0067 -0.0415339 16.4784 -0.0939334 16.8018 0.164207L17.2598 0.531395C17.6534 0.846267 17.8915 1.03525 18.1016 1.24038C19.0679 2.18466 19.6709 3.43987 19.8047 4.78432C19.8338 5.07673 19.833 5.38047 19.833 5.88491V11.2003C19.8329 14.1458 17.4455 16.5333 14.5 16.5333C13.0735 16.5332 11.9171 15.3769 11.917 13.9503V10.2833C11.9168 9.17908 11.0213 8.28352 9.91699 8.28335C8.81272 8.28353 7.91722 9.17908 7.91699 10.2833V13.9503C7.91689 15.377 6.75968 16.5333 5.33301 16.5333C2.38786 16.533 0.000105999 14.1455 0 11.2003V5.88491C-3.47768e-07 5.38049 -0.000753955 5.07672 0.0283203 4.78432C0.162093 3.43985 0.765096 2.18468 1.73145 1.24038C1.94158 1.03507 2.17939 0.846478 2.57324 0.531395L3.03125 0.164207C3.35457 -0.0944497 3.82712 -0.0417173 4.08594 0.281395C4.34469 0.604841 4.2922 1.07733 3.96875 1.33608L3.50977 1.70229C3.09226 2.0363 2.9238 2.17242 2.7793 2.31362C2.06518 3.01154 1.61939 3.93915 1.52051 4.93276C1.50052 5.13378 1.5 5.35037 1.5 5.88491V11.2003C1.50011 13.3171 3.21628 15.033 5.33301 15.0333C5.93125 15.0333 6.41689 14.5486 6.41699 13.9503V10.2833C6.41722 8.35066 7.98429 6.78353 9.91699 6.78335C11.8497 6.78352 13.4168 8.35065 13.417 10.2833V13.9503C13.4171 14.5484 13.9019 15.0332 14.5 15.0333C16.617 15.0333 18.3329 13.3173 18.333 11.2003V5.88491C18.333 5.35034 18.3325 5.13379 18.3125 4.93276C18.2136 3.93909 17.7679 3.01154 17.0537 2.31362C16.9093 2.17251 16.7406 2.03616 16.3232 1.70229L15.8652 1.33608C15.5421 1.07726 15.4894 0.604717 15.748 0.281395Z"
                fill="white"
              />
            </svg>
            <span>Dashboard</span>
          </a>
        </nav>

        <!-- User Profile & Logout -->
        <div class="p-4 flex items-center gap-4">
          <div
            class="w-10 h-10 rounded-full bg-gray-500 flex items-center justify-center text-white font-semibold"
          >
            U
          </div>
          <button
            (click)="onLogout()"
            class="flex-1 flex items-center gap-2 h-9 px-3 rounded border border-dashed border-[#757575] bg-sidebar-dark text-[#A1A5B7] hover:text-white transition-colors"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                opacity="0.4"
                d="M10.3027 0.219482C10.5955 -0.0732981 11.0704 -0.0730729 11.3633 0.219482L15.0303 3.88647C15.323 4.17938 15.3231 4.65418 15.0303 4.94702L11.3633 8.61304C11.0704 8.90578 10.5956 8.90588 10.3027 8.61304C10.0104 8.32015 10.0102 7.84523 10.3027 7.55249L12.6895 5.16675H0.75C0.336044 5.16657 0.000175416 4.8307 0 4.41675C1.32169e-05 4.00265 0.335944 3.66692 0.75 3.66675H12.6895L10.3027 1.28003C10.0103 0.987213 10.0103 0.512288 10.3027 0.219482Z"
                fill="currentColor"
              />
              <path
                d="M7.18359 0C8.29098 -1.33864e-07 9.16756 -0.000890797 9.87207 0.0566406C10.5851 0.114924 11.1893 0.236969 11.7402 0.517578C12.6337 0.972907 13.3601 1.70029 13.8154 2.59375C14.0962 3.14479 14.2181 3.74875 14.2764 4.46191C14.3339 5.16643 14.333 6.04294 14.333 7.15039V12.6836C14.333 13.791 14.3339 14.6676 14.2764 15.3721C14.2181 16.0852 14.0962 16.6892 13.8154 17.2402C13.3601 18.1337 12.6337 18.8601 11.7402 19.3154C11.1892 19.5962 10.5852 19.7181 9.87207 19.7764C9.16755 19.8339 8.29101 19.833 7.18359 19.833H5.79199C4.86161 19.833 4.28137 19.8373 3.78516 19.7344C1.93192 19.3497 0.48306 17.9012 0.0986328 16.0479C-0.00414176 15.5518 -6.66962e-07 14.972 0 14.042V13.583C0.000387448 13.1693 0.336206 12.8332 0.75 12.833C1.16397 12.833 1.49961 13.1691 1.5 13.583V14.042C1.5 15.0465 1.50374 15.4357 1.56738 15.7432C1.8304 17.0112 2.82191 18.0024 4.08984 18.2656C4.39737 18.3294 4.78673 18.333 5.79199 18.333H7.18359C8.31547 18.333 9.1198 18.3326 9.74902 18.2812C10.3693 18.2306 10.7542 18.1345 11.0586 17.9795C11.6701 17.6679 12.1679 17.1701 12.4795 16.5586C12.6345 16.2542 12.7306 15.8693 12.7812 15.249C12.8326 14.6198 12.833 13.8155 12.833 12.6836V7.15039C12.833 6.01817 12.8327 5.21328 12.7812 4.58398C12.7305 3.96365 12.6346 3.57881 12.4795 3.27441C12.1679 2.6631 11.67 2.166 11.0586 1.85449C10.7542 1.69951 10.3693 1.60244 9.74902 1.55176C9.11982 1.50041 8.31542 1.5 7.18359 1.5H5.79199C4.78672 1.5 4.39738 1.50359 4.08984 1.56738C2.82193 1.83052 1.83052 2.82193 1.56738 4.08984C1.50359 4.39738 1.5 4.78671 1.5 5.79199V6.25C1.5 6.66421 1.16421 7 0.75 7C0.335967 6.99979 -1.20023e-07 6.66408 0 6.25V5.79199C-1.38255e-06 4.86158 -0.00430153 4.28139 0.0986328 3.78516C0.483182 1.93193 1.93193 0.483182 3.78516 0.0986328C4.28139 -0.0043015 4.86158 -1.17654e-06 5.79199 0H7.18359Z"
                fill="currentColor"
              />
            </svg>
            <span class="text-sm">Logout</span>
          </button>
        </div>
      </aside>

      <!-- Overlay for mobile -->
      <div
        *ngIf="sidebarOpen"
        (click)="toggleSidebar()"
        class="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-40"
      ></div>

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
  sidebarOpen = false;
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
