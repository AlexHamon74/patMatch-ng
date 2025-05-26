import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environnement/environnement.production';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BreederApiResponse, BreederInterface } from '../entities';
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

    // Récupération de tous les éleveurs
    fetchAllBreeders(): Observable<BreederApiResponse> {
        return this.http.get<BreederApiResponse>(`${this.url}/eleveurs`, { headers: this.headers });
    }

    // Récupération d'un éleveur par son ID
    fetchBreederById(id: number): Observable<BreederInterface> {
        return this.http.get<BreederInterface>(`${this.url}/eleveurs/${id}`, { headers: this.headers });
    }
}
