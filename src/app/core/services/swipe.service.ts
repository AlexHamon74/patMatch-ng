import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environnement/environnement.production';
import { SwipeCreateInterface } from '../entities';
import { UserService } from './user.service';
import { Observable, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SwipeService {
    // Définition des variables
    private url = environment.apiURL;
    headers = new HttpHeaders({ 'Content-Type': 'application/ld+json' });
    private _currentAnimalId: string | null = null;

    // Injection des services
    http = inject(HttpClient);
    userService = inject(UserService);

    // Méthode pour créer un match
    createSwipe(swipe: SwipeCreateInterface): Observable<SwipeCreateInterface> {

        // Validation simple des paramètres
        if (!swipe.client || !swipe.animal) {
            return throwError(() => new Error("Le client et l'animal doivent être définis."));
        }

        // Remplacement des IDs par les URI complètes
        const payload: SwipeCreateInterface = {
            client: `/api/clients/${swipe.client}`,
            animal: `/api/animals/${swipe.animal}`,
            type: swipe.type
        };

        return this.http.post<SwipeCreateInterface>(`${this.url}/swipes`, payload, { headers: this.headers });
    }

  setCurrentAnimalId(id: string): void {
    this._currentAnimalId = id;
  }

  getCurrentAnimalId(): string | null {
    return this._currentAnimalId;
  }
}
