import { Component } from '@angular/core';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';
import { HeaderComponent } from '../../../shared/header/header.component';

@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [NavbarComponent, HeaderComponent],
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.css'
})
export class ProfilComponent {

  logout() {
        this.authService.logout();
        this.router.navigate(['']);
    };

}
