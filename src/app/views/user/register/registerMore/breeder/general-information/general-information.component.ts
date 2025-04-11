import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-general-information',
    standalone: true,
    imports: [ReactiveFormsModule],
    templateUrl: './general-information.component.html',
    styleUrl: '../../../register.component.css'
})
export class GeneralInformationComponent {
    // Propriétés
    formData: any;

    // Services
    router = inject(Router);

    constructor() {
        // Récupération des données du formulaire depuis la navigation
        const navigation = this.router.getCurrentNavigation();
        this.formData = navigation?.extras?.state?.['formData'];
        console.log('Données du formulaire :', this.formData);
    };

    // Formulaire avec validations
    public registerForm: FormGroup = new FormGroup({
        typeCompte: new FormControl,
        nomElevege: new FormControl,
        numeroEnregistrement: new FormControl        
    });

    // Soumission du formulaire
    onSubmit() {
        const formData = this.registerForm.value;

        // Si des données existent déjà, les fusionner avec les nouvelles
        const mergedData = { ...this.formData, ...formData };

        this.router.navigate(['register/breeder/contactDetails'], {
            state: { formData: mergedData }
        });
    };

}
