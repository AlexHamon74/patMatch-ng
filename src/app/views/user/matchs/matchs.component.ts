import { Component } from '@angular/core';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';
import { HeaderComponent } from '../../../shared/header/header.component';
import { RouterLink } from '@angular/router';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-matchs',
  standalone: true,
  imports: [NavbarComponent, HeaderComponent, RouterLink, NgbDropdownModule],
  templateUrl: './matchs.component.html',
  styleUrl: './matchs.component.css'
})
export class MatchsComponent {

}
