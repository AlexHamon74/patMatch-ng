import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environnement/environnement.production';
import { Token } from '../entities';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    // Url ou sont envoyés les requêtes
    private url = environment.apiURL;

    //Injection des services
    http = inject(HttpClient);
  
    //Méthode pour effectuer la connexion
    login(loginCheck: { username: string; password: string }): Observable<Token> {
      return this.http.post<Token>(`${this.url}/login_check`, loginCheck);
    };
  
    //Méthode pour sauvegarder le token dans le localStorage
    saveToken(token: Token) {
      localStorage.setItem('token', token.token);
      console.log('Token sauvegardé dans le localStorage:', token.token);
    };

    //Méthode pour se déconnecter et remove le localStorage
    logout(): void {
        localStorage.removeItem('token');
        localStorage.removeItem('cartItems');
        console.log('Déconnexion réussie');
    };
}
