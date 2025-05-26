import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TokenService } from '../../core/services/token.service';

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [RouterLink],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.css'
})
export class NavbarComponent {

    //Injection du service UserService
    tokenService = inject(TokenService);

    //Méthode pour savoir si le user est un client
    isClient() {
        return this.tokenService.hasRole('ROLE_CLIENT');
    };

    //Méthode pour savoir si le user est un éleveur
    isBreeder() {
        return this.tokenService.hasRole('ROLE_ELEVEUR');
    };

}
