import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from '../../../shared/header/header.component';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';
import { AdoptionService } from '../../../core/services/adoption.service';
import { AdoptionListBreederInterface } from '../../../core/entities';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-demande-adoption',
    standalone: true,
    imports: [HeaderComponent, NavbarComponent, DatePipe],
    templateUrl: './demande-adoption.component.html',
    styleUrl: './demande-adoption.component.css'
})
export class DemandeAdoptionComponent implements OnInit {
    // Déclaration des variables
    adoptions: AdoptionListBreederInterface[] = [];
    isLoading = true;

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
}
