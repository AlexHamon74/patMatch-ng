import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../core/services/user.service';
import { RouterLink } from '@angular/router';
import { environment } from '../../../environnement/environnement';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [RouterLink],
    templateUrl: './header.component.html',
    styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
    userFirstName: string = 'Invité';
    profilePhotoUrl = 'images/profile_picture.jpg';

    userService = inject(UserService);

    ngOnInit(): void {
        this.userService.loadUserInfo();

        this.userService.firstName$.subscribe(name => {
            this.userFirstName = name ?? 'Invité';
        });

        this.userService.photoProfil$.subscribe(photo => {
        this.profilePhotoUrl = photo ? `${environment.uploadUrl}users/${photo}` : 'images/profile_picture.jpg';
        });
    }

}
