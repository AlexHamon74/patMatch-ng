import { Component, OnInit } from '@angular/core';
import { HeaderBreederComponent } from '../../../shared/header-breeder/header-breeder.component';

@Component({
    selector: 'app-animals-list',
    standalone: true,
    imports: [HeaderBreederComponent],
    templateUrl: './animals-list.component.html',
    styleUrl: './animals-list.component.css'
})
export class AnimalsListComponent implements OnInit {

    successMessage: string | null = null;

    ngOnInit(): void {
        // Si on arrive sur cette page après la création d'un animal, affiche une alert de succès
        const state = history.state as { animalCreated?: boolean };

        if (state?.animalCreated) {
            this.successMessage = 'Votre animal a bien été créé.';
        }
    }
}
