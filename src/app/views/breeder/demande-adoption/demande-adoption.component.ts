import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from '../../../shared/header/header.component';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';
import { AdoptionService } from '../../../core/services/adoption.service';
import { AdoptionListBreederInterface } from '../../../core/entities';
import { CommonModule, DatePipe } from '@angular/common';
import { environment } from '../../../../environments/environment';
import { AlertService } from '../../../core/services/alert.service';

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
    alertService = inject(AlertService);

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

    confirmAdoption(adoption: AdoptionListBreederInterface): void {
        this.alertService.confirmDialog({
            title: "Confirmer l'adoption ?",
        }).then(confirmed => {
            if (confirmed) {
                this.adoptionService.updateStatus(adoption, 'Demande acceptée').subscribe({
                    next: (updated) => {
                        adoption.status = updated.status;
                        this.alertService.successToast("Demande d'adoption acceptée.");
                    },
                    error: (err) => {
                        console.error('Erreur lors de la confirmation :', err);
                        this.alertService.errorToast('Erreur lors de la confirmation.');
                    }
                });
            }
        });
    }

    refuseAdoption(adoption: AdoptionListBreederInterface): void {
        this.alertService.confirmDialog({
            title: "Refuser l'adoption ?",
        }).then(confirmed => {
            if (confirmed) {
                this.adoptionService.updateStatus(adoption, 'Demande refusée').subscribe({
                    next: (updated) => {
                        adoption.status = updated.status;
                        this.alertService.successToast("Demande d'adoption refusée.");
                    },
                    error: (err) => {
                        console.error('Erreur lors du refus :', err);
                        this.alertService.errorToast('Erreur lors du refus.');
                    }
                });
            }
        });
    }
}
