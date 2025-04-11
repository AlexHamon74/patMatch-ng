import { Component, inject } from '@angular/core';
import { AuthService } from '../../../../../../core/services/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-certification',
    standalone: true,
    imports: [ReactiveFormsModule],
    templateUrl: './certification.component.html',
    styleUrl: '../../../register.component.css'
})
export class CertificationComponent {
    // Propriétés
    formData: any;
    isSubmitted = false;

    // Services
    authService = inject(AuthService);
    router = inject(Router);

    constructor() {
        // Récupération des données du formulaire depuis la navigation
        const navigation = this.router.getCurrentNavigation();
        this.formData = navigation?.extras?.state?.['formData'];
        console.log('Données du formulaire partie 4 :', this.formData);
    };
    
    // Formulaire avec validations
    public registerForm: FormGroup = new FormGroup({
        certification: new FormControl,
    });

    // Soumission du formulaire
    onSubmit() {
        const formData = this.registerForm.value;

        // Si des données existent déjà, les fusionner avec les nouvelles
        const mergedData = { ...this.formData, ...formData };

        this.authService.register(mergedData).subscribe({
            next: () => {
                this.router.navigate(['login']);
            },
        });
    };

}
