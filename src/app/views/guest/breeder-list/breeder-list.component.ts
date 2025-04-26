import { Component } from '@angular/core';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';
import { HeaderComponent } from '../../../shared/header/header.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-breeder-list',
  standalone: true,
  imports: [NavbarComponent, HeaderComponent, RouterLink],
  templateUrl: './breeder-list.component.html',
  styleUrl: './breeder-list.component.css'
})
export class BreederListComponent {

}
