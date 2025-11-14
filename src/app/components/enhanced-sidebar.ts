import { Component, Input, Output, EventEmitter } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  selector: "app-enhanced-sidebar",
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <!-- Sidebar -->
    <aside
      [class.hidden]="!sidebarOpen"
      class="w-[340px] bg-[#1E1E2D] border-r border-[#717171] flex flex-col fixed lg:static h-full z-50 lg:z-auto transition-transform lg:translate-x-0"
      [class.-translate-x-full]="!sidebarOpen"
    >
      <!-- Logo -->
      <div class="px-14 py-5">
        <div class="text-primary-blue text-3xl font-bold">eventtan</div>
      </div>

      <!-- Navigation -->
      <nav class="flex-1 px-2.5 mt-8 overflow-y-auto">
        <!-- Dashboard -->
        <a
          routerLink="/dashboard"
          routerLinkActive="bg-primary-blue text-white"
          [routerLinkActiveOptions]="{ exact: true }"
          class="flex items-center gap-3 h-12 px-4 mb-2 rounded text-[#E8E8E8] font-medium hover:bg-[#2A2A3E] hover:text-white transition-colors"
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
              d="M5.60254 0.367188C6.9061 -0.122552 8.34388 -0.12247 9.64746 0.367188C10.5305 0.698996 11.3327 1.3525 12.6768 2.42773L14.9688 4.26074C15.2922 4.51948 15.3446 4.99199 15.0859 5.31543C14.8272 5.63888 14.3547 5.69137 14.0312 5.43262L11.7402 3.59863C10.311 2.45521 9.72516 1.99891 9.12012 1.77148C8.15662 1.4096 7.09336 1.40951 6.12988 1.77148C5.52484 1.99894 4.93918 2.4551 3.50977 3.59863L1.21875 5.43262C0.895304 5.69137 0.42282 5.63888 0.164062 5.31543C-0.0944045 4.99199 -0.0420899 4.51941 0.28125 4.26074L2.57324 2.42773C3.9174 1.3524 4.71948 0.699036 5.60254 0.367188Z"
              fill="white"
            />
            <path
              d="M15.748 0.28125C16.0067 -0.0416789 16.4784 -0.0940784 16.8018 0.164062L17.2598 0.53125C17.6534 0.846122 17.8915 1.0351 18.1016 1.24023C19.0679 2.18452 19.6709 3.43973 19.8047 4.78418C19.8338 5.07659 19.833 5.38033 19.833 5.88477V11.2002C19.8329 14.1456 17.4455 16.5332 14.5 16.5332C13.0735 16.533 11.9171 15.3767 11.917 13.9502V10.2832C11.9168 9.17894 11.0213 8.28338 9.91699 8.2832C8.81272 8.28338 7.91722 9.17894 7.91699 10.2832V13.9502C7.91689 15.3768 6.75968 16.5332 5.33301 16.5332C2.38786 16.5328 0.000105999 14.1454 0 11.2002V5.88477C-3.47768e-07 5.38035 -0.000753955 5.07658 0.0283203 4.78418C0.162093 3.4397 0.765096 2.18453 1.73145 1.24023C1.94158 1.03493 2.17939 0.846333 2.57324 0.53125L3.03125 0.164062C3.35457 -0.0945947 3.82712 -0.0418623 4.08594 0.28125C4.34469 0.604696 4.2922 1.07718 3.96875 1.33594L3.50977 1.70215C3.09226 2.03615 2.9238 2.17227 2.7793 2.31348C2.06518 3.01139 1.61939 3.939 1.52051 4.93262C1.50052 5.13363 1.5 5.35023 1.5 5.88477V11.2002C1.50011 13.317 3.21628 15.0328 5.33301 15.0332C5.93125 15.0332 6.41689 14.5484 6.41699 13.9502V10.2832C6.41722 8.35051 7.98429 6.78338 9.91699 6.7832C11.8497 6.78338 13.4168 8.35051 13.417 10.2832V13.9502C13.4171 14.5483 13.9019 15.033 14.5 15.0332C16.617 15.0332 18.3329 13.3172 18.333 11.2002V5.88477C18.333 5.3502 18.3325 5.13364 18.3125 4.93262C18.2136 3.93895 17.7679 3.0114 17.0537 2.31348C16.9093 2.17237 16.7406 2.03601 16.3232 1.70215L15.8652 1.33594C15.5421 1.07712 15.4894 0.604572 15.748 0.28125Z"
              fill="white"
            />
          </svg>
          <span>Dashboard</span>
        </a>

        <!-- Manage Account Section -->
        <div class="mt-4">
          <button
            (click)="toggleManageAccount()"
            class="w-full flex items-center justify-between h-12 px-4 rounded text-[#E8E8E8] font-medium hover:bg-[#2A2A3E] hover:text-white transition-colors"
          >
            <div class="flex items-center gap-3">
              <svg
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  opacity="0.4"
                  d="M11 0C17.0751 0 22 4.9249 22 11C22 17.0751 17.0751 22 11 22C4.9249 22 0 17.0751 0 11C0 4.9249 4.9249 0 11 0ZM11 4.71429C7.49072 4.71429 4.71429 7.49072 4.71429 11C4.71429 14.5093 7.49072 17.2857 11 17.2857C14.5093 17.2857 17.2857 14.5093 17.2857 11C17.2857 7.49072 14.5093 4.71429 11 4.71429Z"
                  fill="white"
                />
                <path
                  d="M11 0C12.175 0 13.245 0.366667 14.1858 0.979167L15.775 2.85C16.2308 3.33083 16.1642 4.08083 15.6417 4.47583C15.1192 4.87083 14.3142 4.80917 13.8583 4.32833L12.2692 2.45667C11.8625 2.0325 11.445 1.83333 11 1.83333C10.555 1.83333 10.1375 2.0325 9.73083 2.45667L8.14167 4.32833C7.68583 4.80917 6.88083 4.87083 6.35833 4.47583C5.83583 4.08083 5.76917 3.33083 6.225 2.85L7.81417 0.979167C8.755 0.366667 9.825 0 11 0Z"
                  fill="white"
                />
              </svg>
              <span>Manage Account</span>
            </div>
            <svg
              class="w-3 h-3 transition-transform"
              [class.rotate-180]="manageAccountOpen"
              width="11"
              height="6"
              viewBox="0 0 11 6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.33656 0.214336C1.02702 -0.0757043 0.529551 -0.0710987 0.225436 0.224623C-0.0786802 0.520344 -0.0742839 0.995197 0.235255 1.28524L4.991 5.7414C5.29107 6.02257 5.7701 6.02807 6.07767 5.75388L10.7536 1.58541C11.0708 1.30257 11.0881 0.827961 10.792 0.525349C10.496 0.222737 9.99879 0.206712 9.68152 0.489556L5.55567 4.16767L1.33656 0.214336Z"
                fill="#E1E1E1"
              />
            </svg>
          </button>

          <!-- Sub Menu -->
          <div
            *ngIf="manageAccountOpen"
            class="ml-4 mt-1 space-y-1 overflow-hidden transition-all"
          >
            <a
              routerLink="/manage-profile"
              routerLinkActive="bg-primary-blue text-white"
              class="flex items-center gap-3 h-10 px-4 rounded text-[#E8E8E8] hover:bg-[#2A2A3E] hover:text-white transition-colors"
            >
              <svg
                width="8"
                height="8"
                viewBox="0 0 8 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="4" cy="4" r="3.5" stroke="currentColor" />
              </svg>
              <span class="text-sm">Manage Profile</span>
            </a>
            <a
              routerLink="/manage-user"
              routerLinkActive="bg-primary-blue text-white"
              class="flex items-center gap-3 h-10 px-4 rounded text-[#E8E8E8] hover:bg-[#2A2A3E] hover:text-white transition-colors"
            >
              <svg
                width="8"
                height="8"
                viewBox="0 0 8 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="4" cy="4" r="3.5" stroke="currentColor" />
              </svg>
              <span class="text-sm">Manage User</span>
            </a>
            <a
              routerLink="/change-password"
              routerLinkActive="bg-primary-blue text-white"
              class="flex items-center gap-3 h-10 px-4 rounded text-[#E8E8E8] hover:bg-[#2A2A3E] hover:text-white transition-colors"
            >
              <svg
                width="8"
                height="8"
                viewBox="0 0 8 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="4" cy="4" r="3.5" stroke="currentColor" />
              </svg>
              <span class="text-sm">Change password</span>
            </a>
          </div>
        </div>
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
          class="flex-1 flex items-center gap-2 h-9 px-3 rounded border border-dashed border-[#757575] bg-[#1E1E2D] text-[#A1A5B7] hover:text-white transition-colors"
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
              d="M10.3027 0.219727C10.5955 -0.0730539 11.0704 -0.0728287 11.3633 0.219727L15.0303 3.88672C15.323 4.17963 15.3231 4.65443 15.0303 4.94727L11.3633 8.61328C11.0704 8.90602 10.5956 8.90612 10.3027 8.61328C10.0104 8.3204 10.0102 7.84547 10.3027 7.55273L12.6895 5.16699H0.75C0.336044 5.16682 0.000175416 4.83095 0 4.41699C1.32169e-05 4.0029 0.335944 3.66717 0.75 3.66699H12.6895L10.3027 1.28027C10.0103 0.987457 10.0103 0.512532 10.3027 0.219727Z"
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
      (click)="closeSidebar()"
      class="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-40"
    ></div>
  `,
  styles: [],
})
export class EnhancedSidebarComponent {
  @Input() sidebarOpen = true;
  @Output() toggleSidebarEvent = new EventEmitter<void>();
  @Output() logoutEvent = new EventEmitter<void>();

  manageAccountOpen = true;

  toggleManageAccount() {
    this.manageAccountOpen = !this.manageAccountOpen;
  }

  closeSidebar() {
    this.toggleSidebarEvent.emit();
  }

  onLogout() {
    this.logoutEvent.emit();
  }
}
