import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BreederInterface, ClientInterface } from '../entities';
import { BehaviorSubject, map, Observable, of, tap } from 'rxjs';
import { environment } from '../../../environnement/environnement.production';
import { TokenService } from './token.service';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private url = environment.apiURL;
    private firstNameSubject = new BehaviorSubject<string | null>(null);
    firstName$ = this.firstNameSubject.asObservable();

    http = inject(HttpClient);
    tokenService = inject(TokenService);

    // Vérifie si l'utilisateur est connecté
    // -------------------------------------
    isLogged(): boolean {
        const token = localStorage.getItem('token');
        return !!token;
    };

    // ------------------------------------------------------------
    // Méthode pour afficher le nom de l'utilisateur dans le header
    // ------------------------------------------------------------
    getUserProfile<T>(): Observable<T> {
        return this.http.get<T>(`${this.url}/me`);
    }

    setFirstName(firstName: string): void {
        this.firstNameSubject.next(firstName);
        localStorage.setItem('userFirstName', firstName);
    }

    loadFirstName(): Observable<string | null> {
        const cached = localStorage.getItem('userFirstName');
        if (cached) {
            this.setFirstName(cached);
            return of(cached);
        }

        if (this.tokenService.hasRole('ROLE_CLIENT')) {
            return this.getUserProfile<ClientInterface>().pipe(
                map(user => user.prenom),
                tap(prenom => this.setFirstName(prenom))
            );
        }

        if (this.tokenService.hasRole('ROLE_ELEVEUR')) {
            return this.getUserProfile<BreederInterface>().pipe(
                map(user => user.prenom),
                tap(prenom => this.setFirstName(prenom))
            );
        }

        return of(null);
    }

    clearFirstName(): void {
        this.firstNameSubject.next(null);
    }
    // ----------------------------------------------------------------
    // FIN méthode pour afficher le nom de l'utilisateur dans le header
    // ----------------------------------------------------------------

}
