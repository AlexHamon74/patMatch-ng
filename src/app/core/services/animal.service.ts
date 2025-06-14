import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AnimalCreateInterface, AnimalInterface } from '../entities';
import { Observable, throwError } from 'rxjs';
import { UserService } from './user.service';
import { TokenService } from './token.service';

@Injectable({
    providedIn: 'root'
})
export class AnimalService {
    // Définition des variables
    private url = environment.apiURL;
    private stepKeys = ['step1', 'step2', 'step3', 'step4', 'step5'];
    headers = new HttpHeaders({ 'Content-Type': 'application/ld+json' });

    // Injection des services
    http = inject(HttpClient);
    userService = inject(UserService);
    tokenService = inject(TokenService);

    // -------------------------------------------------------------------------------
    // Liste des méthodes pour créer un animal dans le formualaire en plusieurs étapes 
    // -------------------------------------------------------------------------------

    // Méthode pour enregistrer un nouvel animal
    createAnimal(animal: AnimalCreateInterface): Observable<AnimalCreateInterface> {
        if (!this.userService.isLogged()) {
            return throwError(() => new Error('Utilisateur non connecté'));
        }
        const userId = this.tokenService.getUserId();
        const fullAnimal: AnimalCreateInterface = {
            ...animal,
            eleveur: `/api/users/${userId}`
        };

        return this.http.post<AnimalCreateInterface>(`${this.url}/animals`, fullAnimal, { headers: this.headers });
    }

    // Sauvegarde temporaire de l'animal en cours d'inscription dans le localStorage
    saveStepData(stepKey: string, data: Partial<AnimalCreateInterface>) {
        localStorage.setItem(stepKey, JSON.stringify(data));
    }

    // Gestion de l'id de l'animal dans le localStorage
    saveAnimalId(id: string) {
        localStorage.setItem('AnimalId', id);
    }
    getAnimalId(): string | null {
        return localStorage.getItem('AnimalId');
    }
    clearAnimalId() {
        localStorage.removeItem('AnimalId');
    }

    // Récupération des données de l'animal en cours d'inscription depuis le localStorage 
    // pour préremplir le formulaire en cas de retour en arrière
    loadStepData(stepKey: string): Partial<AnimalCreateInterface> | null {
        const stored = localStorage.getItem(stepKey);
        return stored ? JSON.parse(stored) as Partial<AnimalCreateInterface> : null;
    }

    // Récupération de toutes les données de l'animal en cours d'inscription
    // pour les envoyer à l'API lors de la création de l'animal
    getFullAnimalFromSteps(): AnimalCreateInterface | null {
        const steps = this.stepKeys.map(key => this.loadStepData(key));
        if (steps.some(step => step === null)) {
            return null;
        }
        return Object.assign({}, ...steps);
    }

    // Nettoie le localStorage en supprimant les données de l'animal en cours d'inscription
    clearAnimalRegistrationData() {
        this.stepKeys.forEach(key => localStorage.removeItem(key));
    }
    // -----------------------------------------------------------------------------------
    // FIN liste des méthodes pour créer un animal dans le formualaire en plusieurs étapes 
    // -----------------------------------------------------------------------------------

    // Récupération de tous les animaux
    fetchAllAnimals(): Observable<AnimalInterface> {
        return this.http.get<AnimalInterface>(`${this.url}/animals/non-swiped`, { headers: this.headers });
    }

    // Récupération d'un animal par son ID
    fetchAnimalById(id: number): Observable<AnimalInterface> {
        return this.http.get<AnimalInterface>(`${this.url}/animals/${id}`, { headers: this.headers });
    }

    // Upload de l'image de l'animal
    uploadAnimalImage(animalId: string, file: File): Observable<any> {
        if (!this.userService.isLogged()) {
            return throwError(() => new Error('Utilisateur non connecté'));
        }

        const formData = new FormData();
        formData.append('animalImageFile', file);

        return this.http.post(`${this.url}/animals/${animalId}/image`, formData);
    }

}
