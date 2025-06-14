import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnimalService } from '../../../../core/services/animal.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HeaderComponent } from '../../../../shared/header/header.component';
import { NavbarComponent } from '../../../../shared/navbar/navbar.component';

@Component({
    selector: 'app-ideal-environment',
    standalone: true,
    imports: [HeaderComponent, ReactiveFormsModule, NavbarComponent],
    templateUrl: './ideal-environment.component.html',
    styleUrl: './../add-animal.component.css'
})
export class IdealEnvironmentComponent implements OnInit {
    // Propriétés
    isSubmitted = false;

    // Services
    router = inject(Router);
    animalService = inject(AnimalService);

    ngOnInit(): void {
        // Pré-remplis les champ si on fais retour
        const savedData = this.animalService.loadStepData('step4');
        if (savedData) {
            this.createAnimalForm.patchValue(savedData);
        }
    }

    // Formulaire avec validations
    public createAnimalForm: FormGroup = new FormGroup({
        typeLogement: new FormControl('', [Validators.required]),
        familleIdeale: new FormControl('', [Validators.required]),
        besoinsExercice: new FormControl('', [Validators.required]),
    });

    // Fonction attachée au bouton précédent
    goBack() {
        this.animalService.saveStepData('step4', this.createAnimalForm.value);
        this.router.navigate(['breeder/addAnimal/personality']);
    }

    // Soumission du formulaire
    onSubmit() {
        this.isSubmitted = true;
        if (this.createAnimalForm.valid) {
            const formData = this.createAnimalForm.value;

            // Sauvegarde temporaire des données et redirection
            this.animalService.saveStepData('step4', formData);
            this.router.navigate(['breeder/addAnimal/terms']);
        }
    };

}
