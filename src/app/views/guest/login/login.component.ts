import { Component, inject, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [ReactiveFormsModule, NgIf],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit, OnDestroy {
    // Propriétés
    errorMessage: string | null = null;
    isSubmitted = false;

    // Services
    authService = inject(AuthService);
    router = inject(Router);
    renderer = inject(Renderer2);

    ngOnInit(): void {
        this.renderer.addClass(document.body, 'no-padding');
    }
    ngOnDestroy(): void {
        this.renderer.removeClass(document.body, 'no-padding');
    }


    // Formulaire avec validations
    public loginForm: FormGroup = new FormGroup({
        username: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required,])
    });

    // Soumission du formulaire
    onSubmit(): void {
        this.isSubmitted = true;
        this.errorMessage = null;
        if (this.loginForm.valid) {
            const { username, password } = this.loginForm.value;
            this.authService.login({ username, password }).subscribe({
                next: (token) => {
                    this.authService.saveToken(token);
                    this.router.navigate(['home']);
                },
                error: () => {
                    this.errorMessage = 'Votre identifiant ou votre mot de passe est incorrect.';
                }
            });
        }
    };

    // Vérification des champs
    public hasError(controlName: string, errorName: string) {
        return this.loginForm.controls[controlName].hasError(errorName);
    };
}
