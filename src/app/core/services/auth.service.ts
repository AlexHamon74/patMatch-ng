import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environnement/environnement.production';
import { Token, RegisterInterface } from '../entities';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    // Url ou sont envoyés les requêtes
    private url = environment.apiURL;

    // Injection des services
    http = inject(HttpClient);

    // Méthode pour enregistrer un nouvel utilisateur
    register(user: RegisterInterface): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/ld+json' });
        return this.http.post(`${this.url}/users`, user, { headers });
    };

    // Méthode pour effectuer la connexion
    login(loginCheck: { username: string; password: string }): Observable<Token> {
        return this.http.post<Token>(`${this.url}/login_check`, loginCheck);
    };

    // Méthode pour sauvegarder le token dans le localStorage
    saveToken(token: Token) {
        localStorage.setItem('token', token.token);
        console.log('Token sauvegardé dans le localStorage:', token.token);
    };

    // Méthode pour se déconnecter et remove le localStorage
    logout(): void {
        localStorage.removeItem('token');
        localStorage.removeItem('cartItems');
        console.log('Déconnexion réussie');
    };
}
