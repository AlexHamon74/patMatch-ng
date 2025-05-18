import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environnement/environnement.production';
import { map, Observable } from 'rxjs';
import { EspeceInterface, HydraResponse } from '../entities';

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
    fetchAllEspeces(): Observable<EspeceInterface[]> {
        return this.http
            .get<HydraResponse<EspeceInterface>>(`${this.url}/especes`, { headers: this.headers })
            .pipe(map(response => response['member']));
    }
}
