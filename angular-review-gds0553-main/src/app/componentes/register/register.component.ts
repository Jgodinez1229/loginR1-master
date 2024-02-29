import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../servicios/auth.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, 
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router) {
    this.registerForm = this.fb.group({
      nombre: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    });
  }

  get email() {
    return this.registerForm.controls['email'];
  }

  get nombre() {
    return this.registerForm.controls['nombre'];
  }

  get password() {
    return this.registerForm.controls['password'];
  }

  get confirmPassword() {
    return this.registerForm.controls['confirmPassword'];
  }

  enviarUsuario() {
    if (this.registerForm.valid) {
      const datos = this.registerForm.value;
      delete datos.confirmPassword;
  
      this.authService.registerUser(datos).subscribe(
        response => {
          this.messageService.add({
            severity: 'success',
            summary: 'Registro exitoso',
            detail: 'El usuario ha sido registrado con éxito'
          });
          this.router.navigate(['/login']);
        },
        error => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error al dar de alta al usuario',
            detail: 'Hubo un error al agregar el usuario. Consulte al administrador.'
          });
        }
      );
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error en el formulario',
        detail: 'Por favor complete el formulario correctamente.'
      });
    }
  }
  
}
