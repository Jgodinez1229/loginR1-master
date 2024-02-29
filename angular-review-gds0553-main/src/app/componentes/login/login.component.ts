import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../servicios/auth.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    contraseña: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {}

  get email() {
    return this.loginForm.controls['email'];
  }

  get password() {
    return this.loginForm.controls['contraseña'];
  }

  login() {
    const email = this.loginForm.get('email')?.value;
    const contraseña = this.loginForm.get('contraseña')?.value;

    if (email && contraseña) {
      this.authService.loginUser({ email, contraseña }).subscribe(
        (response: any) => {
          if (response) {
            sessionStorage.setItem('email', email as string);
            this.router.navigate(['/home']);
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Error al iniciar sesión',
              detail: 'Datos incorrectos',
            });
          }
        },
        (error: any) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error al iniciar sesión',
            detail: 'Datos incorrectos',
          });
        }
      );
    }
  }
}
