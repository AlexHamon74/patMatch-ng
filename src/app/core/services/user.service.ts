import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
import { TokenPayload } from '../entities';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    http = inject(HttpClient);

    //Méthode pour récupérer le token depuis le localStorage
    getToken(): string | null {
        return localStorage.getItem('token');
    };

    //Méthode pour récupérer les rôles de l'utilisateur à partir du token
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

    //Méthode pour récupérer l'id de l'utilisateur à partir du token
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
