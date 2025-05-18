import { Component, inject, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { HeaderBreederComponent } from '../../../../shared/header-breeder/header-breeder.component';
import { Router } from '@angular/router';
import { AnimalService } from '../../../../core/services/animal.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
    selector: 'app-personality',
    standalone: true,
    imports: [HeaderBreederComponent, ReactiveFormsModule],
    templateUrl: './personality.component.html',
    styleUrl: './../add-animal.component.css'
})
export class PersonalityComponent implements OnInit, OnDestroy {
    // Propriétés
    isSubmitted = false;

    // Services
    router = inject(Router);
    renderer = inject(Renderer2);
    animalService = inject(AnimalService);

    ngOnInit(): void {
        this.renderer.addClass(document.body, 'no-padding');

        // Pré-remplis les champ si on fais retour
        const savedData = this.animalService.loadStepData('step3');
        if (savedData) {
            this.createAnimalForm.patchValue(savedData);
        }
    }
    ngOnDestroy(): void {
        this.renderer.removeClass(document.body, 'no-padding');
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
        this.router.navigate(['addAnimal/health']);
    }

    // Soumission du formulaire
    onSubmit() {
        this.isSubmitted = true;
        if (this.createAnimalForm.valid) {
            const formData = this.createAnimalForm.value;

            // Sauvegarde temporaire des données et redirection
            this.animalService.saveStepData('step3', formData);
            this.router.navigate(['addAnimal/idealEnvironment']);
        }
    };

}
