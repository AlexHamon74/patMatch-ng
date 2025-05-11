import { Component, inject, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { HeaderBreederComponent } from '../../../../shared/header-breeder/header-breeder.component';

@Component({
    selector: 'app-general-information',
    standalone: true,
    imports: [HeaderBreederComponent],
    templateUrl: './general-information.component.html',
    styleUrl: './general-information.component.css'
})
export class GeneralInformationComponent implements OnInit, OnDestroy {

    // Services
    renderer = inject(Renderer2);

    ngOnInit(): void {
        this.renderer.addClass(document.body, 'no-padding');
    }
    ngOnDestroy(): void {
        this.renderer.removeClass(document.body, 'no-padding');
    }

}
