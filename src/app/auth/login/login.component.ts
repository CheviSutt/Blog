import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  loadingSpinner = false;

  constructor(public authService: AuthService) {}


  onLogin(form: NgForm) {
    // console.log(form.value);
    if (form.invalid) {
      return;
    }
    this.loadingSpinner = true;
    this.authService.loginConfirm(form.value.email, form.value.password);
  }
}
