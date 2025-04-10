import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']

})
export class AccountComponent implements OnInit {
  user: any;
  passwordVisible: boolean = false;
  newpasswordVisible: boolean = false;
  confirmpasswordVisible: boolean = false;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.user = this.authService.getUser();
    if (this.user) {
      console.log(' user data:', this.user);
    } else {
      console.log('No user data ');
    }
  }
  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }
  newtogglePasswordVisibility() {
    this.newpasswordVisible = !this.newpasswordVisible;
  }
  confirmtogglePasswordVisibility() {
    this.confirmpasswordVisible = !this.confirmpasswordVisible;
  }
  logout() {
    this.authService.logout();
  }
}
