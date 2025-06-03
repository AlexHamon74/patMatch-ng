import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { NavbarComponent } from '../../navbar/navbar.component';
import { RouterLink } from '@angular/router';
import { UserService } from '../../../core/services/user.service';
import { AdoptionInterface, UserAdoptionInterface } from '../../../core/entities';
import { CommonModule, DatePipe, Location } from '@angular/common';

@Component({
    selector: 'app-mes-adoptions',
    standalone: true,
    imports: [HeaderComponent, NavbarComponent, RouterLink, DatePipe, CommonModule],
    templateUrl: './mes-adoptions.component.html',
    styleUrl: './mes-adoptions.component.css'
})
export class MesAdoptionsComponent implements OnInit {
    userService = inject(UserService);
    location = inject(Location);
    adoptions: AdoptionInterface[] = [];

    ngOnInit(): void {
        this.userService.getUserProfile<UserAdoptionInterface>().subscribe(profile  => {
            this.adoptions = profile.adoptions;
            console.log('Adotpion:', this.adoptions);
        });
    }

    // Méthode de retour à la dernère page visitée
    goBack(): void {
        this.location.back();
    }
}
