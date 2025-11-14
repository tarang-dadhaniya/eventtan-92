import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router, ActivatedRoute, NavigationEnd } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { filter } from "rxjs/operators";
import {
  EventDetailSidebarComponent,
  MenuItem,
} from "../components/event-detail-sidebar";

const DASHBOARD_ICON = `<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path opacity="0.4" fill-rule="evenodd" clip-rule="evenodd" d="M9.11972 1.77151C8.15614 1.4095 7.09392 1.4095 6.13033 1.77151C5.5251 1.99889 4.94006 2.45532 3.51022 3.59919L1.21855 5.43253C0.895102 5.69128 0.423133 5.63884 0.164376 5.3154C-0.0943811 4.99195 -0.0419401 4.51998 0.281506 4.26122L2.57317 2.42789C2.61283 2.39616 2.65202 2.36481 2.69075 2.33381C3.96492 1.31414 4.74565 0.689359 5.6028 0.367335C6.90647 -0.122445 8.34359 -0.122445 9.64726 0.367335C10.5044 0.689359 11.2851 1.31414 12.5593 2.33381C12.598 2.3648 12.6372 2.39616 12.6769 2.42789L14.9685 4.26122C15.292 4.51998 15.3444 4.99195 15.0857 5.3154C14.8269 5.63884 14.355 5.69128 14.0315 5.43253L11.7398 3.59919C10.31 2.45532 9.72496 1.99889 9.11972 1.77151Z" fill="white"/><path fill-rule="evenodd" clip-rule="evenodd" d="M4.08565 0.281506C4.34441 0.604953 4.29197 1.07692 3.96852 1.33568L3.51019 1.70235C3.09253 2.03647 2.92421 2.17224 2.77968 2.31347C2.06537 3.01148 1.61969 3.93876 1.52086 4.93259C1.50087 5.13368 1.5 5.34993 1.5 5.88479V11.2C1.5 13.3171 3.21624 15.0334 5.33334 15.0334C5.93164 15.0334 6.41667 14.5483 6.41667 13.95V10.2833C6.41667 8.35031 7.98367 6.78331 9.91667 6.78331C11.8497 6.78331 13.4167 8.35031 13.4167 10.2833V13.95C13.4167 14.5483 13.9017 15.0334 14.5 15.0334C16.6171 15.0334 18.3333 13.3171 18.3333 11.2V5.88479C18.3333 5.34993 18.3325 5.13368 18.3125 4.93259C18.2136 3.93876 17.7679 3.01148 17.0536 2.31347C16.9091 2.17224 16.7408 2.03647 16.3231 1.70235L15.8648 1.33568C15.5413 1.07692 15.4889 0.604953 15.7477 0.281506C16.0064 -0.0419405 16.4784 -0.0943815 16.8018 0.164376L17.2748 0.541868C17.6571 0.856916 17.886 1.04452 18.0782 1.23375C19.0199 2.16224 19.5996 3.40171 19.7171 4.72041C19.7394 4.94668 19.7496 5.18893 19.7543 5.59686L19.75 5.88479V11.2C19.75 14.0997 17.3997 16.45 14.5 16.45C13.1193 16.45 11.9167 15.2473 11.9167 13.8667V10.2C11.9167 9.19579 11.087 8.38331 10.0667 8.38331C9.04634 8.38331 8.21667 9.19579 8.21667 10.2V13.8667C8.21667 15.2473 7.01401 16.45 5.63334 16.45C2.73357 16.45 0.383333 14.0997 0.383333 11.2V5.88479L0.379004 5.59686C0.383737 5.18893 0.393911 4.94668 0.416226 4.72041C0.533719 3.40171 1.11338 2.16224 2.05508 1.23375C2.24733 1.04452 2.47622 0.856916 2.85854 0.541868L3.33152 0.164376C3.65497 -0.0943815 4.12694 -0.0419405 4.38565 0.281506Z" fill="white"/></svg>`;

