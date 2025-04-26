import { Component } from '@angular/core';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';
import { HeaderComponent } from '../../../shared/header/header.component';

@Component({
  selector: 'app-breeder-details',
  standalone: true,
  imports: [NavbarComponent, HeaderComponent],
  templateUrl: './breeder-details.component.html',
  styleUrl: './breeder-details.component.css'
})
export class BreederDetailsComponent {

}
