import { Component, Input, Output, EventEmitter } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";

export interface MenuItem {
  label: string;
  icon: string;
  route?: string;
  action?: () => void;
  active?: boolean;
}

@Component({
  selector: "app-event-detail-sidebar",
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Sidebar -->
    <aside
      class="w-[340px] bg-sidebar-dark border-r border-[#717171] flex flex-col hidden lg:flex h-full"
    >
      <!-- Logo -->
      <div class="px-14 py-5">
        <div class="text-primary-blue text-3xl font-bold">eventtan</div>
      </div>

      <!-- Navigation -->
      <nav class="flex-1 px-2.5 mt-8 space-y-2 overflow-y-auto">
        <button
          *ngFor="let item of menuItems"
          (click)="onMenuItemClick(item)"
          [class.bg-primary-blue]="isActive(item)"
          [class.text-white]="isActive(item)"
          [class.text-[#E8E8E8]]="!isActive(item)"
          class="w-full flex items-center gap-3 h-12 px-4 rounded font-medium hover:bg-[#2A2A3E] hover:text-white transition-colors"
        >
          <div [innerHTML]="item.icon"></div>
          <span>{{ item.label }}</span>
        </button>
      </nav>

      <!-- Back Button -->
      <div class="p-2.5">
        <button
          (click)="onBackClick()"
          class="w-full flex items-center gap-3 h-12 px-4 rounded border border-dashed border-[#778] bg-sidebar-dark text-white font-medium hover:bg-[#2A2A3E] transition-colors"
        >
          <svg
            width="17"
            height="12"
            viewBox="0 0 18 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.627 5.18918H2.76839L6.5733 1.38414C6.88997 1.06747 6.88997 0.554125 6.5733 0.237454C6.25657 -0.0791515 5.74322 -0.0791515 5.42662 0.237454L0.237552 5.42665C-0.0791839 5.74332 -0.0791839 6.25666 0.237552 6.57333L5.42675 11.7625C5.58495 11.9207 5.79259 12 6.00009 12C6.20759 12 6.41503 11.9207 6.57343 11.7625C6.8901 11.4459 6.8901 10.9325 6.57343 10.6158L2.76839 6.8108H16.627C17.0748 6.8108 17.4379 6.44769 17.4379 5.99999C17.4379 5.55223 17.0748 5.18918 16.627 5.18918Z"
              fill="white"
            />
          </svg>
          <span>{{ backButtonLabel }}</span>
        </button>
      </div>

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
              d="M10.3027 0.219727C10.5955 -0.0730539 11.0704 -0.0728287 11.3633 0.219727L15.0303 3.88672C15.323 4.17963 15.3231 4.65443 15.0303 4.94727L11.3633 8.61328C11.0704 8.90602 10.5956 8.90612 10.3027 8.61328C10.0104 8.3204 10.0102 7.84547 10.3027 7.55273L12.6895 5.16699H0.75C0.336044 5.16682 0.000175416 4.83095 0 4.41699C1.32169e-05 4.0029 0.335944 3.66717 0.75 3.66699H12.6895L10.3027 1.28027C10.0103 0.987457 10.0103 0.512532 10.3027 0.219727Z"
              fill="currentColor"
            />
            <path
              d="M7.18359 0C8.29098 -1.33864e-07 9.16756 -0.000890797 9.87207 0.0566406C10.5851 0.114924 11.1893 0.236969 11.7402 0.517578C12.6337 0.972907 13.3601 1.70029 13.8154 2.59375C14.0962 3.14479 14.2181 3.74875 14.2764 4.46191C14.3339 5.16643 14.333 6.04294 14.333 7.15039V12.6836C14.333 13.791 14.3339 14.6676 14.2764 15.3721C14.2181 16.0852 14.0962 16.6892 13.8154 17.2402C13.3601 18.1337 12.6337 18.8601 11.7402 19.3154C11.1892 19.5962 10.5852 19.7181 9.87207 19.7764C9.16755 19.8339 8.29101 19.833 7.18359 19.833H5.79199C4.86161 19.833 4.28137 19.8373 3.78516 19.7344C1.93192 19.3497 0.48306 17.9012 0.0986328 16.0479C-0.00414176 15.5518 -6.66962e-07 14.972 0 14.042V13.583C0.000387448 13.1693 0.336206 12.8332 0.75 12.833C1.16397 12.833 1.49961 13.1691 1.5 13.583V14.042C1.5 15.0465 1.50374 15.4357 1.56738 15.7432C1.8304 17.0112 2.82191 18.0024 4.08984 18.2656C4.39737 18.3294 4.78673 18.333 5.79199 18.333H7.18359C8.31547 18.333 9.1198 18.3326 9.74902 18.2812C10.3693 18.2306 10.7542 18.1345 11.0586 17.9795C11.6701 17.6679 12.1679 17.1701 12.4795 16.5586C12.6345 16.2542 12.7306 15.8693 12.7812 15.249C12.8326 14.6198 12.833 13.8155 12.833 12.6836V7.15039C12.833 6.01817 12.8327 5.21328 12.7812 4.58398C12.7305 3.96365 12.6346 3.57881 12.4795 3.27441C12.1679 2.6631 11.67 2.166 11.0586 1.85449C10.7542 1.69951 10.3693 1.60244 9.74902 1.55176C9.11982 1.50041 8.31542 1.5 7.18359 1.5H5.79199C4.78672 1.5 4.39738 1.50359 4.08984 1.56738C2.82193 1.83052 1.83052 2.82193 1.56738 4.08984C1.50052 5.13378 1.5 5.35037 1.5 5.88491V11.2003C1.5 13.3171 3.21624 15.0334 5.33334 15.0334C5.93164 15.0334 6.41667 14.5483 6.41667 13.95V10.2833C6.41667 8.35031 7.98367 6.78331 9.91667 6.78331C11.8497 6.78331 13.4167 8.35031 13.4167 10.2833V13.95C13.4167 14.5483 13.9017 15.0334 14.5 15.0334C16.6171 15.0334 18.3333 13.3171 18.3333 11.2V5.88479C18.3333 5.34993 18.3325 5.13368 18.3125 4.93259C18.2136 3.93876 17.768 3.01148 17.0537 2.31347C16.9091 2.17224 16.7408 2.03647 16.3231 1.70235L15.8648 1.33568C15.5414 1.07692 15.4889 0.604953 15.7477 0.281506C16.0064 -0.0419401 16.4784 -0.0943811 16.8019 0.164376L17.2602 0.531043L17.2933 0.557499C17.6677 0.856998 17.8977 1.04103 18.102 1.24064C19.0684 2.18501 19.6714 3.43957 19.8051 4.78416C19.8334 5.06834 19.8334 5.36294 19.8333 5.84235V5.88479V11.2C19.8333 14.1456 17.4455 16.5334 14.5 16.5334C13.0733 16.5334 11.9167 15.3768 11.9167 13.95V10.2833C11.9167 9.17874 11.0212 8.28331 9.91667 8.28331C8.8121 8.28331 7.91667 9.17873 7.91667 10.2833V13.95C7.91667 15.3768 6.76007 16.5334 5.33334 16.5334C2.38782 16.5334 0 14.1455 0 11.2V5.88479L0 5.84239C-2.21527e-05 5.36296 -3.65771e-05 5.06835 0.0282241 4.78416C0.161934 3.43957 0.764905 2.18501 1.73133 1.24064C1.93559 1.04104 2.16565 0.857011 2.54004 0.557531C2.55095 0.548801 2.56186 0.540126 2.57317 0.531395C3.91753 1.35249 4.7196 0.699036 5.60266 0.367188Z"
              fill="currentColor"
            />
          </svg>
          <span class="text-sm">Logout</span>
        </button>
      </div>
    </aside>
  `,
  styles: [],
})
export class EventDetailSidebarComponent {
  @Input() menuItems: MenuItem[] = [];
  @Input() activeRoute: string = "";
  @Input() backButtonLabel: string = "Back to Dashboard";
  @Output() logoutEvent = new EventEmitter<void>();
  @Output() backEvent = new EventEmitter<void>();

  constructor(private router: Router) {}

  isActive(item: MenuItem): boolean {
    return this.activeRoute === item.route;
  }

  onMenuItemClick(item: MenuItem) {
    if (item.action) {
      item.action();
    } else if (item.route) {
      this.router.navigate([item.route]);
    }
  }

  onBackClick() {
    this.backEvent.emit();
  }

  onLogout() {
    this.logoutEvent.emit();
  }
}
