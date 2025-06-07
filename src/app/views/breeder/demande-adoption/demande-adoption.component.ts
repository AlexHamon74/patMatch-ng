import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from '../../../shared/header/header.component';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';
import { AdoptionService } from '../../../core/services/adoption.service';
import { AdoptionListBreederInterface } from '../../../core/entities';
import { CommonModule, DatePipe } from '@angular/common';
import { environment } from '../../../../environnement/environnement';
import Swal from 'sweetalert2';

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

    confirmAdoption(adoption: AdoptionListBreederInterface): void {
        Swal.fire({
            title: "Confirmer l'adoption ?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Oui, confirmer',
            cancelButtonText: 'Annuler',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#aaa'
        }).then(result => {
            if (result.isConfirmed) {
                this.adoptionService.updateStatus(adoption, 'Demande acceptée').subscribe({
                    next: (updated) => {
                        adoption.status = updated.status;
                        this.showToast("Demande d'adoption acceptée.");
                    },
                    error: (err) => {
                        console.error('Erreur lors de la confirmation :', err);
                        this.showErrorToast('Erreur lors de la confirmation.');
                    }
                });
            }
        });
    }

    refuseAdoption(adoption: AdoptionListBreederInterface): void {
        Swal.fire({
            title: "Refuser l'adoption ?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Oui, refuser',
            cancelButtonText: 'Annuler',
            confirmButtonColor: '#d33',
            cancelButtonColor: '#aaa'
        }).then(result => {
            if (result.isConfirmed) {
                this.adoptionService.updateStatus(adoption, 'Demande refusée').subscribe({
                    next: (updated) => {
                        adoption.status = updated.status;
                        this.showToast("Demande d'adoption refusée.");
                    },
                    error: (err) => {
                        console.error('Erreur lors du refus :', err);
                        this.showErrorToast('Erreur lors du refus.');
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

    private showErrorToast(message: string): void {
        Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'error',
            title: message,
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true
        });
    }
}
