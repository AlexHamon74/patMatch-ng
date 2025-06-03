import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environnement/environnement';
import { Observable } from 'rxjs';
import { EspeceApiResponse } from '../entities';

@Injectable({
    providedIn: 'root'
})
export class EspeceService {
    // Définition des variables
    private url = environment.apiURL;
    headers = new HttpHeaders({ 'Content-Type': 'application/ld+json' });

    // Injection des services
    http = inject(HttpClient);

    // Récupère toutes les catégories
    fetchAllEspeces(): Observable<EspeceApiResponse> {
        return this.http.get<EspeceApiResponse>(`${this.url}/especes`, { headers: this.headers })
    }
}
