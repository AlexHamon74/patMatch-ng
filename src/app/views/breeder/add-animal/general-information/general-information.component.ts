import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnimalService } from '../../../../core/services/animal.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { EspeceService } from '../../../../core/services/espece.service';
import { EspeceInterface, RaceInterface } from '../../../../core/entities';
import { HeaderComponent } from '../../../../shared/header/header.component';
import { NavbarComponent } from '../../../../shared/navbar/navbar.component';

@Component({
    selector: 'app-general-information',
    standalone: true,
    imports: [HeaderComponent, NgIf, ReactiveFormsModule, NavbarComponent],
    templateUrl: './general-information.component.html',
    styleUrl: './../add-animal.component.css'
})
export class GeneralInformationComponent implements OnInit {
    // Propriétés
    isSubmitted = false;
    especes: EspeceInterface[] = [];
    racesFiltrees: RaceInterface[] = [];

    // Services
    router = inject(Router);
    animalService = inject(AnimalService);
    especeService = inject(EspeceService);

    ngOnInit(): void {
        // Pré-remplis les champ si on fais retour
        const savedData = this.animalService.loadStepData('step1');
        if (savedData) {
            this.createAnimalForm.patchValue(savedData);
        }

        // Récupérer la liste des espèces
        this.getEspeces();
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
        this.especeService.fetchAllEspeces().subscribe({
            next: (data) => {
                this.especes = data.member;
            },
            error: (err) => {
                console.error('Erreur lors de la récupération des espèces :', err);
            }
        });
    };

    onEspeceChange(event: Event) {
        const selectedId = +(event.target as HTMLSelectElement).value;
        const selectedEspece = this.especes.find(e => e.id === selectedId);
        this.racesFiltrees = selectedEspece?.races || [];
        this.createAnimalForm.get('race')?.setValue('');
    }

}
