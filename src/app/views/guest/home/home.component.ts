import { Component, inject, OnInit } from '@angular/core';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';
import { HeaderComponent } from '../../../shared/header/header.component';
import { CommonModule } from '@angular/common';
import { AnimalInterface } from '../../../core/entities';
import { AnimalService } from '../../../core/services/animal.service';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [HeaderComponent, NavbarComponent, CommonModule, RouterLink],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
    // Déclaration des variables
    animals: AnimalInterface[] | null = null;
    animationClass: string = '';
    currentIndex: number = 0;

    // Injection des services
    animalService = inject(AnimalService);

    swipe(direction: 'left' | 'right') {
        this.animationClass = direction === 'left' ? 'swipe-left' : 'swipe-right';
        document.body.style.overflowX = 'hidden';

        setTimeout(() => {
            this.resetCard();
            this.nextAnimal();
            document.body.style.overflowX = 'auto';
        }, 600);
    }

    resetCard() {
        this.animationClass = '';
    }

    nextAnimal() {
        if (this.animals) {
            this.currentIndex++;
            if (this.currentIndex >= this.animals.length) {
                this.currentIndex = 0; // Repart du début ou tu peux afficher "Fin de liste"
            }
        }
    }

    ngOnInit(): void {
        this.animalService.fetchAllAnimals().subscribe({
            next: (data) => {
                console.log('Données récupérées :', data);
                this.animals = data.member;
            },
            error: (err) => {
                console.error('Erreur lors de la récupération des animaux :', err);
            }
        });
    }
}
