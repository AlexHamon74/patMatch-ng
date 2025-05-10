import { Component } from '@angular/core';
import { HeaderBreederComponent } from '../../../shared/header-breeder/header-breeder.component';

@Component({
  selector: 'app-animals-list',
  standalone: true,
  imports: [HeaderBreederComponent],
  templateUrl: './animals-list.component.html',
  styleUrl: './animals-list.component.css'
})
export class AnimalsListComponent {

}
