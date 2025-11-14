import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Router, RouterLink } from "@angular/router";

const VALID_EMAIL = "eventtan1@yopmail.com";
const VALID_PASSWORD = "eventtan1";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div
      class="h-screen overflow-hidden bg-white flex items-center justify-center p-4 lg:p-12"
    >
      <div class="w-full max-w-[1920px] h-full flex flex-col lg:flex-row">
        <!-- Left Panel - Illustration -->
        <div
          class="w-full lg:w-3/5 bg-bg-purple rounded-t-lg lg:rounded-l-lg lg:rounded-tr-none relative overflow-hidden flex items-center justify-center p-8 lg:p-16 h-full"
        >
          <!-- Bottom decorative image (kept within bounds) -->
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/70c78c6afaa94966734bdaf8f085e37be4eca446?width=2304"
            alt="decor"
            class="absolute bottom-0 left-0 w-full h-auto object-cover max-h-1/4 opacity-100"
            loading="lazy"
          />

          <!-- Main Illustration -->
          <div class="relative z-10 flex items-center justify-center h-full">
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/9b7ca098a336c04646db6d07343f74262eaae4a6?width=1042"
              alt="Login illustration"
              class="w-full max-w-[521px] h-auto max-h-[85%] object-contain"
              loading="lazy"
            />
          </div>
        </div>

        <!-- Right Panel - Login Form -->
        <div
          class="w-full lg:w-2/5 bg-white rounded-b-lg lg:rounded-r-lg lg:rounded-bl-none flex items-center justify-center p-6 lg:p-16 h-full"
        >
          <div class="w-full max-w-[500px]">
            <!-- Logo -->
            <div class="flex justify-center mb-8 lg:mb-12">
              <svg
                width="264"
                height="78"
                viewBox="0 0 264 78"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                class="w-48 lg:w-64 h-auto"
              >
                <image
                  href="data:image/svg+xml,%3Csvg width='264' height='78' viewBox='0 0 264 78' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dominant-baseline='middle' font-family='Roboto, sans-serif' font-size='36' font-weight='700' fill='%23049AD0'%3Eeventtan%3C/text%3E%3C/svg%3E"
                  width="264"
                  height="78"
                />
              </svg>
            </div>

            <!-- Welcome Text -->
            <div class="text-center mb-8 lg:mb-12">
              <h1 class="text-2xl lg:text-[32px] font-bold text-text-dark mb-3">
                Welcome to Eventtan!
              </h1>
              <p class="text-sm lg:text-base font-medium text-form-gray">
                Sign in to continue to Eventtan
              </p>
            </div>

            <!-- Email Input -->
            <div class="mb-6 lg:mb-8">
              <div
                class="border-b border-form-border bg-white h-12 lg:h-[50px] flex items-center"
              >
                <input
                  type="email"
                  [(ngModel)]="email"
                  placeholder="Email"
                  class="w-full h-full px-4 text-base font-medium text-text-dark placeholder-form-placeholder bg-transparent outline-none"
                />
              </div>
            </div>

            <!-- Password Input -->
            <div class="mb-4">
              <div
                class="border-b border-form-border h-12 lg:h-[50px] flex items-center relative"
              >
                <input
                  [type]="showPassword ? 'text' : 'password'"
                  [(ngModel)]="password"
                  placeholder="Password"
                  class="w-full h-full px-4 text-base font-medium text-text-dark placeholder-form-placeholder bg-transparent outline-none pr-12"
                />
                <button
                  type="button"
                  (click)="togglePassword()"
                  class="absolute right-4 flex items-center justify-center"
                  aria-label="Toggle password visibility"
                >
                  <svg
                    width="28"
                    height="17"
                    viewBox="0 0 28 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-7 h-4"
                  >
                    <path
                      d="M27.8221 7.67899C27.5719 7.36538 21.6119 0 13.9999 0C6.38784 0 0.427548 7.36538 0.17768 7.67869C-0.0592267 7.97622 -0.0592267 8.37975 0.17768 8.67728C0.427548 8.99089 6.38784 16.3563 13.9999 16.3563C21.6119 16.3563 27.5719 8.99084 27.8221 8.67753C28.0593 8.38005 28.0593 7.97622 27.8221 7.67899ZM13.9999 14.6643C8.3928 14.6643 3.53649 9.7757 2.09891 8.17756C3.53463 6.57801 8.38077 1.69202 13.9999 1.69202C19.6067 1.69202 24.4627 6.57972 25.9008 8.17871C24.4651 9.7782 19.619 14.6643 13.9999 14.6643Z"
                      fill="#878A99"
                    />
                    <path
                      d="M13.9994 3.10205C10.9456 3.10205 8.46094 5.37924 8.46094 8.17816C8.46094 10.9771 10.9456 13.2543 13.9994 13.2543C17.0533 13.2543 19.5379 10.9771 19.5379 8.17816C19.5379 5.37924 17.0533 3.10205 13.9994 3.10205ZM13.9994 11.5622C11.9634 11.5622 10.3071 10.0442 10.3071 8.17816C10.3071 6.31217 11.9635 4.79412 13.9994 4.79412C16.0354 4.79412 17.6917 6.31217 17.6917 8.17816C17.6917 10.0442 16.0354 11.5622 13.9994 11.5622Z"
                      fill="#878A99"
                    />
                  </svg>
                </button>
              </div>
              <div class="mt-4 text-right">
                <a
                  routerLink="/forgot-password"
                  class="text-sm font-semibold text-form-placeholder hover:text-primary-blue transition-colors"
                >
                  Forgot password?
                </a>
              </div>
            </div>

            <!-- Keep me signed in -->
            <div class="flex items-center mb-6 lg:mb-8">
              <button
                type="button"
                (click)="keepSignedIn = !keepSignedIn"
                class="relative w-[26px] h-[14px] rounded-full mr-3 transition-colors"
                [class.bg-primary-blue]="keepSignedIn"
                [class.bg-gray-300]="!keepSignedIn"
                aria-label="Keep me signed in toggle"
              >
                <div
                  class="absolute top-0 w-[14px] h-[14px] rounded-full bg-white border-2 transition-transform"
                  [class.translate-x-3]="keepSignedIn"
                  [class.translate-x-0]="!keepSignedIn"
                  [class.border-primary-blue]="keepSignedIn"
                  [class.border-gray-300]="!keepSignedIn"
                ></div>
              </button>
              <span class="text-base font-medium text-text-secondary">
                Keep me signed in
              </span>
            </div>

            <!-- Error message -->
            <div
              *ngIf="errorMessage"
              class="text-sm text-red-600 mb-4 text-center"
            >
              {{ errorMessage }}
            </div>

            <!-- Sign In Button -->
            <button
              (click)="onSignIn()"
              class="w-full h-12 lg:h-[50px] bg-primary-blue hover:bg-[#008bb8] transition-colors rounded-[5px] text-white text-lg font-semibold mb-6 lg:mb-8"
            >
              Sign In
            </button>

            <!-- Create Account Link -->
            <div class="text-center mb-6 lg:mb-8">
              <span class="text-base text-form-placeholder"
                >New on our platform?
              </span>
              <a
                routerLink="/signup"
                class="text-base text-primary-blue hover:underline"
              >
                Create an account
              </a>
            </div>

            <!-- Divider -->
            <div class="relative mb-6 lg:mb-8">
              <div class="absolute inset-0 flex items-center">
                <div class="w-full border-t border-divider-gray"></div>
              </div>
              <div class="relative flex justify-center">
                <span
                  class="px-4 bg-white text-sm font-semibold text-text-secondary"
                >
                  Sign In With
                </span>
              </div>
            </div>

            <!-- Google Sign In Button -->
            <button
              (click)="onGoogleSignIn()"
              class="w-full lg:w-auto mx-auto flex items-center justify-center gap-3 px-4 h-11 border border-[#E7E7E7] bg-[#FDFDFD] hover:bg-gray-50 rounded transition-colors"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_89_71)">
                  <path
                    d="M19.2446 8.26125L11.0868 8.26086C10.7266 8.26086 10.4346 8.55282 10.4346 8.91305V11.5191C10.4346 11.8793 10.7266 12.1713 11.0868 12.1713H15.6807C15.1777 13.4768 14.2388 14.5701 13.0409 15.2648L14.9998 18.6558C18.142 16.8385 19.9998 13.6498 19.9998 10.0804C19.9998 9.57215 19.9623 9.20883 19.8874 8.79973C19.8304 8.48891 19.5606 8.26125 19.2446 8.26125Z"
                    fill="#167EE6"
                  />
                  <path
                    d="M9.99957 16.0869C7.75137 16.0869 5.78871 14.8586 4.73461 13.0409L1.34375 14.9953C3.06934 17.9861 6.30191 20 9.99957 20C11.8135 20 13.5251 19.5116 14.9996 18.6605V18.6558L13.0407 15.2648C12.1447 15.7845 11.1078 16.0869 9.99957 16.0869Z"
                    fill="#12B347"
                  />
                  <path
                    d="M15 18.6604V18.6558L13.0411 15.2648C12.1451 15.7844 11.1083 16.0869 10 16.0869V20C11.8139 20 13.5256 19.5116 15 18.6604Z"
                    fill="#0F993E"
                  />
                  <path
                    d="M3.91305 9.99999C3.91305 8.89183 4.21547 7.85507 4.73504 6.95909L1.34418 5.00464C0.488359 6.47444 0 8.1814 0 9.99999C0 11.8186 0.488359 13.5255 1.34418 14.9953L4.73504 13.0409C4.21547 12.1449 3.91305 11.1082 3.91305 9.99999Z"
                    fill="#FFD500"
                  />
                  <path
                    d="M9.99957 3.91305C11.4656 3.91305 12.8123 4.43398 13.8641 5.30051C14.1236 5.51426 14.5007 5.49883 14.7384 5.26113L16.5849 3.41465C16.8546 3.14496 16.8354 2.70352 16.5473 2.45359C14.785 0.924727 12.492 0 9.99957 0C6.30191 0 3.06934 2.01395 1.34375 5.00465L4.73461 6.9591C5.78871 5.14141 7.75137 3.91305 9.99957 3.91305Z"
                    fill="#FF4B26"
                  />
                  <path
                    d="M13.8645 5.30051C14.124 5.51426 14.5012 5.49883 14.7389 5.26113L16.5854 3.41465C16.855 3.14496 16.8358 2.70352 16.5477 2.45359C14.7854 0.924688 12.4925 0 10 0V3.91305C11.466 3.91305 12.8127 4.43398 13.8645 5.30051Z"
                    fill="#D93F21"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_89_71">
                    <rect width="20" height="20" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <span class="text-sm font-medium text-[#727272]">
                Sign in with Google
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class LoginComponent {
  email = "";
  password = "";
  showPassword = false;
  keepSignedIn = true;
  errorMessage = "";

  constructor(private router: Router) {}

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onSignIn() {
    this.errorMessage = "";
    const email = (this.email || "").trim();
    const password = (this.password || "").trim();

    if (email.toLowerCase() === VALID_EMAIL && password === VALID_PASSWORD) {
      // successful — navigate to dashboard placeholder
      this.router.navigate(["/dashboard"]);
      return;
    }

    this.errorMessage =
      "Invalid email or password. Please use the assigned credentials.";
  }

  onGoogleSignIn() {
    this.errorMessage = "Google sign-in is not configured in this demo.";
  }
}
