import { Component } from '@angular/core';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';
import { HeaderComponent } from '../../../shared/header/header.component';
import { FilterComponent } from '../../../shared/filter/filter.component';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [NavbarComponent, HeaderComponent, FilterComponent],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})
export class BlogComponent {

}
