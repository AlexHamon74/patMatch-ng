import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from '../../../core/services/user.service';
import { AdoptionInterface, UserAdoptionInterface } from '../../../core/entities';
import { CommonModule, DatePipe, Location } from '@angular/common';
import { environment } from '../../../../environments/environment';
import { HeaderComponent } from '../../../shared/header/header.component';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';

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
