import { Component, inject, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../../../core/services/auth.service';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-engagement-breeder',
    standalone: true,
    imports: [ReactiveFormsModule, NgIf],
    templateUrl: './engagement-breeder.component.html',
    styleUrl: '../../../register.component.css'
})
export class EngagementBreederComponent implements OnInit, OnDestroy{
    // Propriétés
    formData: any;
    isSubmitted = false;

    // Services
    router = inject(Router);
    renderer = inject(Renderer2);
    authService = inject(AuthService);

    ngOnInit(): void {
        this.renderer.addClass(document.body, 'no-padding');

        // Pré remplis les champs si retour
        const savedData = this.authService.loadStepData('step5');
        if (savedData) {
            this.registerForm.patchValue(savedData);
        }
    }
    ngOnDestroy(): void {
        this.renderer.removeClass(document.body, 'no-padding');
    }

    // Formulaire avec validations
    public registerForm: FormGroup = new FormGroup({
        charteQualite: new FormControl(false, [Validators.requiredTrue]),
        cgu: new FormControl(false, [Validators.requiredTrue]),
        traitementDonnees: new FormControl(false, [Validators.requiredTrue]),
    });

    // Fonction attachée au bouton précédent
    goBack() {
        this.authService.saveStepData('step5', this.registerForm.value);
        this.router.navigate(['register/breeder/praticalInformationPart2']);
    }

    // Soumission du formulaire
    onSubmit() {
        this.isSubmitted = true;
    
        if (this.registerForm.valid) {
            this.authService.clearRegisteringUser();
    
            this.router.navigate(['/login'], {
                state: { accountCreated: true }
            });
        }
    }
}
