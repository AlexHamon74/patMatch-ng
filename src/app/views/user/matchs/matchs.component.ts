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
import Swal from 'sweetalert2';

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
        Swal.fire({
            title: 'Supprimer ce match ?',
            text: `Es-tu sûr de vouloir supprimer ${animalNom} de tes matchs ?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Oui, supprimer',
            cancelButtonText: 'Annuler',
            confirmButtonColor: '#d33',
            cancelButtonColor: '#aaa'
        }).then(result => {
            if (result.isConfirmed) {
                this.swipeService.deleteSwipe(swipeId).subscribe({
                    next: () => {
                        this.matchs = this.matchs.filter(match => match.id !== swipeId);
                        this.showToast('Match supprimé avec succès.');
                    },
                    error: (err) => {
                        console.error('Erreur lors de la suppression du swipe :', err);
                    }
                });
            }
        });
    }

    // Méthode pour envoyer une demande d'adoption
    sendAdoptionRequest(animalId: string, animalNom: string): void {
        Swal.fire({
            title: `Confirmer l'adoption`,
            text: `Es-tu sûr de vouloir adopter ${animalNom} ?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Oui',
            cancelButtonText: 'Annuler',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
        }).then(result => {
            if (result.isConfirmed) {
                const clientId = this.tokenService.getUserId();

                if (!clientId || !animalId) {
                    console.error("Identifiants manquants pour l'adoption");
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
                        this.showToast("Demande d'adoption envoyée avec succès.");
                    },
                    error: (err) => {
                        console.error("Erreur lors de la demande d'adoption :", err);
                    }
                });
            }
        });
    }

    private showToast(message: string): void {
        Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'success',
            title: message,
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true
        });
    }
}
