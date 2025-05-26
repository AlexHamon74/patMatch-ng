import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../core/services/user.service';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [RouterLink],
    templateUrl: './header.component.html',
    styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
    userFirstName: string = 'Invité';
    userService = inject(UserService);

    ngOnInit(): void {
        // On demande au service de charger le prénom
        this.userService.loadFirstName().subscribe();

        // On s'abonne au prénom réactif
        this.userService.firstName$.subscribe(firstName => {
            this.userFirstName = firstName ?? 'Invité';
        });
    }

}
