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
    registerClient(user: RegisterInterface): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/ld+json' });
        return this.http.post(`${this.url}/clients`, user, { headers });
    };

    registerEleveur(user: RegisterInterface): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/ld+json' });
        return this.http.post(`${this.url}/eleveurs`, user, { headers });
    };

    // Sauvegarde temporaire de l'utilisateur en cours d'inscription
    saveRegisteringUserId(id: string) {
        localStorage.setItem('registeringUserId', id);
    }

    getRegisteringUserId(): string | null {
        return localStorage.getItem('registeringUserId');
    }

    updateClient(data: any): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/merge-patch+json' });
        const userId = this.getRegisteringUserId();
        return this.http.patch(`${this.url}/clients/${userId}`, data, { headers });
    }

    updateEleveur(data: any): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/merge-patch+json' });
        const userId = this.getRegisteringUserId();
        return this.http.patch(`${this.url}/eleveurs/${userId}`, data, { headers });
    }

    // Pour les données temporaires entre étapes
    saveStepData(stepKey: string, data: any) {
        localStorage.setItem(stepKey, JSON.stringify(data));
    }

    loadStepData(stepKey: string): any {
        const stored = localStorage.getItem(stepKey);
        return stored ? JSON.parse(stored) : null;
    }

    clearRegisteringUser() {
        localStorage.removeItem('registeringUserId');
        localStorage.removeItem('step1');
        localStorage.removeItem('step2');
        localStorage.removeItem('step3');
        localStorage.removeItem('step4');
        localStorage.removeItem('step5');
    }

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
