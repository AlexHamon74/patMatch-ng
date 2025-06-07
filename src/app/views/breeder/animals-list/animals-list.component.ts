import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from '../../../shared/header/header.component';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';
import { BreederAnimalInterface, BreederAnimalListInterface } from '../../../core/entities';
import { UserService } from '../../../core/services/user.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../environnement/environnement';

@Component({
    selector: 'app-animals-list',
    standalone: true,
    imports: [HeaderComponent, NavbarComponent, RouterLink, CommonModule],
    templateUrl: './animals-list.component.html',
    styleUrl: './animals-list.component.css'
})
export class AnimalsListComponent implements OnInit {
    breederAnimals: BreederAnimalInterface[] = [];
    environment = environment;
    isLoading = true;

    userService = inject(UserService);

    ngOnInit(): void {
        this.userService.getUserProfile<BreederAnimalListInterface>().subscribe({
            next: (profile) => {
                this.breederAnimals = profile.animals;
                this.isLoading = false;
            },
            error: (err) => {
                this.isLoading = false;
                console.error('Erreur lors de la récupération des animaux :', err);
            }
        });
    }

    // Méthode pour compter le nombre de likes dans un tableau de swipes
    countLikes(swipes: { type: string }[] = []): number {
        return swipes.filter(swipe => swipe.type === 'like').length;
    }
}
