import { Component, inject, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../core/services/user.service';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [ReactiveFormsModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit, OnDestroy {
    // Propriétés
    errorMessage: string | null = null;
    successMessage: string | null = null;
    isSubmitted = false;

    // Services
    authService = inject(AuthService);
    userService = inject(UserService);
    router = inject(Router);
    renderer = inject(Renderer2);

    ngOnInit(): void {
        this.renderer.addClass(document.body, 'no-padding');

        // Si on arrive sur cette page après register, affiche une alert
        const state = history.state as { accountCreated?: boolean };

        if (state?.accountCreated) {
            this.successMessage = 'Votre compte a bien été créé. Vous pouvez maintenant vous connecter.';
        }
    }
    ngOnDestroy(): void {
        this.renderer.removeClass(document.body, 'no-padding');
    }


    // Formulaire avec validations
    public loginForm: FormGroup = new FormGroup({
        username: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required)
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

                    // Redirige l'utilisateur vers la page appropriée en fonction de son rôle
                    if (this.userService.hasRole('ROLE_ELEVEUR')) {
                        this.router.navigate(['breeder/dashboard']);
                    } else if (this.userService.hasRole('ROLE_CLIENT')) {
                        this.router.navigate(['home']);
                    } else {
                        this.router.navigate(['home']);
                    }
                },
                error: () => {
                    this.errorMessage = 'Votre identifiant ou votre mot de passe est incorrect.';
                }
            });
        }
    };
}
