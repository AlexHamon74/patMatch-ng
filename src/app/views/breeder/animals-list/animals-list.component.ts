import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from '../../../shared/header/header.component';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';
import { BreederAnimalInterface, BreederAnimalListInterface } from '../../../core/entities';
import { UserService } from '../../../core/services/user.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-animals-list',
    standalone: true,
    imports: [HeaderComponent, NavbarComponent, RouterLink, CommonModule],
    templateUrl: './animals-list.component.html',
    styleUrl: './animals-list.component.css'
})
export class AnimalsListComponent implements OnInit {
    breederAnimals: BreederAnimalInterface[] = [];
    successMessage: string | null = null;

    userService = inject(UserService);

    ngOnInit(): void {
        // Si on arrive sur cette page après la création d'un animal, affiche une alert de succès
        const state = history.state as { animalCreated?: boolean };
        if (state?.animalCreated) {
            this.successMessage = 'Votre animal a bien été créé.';
        }

        this.userService.getUserProfile<BreederAnimalListInterface>().subscribe(profile => {
            this.breederAnimals = profile.animals;
            console.log('Animaux:', this.breederAnimals);
        });
    }

    // Méthode pour compter le nombre de likes dans un tableau de swipes
    countLikes(swipes: { type: string }[] = []): number {
        return swipes.filter(swipe => swipe.type === 'like').length;
    }
}
