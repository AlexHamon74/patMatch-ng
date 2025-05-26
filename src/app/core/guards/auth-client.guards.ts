import { CanActivate, Router } from "@angular/router";
import { inject, Injectable } from "@angular/core";
import { UserService } from "../services/user.service";
import { TokenService } from "../services/token.service";
@Injectable({
    providedIn: 'root'
})
export class AuthClientGuard implements CanActivate {
    router = inject(Router);
    tokenService = inject(TokenService);
    userService = inject(UserService);

    // Vérifie si l'utilisateur est connecté et a le rôle de client
    canActivate(): boolean {
        if (!this.userService.isLogged()) {
            this.router.navigate(['/login']);
            return false;
        }

        if (this.tokenService.hasRole('ROLE_CLIENT')) {
            return true;
        }

        this.router.navigate(['/unauthorized']);
        return false;
    }
}