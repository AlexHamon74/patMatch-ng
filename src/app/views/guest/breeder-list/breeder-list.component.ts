import { Component, inject, OnInit } from '@angular/core';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';
import { HeaderComponent } from '../../../shared/header/header.component';
import { RouterLink } from '@angular/router';
import { BreederInterface } from '../../../core/entities';
import { BreederService } from '../../../core/services/breeder.service';

@Component({
    selector: 'app-breeder-list',
    standalone: true,
    imports: [NavbarComponent, HeaderComponent, RouterLink],
    templateUrl: './breeder-list.component.html',
    styleUrl: './breeder-list.component.css'
})
export class BreederListComponent implements OnInit {
    // Déclaration des variables
    breeders: BreederInterface[] | null = null;

    // Injection des services
    breederService = inject(BreederService);

    // Récupération de tous les éleveurs
    ngOnInit(): void {
        this.breederService.fetchAllBreeders().subscribe({
            next: (data) => {
                this.breeders = data.member;
            },
            error: (err) => {
                console.error('Erreur lors de la récupération des éleveurs :', err);
            }
        });
    }
}
