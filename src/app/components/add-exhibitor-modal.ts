import { Component, Input, Output, EventEmitter } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-add-exhibitor-modal",
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <!-- Modal Backdrop -->
    <div
      *ngIf="isOpen"
      class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4"
      (click)="onCancel()"
    >
      <!-- Modal Container -->
      <div
        class="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        (click)="$event.stopPropagation()"
      >
        <!-- Modal Header -->
        <div class="sticky top-0 bg-white border-b border-[#CED4DA] px-8 py-6">
          <h2 class="text-[22px] font-medium text-[#3F4254]">
            {{ editMode ? "Edit Exhibitor" : "Add Exhibitor" }}
          </h2>
        </div>

        <!-- Modal Body -->
        <form class="p-8" (ngSubmit)="onSubmit()">
          <!-- Company Info Row -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <!-- Company Name -->
            <div>
              <label class="block text-base font-medium text-[#212529] mb-2">
                Company Name
                <span class="text-red-500">*</span>
              </label>
              <input
                type="text"
                [(ngModel)]="formData.companyName"
                name="companyName"
                placeholder="Enter company name"
                class="w-full px-4 py-2 border border-[#CED4DA] rounded focus:outline-none focus:ring-2 focus:ring-[#049AD0] text-[#212529]"
              />
            </div>

            <!-- Hall No -->
            <div>
              <label class="block text-base font-medium text-[#212529] mb-2">
                Hall No.
                <span class="text-red-500">*</span>
              </label>
              <input
                type="text"
                [(ngModel)]="formData.hallNo"
                name="hallNo"
                placeholder="e.g., 1, 3, 5"
                class="w-full px-4 py-2 border border-[#CED4DA] rounded focus:outline-none focus:ring-2 focus:ring-[#049AD0] text-[#212529]"
              />
            </div>
          </div>

          <!-- Stall and Registration Row -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <!-- Stall No -->
            <div>
              <label class="block text-base font-medium text-[#212529] mb-2">
                Stall No.
                <span class="text-red-500">*</span>
              </label>
              <input
                type="text"
                [(ngModel)]="formData.stallNo"
                name="stallNo"
                placeholder="e.g., 4A, 6C"
                class="w-full px-4 py-2 border border-[#CED4DA] rounded focus:outline-none focus:ring-2 focus:ring-[#049AD0] text-[#212529]"
              />
            </div>

            <!-- Registration Code -->
            <div>
              <label class="block text-base font-medium text-[#212529] mb-2">
                Registration Code
                <span class="text-red-500">*</span>
              </label>
              <input
                type="text"
                [(ngModel)]="formData.registrationCode"
                name="registrationCode"
                placeholder="e.g., 13BAC4"
                class="w-full px-4 py-2 border border-[#CED4DA] rounded focus:outline-none focus:ring-2 focus:ring-[#049AD0] text-[#212529]"
              />
            </div>
          </div>

          <!-- Company Logo -->
          <div class="mb-6">
            <label class="block text-base font-medium text-[#212529] mb-2">
              Company Logo
            </label>
            <input
              type="file"
              (change)="onLogoSelected($event)"
              accept="image/*"
              class="w-full px-4 py-2 border border-[#CED4DA] rounded focus:outline-none focus:ring-2 focus:ring-[#049AD0]"
            />
            <p class="text-sm text-[#878A99] mt-1">
              Supported formats: JPG, PNG. Max size: 5MB
            </p>
          </div>

          <!-- Modal Footer -->
          <div class="flex justify-end gap-3 pt-6 border-t border-[#CED4DA]">
            <button
              type="button"
              (click)="onCancel()"
              class="px-5 py-2 border border-[#CED4DA] rounded text-[#212529] font-semibold hover:bg-[#F5F5F5] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="px-5 py-2 bg-[#049AD0] hover:bg-[#0385b5] text-white rounded font-semibold transition-colors"
            >
              {{ editMode ? "Update" : "Add" }} Exhibitor
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [],
})
export class AddExhibitorModalComponent {
  @Input() isOpen = false;
  @Input() editMode = false;
  @Input() set exhibitorData(data: any) {
    if (data) {
      this.formData = {
        companyName: data.companyName || "",
        hallNo: data.hallNo || "",
        stallNo: data.stallNo || "",
        registrationCode: data.registrationCode || "",
        companyLogo: data.companyLogo || "",
      };
    }
  }

  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();

  formData = {
    companyName: "",
    hallNo: "",
    stallNo: "",
    registrationCode: "",
    companyLogo: "",
  };

  onLogoSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        this.formData.companyLogo = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (!this.validateForm()) {
      return;
    }
    this.save.emit(this.formData);
    this.resetForm();
  }

  onCancel() {
    this.close.emit();
    this.resetForm();
  }

  private validateForm(): boolean {
    if (!this.formData.companyName.trim()) {
      alert("Please enter company name");
      return false;
    }
    if (!this.formData.hallNo.trim()) {
      alert("Please enter hall number");
      return false;
    }
    if (!this.formData.stallNo.trim()) {
      alert("Please enter stall number");
      return false;
    }
    if (!this.formData.registrationCode.trim()) {
      alert("Please enter registration code");
      return false;
    }
    return true;
  }

  private resetForm() {
    this.formData = {
      companyName: "",
      hallNo: "",
      stallNo: "",
      registrationCode: "",
      companyLogo: "",
    };
  }
}
