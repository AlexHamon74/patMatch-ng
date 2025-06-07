import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnimalService } from '../../../../core/services/animal.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { HeaderComponent } from '../../../../shared/header/header.component';
import { NavbarComponent } from '../../../../shared/navbar/navbar.component';

@Component({
    selector: 'app-health',
    standalone: true,
    imports: [HeaderComponent, NgIf, ReactiveFormsModule, NavbarComponent],
    templateUrl: './health.component.html',
    styleUrl: './../add-animal.component.css'
})
export class HealthComponent implements OnInit {
    // Propriétés
    isSubmitted = false;

    // Services
    router = inject(Router);
    animalService = inject(AnimalService);

    ngOnInit(): void {
        // Pré-remplis les champ si on fais retour
        const savedData = this.animalService.loadStepData('step2');
        if (savedData) {
            this.createAnimalForm.patchValue(savedData);
        }
    }

    // Formulaire avec validations
    public createAnimalForm: FormGroup = new FormGroup({
        statutVaccination: new FormControl('', [Validators.required]),
        statutSterilisation: new FormControl('', [Validators.required]),
        infosSante: new FormControl('', [Validators.required]),
        typeAlimentation: new FormControl('', [Validators.required]),
        typeAlimentationDetails: new FormControl(),
    });

    // Fonction attachée au bouton précédent
    goBack() {
        this.animalService.saveStepData('step2', this.createAnimalForm.value);
        this.router.navigate(['breeder/addAnimal/generalInformation']);
    }

    // Soumission du formulaire
    onSubmit() {
        this.isSubmitted = true;
        if (this.createAnimalForm.valid) {
            const formData = this.createAnimalForm.value;

            // Sauvegarde temporaire des données et redirection
            this.animalService.saveStepData('step2', formData);
            this.router.navigate(['breeder/addAnimal/personality']);
        }
    };

}
