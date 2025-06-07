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
import { AlertService } from '../../../core/services/alert.service';

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
    environment = environment;

    // Injection des services
    swipeService = inject(SwipeService);
    route = inject(ActivatedRoute);
    animalService = inject(AnimalService);
    adoptionService = inject(AdoptionService);
    tokenService = inject(TokenService);
    alertService = inject(AlertService);

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

    // Supprimer un match avec confirmation
    confirmDelete(swipeId: string, animalNom: string): void {
        this.alertService.confirmDialog({
            title: 'Supprimer ce match ?',
            text: `Es-tu sûr de vouloir supprimer ${animalNom} de tes matchs ?`,
        }).then(confirmed => {
            if (confirmed) {
                this.swipeService.deleteSwipe(swipeId).subscribe({
                    next: () => {
                        this.matchs = this.matchs.filter(match => match.id !== swipeId);
                        this.alertService.successToast('Match supprimé avec succès.');
                    },
                    error: (err) => {
                        console.error('Erreur lors de la suppression du swipe :', err);
                        this.alertService.errorToast("Erreur lors de la suppression.");
                    }
                });
            }
        });
    }

    // Envoyer une demande d’adoption
    sendAdoptionRequest(animalId: string, animalNom: string): void {
        this.alertService.confirmDialog({
            title: 'Confirmer l\'adoption',
            text: `Es-tu sûr de vouloir adopter ${animalNom} ?`,
        }).then(confirmed => {
            if (confirmed) {
                const clientId = this.tokenService.getUserId();

                if (!clientId || !animalId) {
                    console.error("Identifiants manquants pour l'adoption");
                    this.alertService.errorToast("Impossible d'envoyer la demande.");
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
                        this.alertService.successToast("Demande d'adoption envoyée avec succès.");
                    },
                    error: (err) => {
                        console.error("Erreur lors de la demande d'adoption :", err);
                        this.alertService.errorToast("Erreur lors de la demande.");
                    }
                });
            }
        });
    }
}
