import { Component, inject, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { AnimalService } from '../../../../core/services/animal.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HeaderComponent } from '../../../../shared/header/header.component';

@Component({
    selector: 'app-pictures',
    standalone: true,
    imports: [HeaderComponent, ReactiveFormsModule],
    templateUrl: './pictures.component.html',
    styleUrl: './../add-animal.component.css'
})
export class PicturesComponent implements OnInit, OnDestroy {
    // Propriétés
    isSubmitted = false;
    errorMessage: string = '';

    // Services
    router = inject(Router);
    renderer = inject(Renderer2);
    animalService = inject(AnimalService);

    ngOnInit(): void {
        this.renderer.addClass(document.body, 'no-padding');

        // Pré-remplis les champ si on fais retour
        const savedData = this.animalService.loadStepData('step6');
        if (savedData) {
            this.createAnimalForm.patchValue(savedData);
        }
    }
    ngOnDestroy(): void {
        this.renderer.removeClass(document.body, 'no-padding');
    }

    // Formulaire avec validations
    public createAnimalForm: FormGroup = new FormGroup({
        // photos: new FormControl('', [Validators.required]),
    });

    // Fonction attachée au bouton précédent
    goBack() {
        this.animalService.saveStepData('step6', this.createAnimalForm.value);
        this.router.navigate(['addAnimal/terms']);
    }

    // Soumission du formulaire
    onSubmit() {
        this.isSubmitted = true;
        if (this.createAnimalForm.valid) {
            const formData = this.createAnimalForm.value;

            // Sauvegarde temporaire des données
            this.animalService.saveStepData('step6', formData);

            // Récupérer l'ensemble des données de toutes les étapes
            const fullAnimal = this.animalService.getFullAnimalFromSteps();

            if (fullAnimal) {
                this.animalService.createAnimal(fullAnimal).subscribe({
                    next: () => {
                        // Nettoyage du localStorage puis redirection vers la liste des animaux
                        this.animalService.clearAnimalRegistrationData();
                        this.router.navigate(['breeder/animalsList'], {
                            state: { animalCreated: true }
                        });
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
