import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Testimonial, TestimonialFormData } from '../models/testimonial';

@Injectable({
  providedIn: 'root',
})
export class TestimonialService {
  private testimonials: Testimonial[] = [];
  private testimonialsSubject = new BehaviorSubject<Testimonial[]>([]);

  constructor() {
    this.loadTestimonialsFromStorage();
  }

  /**
   * Get testimonials as observable
   */
  getTestimonials(): Observable<Testimonial[]> {
    return this.testimonialsSubject.asObservable();
  }

  /**
   * Get all testimonials (snapshot)
   */
  getAllTestimonials(): Testimonial[] {
    return [...this.testimonials];
  }

  /**
   * Add a new testimonial
   */
  addTestimonial(data: TestimonialFormData): Testimonial {
    const fullName = `${data.firstName} ${data.lastName}`.trim();
    const newTestimonial: Testimonial = {
      id: Date.now().toString(),
      srNo: this.testimonials.length + 1,
      firstName: data.firstName,
      lastName: data.lastName,
      name: fullName,
      company: data.company,
      designation: data.designation,
      testimonialsFor: data.testimonialsFor,
      message: data.message,
      profileImage: data.profileImage,
      profilePreview: data.profilePreview,
      isExhibitor: data.isExhibitor,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.testimonials.push(newTestimonial);
    this.updateStorage();
    this.testimonialsSubject.next([...this.testimonials]);

    return newTestimonial;
  }

  /**
   * Update an existing testimonial
   */
  updateTestimonial(id: string, data: TestimonialFormData): Testimonial | null {
    const index = this.testimonials.findIndex((t) => t.id === id);
    if (index === -1) return null;

    const fullName = `${data.firstName} ${data.lastName}`.trim();
    const updatedTestimonial: Testimonial = {
      ...this.testimonials[index],
      firstName: data.firstName,
      lastName: data.lastName,
      name: fullName,
      company: data.company,
      designation: data.designation,
      testimonialsFor: data.testimonialsFor,
      message: data.message,
      profileImage: data.profileImage || this.testimonials[index].profileImage,
      profilePreview: data.profilePreview || this.testimonials[index].profilePreview,
      isExhibitor: data.isExhibitor,
      updatedAt: new Date(),
    };

    this.testimonials[index] = updatedTestimonial;
    this.updateStorage();
    this.testimonialsSubject.next([...this.testimonials]);

    return updatedTestimonial;
  }

  /**
   * Delete a testimonial
   */
  deleteTestimonial(id: string): boolean {
    const index = this.testimonials.findIndex((t) => t.id === id);
    if (index === -1) return false;

    this.testimonials.splice(index, 1);
    this.updateStorage();
    this.reorderTestimonials();
    this.testimonialsSubject.next([...this.testimonials]);

    return true;
  }

  /**
   * Get testimonial by ID
   */
  getTestimonialById(id: string): Testimonial | undefined {
    return this.testimonials.find((t) => t.id === id);
  }

  /**
   * Search testimonials
   */
  searchTestimonials(query: string): Testimonial[] {
    if (!query.trim()) return [...this.testimonials];

    const lowerQuery = query.toLowerCase();
    return this.testimonials.filter(
      (t) =>
        t.name.toLowerCase().includes(lowerQuery) ||
        t.company.toLowerCase().includes(lowerQuery) ||
        t.designation.toLowerCase().includes(lowerQuery) ||
        t.message.toLowerCase().includes(lowerQuery)
    );
  }

  /**
   * Filter testimonials by type
   */
  filterByType(type: string): Testimonial[] {
    if (!type) return [...this.testimonials];
    return this.testimonials.filter((t) => t.testimonialsFor === type);
  }

  /**
   * Clear all testimonials
   */
  clearAll(): void {
    this.testimonials = [];
    this.updateStorage();
    this.testimonialsSubject.next([]);
  }

  /**
   * Load testimonials from localStorage
   */
  private loadTestimonialsFromStorage(): void {
    try {
      const stored = localStorage.getItem('app_testimonials');
      if (stored) {
        const parsed = JSON.parse(stored);
        // Filter out any empty or invalid testimonials
        this.testimonials = parsed.filter((t: Testimonial) =>
          t && t.name && t.name.trim().length > 0 &&
          t.company && t.company.trim().length > 0 &&
          t.designation && t.designation.trim().length > 0
        );
        // Reorder after filtering
        this.reorderTestimonials();
        this.testimonialsSubject.next([...this.testimonials]);
      }
    } catch (error) {
      console.error('Error loading testimonials from storage:', error);
      this.testimonials = [];
    }
  }

  /**
   * Save testimonials to localStorage
   */
  private updateStorage(): void {
    try {
      localStorage.setItem('app_testimonials', JSON.stringify(this.testimonials));
    } catch (error) {
      console.error('Error saving testimonials to storage:', error);
    }
  }

  /**
   * Reorder testimonials by srNo
   */
  private reorderTestimonials(): void {
    this.testimonials.forEach((t, index) => {
      t.srNo = index + 1;
    });
  }
}
