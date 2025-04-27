import { Component } from '@angular/core';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';
import { HeaderComponent } from '../../../shared/header/header.component';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [NavbarComponent, HeaderComponent],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})
export class BlogComponent {

}
