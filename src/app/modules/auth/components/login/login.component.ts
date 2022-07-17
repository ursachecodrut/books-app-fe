import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('', Validators.email),
    password: new FormControl(''),
  });

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {}

  login(): void {
    const email = this.loginForm.value.email!;
    const password = this.loginForm.value.password!;
    console.log(email);
    this.auth.login({ email, password }).subscribe((token) => {
      console.log(token);
      this.router.navigate(['/'], { queryParams: { loggedin: 'success' } });
    });
  }
}
