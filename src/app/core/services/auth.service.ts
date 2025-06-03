import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environnement/environnement';
import { Token, RegisterInterface } from '../entities';
import { UserService } from './user.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    // Url ou sont envoyés les requêtes
    private url = environment.apiURL;

    // Injection des services
    http = inject(HttpClient);
    userService = inject(UserService);

    // Connexion de l'utilisateur
    // --------------------------
    login(loginCheck: { username: string; password: string }): Observable<Token> {
        return this.http.post<Token>(`${this.url}/login_check`, loginCheck);
    };

    // Méthode pour sauvegarder le token dans le localStorage après la connexion
    // -------------------------------------------------------------------------
    saveToken(token: Token) {
        localStorage.setItem('token', token.token);
    };

    // Méthode pour se déconnecter et nettoie le localStorage
    // ------------------------------------------------------
    logout(): void {
        localStorage.clear();
        this.userService.clearFirstName();
        console.log('Déconnexion réussie');
    };

    // Enregistre un nouvel client
    // ---------------------------
    registerClient(user: RegisterInterface): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/ld+json' });
        return this.http.post(`${this.url}/clients`, user, { headers });
    };

    // Enregistre un nouvel éleveur
    // ----------------------------
    registerEleveur(user: RegisterInterface): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/ld+json' });
        return this.http.post(`${this.url}/eleveurs`, user, { headers });
    };

    // -----------------------------------------------------------
    // Méthodes pour gérer l'utilisateur en cours d'enregistrement
    // -----------------------------------------------------------
    // Entre chaque étape, on sauvegarde l'id de l'utilisateur en cours d'enregistrement
    // pour pouvoir mettre à jour ses données au fur et à mesure
    // et éviter de devoir tout envoyer en une seule fois à la fin.
    // -----------------------------------------------------------
    saveRegisteringUserId(id: string) {
        localStorage.setItem('registeringUserId', id);
    }

    getRegisteringUserId(): string | null {
        return localStorage.getItem('registeringUserId');
    }

    // Enregistre et récupère les données de chaque étape dans le localStorage
    saveStepData(stepKey: string, data: any) {
        localStorage.setItem(stepKey, JSON.stringify(data));
    }
    loadStepData(stepKey: string): any {
        const stored = localStorage.getItem(stepKey);
        return stored ? JSON.parse(stored) : null;
    }

    // Met à jour les données de l'éleveur ou du client en cours d'enregistrement
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

    // Méthode pour nettoyer les données de l'utilisateur en cours d'enregistrement
    clearRegisteringUser() {
        localStorage.removeItem('registeringUserId');
        localStorage.removeItem('step1');
        localStorage.removeItem('step2');
        localStorage.removeItem('step3');
        localStorage.removeItem('step4');
        localStorage.removeItem('step5');
    }
    // ---------------------------------------------------------------
    // FIN méthodes pour gérer l'utilisateur en cours d'enregistrement
    // ---------------------------------------------------------------

}
