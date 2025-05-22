import { Component, inject } from '@angular/core';
import { BreederService } from '../../core/services/breeder.service';
import { BreederInterface } from '../../core/entities';
import { UserService } from '../../core/services/user.service';

@Component({
    selector: 'app-header-breeder',
    standalone: true,
    imports: [],
    templateUrl: './header-breeder.component.html',
    styleUrl: './header-breeder.component.css'
})
export class HeaderBreederComponent {
    // Déclaration des variables
    breeder!: BreederInterface;

    // Injection des services
    breederService = inject(BreederService);

    ngOnInit(): void {
        this.breederService.getBreeder().subscribe({
            next: (data) => {
                this.breeder = data;
                console.log('Eleveur connecté :', this.breeder);
            },
            error: (err) => {
                console.error('Erreur lors de la récupération du client :', err);
            }
        });
    }
}
