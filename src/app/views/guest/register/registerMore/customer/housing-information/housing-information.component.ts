import { Component, inject, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../../../core/services/auth.service';

@Component({
    selector: 'app-housing-information',
    standalone: true,
    imports: [ReactiveFormsModule],
    templateUrl: './housing-information.component.html',
    styleUrl: '../../../register.component.css'
})
export class HousingInformationComponent implements OnInit, OnDestroy{
    // Propriétés
    formData: any;

    // Services
    router = inject(Router);
    renderer = inject(Renderer2);
    authService = inject(AuthService);

    ngOnInit(): void {
        this.renderer.addClass(document.body, 'no-padding');
        const savedData = this.authService.loadStepData('step2');
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
        this.authService.saveStepData('step2', this.registerForm.value);
        this.router.navigate(['register/customer/generalInformation']);
    }

    // Soumission du formulaire
    onSubmit() {
        const formData = this.registerForm.value;

        this.authService.saveStepData('step2', formData);
    
        this.authService.updateClient(formData).subscribe({
            next: () => {
                this.router.navigate(['/home']);
            },
            error: (err) => {
                console.error('Erreur update step 2 :', err);
            }
        });
    };

}
