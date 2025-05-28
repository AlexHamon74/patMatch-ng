import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { NavbarComponent } from '../../navbar/navbar.component';
import { RouterLink } from '@angular/router';
import { UserService } from '../../../core/services/user.service';
import { AdoptionInterface, UserAdoptionInterface } from '../../../core/entities';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-mes-adoptions',
    standalone: true,
    imports: [HeaderComponent, NavbarComponent, RouterLink, DatePipe],
    templateUrl: './mes-adoptions.component.html',
    styleUrl: './mes-adoptions.component.css'
})
export class MesAdoptionsComponent implements OnInit {
    userService = inject(UserService);
    adoptions: AdoptionInterface[] = [];

    ngOnInit(): void {
        this.userService.getUserProfile<UserAdoptionInterface>().subscribe(profile  => {
            this.adoptions = profile.adoptions;
            console.log('Adotpion:', this.adoptions);
        });
    }
}
