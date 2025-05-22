import { Component, inject, OnInit } from '@angular/core';
import { ClientService } from '../../core/services/client.service';
import { ClientInterface } from '../../core/entities';
import { UserService } from '../../core/services/user.service';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [],
    templateUrl: './header.component.html',
    styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
    // Déclaration des variables
    client: ClientInterface | null = null;

    // Injection des services
    clientService = inject(ClientService);
    userService = inject(UserService);

    ngOnInit(): void {
        const token = this.userService.getToken();
        if (token) {
            this.clientService.getClient().subscribe({
                next: (data) => {
                    this.client = data;
                    console.log('Client connecté :', this.client);
                },
                error: (err) => {
                    console.error('Erreur lors de la récupération du client :', err);
                }
            });
        } else {
            console.log('Aucun token trouvé, utilisateur non connecté.');
        }
    }
}
