import { Component, inject, OnInit } from '@angular/core';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';
import { HeaderComponent } from '../../../shared/header/header.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { SwipeInterface } from '../../../core/entities';
import { SwipeService } from '../../../core/services/swipe.service';


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

    // Injection des services
    swipeService = inject(SwipeService);
    route = inject(ActivatedRoute);

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
    confirmDelete(swipeId: string): void {
        const confirmed = window.confirm("Es-tu sûr de vouloir supprimer ce match ?");
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
}
