import { CanActivate, Router } from "@angular/router";
import { inject, Injectable } from "@angular/core";
import { UserService } from "../services/user.service";
import { TokenService } from "../services/token.service";
@Injectable({
    providedIn: 'root'
})
export class AuthBreederGuard implements CanActivate {
    router = inject(Router);
    userService = inject(UserService);
    tokenService = inject(TokenService);

    // Vérifie si l'utilisateur est connecté et a le rôle d'éleveur
    canActivate(): boolean {
        if (!this.userService.isLogged()) {
            this.router.navigate(['/login']);
            return false;
        }

        if (this.tokenService.hasRole('ROLE_ELEVEUR')) {
            return true;
        }

        this.router.navigate(['/unauthorized']);
        return false;
    }
}