import { Component, inject } from '@angular/core';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';
import { NgbCarouselModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { AnimalInterface } from '../../../core/entities';
import { AnimalService } from '../../../core/services/animal.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SwipeService } from '../../../core/services/swipe.service';
import { UserService } from '../../../core/services/user.service';

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
    isLiked = false;

    // Injection des services
    animalService = inject(AnimalService);
    route = inject(ActivatedRoute);
    userService = inject(UserService);
    swipeService = inject(SwipeService);

    // Récupère un animal par son ID
    ngOnInit(): void {
        const id = +this.route.snapshot.paramMap.get('id')!;

        this.animalService.fetchAnimalById(id).subscribe({
            next: (animal) => {
                this.animal = animal;

                if (this.userService.isLogged()) {
                    this.swipeService.isAnimalLiked(animal.id).subscribe({
                        next: (liked) => this.isLiked = liked,
                        error: (err) => console.error("Erreur lors de la vérification du like :", err)
                    });
                }
            },
            error: (error) => {
                console.error("Erreur lors de la récupération de l'animal :", error);
            }
        });
    }
}
