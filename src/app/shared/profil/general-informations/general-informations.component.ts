import { Component } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { NavbarComponent } from '../../navbar/navbar.component';

@Component({
  selector: 'app-general-informations',
  standalone: true,
  imports: [HeaderComponent, NavbarComponent],
  templateUrl: './general-informations.component.html',
  styleUrl: './general-informations.component.css'
})
export class GeneralInformationsComponent {

}
