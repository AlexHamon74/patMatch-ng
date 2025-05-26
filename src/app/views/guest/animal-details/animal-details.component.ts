import { Component, inject } from '@angular/core';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';
import { NgbCarouselModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { AnimalInterface } from '../../../core/entities';
import { AnimalService } from '../../../core/services/animal.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-animal-details',
    standalone: true,
    imports: [NavbarComponent, NgbNavModule, NgbCarouselModule, CommonModule, RouterLink],
    templateUrl: './animal-details.component.html',
    styleUrl: './animal-details.component.css'
})
export class AnimalDetailsComponent {
    // Déclaration des variables
    animal!: AnimalInterface;

    // Injection des services
    animalService = inject(AnimalService);
    route = inject(ActivatedRoute);

    // Récupère un animal par son ID
    ngOnInit(): void {
        const id = +this.route.snapshot.paramMap.get('id')!;

        this.animalService.fetchAnimalById(id).subscribe({
            next: (animal) => {
                this.animal = animal;
            },
            error: (error) => {
                console.error("Erreur lors de la récupération de l'animal :", error);
                // TODO: redirection vers une page 404
            }
        });
        
    }
}
