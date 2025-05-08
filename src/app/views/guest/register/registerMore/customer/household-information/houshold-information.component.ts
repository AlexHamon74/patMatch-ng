import { Component, inject, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../../../core/services/auth.service';

@Component({
    selector: 'app-household-information',
    standalone: true,
    imports: [ReactiveFormsModule],
    templateUrl: './household-information.component.html',
    styleUrl: '../../../register.component.css'
})
export class HouseholdInformationComponent implements OnInit, OnDestroy{
    // Propriétés
    formData: any;

    // Services
    router = inject(Router);
    renderer = inject(Renderer2);
    authService = inject(AuthService);

    ngOnInit(): void {
        this.renderer.addClass(document.body, 'no-padding');
        const savedData = this.authService.loadStepData('step3');
        if (savedData) {
            this.registerForm.patchValue(savedData);
        }
    }
    ngOnDestroy(): void {
        this.renderer.removeClass(document.body, 'no-padding');
    }

    // Formulaire avec validations
    public registerForm: FormGroup = new FormGroup({
        typeLogement: new FormControl,
        espaceExterieur: new FormControl,
        typeEnvironnement: new FormControl,
    });

    goBack() {
        this.authService.saveStepData('step3', this.registerForm.value);
        this.router.navigate(['register/customer/housingInformation']);
    }

    // Soumission du formulaire
    onSubmit() {
        const formData = this.registerForm.value;

        this.authService.saveStepData('step3', formData);
    
        this.authService.updateClient(formData).subscribe({
            next: () => {
                this.router.navigate(['/register/customer/adoptionPreferences']);
            },
            error: (err) => {
                console.error('Erreur update step 3 :', err);
            }
        });
    };

}
