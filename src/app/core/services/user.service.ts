import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BreederInterface, ClientInterface } from '../entities';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environnement/environnement';
import { TokenService } from './token.service';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private url = environment.apiURL;

    private firstNameSubject = new BehaviorSubject<string | null>(null);
    firstName$ = this.firstNameSubject.asObservable();

    private photoProfilSubject = new BehaviorSubject<string | null>(null);
    photoProfil$ = this.photoProfilSubject.asObservable();

    http = inject(HttpClient);
    tokenService = inject(TokenService);

    // Vérifie si l'utilisateur est connecté
    // -------------------------------------
    isLogged(): boolean {
        const token = localStorage.getItem('token');
        return !!token;
    };

    // Récupère les informations de l'utilisateur connecté
    // ---------------------------------------------------
    getUserProfile<T>(): Observable<T> {
        return this.http.get<T>(`${this.url}/me`);
    }

    // ------------------------------------------------------------------------
    // Méthode pour afficher le nom et la photo de l'utilisateur dans le header
    // ------------------------------------------------------------------------
    loadUserInfo(): void {
        const cachedFirstName = localStorage.getItem('userFirstName');
        const cachedPhoto = localStorage.getItem('userPhoto');

        if (cachedFirstName) this.firstNameSubject.next(cachedFirstName);
        if (cachedPhoto) this.photoProfilSubject.next(cachedPhoto);

        const role = this.tokenService.hasRole('ROLE_CLIENT') ? 'client' :
            this.tokenService.hasRole('ROLE_ELEVEUR') ? 'breeder' : null;

        if (!role) return;

        this.getUserProfile<ClientInterface | BreederInterface>().subscribe(user => {
            this.firstNameSubject.next(user.prenom);
            this.photoProfilSubject.next(user.photoProfil);
            localStorage.setItem('userFirstName', user.prenom);
            localStorage.setItem('userPhoto', user.photoProfil);
        });
    }

    clearFirstName(): void {
        this.firstNameSubject.next(null);
        this.photoProfilSubject.next(null);
        localStorage.removeItem('userFirstName');
        localStorage.removeItem('userPhoto');
    }
    // ----------------------------------------------------------------
    // FIN méthode pour afficher le nom de l'utilisateur dans le header
    // ----------------------------------------------------------------

}
