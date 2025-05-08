import { Component, inject, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../../../core/services/auth.service';

@Component({
    selector: 'app-adoption-preferences',
    standalone: true,
    imports: [ReactiveFormsModule],
    templateUrl: './adoption-preferences.component.html',
    styleUrl: '../../../register.component.css'
})
export class AdoptionPreferencesComponent implements OnInit, OnDestroy{
    // Propriétés
    formData: any;

    // Services
    router = inject(Router);
    renderer = inject(Renderer2);
    authService = inject(AuthService);

    ngOnInit(): void {
        this.renderer.addClass(document.body, 'no-padding');
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
        typeLogement: new FormControl,
        espaceExterieur: new FormControl,
        typeEnvironnement: new FormControl,
    });

    goBack() {
        this.authService.saveStepData('step4', this.registerForm.value);
        this.router.navigate(['register/customer/householdInformation']);
    }

    // Soumission du formulaire
    onSubmit() {
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
    };

}
