import { Component, inject, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../../../core/services/auth.service';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-adoption-preferences',
    standalone: true,
    imports: [ReactiveFormsModule, NgIf],
    templateUrl: './adoption-preferences.component.html',
    styleUrl: '../../../register.component.css'
})
export class AdoptionPreferencesComponent implements OnInit, OnDestroy{
    // Propriétés
    formData: any;
    isSubmitted = false;

    // Services
    router = inject(Router);
    renderer = inject(Renderer2);
    authService = inject(AuthService);

    ngOnInit(): void {
        this.renderer.addClass(document.body, 'no-padding');

        // Pré-remplis les input si retour
        const savedData = this.authService.loadStepData('step4');
        if (savedData) {
            this.registerForm.patchValue(savedData);
        }
    }
    ngOnDestroy(): void {
        this.renderer.removeClass(document.body, 'no-padding');
    }

    // Formulaire avec validations
    public registerForm: FormGroup = new FormGroup({
        animauxPreferes: new FormControl('', [Validators.required]),
        raceSouhaite: new FormControl('', [Validators.required]),
        ageSouhaite: new FormControl('', [Validators.required]),
        sexeSouhaite: new FormControl('', [Validators.required]),
    });

    // Fonction attachée au bouton précédent
    goBack() {
        this.authService.saveStepData('step4', this.registerForm.value);
        this.router.navigate(['register/customer/householdInformation']);
    }

    // Soumission du formulaire
    onSubmit() {
        this.isSubmitted = true;
            if (this.registerForm.valid) {

            const formData = this.registerForm.value;

            this.authService.saveStepData('step4', formData);
        
            this.authService.updateClient(formData).subscribe({
                next: () => {
                    this.router.navigate(['/register/customer/engagement']);
                },
                error: (err) => {
                    console.error('Erreur update step 4 :', err);
                }
            });
        }
    };
}
