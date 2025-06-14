import { NgIf } from '@angular/common';
import { Component, inject, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [ReactiveFormsModule, NgIf, RouterLink],
    templateUrl: './register.component.html',
    styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit, OnDestroy {
    // Propriétés
    isSubmitted = false;
    errorMessage: string | null = null;

    // Services
    router = inject(Router);
    renderer = inject(Renderer2);
    authService = inject(AuthService);

    ngOnInit(): void {
        this.renderer.addClass(document.body, 'no-padding');
    }
    ngOnDestroy(): void {
        this.renderer.removeClass(document.body, 'no-padding');
    }

    // Formulaire avec validations
    public registerForm: FormGroup = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.pattern(/\d/)]),
        roles: new FormControl([], [Validators.required]),
    });

    // Soumission du formulaire et enregistrement de l'utilisateur
    onSubmit() {
        this.isSubmitted = true;

        if (this.registerForm.valid) {
            const formData = this.registerForm.value;

            // On récupère le rôle principal dès le départ
            const isEleveur = formData.roles.includes('ROLE_ELEVEUR');

            // On appelle la méthode spécifique en fonction du rôle
            if (isEleveur) {
                this.registerEleveur(formData);
            } else {
                this.registerClient(formData);
            }
        }
    }

    // Fonction pour enregistrer un eleveur
    private registerEleveur(formData: any) {
        this.authService.registerEleveur(formData).subscribe({
            next: (createdUser) => {
                this.authService.saveRegisteringUserId(createdUser.id);
                this.router.navigate(['register/breeder/generalInformationBreeder'], {
                    state: { formData }
                });
            },
            error: (error) => this.handleRegisterError(error)
        });
    }

    // Fonction pour enregistrer un adptant
    private registerClient(formData: any) {
        this.authService.registerClient(formData).subscribe({
            next: (createdUser) => {
                this.authService.saveRegisteringUserId(createdUser.id);
                this.router.navigate(['register/customer/generalInformation'], {
                    state: { formData }
                });
            },
            error: (error) => this.handleRegisterError(error)
        });
    }

    // Fonction pour vérifier si email unique
    private handleRegisterError(error: any) {
        if (error.error.violations) {
            const violation = error.error.violations.find((v: any) => v.propertyPath === 'email');
            this.errorMessage = violation?.message || 'Une erreur est survenue.';
        }
    }

    // Vérification des champs a validation multiples
    public hasError(controlName: string, errorName: string) {
        return this.registerForm.controls[controlName].hasError(errorName);
    };

}
