import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  routeLink: string = '/register';

  constructor() { }


  login() {
    if (this.email === '') {
      console.error('Please enter your email');
      alert('Please enter your email');
      return;
    }

    if (this.password === '') {
      console.error('Please enter your password');
      alert('Please enter your password');
      return;
    }

    console.log('email: ', this.email);
    console.log('password: ', this.password);
  }
}
