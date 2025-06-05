import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from '../../../shared/header/header.component';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';
import { AdoptionService } from '../../../core/services/adoption.service';
import { AdoptionListBreederInterface } from '../../../core/entities';
import { CommonModule, DatePipe } from '@angular/common';
import { environment } from '../../../../environnement/environnement';

@Component({
    selector: 'app-demande-adoption',
    standalone: true,
    imports: [HeaderComponent, NavbarComponent, DatePipe, CommonModule],
    templateUrl: './demande-adoption.component.html',
    styleUrl: './demande-adoption.component.css'
})
export class DemandeAdoptionComponent implements OnInit {
    // Déclaration des variables
    adoptions: AdoptionListBreederInterface[] = [];
    isLoading = true;
    environment = environment;

    // Injection des services
    adoptionService = inject(AdoptionService);

    ngOnInit(): void {
        // Récupération des adoptions de l'utilisateur
        this.adoptionService.getAdoptions().subscribe({
            next: (data) => {
                this.adoptions = data;
                this.isLoading = false;
            },
            error: (err) => {
                this.isLoading = false;
                console.error('Erreur lors de la récupération des adoptions :', err);
            }
        });
    }

    // Méthode lancée lors de la confirmation d'une adoption
    confirmAdoption(adoption: AdoptionListBreederInterface) {
        const confirm = window.confirm('Confirmer cette adoption ?');
        if (!confirm) return;

        this.adoptionService.updateStatus(adoption, 'Demande acceptée').subscribe({
            next: (updated) => {
                alert('Demande acceptée');
                adoption.status = updated.status;
            },
            error: (err) => {
                console.error('Erreur lors de la confirmation :', err);
                alert('Erreur lors de la confirmation.');
            }
        });
    }

    // Méthode lancée lors du refus d'une adoption
    refuseAdoption(adoption: AdoptionListBreederInterface) {
        const confirm = window.confirm('Refuser cette adoption ?');
        if (!confirm) return;

        this.adoptionService.updateStatus(adoption, 'Demande refusée').subscribe({
            next: (updated) => {
                alert('Demande refusée');
                adoption.status = updated.status;
            },
            error: (err) => {
                console.error('Erreur lors du refus :', err);
                alert('Erreur lors du refus.');
            }
        });
    }
}
