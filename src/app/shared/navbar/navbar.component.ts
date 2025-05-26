import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from '../../core/services/user.service';

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [RouterLink],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.css'
})
export class NavbarComponent {

    //Injection du service UserService
    userService = inject(UserService);

    //Méthode pour savoir si le user est un client
    isClient() {
        return this.userService.hasRole('ROLE_CLIENT');
    };

    //Méthode pour savoir si le user est un éleveur
    isBreeder() {
        return this.userService.hasRole('ROLE_ELEVEUR');
    };

}
