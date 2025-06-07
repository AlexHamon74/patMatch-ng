import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnimalService } from '../../../../core/services/animal.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HeaderComponent } from '../../../../shared/header/header.component';
import { NavbarComponent } from '../../../../shared/navbar/navbar.component';

@Component({
    selector: 'app-terms',
    standalone: true,
    imports: [HeaderComponent, ReactiveFormsModule, NavbarComponent],
    templateUrl: './terms.component.html',
    styleUrl: './../add-animal.component.css'
})
export class TermsComponent implements OnInit {
    // Propriétés
    isSubmitted = false;
    errorMessage: string = '';

    // Services
    router = inject(Router);
    animalService = inject(AnimalService);

    ngOnInit(): void {
        // Pré-remplis les champ si on fais retour
        const savedData = this.animalService.loadStepData('step5');
        if (savedData) {
            this.createAnimalForm.patchValue(savedData);
        }
    }

    // Formulaire avec validations
    public createAnimalForm: FormGroup = new FormGroup({
        histoire: new FormControl('', [Validators.required]),
        infosSupplementaires: new FormControl(),
        prix: new FormControl('', [Validators.required]),
    });

    // Fonction attachée au bouton précédent
    goBack() {
        this.animalService.saveStepData('step5', this.createAnimalForm.value);
        this.router.navigate(['breeder/addAnimal/idealEnvironment']);
    }

    // Soumission du formulaire
    onSubmit() {
        this.isSubmitted = true;
        if (this.createAnimalForm.valid) {
            const formData = this.createAnimalForm.value;

            // Sauvegarde temporaire des données
            this.animalService.saveStepData('step5', formData);

            // Récupérer l'ensemble des données de toutes les étapes
            const fullAnimal = this.animalService.getFullAnimalFromSteps();

            if (fullAnimal) {
                this.animalService.createAnimal(fullAnimal).subscribe({
                    next: (createdAnimal) => {
                        // Nettoyage du localStorage puis redirection vers la liste des animaux
                        this.animalService.saveAnimalId(createdAnimal.id);
                        this.animalService.clearAnimalRegistrationData();
                        this.router.navigate(['breeder/addAnimal/pictures']);
                    },
                    error: (err) => {
                        console.error("Erreur lors de la création de l'animal :", err);
                        this.handleRegisterError(err);
                    }
                });
            }
        }
    };

    // Fonction pour vérifier si numero d'identification unique
    private handleRegisterError(error: any) {
        if (error.error.violations) {
            const violation = error.error.violations.find((v: any) => v.propertyPath === 'numeroIdentification');
            this.errorMessage = violation?.message || 'Une erreur est survenue.';
        }
    }

}
