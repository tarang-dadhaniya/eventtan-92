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
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.css",
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
