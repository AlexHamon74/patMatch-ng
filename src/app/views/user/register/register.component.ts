import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
    router = inject(Router);

    // Formulaire avec validations
    public registerForm: FormGroup = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.pattern(/\d/)]),
        nom: new FormControl('', [Validators.required]),
        prenom: new FormControl('', [Validators.required]),
        dateDeNaissance: new FormControl('', [Validators.required]),
        roles: new FormControl([], [Validators.required]),
    });

    // Soumission du formulaire
    // Récupère les données du formulaire et les envoie à la page suivante
    onSubmit() {
        this.isSubmitted = true;
        if (this.registerForm.valid) {
            const formData = this.registerForm.value;
            this.router.navigate(['register/breeder/generalInformation'], {
                state: { formData }
            });
        }
    };

    // Vérification des champs
    public hasError(controlName: string, errorName: string) {
        return this.registerForm.controls[controlName].hasError(errorName);
    };

}
