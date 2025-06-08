import { Component, inject, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../../../core/services/auth.service';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-pratical-information-part2',
    standalone: true,
    imports: [ReactiveFormsModule, NgIf],
    templateUrl: './pratical-information-part2.component.html',
    styleUrl: '../../../register.component.css'
})
export class praticalInformationPart2Component implements OnInit, OnDestroy{
    // Propriétés
    formData: any;
    isSubmitted = false;

    // Services
    router = inject(Router);
    renderer = inject(Renderer2);
    authService = inject(AuthService);

    ngOnInit(): void {
        this.renderer.addClass(document.body, 'no-padding');

        // Pré-remplis les champ si retour
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
        conditionAdoption: new FormControl('', [Validators.required]),
        suiviPostAdoption: new FormControl,
        suiviPostAdoptionDuree: new FormControl,
    });

    // Fonction attachée au bouton précédent
    goBack() {
        this.authService.saveStepData('step4', this.registerForm.value);
        this.router.navigate(['register/breeder/praticalInformationPart1']);
    }

    // Soumission du formulaire
    onSubmit() {
        this.isSubmitted = true;
        if (this.registerForm.valid) {
            const formData = this.registerForm.value;

            this.authService.saveStepData('step4', formData);
        
            this.authService.updateEleveur(formData).subscribe({
                next: () => {
                    this.router.navigate(['/register/breeder/photoProfil']);
                },
                error: (err) => {
                    console.error('Erreur update step 4 :', err);
                }
            });
        }
    };
}
