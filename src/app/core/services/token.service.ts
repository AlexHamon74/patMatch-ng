import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { TokenPayload } from '../entities';

@Injectable({
    providedIn: 'root'
})
export class TokenService {
    // Récupère le token JWT stocké dans le localStorage
    // -------------------------------------------------
    getToken(): string | null {
        return localStorage.getItem('token');
    };

    // Récupére les rôles de l'utilisateur à partir du token
    // -----------------------------------------------------
    getUserRoles(): string[] | null {
        const token = this.getToken();
        if (!token) return null;

        try {
            const tokenPayload = jwtDecode<TokenPayload>(token);
            return tokenPayload.roles;
        } catch (error) {
            console.error('Erreur lors du décodage du token :', error);
            return null;
        }
    }

    // Vérifie si l'utilisateur a un rôle spécifique
    // ---------------------------------------------
    hasRole(role: string): boolean {
        const roles = this.getUserRoles();
        return roles ? roles.includes(role) : false;
    }

    // Récupére l'id de l'utilisateur à partir du token
    // ------------------------------------------------
    getUserId(): number | null {
        const token = this.getToken();
        if (!token) return null;

        try {
            const payload = jwtDecode<TokenPayload>(token);
            return payload.id;
        } catch (error) {
            console.error('Erreur de décodage du token', error);
            return null;
        }
    }

}