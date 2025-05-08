import { Component, inject, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

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

    ngOnInit(): void {
        this.renderer.addClass(document.body, 'no-padding');
    }
    ngOnDestroy(): void {
        this.renderer.removeClass(document.body, 'no-padding');
    }

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

        this.router.navigate(['register/breeder/housingInformation'], {
            state: { formData: mergedData }
        });
    };

}
