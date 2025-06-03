import { Component, inject } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { HeaderComponent } from '../header/header.component';
import { AuthService } from '../../core/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { TokenService } from '../../core/services/token.service';

@Component({
    selector: 'app-profil',
    standalone: true,
    imports: [NavbarComponent, HeaderComponent, RouterLink],
    templateUrl: './profil.component.html',
    styleUrl: './profil.component.css'
})
export class ProfilComponent {

    authService = inject(AuthService);
    router = inject(Router);
    tokenService = inject(TokenService);

    //Méthode pour savoir si le user est un client
    isClient() {
        return this.tokenService.hasRole('ROLE_CLIENT');
    };

    logout() {
        this.authService.logout();
        this.router.navigate(['']);
    };

}