const EVENT_SETUP_ICON = `<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path opacity="0.4" fill-rule="evenodd" clip-rule="evenodd" d="M0.750001 0C0.335787 -5.96046e-08 8.19241e-07 0.335786 7.59636e-07 0.75C7.00032e-07 1.16421 0.335787 1.5 0.750001 1.5L8.08333 1.5C8.49755 1.5 8.83333 1.16421 8.83333 0.750001C8.83333 0.335787 8.49755 7.15256e-07 8.08333 7.15256e-07L0.750001 0ZM3.95 4.58333L3.91957 4.58333H3.91956C3.38541 4.58332 2.93956 4.58331 2.57533 4.61307C2.19545 4.64411 1.83879 4.71122 1.50153 4.88307C0.984081 5.14672 0.563385 5.56741 0.299733 6.08486C0.127889 6.42212 0.0607778 6.77878 0.02974 7.15866C-1.90887e-05 7.5229 -1.02672e-05 7.96874 4.02008e-07 8.5029L7.59636e-07 8.53333V13.125C7.59636e-07 13.5392 0.335787 13.875 0.750001 13.875C1.16421 13.875 1.5 13.5392 1.5 13.125V8.53333C1.5 7.9609 1.50058 7.57669 1.52476 7.28081C1.54822 6.99369 1.5901 6.85641 1.63624 6.76585C1.75608 6.53064 1.94731 6.33942 2.18251 6.21958C2.27307 6.17343 2.41036 6.13155 2.69748 6.10809C2.99336 6.08392 3.37757 6.08333 3.95 6.08333H4.88333C5.45576 6.08333 5.83998 6.08392 6.13586 6.10809C6.42298 6.13155 6.56026 6.17343 6.65082 6.21958C6.88602 6.33942 7.07725 6.53064 7.19709 6.76585C7.24324 6.85641 7.28512 6.99369 7.30858 7.28081C7.33275 7.57669 7.33333 7.96091 7.33333 8.53333V13.125C7.33333 13.5392 7.66912 13.875 8.08333 13.875C8.49755 13.875 8.83333 13.5392 8.83333 13.125V8.53333V8.50293C8.83335 7.96876 8.83335 7.5229 8.80359 7.15866C8.77256 6.77878 8.70545 6.42212 8.53361 6.08486C8.26996 5.56741 7.84926 5.14672 7.33181 4.88307C6.99455 4.71122 6.63788 4.64411 6.25801 4.61307C5.89378 4.58331 5.44793 4.58332 4.91377 4.58333H3.95Z" fill="white"/></svg>`;

const EVENT_OVERVIEW_ICON = `<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path opacity="0.4" fill-rule="evenodd" clip-rule="evenodd" d="M0.750001 0C0.335787 -5.96046e-08 8.19241e-07 0.335786 7.59636e-07 0.75C7.00032e-07 1.16421 0.335787 1.5 0.750001 1.5L8.08333 1.5C8.49755 1.5 8.83333 1.16421 8.83333 0.750001C8.83333 0.335787 8.49755 7.15256e-07 8.08333 7.15256e-07L0.750001 0ZM3.95 4.58333L3.91957 4.58333H3.91956C3.38541 4.58332 2.93956 4.58331 2.57533 4.61307C2.19545 4.64411 1.83879 4.71122 1.50153 4.88307C0.984081 5.14672 0.563385 5.56741 0.299733 6.08486C0.127889 6.42212 0.0607778 6.77878 0.02974 7.15866C-1.90887e-05 7.5229 -1.02672e-05 7.96874 4.02008e-07 8.5029L7.59636e-07 8.53333V13.125C7.59636e-07 13.5392 0.335787 13.875 0.750001 13.875C1.16421 13.875 1.5 13.5392 1.5 13.125V8.53333C1.5 7.9609 1.50058 7.57669 1.52476 7.28081C1.54822 6.99369 1.5901 6.85641 1.63624 6.76585C1.75608 6.53064 1.94731 6.33942 2.18251 6.21958C2.27307 6.17343 2.41036 6.13155 2.69748 6.10809C2.99336 6.08392 3.37757 6.08333 3.95 6.08333H4.88333C5.45576 6.08333 5.83998 6.08392 6.13586 6.10809C6.42298 6.13155 6.56026 6.17343 6.65082 6.21958C6.88602 6.33942 7.07725 6.53064 7.19709 6.76585C7.24324 6.85641 7.28512 6.99369 7.30858 7.28081C7.33275 7.57669 7.33333 7.96091 7.33333 8.53333V13.125C7.33333 13.5392 7.66912 13.875 8.08333 13.875C8.49755 13.875 8.83333 13.5392 8.83333 13.125V8.53333V8.50293C8.83335 7.96876 8.83335 7.5229 8.80359 7.15866C8.77256 6.77878 8.70545 6.42212 8.53361 6.08486C8.26996 5.56741 7.84926 5.14672 7.33181 4.88307C6.99455 4.71122 6.63788 4.64411 6.25801 4.61307C5.89378 4.58331 5.44793 4.58332 4.91377 4.58333H3.95Z" fill="white"/></svg>`;

