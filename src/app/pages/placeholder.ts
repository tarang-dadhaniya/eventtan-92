import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-placeholder',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div class="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8 lg:p-12 text-center">
        <div class="mb-6">
          <svg class="w-24 h-24 mx-auto text-primary-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
          </svg>
        </div>

        <h1 class="text-3xl lg:text-4xl font-bold text-text-dark mb-4">
          {{ title }}
        </h1>

        <p class="text-lg text-form-gray mb-8">
          This page is coming soon. Continue building to add content here.
        </p>

        <a
          routerLink="/"
          class="inline-block px-8 py-3 bg-primary-blue hover:bg-[#0385b5] text-white font-semibold rounded-lg transition-colors"
        >
          Back to Sign In
        </a>
      </div>
    </div>
  `,
  styles: []
})
export class PlaceholderComponent implements OnInit {
  title = 'Page Coming Soon';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.title = this.route.snapshot.data['title'] || 'Page Coming Soon';
  }
}
