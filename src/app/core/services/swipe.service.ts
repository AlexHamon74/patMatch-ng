import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { SwipeCreateInterface, SwipeInterface } from '../entities';
import { UserService } from './user.service';
import { map, Observable, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SwipeService {
    // Définition des variables
    private url = environment.apiURL;
    headers = new HttpHeaders({ 'Content-Type': 'application/ld+json' });
    private currentAnimalId: string | null = null;

    // Injection des services
    http = inject(HttpClient);
    userService = inject(UserService);

    // Récupération des matchs de l'utilisateur
    // ----------------------------------------
    getMatchs(): Observable<SwipeInterface[]> {
        return this.http.get<SwipeInterface[]>(`${this.url}/me/likes`);
    }

    // Méthode pour créer un match
    // ---------------------------
    createSwipe(swipe: SwipeCreateInterface): Observable<SwipeCreateInterface> {
        if (!swipe.client || !swipe.animal) {
            return throwError(() => new Error("Le client et l'animal doivent être définis."));
        }
        const payload: SwipeCreateInterface = {
            client: `/api/clients/${swipe.client}`,
            animal: `/api/animals/${swipe.animal}`,
            type: swipe.type
        };
        return this.http.post<SwipeCreateInterface>(`${this.url}/swipes`, payload, { headers: this.headers });
    }

    // Méthode pour supprimer un swipe
    // -------------------------------
    deleteSwipe(swipeId: string): Observable<void> {
        return this.http.delete<void>(`${this.url}/swipes/${swipeId}`);
    }

    // Gère l'affichage de l'animal actuel dans la page home
    // -----------------------------------------------------
    setCurrentAnimalId(id: string): void {
        this.currentAnimalId = id;
    }

    getCurrentAnimalId(): string | null {
        return this.currentAnimalId;
    }

    // Vérifie si l'utilisateur a liké un animal spécifique
    isAnimalLiked(animalId: string): Observable<boolean> {
        return this.getMatchs().pipe(
            map((swipes) => swipes.some(swipe => swipe.animal.id === animalId))
        );
    }
}
