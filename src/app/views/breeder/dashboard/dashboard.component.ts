import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../../../shared/header/header.component';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';
import { DashboardInterface } from '../../../core/entities';
import { UserService } from '../../../core/services/user.service';
import { environment } from '../../../../environnement/environnement';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [HeaderComponent, RouterLink, NavbarComponent],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
    dashboardData!: DashboardInterface;
    environment = environment;

    nbAnimals = 0;
    nbAdoptionsEnCours = 0;
    nbAdoptionsAchevees = 0;
    nbAdoptionsAnnulees = 0;
    topLikedAnimals: { nom: string, animalImage: string, likes: number }[] = [];

    private userService = inject(UserService);


ngOnInit(): void {
    this.userService.getUserProfile<DashboardInterface>().subscribe(data => {
        this.dashboardData = data;

        // Nombre d'animaux
        this.nbAnimals = data.animals.length;

        // Récupere de toutes les adoptions
        const allAdoptions = data.animals.flatMap(animal => animal.adoptions || []);
        this.nbAdoptionsEnCours = allAdoptions.filter(a => a.status === 'Demande envoyée').length;
        this.nbAdoptionsAchevees = allAdoptions.filter(a => a.status === 'Demande acceptée').length;
        this.nbAdoptionsAnnulees = allAdoptions.filter(a => a.status === 'Demande refusée').length;

        // Récupere les animaux les plus likés
        const animalsWithLikes = data.animals.map(animal => ({
            nom: animal.nom,
            animalImage: animal.animalImage,
            likes: animal.swipes.filter(s => s.type === 'like').length
        }));

        // Trier par nombre de likes décroissant
        this.topLikedAnimals = animalsWithLikes
            .sort((a, b) => b.likes - a.likes)
            .slice(0, 2); // Garder les deux premiers
    });
}
}
