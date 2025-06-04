import { Component, inject, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { AnimalService } from '../../../../core/services/animal.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HeaderComponent } from '../../../../shared/header/header.component';
import { NavbarComponent } from '../../../../shared/navbar/navbar.component';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-pictures',
    standalone: true,
    imports: [HeaderComponent, ReactiveFormsModule, NavbarComponent, NgIf],
    templateUrl: './pictures.component.html',
    styleUrl: './../add-animal.component.css'
})
export class PicturesComponent implements OnInit, OnDestroy {
    // Propriétés
    isSubmitted = false;
    selectedFile?: File;

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
        animalImageFile: new FormControl('', [Validators.required]),
    });

    onFileSelected(event: Event) {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files.length > 0) {
            this.selectedFile = input.files[0];
        }
    }

    // Fonction attachée au bouton précédent
    goBack() {
        this.router.navigate(['addAnimal/terms']);
    }

    // Soumission du formulaire
    onSubmit() {
        this.isSubmitted = true;
        if (!this.createAnimalForm.valid || !this.selectedFile) {
            return;
        }

        const animalId = this.animalService.getAnimalId();
        if (!animalId) {
            console.error("Aucun ID d'animal trouvé. Impossible d'uploader l'image.");
            return;
        }

        this.animalService.uploadAnimalImage(animalId, this.selectedFile).subscribe({
            next: () => {
                this.animalService.clearAnimalId();
                this.router.navigate(['/breeder/animalsList']);
            },
            error: (err) => {
                console.error('Erreur lors de la modification de l\'image : ' + err.message);
            }
        });
    }

}
