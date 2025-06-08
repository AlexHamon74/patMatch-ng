import { Component, inject, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../../../core/services/auth.service';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-general-information-breeder',
    standalone: true,
    imports: [ReactiveFormsModule, NgIf],
    templateUrl: './general-information-breeder.component.html',
    styleUrl: '../../../register.component.css'
})
export class GeneralInformationBreederComponent implements OnInit, OnDestroy{
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
        const savedData = this.authService.loadStepData('step1');
        if (savedData) {
            this.registerForm.patchValue(savedData);
        }
    }
    ngOnDestroy(): void {
        this.renderer.removeClass(document.body, 'no-padding');
    }

    // Formulaire avec validations
    public registerForm: FormGroup = new FormGroup({
        nom: new FormControl('', [Validators.required]),
        prenom: new FormControl('', [Validators.required]),
        nomElevageAssociation: new FormControl('', [Validators.required]),
        numeroEnregistrement: new FormControl('', [Validators.required]),
        presentation: new FormControl('', [Validators.required]),
    });

    // Soumission du formulaire
    onSubmit() {
        this.isSubmitted = true;
        if (this.registerForm.valid) {

            const formData = this.registerForm.value;

            // Sauvegarde temporaire
            this.authService.saveStepData('step1', formData);
        
            // Envoie la mise à jour à l'API
            this.authService.updateEleveur(formData).subscribe({
                next: () => {
                    this.router.navigate(['register/breeder/contactDetails']);
                },
                error: (err) => {
                    console.error('Erreur update step 1 :', err);
                }
            });
        }
    };
}
