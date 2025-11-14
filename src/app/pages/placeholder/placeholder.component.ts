import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLink, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-placeholder",
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: "./placeholder.component.html",
  styleUrl: "./placeholder.component.css",
})
export class PlaceholderComponent implements OnInit {
  title = "Page Coming Soon";

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.title = this.route.snapshot.data["title"] || "Page Coming Soon";
  }
}
