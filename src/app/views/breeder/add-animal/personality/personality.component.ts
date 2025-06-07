import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnimalService } from '../../../../core/services/animal.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HeaderComponent } from '../../../../shared/header/header.component';
import { NavbarComponent } from '../../../../shared/navbar/navbar.component';

@Component({
    selector: 'app-personality',
    standalone: true,
    imports: [HeaderComponent, ReactiveFormsModule, NavbarComponent],
    templateUrl: './personality.component.html',
    styleUrl: './../add-animal.component.css'
})
export class PersonalityComponent implements OnInit {
    // Propriétés
    isSubmitted = false;

    // Services
    router = inject(Router);
    animalService = inject(AnimalService);

    ngOnInit(): void {
        // Pré-remplis les champ si on fais retour
        const savedData = this.animalService.loadStepData('step3');
        if (savedData) {
            this.createAnimalForm.patchValue(savedData);
        }
    }

    // Formulaire avec validations
    public createAnimalForm: FormGroup = new FormGroup({
        niveauEnergie: new FormControl('', [Validators.required]),
        sociabilite: new FormControl('', [Validators.required]),
        education: new FormControl('', [Validators.required]),
    });

    // Fonction attachée au bouton précédent
    goBack() {
        this.animalService.saveStepData('step3', this.createAnimalForm.value);
        this.router.navigate(['breeder/addAnimal/health']);
    }

    // Soumission du formulaire
    onSubmit() {
        this.isSubmitted = true;
        if (this.createAnimalForm.valid) {
            const formData = this.createAnimalForm.value;

            // Sauvegarde temporaire des données et redirection
            this.animalService.saveStepData('step3', formData);
            this.router.navigate(['breeder/addAnimal/idealEnvironment']);
        }
    };

}
