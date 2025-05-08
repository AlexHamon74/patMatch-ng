import { Component, inject, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../../../core/services/auth.service';

@Component({
    selector: 'app-general-information-customer',
    standalone: true,
    imports: [ReactiveFormsModule],
    templateUrl: './general-information.component.html',
    styleUrl: '../../../register.component.css'
})
export class GeneralInformationCustomerComponent implements OnInit, OnDestroy{
    // Propriétés
    formData: any;

    // Services
    router = inject(Router);
    renderer = inject(Renderer2);
    authService = inject(AuthService);

    ngOnInit(): void {
        this.renderer.addClass(document.body, 'no-padding');
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
        prenom: new FormControl,
        nom: new FormControl,
        dateDeNaissance: new FormControl,     
        numeroDeTelephone: new FormControl,     
        adresse: new FormControl,     
    });

    // Soumission du formulaire
    onSubmit() {
        const formData = this.registerForm.value;

        // Sauvegarde temporaire (utile pour bouton retour)
        this.authService.saveStepData('step1', formData);
    
        // Envoie la mise à jour à l'API
        this.authService.updateClient(formData).subscribe({
            next: () => {
                this.router.navigate(['register/customer/housingInformation']);
            },
            error: (err) => {
                console.error('Erreur update step 1 :', err);
            }
        });
    };

}
