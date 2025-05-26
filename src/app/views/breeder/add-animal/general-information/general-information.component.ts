import { Component, inject, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { AnimalService } from '../../../../core/services/animal.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { EspeceService } from '../../../../core/services/espece.service';
import { EspeceInterface, RaceInterface } from '../../../../core/entities';
import { HeaderComponent } from '../../../../shared/header/header.component';

@Component({
    selector: 'app-general-information',
    standalone: true,
    imports: [HeaderComponent, NgIf, ReactiveFormsModule],
    templateUrl: './general-information.component.html',
    styleUrl: './../add-animal.component.css'
})
export class GeneralInformationComponent implements OnInit, OnDestroy {
    // Propriétés
    isSubmitted = false;
    especes: EspeceInterface[] = [];
    racesFiltrees: RaceInterface[] = [];

    // Services
    router = inject(Router);
    renderer = inject(Renderer2);
    animalService = inject(AnimalService);
    especeService = inject(EspeceService);

    ngOnInit(): void {
        this.renderer.addClass(document.body, 'no-padding');

        // Pré-remplis les champ si on fais retour
        const savedData = this.animalService.loadStepData('step1');
        if (savedData) {
            this.createAnimalForm.patchValue(savedData);
        }

        // Récupérer la liste des espèces
        this.getEspeces();
    }
    ngOnDestroy(): void {
        this.renderer.removeClass(document.body, 'no-padding');
    }

    // Formulaire avec validations
    public createAnimalForm: FormGroup = new FormGroup({
        nom: new FormControl('', [Validators.required]),
        dateDeNaissance: new FormControl('', [Validators.required]),
        sexe: new FormControl('', [Validators.required]),
        numeroIdentification: new FormControl('', [Validators.required]),
        race: new FormControl('', [Validators.required]),
        poids: new FormControl('', [Validators.required]),
        taille: new FormControl('', [Validators.required]),
    });

    // Soumission du formulaire
    onSubmit() {
        this.isSubmitted = true;
        if (this.createAnimalForm.valid) {
            const formData = this.createAnimalForm.value;

            // Sauvegarde temporaire des données et redirection
            this.animalService.saveStepData('step1', formData);
            this.router.navigate(['breeder/addAnimal/health']);
        }
    };

    getEspeces() {
        this.especeService.fetchAllEspeces().subscribe(espece => {
            console.log('Especes chargées :', espece);
            this.especes = espece;
        })
    };

    onEspeceChange(event: Event) {
        const selectedId = +(event.target as HTMLSelectElement).value;
        const selectedEspece = this.especes.find(e => e.id === selectedId);
        this.racesFiltrees = selectedEspece?.races || [];
        this.createAnimalForm.get('race')?.setValue('');
    }

}
