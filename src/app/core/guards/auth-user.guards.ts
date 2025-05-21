import { CanActivate, Router } from "@angular/router";
import { inject, Injectable } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { UserService } from "../services/user.service";
@Injectable({
    providedIn: 'root'
})
export class AuthUserGuard implements CanActivate {
    router = inject(Router);
    authService = inject(AuthService);
    userService = inject(UserService);

    // Vérifie si l'utilisateur est connecté
    canActivate(): boolean {
        if (!this.authService.isLogged()) {
            this.router.navigate(['/login']);
            return false;
        }

        if (this.userService.hasRole('ROLE_CLIENT')) {
            return true;
        }

        this.router.navigate(['/unauthorized']);
        return false;
    }
}