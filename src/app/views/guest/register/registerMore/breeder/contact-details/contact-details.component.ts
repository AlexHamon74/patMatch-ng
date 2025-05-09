import { Component, inject, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../../../core/services/auth.service';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-contact-details',
    standalone: true,
    imports: [ReactiveFormsModule, NgIf],
    templateUrl: './contact-details.component.html',
    styleUrl: '../../../register.component.css'
})
export class ContactDetailsComponent implements OnInit, OnDestroy {
    // Propriétés
    formData: any;
    isSubmitted = false;

    // Services
    router = inject(Router);
    renderer = inject(Renderer2);
    authService = inject(AuthService);

    ngOnInit(): void {
        this.renderer.addClass(document.body, 'no-padding');

        // Pré-remplis les champ si on fais retour
        const savedData = this.authService.loadStepData('step2');
        if (savedData) {
            this.registerForm.patchValue(savedData);
        }
    }
    ngOnDestroy(): void {
        this.renderer.removeClass(document.body, 'no-padding');
    }

    // Formulaire
    public registerForm: FormGroup = new FormGroup({
        adresse: new FormControl('', [Validators.required]),
        numeroDeTelephone: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
        adresseElevage: new FormControl('', [Validators.required]),
    });

    // Fonction attachée au bouton précédent
    goBack() {
        this.authService.saveStepData('step2', this.registerForm.value);
        this.router.navigate(['register/breeder/generalInformationBreeder']);
    }

    // Soumission du formulaire
    onSubmit() {
        this.isSubmitted = true;
        if (this.registerForm.valid) {
            const formData = this.registerForm.value;

            this.authService.saveStepData('step2', formData);
        
            this.authService.updateEleveur(formData).subscribe({
                next: () => {
                    this.router.navigate(['/register/breeder/praticalInformationPart1']);
                },
                error: (err) => {
                    console.error('Erreur update step 2 :', err);
                }
            });
        }
    };

    // Vérification des champs a validation multiples
    public hasError(controlName: string, errorName: string) {
        return this.registerForm.controls[controlName].hasError(errorName);
    };
}
