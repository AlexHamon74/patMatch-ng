import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [ReactiveFormsModule, NgIf],
    templateUrl: './register.component.html',
    styleUrl: './register.component.css'
})
export class RegisterComponent {
    // Propriétés
    isSubmitted = false;

    // Services
    authService = inject(AuthService);
    router = inject(Router);

    // Formulaire avec validations
    public registerForm: FormGroup = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.pattern(/\d/)]),
        nom: new FormControl('', [Validators.required]),
        prenom: new FormControl('', [Validators.required]),
        dateDeNaissance: new FormControl('', [Validators.required]),
    });

    // Soumission du formulaire
    onSubmit() {
        this.isSubmitted = true;
        if (this.registerForm.valid) {
            console.log(this.registerForm.value);
            this.authService.register(this.registerForm.value).subscribe({
                next: () => {
                    this.router.navigate(['login']);
                },
            });
        };
    };

    // Vérification des champs
    public hasError(controlName: string, errorName: string) {
        return this.registerForm.controls[controlName].hasError(errorName);
    };

}
