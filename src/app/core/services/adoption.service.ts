import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';import { environment } from '../../../environnement/environnement';

import { AdoptionCreateInterface, AdoptionListBreederInterface } from '../entities';

@Injectable({
    providedIn: 'root'
})
export class AdoptionService {
    // Définition des variables
    private url = environment.apiURL;
    headers = new HttpHeaders({ 'Content-Type': 'application/ld+json' });
    patchHeaders = new HttpHeaders({ 'Content-Type': 'application/merge-patch+json' });


    // Injection des services
    http = inject(HttpClient);

    // Méthode pour créer une adoption
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

    // Méthode pour récupérer toutes les demandes d'adoptions côtés Eleveur
    // --------------------------------------------------------------------
    getAdoptions(): Observable<AdoptionListBreederInterface[]> {
        return this.http.get<AdoptionListBreederInterface[]>(`${this.url}/me/adoptionRequests`);
    }

    // Méthode pour mettre à jour le status d'une adoption
    // ---------------------------------------------------
    updateStatus(adoption: AdoptionListBreederInterface, newStatus: string): Observable<AdoptionListBreederInterface> {
        const body = { status: newStatus };
        const url = `${this.url}/adoptions/${adoption.id}`;
        return this.http.patch<AdoptionListBreederInterface>(url, body, { headers: this.patchHeaders });
    }
}
