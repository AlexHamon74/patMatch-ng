import { Component, inject } from '@angular/core';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';
import { HeaderComponent } from '../../../shared/header/header.component';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-profil',
    standalone: true,
    imports: [NavbarComponent, HeaderComponent],
    templateUrl: './profil.component.html',
    styleUrl: './profil.component.css'
})
export class ProfilComponent {

    authService = inject(AuthService);
    router = inject(Router)

    logout() {
        this.authService.logout();
        this.router.navigate(['']);
    };

}
