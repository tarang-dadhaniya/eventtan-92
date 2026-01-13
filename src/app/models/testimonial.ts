export interface Testimonial {
  id: string;
  srNo: number;
  firstName: string;
  lastName: string;
  name: string;
  company: string;
  designation: string;
  testimonialsFor: string;
  message: string;
  profileImage?: File | null;
  profilePreview?: string | null;
  isExhibitor: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface TestimonialFormData {
  firstName: string;
  lastName: string;
  company: string;
  designation: string;
  isExhibitor: boolean;
  testimonialsFor: string;
  message: string;
  profileImage: File | null;
  profilePreview?: string | null;
}
