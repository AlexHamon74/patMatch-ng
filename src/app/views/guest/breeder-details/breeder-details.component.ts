import { Component, inject, OnInit } from '@angular/core';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';
import { HeaderComponent } from '../../../shared/header/header.component';
import { BreederInterface } from '../../../core/entities';
import { BreederService } from '../../../core/services/breeder.service';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
    selector: 'app-breeder-details',
    standalone: true,
    imports: [NavbarComponent, HeaderComponent, RouterLink],
    templateUrl: './breeder-details.component.html',
    styleUrl: './breeder-details.component.css'
})
export class BreederDetailsComponent implements OnInit {
    // Déclaration des variables
    breeder!: BreederInterface;

    // Injection des services
    breederService = inject(BreederService);
    route = inject(ActivatedRoute);

    // Récupère un éleveur par son ID
    ngOnInit(): void {
        const id = +this.route.snapshot.paramMap.get('id')!;

        this.breederService.fetchBreederById(id).subscribe({
            next: (breeder) => {
                this.breeder = breeder;
                console.log('Détails de l\'éleveur récupérés :', this.breeder);
            },
            error: (error) => {
                console.error('Erreur lors de la récupération de l\'éleveur :', error);
                // TODO: redirection vers une page d'erreur
            }
        });
        
    }
}
