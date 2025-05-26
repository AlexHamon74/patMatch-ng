import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
import { BreederInterface, ClientInterface, TokenPayload } from '../entities';
import { BehaviorSubject, map, Observable, of, tap } from 'rxjs';
import { environment } from '../../../environnement/environnement.production';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private url = environment.apiURL;
    private firstNameSubject = new BehaviorSubject<string | null>(null);
    firstName$ = this.firstNameSubject.asObservable();

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

    //Méthode pour vérifier si l'utilisateur a un rôle spécifique
    hasRole(role: string): boolean {
        const roles = this.getUserRoles();
        return roles ? roles.includes(role) : false;
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

    getUserProfile<T>(): Observable<T> {
        return this.http.get<T>(`${this.url}/me`);
    }

    // Pour mettre à jour le prénom
    setFirstName(firstName: string): void {
        this.firstNameSubject.next(firstName);
        localStorage.setItem('userFirstName', firstName);
    }

    // Pour charger le prénom depuis le cache ou l'API
    loadFirstName(): Observable<string | null> {
        const cached = localStorage.getItem('userFirstName');
        if (cached) {
            this.setFirstName(cached);
            return of(cached); // retourne un Observable
        }

        if (this.hasRole('ROLE_CLIENT')) {
            return this.getUserProfile<ClientInterface>().pipe(
                map(user => user.prenom),
                tap(prenom => this.setFirstName(prenom))
            );
        }

        if (this.hasRole('ROLE_ELEVEUR')) {
            return this.getUserProfile<BreederInterface>().pipe(
                map(user => user.prenom),
                tap(prenom => this.setFirstName(prenom))
            );
        }

        return of(null);
    }

    // Pour réinitialiser le prénom (ex : logout)
    clearFirstName(): void {
        this.firstNameSubject.next(null);
    }

}