@Component({
  selector: "app-event-setup",
  standalone: true,
  imports: [CommonModule, EventDetailSidebarComponent, FormsModule],
  template: `
    <div class="flex h-screen overflow-hidden bg-main-bg">
      <app-event-detail-sidebar
        [menuItems]="menuItems"
        [activeRoute]="activeRoute"
        [backButtonLabel]="backButtonLabel"
        (logoutEvent)="onLogout()"
        (backEvent)="onBackToDashboard()"
      ></app-event-detail-sidebar>

      <main class="flex-1 flex flex-col overflow-hidden">
        <header class="h-24 bg-white border-b border-[#ECECEC] px-4 lg:px-8">
          <div class="h-full flex items-center gap-4">
            <button
              class="w-11 h-11 bg-primary-blue rounded flex items-center justify-center lg:hidden hover:bg-[#0385b5] transition-colors"
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

            <div
              class="flex-1 flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-6"
            >
              <div class="flex items-center gap-3 lg:gap-4">
                <div
                  class="w-11 h-11 bg-[#E8F4F8] rounded flex items-center justify-center flex-shrink-0"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="3"
                      y="5"
                      width="18"
                      height="15"
                      rx="2"
                      stroke="#009FD8"
                      stroke-width="2"
                    />
                    <path
                      d="M3 8H21"
                      stroke="#009FD8"
                      stroke-width="2"
                      stroke-linecap="round"
                    />
                    <path
                      d="M8 3V7"
                      stroke="#009FD8"
                      stroke-width="2"
                      stroke-linecap="round"
                    />
                    <path
                      d="M16 3V7"
                      stroke="#009FD8"
                      stroke-width="2"
                      stroke-linecap="round"
                    />
                  </svg>
                </div>
                <div class="flex flex-col">
                  <h1
                    class="text-lg lg:text-[22px] font-bold text-[#181C32] tracking-wide"
                  >
                    {{ eventName }}
                  </h1>
                  <p
                    class="text-sm lg:text-base text-[#707070] tracking-wide font-medium"
                  >
                    Event Setup
                  </p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div class="flex-1 overflow-auto bg-main-bg">
          <div class="px-4 lg:px-8 py-6 lg:py-8">
            <div class="max-w-[1366px] mx-auto">
              <!-- Tab Navigation -->
              <div class="flex items-center justify-center gap-0 mb-8">
                <button
                  (click)="currentTab = 'details'"
                  [class.active]="currentTab === 'details'"
                  class="tab-button relative flex items-center gap-2 px-6 md:px-10 py-2.5 bg-white border border-[#009FD8] rounded shadow-sm transition-all"
                  [ngClass]="{
                    'bg-[#009FD8] text-white': currentTab === 'details',
                    'bg-white text-[#049AD0]': currentTab !== 'details',
                  }"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15.25 9C15.6642 9 16 9.3358 16 9.75C16 10.1642 15.6642 10.5 15.25 10.5H12.9502C12.3778 10.5 11.9931 10.5002 11.6973 10.5244C11.4106 10.5479 11.2732 10.5897 11.1826 10.6357C10.9475 10.7556 10.7566 10.9475 10.6367 11.1826C10.5906 11.2732 10.5479 11.4103 10.5244 11.6973C10.5002 11.9931 10.5 12.3778 10.5 12.9502V15.25C10.5 15.6642 10.1642 16 9.75 16C9.33579 16 9 15.6642 9 15.25V12.9502C9 12.4025 8.99897 11.9463 9.0293 11.5752C9.06033 11.1955 9.1281 10.8391 9.2998 10.502C9.56346 9.98452 9.98452 9.56345 10.502 9.2998C10.8391 9.12809 11.1955 9.06033 11.5752 9.0293C11.9463 8.99897 12.4025 9 12.9502 9H15.25ZM2.75 8C3.16421 8 3.5 8.33579 3.5 8.75C3.5 9.16421 3.16421 9.5 2.75 9.5H0.75C0.335786 9.5 0 9.16421 0 8.75C0 8.33579 0.335786 8 0.75 8H2.75ZM6.75 4C7.16421 4 7.5 4.33579 7.5 4.75C7.5 5.16421 7.16421 5.5 6.75 5.5H0.75C0.335786 5.5 0 5.16421 0 4.75C0 4.33579 0.335786 4 0.75 4H6.75ZM8.75 0C9.16421 0 9.5 0.335786 9.5 0.75C9.5 1.16421 9.16421 1.5 8.75 1.5H0.75C0.335786 1.5 0 1.16421 0 0.75C0 0.335786 0.335786 0 0.75 0H8.75Z"
                      [attr.fill]="
                        currentTab === 'details' ? 'white' : '#049AD0'
                      "
                    />
                    <path
                      d="M11.1504 0C12.818 -9.06349e-08 14.1143 -0.000828191 15.1523 0.0839844C16.199 0.169528 17.0495 0.345624 17.8145 0.735352C19.0845 1.3825 20.1175 2.41545 20.7646 3.68555C21.1544 4.45049 21.3305 5.30103 21.416 6.34766C21.5008 7.38571 21.5 8.68202 21.5 10.3496V13.9219C21.5 14.2508 21.5004 14.4434 21.4902 14.6309C21.4068 16.1663 20.8012 17.6278 19.7744 18.7725C19.6491 18.9121 19.5128 19.0477 19.2803 19.2803C19.0477 19.5128 18.9121 19.6491 18.7725 19.7744C17.6278 20.8012 16.1663 21.4068 14.6309 21.4902C14.4434 21.5004 14.2508 21.5 13.9219 21.5H10.3496C8.68202 21.5 7.38571 21.5008 6.34766 21.416C5.30103 21.3305 4.45049 21.1544 3.68555 20.7646C2.41545 20.1175 1.3825 19.0845 0.735352 17.8145C0.345624 17.0495 0.169528 16.199 0.0839844 15.1523C-0.000828191 14.1143 -9.06348e-08 12.818 0 11.1504V10.3496C-9.06941e-08 8.68202 -0.000828204 7.38571 0.0839844 6.34766C0.169528 5.30103 0.345624 4.45049 0.735352 3.68555C1.3825 2.41545 2.41545 1.3825 3.68555 0.735352C4.45049 0.345624 5.30103 0.169528 6.34766 0.0839844C7.38571 -0.000828204 8.68202 -9.0694e-08 10.3496 0H11.1504ZM10.3496 1.5C8.65753 1.5 7.43345 1.50047 6.4707 1.5791C5.51657 1.65706 4.8846 1.80814 4.36621 2.07227C3.37859 2.57556 2.57556 3.37859 2.07227 4.36621C1.80814 4.8846 1.65706 5.51657 1.5791 6.4707C1.50047 7.43345 1.5 8.65753 1.5 10.3496V11.1504C1.5 12.8425 1.50047 14.0665 1.5791 15.0293C1.65706 15.9834 1.80814 16.6154 2.07227 17.1338C2.57556 18.1214 3.37859 18.9244 4.36621 19.4277C4.8846 19.6919 5.51657 19.8429 6.4707 19.9209C7.43345 19.9995 8.65753 20 10.3496 20H13.9219C14.2666 20 14.4116 19.9996 14.5488 19.9922C15.7432 19.9274 16.8801 19.4569 17.7705 18.6582C17.873 18.5663 17.9755 18.4639 18.2197 18.2197C18.4639 17.9755 18.5663 17.873 18.6582 17.7705C19.4569 16.8801 19.9274 15.7432 19.9922 14.5488C19.9996 14.4116 20 14.2666 20 13.9219V10.3496C20 8.65753 19.9995 7.43345 19.9209 6.4707C19.8429 5.51657 19.6919 4.8846 19.4277 4.36621C18.9244 3.37859 18.1214 2.57556 17.1338 2.07227C16.6154 1.80814 15.9834 1.65706 15.0293 1.5791C14.0665 1.50047 12.8425 1.5 11.1504 1.5H10.3496Z"
                      [attr.fill]="
                        currentTab === 'details' ? 'white' : '#049AD0'
                      "
                    />
                  </svg>
                  <span
                    class="text-sm md:text-base font-medium md:font-semibold whitespace-nowrap"
                    >Event Details</span
                  >
                </button>

                <div class="h-px w-16 md:w-28 bg-[#049AD0]"></div>

                <button
                  (click)="currentTab = 'features'"
                  [class.active]="currentTab === 'features'"
                  class="tab-button relative flex items-center gap-2 px-6 md:px-10 py-2.5 bg-white border border-[#049AD0] rounded shadow-sm transition-all"
                  [ngClass]="{
                    'bg-[#009FD8] text-white': currentTab === 'features',
                    'bg-white text-[#049AD0]': currentTab !== 'features',
                  }"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15.25 9C15.6642 9 16 9.3358 16 9.75C16 10.1642 15.6642 10.5 15.25 10.5H12.9502C12.3778 10.5 11.9931 10.5002 11.6973 10.5244C11.4106 10.5479 11.2732 10.5897 11.1826 10.6357C10.9475 10.7556 10.7566 10.9475 10.6367 11.1826C10.5906 11.2732 10.5479 11.4103 10.5244 11.6973C10.5002 11.9931 10.5 12.3778 10.5 12.9502V15.25C10.5 15.6642 10.1642 16 9.75 16C9.33579 16 9 15.6642 9 15.25V12.9502C9 12.4025 8.99897 11.9463 9.0293 11.5752C9.06033 11.1955 9.1281 10.8391 9.2998 10.502C9.56346 9.98452 9.98452 9.56345 10.502 9.2998C10.8391 9.12809 11.1955 9.06033 11.5752 9.0293C11.9463 8.99897 12.4025 9 12.9502 9H15.25ZM2.75 8C3.16421 8 3.5 8.33579 3.5 8.75C3.5 9.16421 3.16421 9.5 2.75 9.5H0.75C0.335786 9.5 0 9.16421 0 8.75C0 8.33579 0.335786 8 0.75 8H2.75ZM6.75 4C7.16421 4 7.5 4.33579 7.5 4.75C7.5 5.16421 7.16421 5.5 6.75 5.5H0.75C0.335786 5.5 0 5.16421 0 4.75C0 4.33579 0.335786 4 0.75 4H6.75ZM8.75 0C9.16421 0 9.5 0.335786 9.5 0.75C9.5 1.16421 9.16421 1.5 8.75 1.5H0.75C0.335786 1.5 0 1.16421 0 0.75C0 0.335786 0.335786 0 0.75 0H8.75Z"
                      [attr.fill]="
                        currentTab === 'features' ? 'white' : '#049AD0'
                      "
                    />
                    <path
                      d="M11.1504 0C12.818 -9.06349e-08 14.1143 -0.000828191 15.1523 0.0839844C16.199 0.169528 17.0495 0.345624 17.8145 0.735352C19.0845 1.3825 20.1175 2.41545 20.7646 3.68555C21.1544 4.45049 21.3305 5.30103 21.416 6.34766C21.5008 7.38571 21.5 8.68202 21.5 10.3496V13.9219C21.5 14.2508 21.5004 14.4434 21.4902 14.6309C21.4068 16.1663 20.8012 17.6278 19.7744 18.7725C19.6491 18.9121 19.5128 19.0477 19.2803 19.2803C19.0477 19.5128 18.9121 19.6491 18.7725 19.7744C17.6278 20.8012 16.1663 21.4068 14.6309 21.4902C14.4434 21.5004 14.2508 21.5 13.9219 21.5H10.3496C8.68202 21.5 7.38571 21.5008 6.34766 21.416C5.30103 21.3305 4.45049 21.1544 3.68555 20.7646C2.41545 20.1175 1.3825 19.0845 0.735352 17.8145C0.345624 17.0495 0.169528 16.199 0.0839844 15.1523C-0.000828191 14.1143 -9.06348e-08 12.818 0 11.1504V10.3496C-9.06941e-08 8.68202 -0.000828204 7.38571 0.0839844 6.34766C0.169528 5.30103 0.345624 4.45049 0.735352 3.68555C1.3825 2.41545 2.41545 1.3825 3.68555 0.735352C4.45049 0.345624 5.30103 0.169528 6.34766 0.0839844C7.38571 -0.000828204 8.68202 -9.0694e-08 10.3496 0H11.1504ZM10.3496 1.5C8.65753 1.5 7.43345 1.50047 6.4707 1.5791C5.51657 1.65706 4.8846 1.80814 4.36621 2.07227C3.37859 2.57556 2.57556 3.37859 2.07227 4.36621C1.80814 4.8846 1.65706 5.51657 1.5791 6.4707C1.50047 7.43345 1.5 8.65753 1.5 10.3496V11.1504C1.5 12.8425 1.50047 14.0665 1.5791 15.0293C1.65706 15.9834 1.80814 16.6154 2.07227 17.1338C2.57556 18.1214 3.37859 18.9244 4.36621 19.4277C4.8846 19.6919 5.51657 19.8429 6.4707 19.9209C7.43345 19.9995 8.65753 20 10.3496 20H13.9219C14.2666 20 14.4116 19.9996 14.5488 19.9922C15.7432 19.9274 16.8801 19.4569 17.7705 18.6582C17.873 18.5663 17.9755 18.4639 18.2197 18.2197C18.4639 17.9755 18.5663 17.873 18.6582 17.7705C19.4569 16.8801 19.9274 15.7432 19.9922 14.5488C19.9996 14.4116 20 14.2666 20 13.9219V10.3496C20 8.65753 19.9995 7.43345 19.9209 6.4707C19.8429 5.51657 19.6919 4.8846 19.4277 4.36621C18.9244 3.37859 18.1214 2.57556 17.1338 2.07227C16.6154 1.80814 15.9834 1.65706 15.0293 1.5791C14.0665 1.50047 12.8425 1.5 11.1504 1.5H10.3496Z"
                      [attr.fill]="
                        currentTab === 'features' ? 'white' : '#049AD0'
                      "
                    />
                  </svg>
                  <span
                    class="text-sm md:text-base font-medium md:font-semibold whitespace-nowrap"
                    >Event Features</span
                  >
                </button>

                <div class="h-px w-16 md:w-28 bg-[#CED4DA]"></div>

                <button
                  (click)="currentTab = 'content'"
                  [class.active]="currentTab === 'content'"
                  class="tab-button relative flex items-center gap-2 px-6 md:px-10 py-2.5 bg-white border border-[#049AD0] rounded shadow-sm transition-all"
                  [ngClass]="{
                    'bg-[#009FD8] text-white': currentTab === 'content',
                    'bg-white text-[#049AD0]': currentTab !== 'content',
                  }"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15.25 9C15.6642 9 16 9.3358 16 9.75C16 10.1642 15.6642 10.5 15.25 10.5H12.9502C12.3778 10.5 11.9931 10.5002 11.6973 10.5244C11.4106 10.5479 11.2732 10.5897 11.1826 10.6357C10.9475 10.7556 10.7566 10.9475 10.6367 11.1826C10.5906 11.2732 10.5479 11.4103 10.5244 11.6973C10.5002 11.9931 10.5 12.3778 10.5 12.9502V15.25C10.5 15.6642 10.1642 16 9.75 16C9.33579 16 9 15.6642 9 15.25V12.9502C9 12.4025 8.99897 11.9463 9.0293 11.5752C9.06033 11.1955 9.1281 10.8391 9.2998 10.502C9.56346 9.98452 9.98452 9.56345 10.502 9.2998C10.8391 9.12809 11.1955 9.06033 11.5752 9.0293C11.9463 8.99897 12.4025 9 12.9502 9H15.25ZM2.75 8C3.16421 8 3.5 8.33579 3.5 8.75C3.5 9.16421 3.16421 9.5 2.75 9.5H0.75C0.335786 9.5 0 9.16421 0 8.75C0 8.33579 0.335786 8 0.75 8H2.75ZM6.75 4C7.16421 4 7.5 4.33579 7.5 4.75C7.5 5.16421 7.16421 5.5 6.75 5.5H0.75C0.335786 5.5 0 5.16421 0 4.75C0 4.33579 0.335786 4 0.75 4H6.75ZM8.75 0C9.16421 0 9.5 0.335786 9.5 0.75C9.5 1.16421 9.16421 1.5 8.75 1.5H0.75C0.335786 1.5 0 1.16421 0 0.75C0 0.335786 0.335786 0 0.75 0H8.75Z"
                      [attr.fill]="
                        currentTab === 'content' ? 'white' : '#049AD0'
                      "
                    />
                    <path
                      d="M11.1504 0C12.818 -9.06349e-08 14.1143 -0.000828191 15.1523 0.0839844C16.199 0.169528 17.0495 0.345624 17.8145 0.735352C19.0845 1.3825 20.1175 2.41545 20.7646 3.68555C21.1544 4.45049 21.3305 5.30103 21.416 6.34766C21.5008 7.38571 21.5 8.68202 21.5 10.3496V13.9219C21.5 14.2508 21.5004 14.4434 21.4902 14.6309C21.4068 16.1663 20.8012 17.6278 19.7744 18.7725C19.6491 18.9121 19.5128 19.0477 19.2803 19.2803C19.0477 19.5128 18.9121 19.6491 18.7725 19.7744C17.6278 20.8012 16.1663 21.4068 14.6309 21.4902C14.4434 21.5004 14.2508 21.5 13.9219 21.5H10.3496C8.68202 21.5 7.38571 21.5008 6.34766 21.416C5.30103 21.3305 4.45049 21.1544 3.68555 20.7646C2.41545 20.1175 1.3825 19.0845 0.735352 17.8145C0.345624 17.0495 0.169528 16.199 0.0839844 15.1523C-0.000828191 14.1143 -9.06348e-08 12.818 0 11.1504V10.3496C-9.06941e-08 8.68202 -0.000828204 7.38571 0.0839844 6.34766C0.169528 5.30103 0.345624 4.45049 0.735352 3.68555C1.3825 2.41545 2.41545 1.3825 3.68555 0.735352C4.45049 0.345624 5.30103 0.169528 6.34766 0.0839844C7.38571 -0.000828204 8.68202 -9.0694e-08 10.3496 0H11.1504ZM10.3496 1.5C8.65753 1.5 7.43345 1.50047 6.4707 1.5791C5.51657 1.65706 4.8846 1.80814 4.36621 2.07227C3.37859 2.57556 2.57556 3.37859 2.07227 4.36621C1.80814 4.8846 1.65706 5.51657 1.5791 6.4707C1.50047 7.43345 1.5 8.65753 1.5 10.3496V11.1504C1.5 12.8425 1.50047 14.0665 1.5791 15.0293C1.65706 15.9834 1.80814 16.6154 2.07227 17.1338C2.57556 18.1214 3.37859 18.9244 4.36621 19.4277C4.8846 19.6919 5.51657 19.8429 6.4707 19.9209C7.43345 19.9995 8.65753 20 10.3496 20H13.9219C14.2666 20 14.4116 19.9996 14.5488 19.9922C15.7432 19.9274 16.8801 19.4569 17.7705 18.6582C17.873 18.5663 17.9755 18.4639 18.2197 18.2197C18.4639 17.9755 18.5663 17.873 18.6582 17.7705C19.4569 16.8801 19.9274 15.7432 19.9922 14.5488C19.9996 14.4116 20 14.2666 20 13.9219V10.3496C20 8.65753 19.9995 7.43345 19.9209 6.4707C19.8429 5.51657 19.6919 4.8846 19.4277 4.36621C18.9244 3.37859 18.1214 2.57556 17.1338 2.07227C16.6154 1.80814 15.9834 1.65706 15.0293 1.5791C14.0665 1.50047 12.8425 1.5 11.1504 1.5H10.3496Z"
                      [attr.fill]="
                        currentTab === 'content' ? 'white' : '#049AD0'
                      "
                    />
                  </svg>
                  <span
                    class="text-sm md:text-base font-medium md:font-semibold whitespace-nowrap"
                    >Features Content</span
                  >
                </button>
              </div>

              <!-- Form Card -->
              <div
                class="bg-white rounded shadow-md border border-[#E9E9E9] p-4 md:p-6 lg:p-8"
              >
                <!-- Logo and Banner Section -->
                <div
                  class="grid grid-cols-1 lg:grid-cols-[1fr_2.5fr] gap-4 lg:gap-6 mb-6"
                >
                  <!-- Logo Upload -->
                  <div class="flex flex-col">
                    <label class="text-base font-medium text-[#878A99] mb-2"
                      >Logo</label
                    >
                    <div
                      class="w-full h-48 md:h-56 lg:h-64 border border-[#CED4DA] rounded flex items-center justify-center bg-white cursor-pointer hover:bg-gray-50 transition-colors"
                      (click)="logoInput.click()"
                    >
                      <img
                        *ngIf="logoPreview"
                        [src]="logoPreview"
                        alt="Logo preview"
                        class="w-full h-full object-contain rounded"
                      />
                      <div
                        *ngIf="!logoPreview"
                        class="flex flex-col items-center justify-center text-gray-400"
                      >
                        <svg
                          width="48"
                          height="48"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          class="mb-2"
                        >
                          <path
                            d="M12 5V19M5 12H19"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                          />
                        </svg>
                        <span class="text-sm">Click to upload logo</span>
                      </div>
                    </div>
                    <input
                      #logoInput
                      type="file"
                      accept="image/*"
                      class="hidden"
                      (change)="onLogoChange($event)"
                    />
                  </div>

                  <!-- Banner Upload -->
                  <div class="flex flex-col">
                    <label class="text-base font-medium text-[#878A99] mb-2"
                      >Banner</label
                    >
                    <div
                      class="w-full h-48 md:h-56 lg:h-64 border border-[#CED4DA] rounded flex items-center justify-center bg-white cursor-pointer hover:bg-gray-50 transition-colors overflow-hidden"
                      (click)="bannerInput.click()"
                    >
                      <img
                        *ngIf="bannerPreview"
                        [src]="bannerPreview"
                        alt="Banner preview"
                        class="w-full h-full object-cover rounded"
                      />
                      <div
                        *ngIf="!bannerPreview"
                        class="flex flex-col items-center justify-center text-gray-400"
                      >
                        <svg
                          width="48"
                          height="48"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          class="mb-2"
                        >
                          <path
                            d="M12 5V19M5 12H19"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                          />
                        </svg>
                        <span class="text-sm">Click to upload banner</span>
                      </div>
                    </div>
                    <input
                      #bannerInput
                      type="file"
                      accept="image/*"
                      class="hidden"
                      (change)="onBannerChange($event)"
                    />
                  </div>
                </div>

                <!-- Event Name Input -->
                <div class="flex flex-col mb-6">
                  <label class="text-base font-medium text-[#878A99] mb-2"
                    >Name of the Event</label
                  >
                  <input
                    type="text"
                    [(ngModel)]="formData.eventName"
                    placeholder="14th Engimach"
                    class="w-full h-10 px-4 border border-[#CED4DA] rounded text-base text-[#686868] placeholder-[#686868] focus:outline-none focus:border-[#049AD0] transition-colors"
                  />
                </div>

                <!-- Footer with divider and Next button -->
                <div class="pt-6 border-t border-[#CED4DA]">
                  <div class="flex justify-end">
                    <button
                      (click)="onNext()"
                      class="flex items-center gap-2 px-5 py-2 bg-[#009FD8] hover:bg-[#0385b5] text-white rounded font-semibold transition-colors"
                    >
                      <span>Next</span>
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M3.75 9H14.25"
                          stroke="white"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M9 3.75L14.25 9L9 14.25"
                          stroke="white"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </button>
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
export class EventSetupComponent implements OnInit {
  eventName = "ENGIMACH 2023";
  activeRoute = "/event/setup";
  backButtonLabel = "Back to KQOL Communication";
  currentTab: "details" | "features" | "content" = "details";

  formData = {
    eventName: "14th Engimach",
    logo: null as File | null,
    banner: null as File | null,
  };

  logoPreview: string | null = null;
  bannerPreview: string | null = null;

  menuItems: MenuItem[] = [
    {
      label: "Dashboard",
      icon: DASHBOARD_ICON,
      route: "/event/dashboard",
      action: () => this.navigateTo("dashboard"),
    },
    {
      label: "Event Setup",
      icon: EVENT_SETUP_ICON,
      route: "/event/setup",
      action: () => this.navigateTo("setup"),
    },
    {
      label: "Event Overview",
      icon: EVENT_OVERVIEW_ICON,
      route: "/event/overview",
      action: () => this.navigateTo("overview"),
    },
    {
      label: "Send Notification",
      icon: `<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path opacity="0.4" fill-rule="evenodd" clip-rule="evenodd" d="M0.750001 0C0.335787 -5.96046e-08 8.19241e-07 0.335786 7.59636e-07 0.75C7.00032e-07 1.16421 0.335787 1.5 0.750001 1.5L8.08333 1.5C8.49755 1.5 8.83333 1.16421 8.83333 0.750001C8.83333 0.335787 8.49755 7.15256e-07 8.08333 7.15256e-07L0.750001 0Z" fill="white"/></svg>`,
      route: "/event/notification",
      action: () => this.navigateTo("notification"),
    },
    {
      label: "User Profile",
      icon: `<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path opacity="0.4" fill-rule="evenodd" clip-rule="evenodd" d="M0.750001 0C0.335787 -5.96046e-08 8.19241e-07 0.335786 7.59636e-07 0.75C7.00032e-07 1.16421 0.335787 1.5 0.750001 1.5L8.08333 1.5C8.49755 1.5 8.83333 1.16421 8.83333 0.750001C8.83333 0.335787 8.49755 7.15256e-07 8.08333 7.15256e-07L0.750001 0Z" fill="white"/></svg>`,
      route: "/event/profile",
      action: () => this.navigateTo("profile"),
    },
    {
      label: "Event Analytics",
      icon: `<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path opacity="0.4" fill-rule="evenodd" clip-rule="evenodd" d="M0.750001 0C0.335787 -5.96046e-08 8.19241e-07 0.335786 7.59636e-07 0.75C7.00032e-07 1.16421 0.335787 1.5 0.750001 1.5L8.08333 1.5C8.49755 1.5 8.83333 1.16421 8.83333 0.750001C8.83333 0.335787 8.49755 7.15256e-07 8.08333 7.15256e-07L0.750001 0Z" fill="white"/></svg>`,
      route: "/event/analytics",
      action: () => this.navigateTo("analytics"),
    },
    {
      label: "Event Theme",
      icon: `<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path opacity="0.4" fill-rule="evenodd" clip-rule="evenodd" d="M0.750001 0C0.335787 -5.96046e-08 8.19241e-07 0.335786 7.59636e-07 0.75C7.00032e-07 1.16421 0.335787 1.5 0.750001 1.5L8.08333 1.5C8.49755 1.5 8.83333 1.16421 8.83333 0.750001C8.83333 0.335787 8.49755 7.15256e-07 8.08333 7.15256e-07L0.750001 0Z" fill="white"/></svg>`,
      route: "/event/theme",
      action: () => this.navigateTo("theme"),
    },
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (params["eventName"]) {
        this.eventName = params["eventName"];
      }
    });

    this.updateActiveRoute();

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updateActiveRoute();
      });
  }

  updateActiveRoute() {
    const url = this.router.url;
    if (url.includes("/dashboard")) {
      this.activeRoute = "/event/dashboard";
    } else if (url.includes("/setup")) {
      this.activeRoute = "/event/setup";
    } else if (url.includes("/overview")) {
      this.activeRoute = "/event/overview";
    } else if (url.includes("/notification")) {
      this.activeRoute = "/event/notification";
    } else if (url.includes("/profile")) {
      this.activeRoute = "/event/profile";
    } else if (url.includes("/analytics")) {
      this.activeRoute = "/event/analytics";
    } else if (url.includes("/theme")) {
      this.activeRoute = "/event/theme";
    }
  }

  navigateTo(page: string) {
    const eventId = this.route.snapshot.paramMap.get("id");
    switch (page) {
      case "dashboard":
        this.activeRoute = "/event/dashboard";
        this.router.navigate([`/event/${eventId}/dashboard`]);
        break;
      case "overview":
        this.activeRoute = "/event/overview";
        this.router.navigate([`/event/${eventId}/overview`]);
        break;
      case "setup":
        this.activeRoute = "/event/setup";
        break;
      case "notification":
        this.activeRoute = "/event/notification";
        break;
      case "profile":
        this.activeRoute = "/event/profile";
        break;
      case "analytics":
        this.activeRoute = "/event/analytics";
        break;
      case "theme":
        this.activeRoute = "/event/theme";
        break;
    }
  }

  onBackToDashboard() {
    this.router.navigate(["/dashboard"]);
  }

  onLogout() {
    this.router.navigate(["/"]);
  }

  onLogoChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.formData.logo = file;

      const reader = new FileReader();
      reader.onload = (e) => {
        this.logoPreview = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onBannerChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.formData.banner = file;

      const reader = new FileReader();
      reader.onload = (e) => {
        this.bannerPreview = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onNext() {
    if (this.currentTab === "details") {
      this.currentTab = "features";
    } else if (this.currentTab === "features") {
      this.currentTab = "content";
    } else {
      console.log("Form submitted:", this.formData);
    }
  }
}
