import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environnement/environnement.production';
import { Observable, throwError } from 'rxjs';
import { AdoptionCreateInterface } from '../entities';

@Injectable({
    providedIn: 'root'
})
export class AdoptionService {
    // Définition des variables
    private url = environment.apiURL;
    headers = new HttpHeaders({ 'Content-Type': 'application/ld+json' });

    // Injection des services
    http = inject(HttpClient);

    // Méthode pour créer un match
    // ---------------------------
    createAdoption(adoption: AdoptionCreateInterface): Observable<AdoptionCreateInterface> {
        if (!adoption.client || !adoption.animal) {
            return throwError(() => new Error("Le client et l'animal doivent être définis."));
        }
        const payload: AdoptionCreateInterface = {
            client: `/api/clients/${adoption.client}`,
            animal: `/api/animals/${adoption.animal}`,
            status: adoption.status,
            dateDemande: adoption.dateDemande,
        };
        return this.http.post<AdoptionCreateInterface>(`${this.url}/adoptions`, payload, { headers: this.headers });
    }
}
