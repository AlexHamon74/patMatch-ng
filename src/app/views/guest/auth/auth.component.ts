import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
    selector: 'app-auth',
    standalone: true,
    imports: [RouterLink],
    templateUrl: './auth.component.html',
    styleUrl: './auth.component.css'
})
export class AuthComponent {

    authService = inject(AuthService);
    router = inject(Router);

    logout() {
        this.authService.logout();
        this.router.navigate(['']);
    };

}
