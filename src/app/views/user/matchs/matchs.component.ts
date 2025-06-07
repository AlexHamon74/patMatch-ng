import { Component, inject, OnInit } from '@angular/core';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';
import { HeaderComponent } from '../../../shared/header/header.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { AdoptionCreateInterface, SwipeInterface } from '../../../core/entities';
import { SwipeService } from '../../../core/services/swipe.service';
import { environment } from '../../../../environnement/environnement';
import { AnimalService } from '../../../core/services/animal.service';
import { AdoptionService } from '../../../core/services/adoption.service';
import { TokenService } from '../../../core/services/token.service';


@Component({
    selector: 'app-matchs',
    standalone: true,
    imports: [NavbarComponent, HeaderComponent, NgbDropdownModule, RouterLink],
    templateUrl: './matchs.component.html',
    styleUrl: './matchs.component.css'
})
export class MatchsComponent implements OnInit {
    // Déclaration des variables
    matchs: SwipeInterface[] = [];
    toastVisible = false;
    toastMessage = '';
    environment = environment;

    // Injection des services
    swipeService = inject(SwipeService);
    route = inject(ActivatedRoute);
    animalService = inject(AnimalService);
    adoptionService = inject(AdoptionService);
    tokenService = inject(TokenService);

    ngOnInit(): void {
        // Récupération des matchs de l'utilisateur
        this.swipeService.getMatchs().subscribe({
            next: (data) => {
                this.matchs = data;
            },
            error: (err) => {
                console.error('Erreur lors de la récupération des matchs :', err);
            }
        });
    }

    // Méthode pour supprimer un match
    confirmDelete(swipeId: string, animalNom: string): void {
        const confirmed = window.confirm("Es-tu sûr de vouloir supprimer " + `${animalNom}` + " de tes matchs ?");
        if (confirmed) {
            this.swipeService.deleteSwipe(swipeId).subscribe({
                next: () => {
                    this.matchs = this.matchs.filter(match => match.id !== swipeId);
                    this.toastMessage = "Match supprimé avec succès.";
                    this.toastVisible = true;

                    // Masquer le toast après 3 secondes
                    setTimeout(() => {
                        this.toastVisible = false;
                    }, 3000);
                },
                error: (err) => {
                    console.error('Erreur lors de la suppression du swipe :', err);
                }
            });
        }
    }

    // Méthode pour envoyer une demande d'adoption
    sendAdoptionRequest(animalId: string, animalNom: string): void {
        const confirmed = window.confirm("Es-tu sûr de vouloir enoyer une demande d'adoption pour " + `${animalNom} ?`);
        if (confirmed) {
            const clientId = this.tokenService.getUserId();

            if (!clientId || !animalId) {
                console.error("Impossible de récupérer les identifiants pour l'adoption");
                return;
            }

            const adoptionPayload: AdoptionCreateInterface = {
                client: clientId,
                animal: animalId,
                status: 'Demande envoyée',
                dateDemande: new Date().toISOString(),
            };

            this.adoptionService.createAdoption(adoptionPayload).subscribe({
                next: () => {
                    this.toastMessage = "Demande d'adoption envoyée avec succès.";
                    this.toastVisible = true;

                    setTimeout(() => {
                        this.toastVisible = false;
                    }, 3000);
                },
                error: (error) => {
                    console.error("Erreur lors de la demande d'adoption :", error);
                }
            });
        }
    }
}
