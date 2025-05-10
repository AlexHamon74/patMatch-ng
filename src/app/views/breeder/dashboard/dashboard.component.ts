import { Component } from '@angular/core';
import { HeaderBreederComponent } from '../../../shared/header-breeder/header-breeder.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [HeaderBreederComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
