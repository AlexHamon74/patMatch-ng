import { Component, inject } from '@angular/core';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';
import { NgbCarouselModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { AnimalInterface } from '../../../core/entities';
import { AnimalService } from '../../../core/services/animal.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { SwipeService } from '../../../core/services/swipe.service';
import { UserService } from '../../../core/services/user.service';
import { AdoptionService } from '../../../core/services/adoption.service';
import { TokenService } from '../../../core/services/token.service';

@Component({
    selector: 'app-animal-details',
    standalone: true,
    imports: [NavbarComponent, NgbNavModule, NgbCarouselModule, CommonModule],
    templateUrl: './animal-details.component.html',
    styleUrl: './animal-details.component.css'
})
export class AnimalDetailsComponent {
    // Déclaration des variables
    animal!: AnimalInterface;
    isLiked = false;

    // Injection des services
    animalService = inject(AnimalService);
    userService = inject(UserService);
    swipeService = inject(SwipeService);
    adoptionService = inject(AdoptionService);
    tokenService = inject(TokenService);
    route = inject(ActivatedRoute);
    location = inject(Location);

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

    sendAdoptionRequest(): void {
        if (!this.userService.isLogged()) {
            console.error("Utilisateur non connecté. Impossible d'envoyer une demande d'adoption.");
            return;
        }
        const clientId = this.tokenService.getUserId();
        const animalId = this.animal.id;

        if (!clientId || !animalId) {
            console.error("Impossible de récupérer les identifiants pour l'adoption");
            return;
        }

        const adoptionPayload = {
            client: clientId,
            animal: animalId.toString(),
            status: 'Demande envoyée',
            dateDemande: new Date().toISOString(),
        };

        this.adoptionService.createAdoption(adoptionPayload).subscribe({
            next: (response) => {
                console.log("Demande d'adoption envoyée avec succès :", response);
                alert("Votre demande d'adoption a bien été envoyée !");
            },
            error: (error) => {
                console.error("Erreur lors de la demande d'adoption :", error);
                alert("Une erreur est survenue lors de l'envoi de votre demande.");
            }
        });

    }

    // Méthode de retour à la dernère page visitée
    goBack(): void {
        this.location.back();
    }
}
