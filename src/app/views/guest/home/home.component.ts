import { Component, inject, OnInit } from '@angular/core';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';
import { HeaderComponent } from '../../../shared/header/header.component';
import { CommonModule } from '@angular/common';
import { AnimalInterface } from '../../../core/entities';
import { AnimalService } from '../../../core/services/animal.service';
import { RouterLink } from '@angular/router';
import { SwipeService } from '../../../core/services/swipe.service';
import { UserService } from '../../../core/services/user.service';
import { switchMap, tap } from 'rxjs';
import { TokenService } from '../../../core/services/token.service';
import { environment } from '../../../../environments/environment';
import { AlertService } from '../../../core/services/alert.service';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [HeaderComponent, NavbarComponent, CommonModule, RouterLink],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
    // Déclaration des variables
    animals: AnimalInterface[] = [];
    animationClass: string = '';
    currentIndex: number = 0;
    isLoading = true;
    environment = environment;

    // Injection des services
    animalService = inject(AnimalService);
    swipeService = inject(SwipeService);
    userService = inject(UserService);
    tokenService = inject(TokenService);
    alertService = inject(AlertService);

    ngOnInit(): void {
        // Récupérer l'id enregistré pour afficher le même animal après retour
        const savedAnimalId = this.swipeService.getCurrentAnimalId() ?? undefined;
        this.loadAnimals(savedAnimalId);
    }

    // Charge les animaux depuis le service
    private loadAnimals(selectedAnimalId?: string): void {
        this.animalService.fetchAllAnimals().subscribe({
            next: (data) => {
                this.animals = Array.isArray(data) ? data : [];
                this.isLoading = false;

                if (selectedAnimalId) {
                    const idx = this.animals.findIndex(a => a.id === selectedAnimalId);
                    this.currentIndex = idx >= 0 ? idx : 0;
                } else {
                    this.currentIndex = 0;
                }

                // Enregistre l'animal courant pour le garder en mémoire
                if (this.animals.length > 0) {
                    this.swipeService.setCurrentAnimalId(this.animals[this.currentIndex].id);
                }
            },
            error: (error) => {
                console.error('Erreur lors de la récupération des animaux :', error);
                this.isLoading = false;
            }
        });
    }

    // Gère le swipe à gauche ou à droite
    swipe(direction: 'left' | 'right'): void {
        if (!this.userService.isLogged()) {
            this.alertService.errorAlert('Action non autorisée', 'Veuillez vous connecter pour swiper les animaux.');
            return;
        }

        const currentAnimal = this.animals[this.currentIndex];
        const client = this.tokenService.getUserId();
        const type = direction === 'right' ? 'like' : 'dislike';

        if (!client || !currentAnimal.id) {
            console.error('Client ID ou Animal ID manquant');
            return;
        }

        this.swipeService.createSwipe({
            animal: currentAnimal.id,
            client,
            type
        }).pipe(
            tap(() => {
                this.animationClass = direction === 'left' ? 'swipe-left' : 'swipe-right';
            }),
            switchMap(() => this.animalService.fetchAllAnimals())
        ).subscribe({
            next: (data) => {
                this.animals = Array.isArray(data) ? data : [];
                this.resetCard();

                // Mise à jour index et sauvegarde id animal
                const idx = this.animals.findIndex(a => a.id === currentAnimal.id);
                this.currentIndex = idx >= 0 ? idx : 0;
                if (this.animals.length > 0) {
                    this.swipeService.setCurrentAnimalId(this.animals[this.currentIndex].id);
                }

                if (type === 'like') {
                    this.alertService.successToast(`Vous avez liké ${currentAnimal.nom} !`);
                }
            },
            error: (err) => {
                console.error('Erreur lors du swipe :', err);
                if (err.statusText === "Forbidden") {
                    this.alertService.errorAlert('Action non autorisée', "Vous n'avez pas les droits pour swiper cet animal.");
                }
            }
        });
    }

    // Réinitialise l'animation et passe à l'animal suivant
    resetCard(): void {
        setTimeout(() => {
            this.animationClass = '';
            this.nextAnimal();
        }, 600);
    }

    // Passe à l'animal suivant
    nextAnimal(): void {
        if (this.animals.length > 0) {
            this.currentIndex = (this.currentIndex + 1) % this.animals.length;
            // Sauvegarde à chaque changement
            this.swipeService.setCurrentAnimalId(this.animals[this.currentIndex].id);
        }
    }
}
