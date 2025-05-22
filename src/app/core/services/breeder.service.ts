import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environnement/environnement.production';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BreederInterface } from '../entities';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class BreederService {
    // Définition des variables
    private url = environment.apiURL;
    headers = new HttpHeaders({ 'Content-Type': 'application/ld+json' });

    // Injection des services
    http = inject(HttpClient);

    // Récupération des informations de l'éléveur connecté
    getBreeder(): Observable<BreederInterface> {
        return this.http.get<BreederInterface>(`${this.url}/me`);
    }
}
