import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environnement/environnement.production';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClientInterface } from '../entities';

@Injectable({
    providedIn: 'root'
})
export class ClientService {
    // Définition des variables
    private url = environment.apiURL;
    headers = new HttpHeaders({ 'Content-Type': 'application/ld+json' });

    // Injection des services
    http = inject(HttpClient);

    getClient(): Observable<ClientInterface> {
    return this.http.get<ClientInterface>(`${this.url}/me`);
  }
}
