import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from '../../../core/services/user.service';
import { AdoptionInterface, UserAdoptionInterface } from '../../../core/entities';
import { CommonModule, DatePipe, Location } from '@angular/common';
<<<<<<< HEAD:src/app/shared/profil/mes-adoptions/mes-adoptions.component.ts
import { environment } from '../../../../environments/environment';
=======
import { environment } from '../../../../environnement/environnement';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';
import { HeaderComponent } from '../../../shared/header/header.component';
>>>>>>> 7bd676898e8c927842e3643c04c067d7d4818fab:src/app/views/user/mes-adoptions/mes-adoptions.component.ts

@Component({
    selector: 'app-mes-adoptions',
    standalone: true,
    imports: [HeaderComponent, NavbarComponent, RouterLink, DatePipe, CommonModule],
    templateUrl: './mes-adoptions.component.html',
    styleUrl: './mes-adoptions.component.css'
})
export class MesAdoptionsComponent implements OnInit {
    environment = environment;
    isLoading = true;
    
    userService = inject(UserService);
    location = inject(Location);
    adoptions: AdoptionInterface[] = [];

    ngOnInit(): void {
        this.userService.getUserProfile<UserAdoptionInterface>().subscribe({
            next: (profile) => {
                this.adoptions = profile.adoptions;
                this.isLoading = false;
            },
            error: (err) => {
                this.isLoading = false;
                console.error('Erreur lors de la récupération des adoptions :', err);
            }
        });
    }

    // Méthode de retour à la dernère page visitée
    goBack(): void {
        this.location.back();
    }
}
