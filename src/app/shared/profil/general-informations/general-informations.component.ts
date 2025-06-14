import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { NavbarComponent } from '../../navbar/navbar.component';
import { UserService } from '../../../core/services/user.service';
import { TokenService } from '../../../core/services/token.service';
import { BreederInterface, ClientInterface } from '../../../core/entities';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Component({
    selector: 'app-general-informations',
    standalone: true,
    imports: [HeaderComponent, NavbarComponent, DatePipe, RouterLink],
    templateUrl: './general-informations.component.html',
    styleUrl: './general-informations.component.css'
})
export class GeneralInformationsComponent {
    private tokenService = inject(TokenService);
    private userService = inject(UserService);

    clientProfile!: ClientInterface;
    breederProfile!: BreederInterface;
    userRole!: string;
    environment = environment;

    nbLikes = 0;
    nbDemandesEnvoyees = 0;
    nbDemandesAcceptees = 0;

    ngOnInit(): void {
        if (this.tokenService.hasRole('ROLE_CLIENT')) {
            this.userRole = 'ROLE_CLIENT';
            this.userService.getUserProfile<ClientInterface>().subscribe(profile => {
                this.clientProfile = profile;

                // 1. Nombre de likes
                this.nbLikes = this.clientProfile.swipes.filter(swipe => swipe['type'] === 'like').length;

                // 2. Nombre de demandes envoyées
                this.nbDemandesEnvoyees = this.clientProfile.adoptions.length;

                // 3. Nombre de demandes acceptées
                this.nbDemandesAcceptees = this.clientProfile.adoptions
                    .filter(adoption => adoption.status === 'Demande acceptée')
                    .length;
            });
        } else if (this.tokenService.hasRole('ROLE_ELEVEUR')) {
            this.userRole = 'ROLE_ELEVEUR';
            this.userService.getUserProfile<BreederInterface>().subscribe(profile => {
                this.breederProfile = profile;
            });
        }
    }
}
