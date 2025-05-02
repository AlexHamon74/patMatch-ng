import { Component, inject, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
    selector: 'app-auth',
    standalone: true,
    imports: [RouterLink],
    templateUrl: './auth.component.html',
    styleUrl: './auth.component.css'
})
export class AuthComponent implements OnInit, OnDestroy {

    // Injection des services
    renderer = inject(Renderer2)

    ngOnInit(): void {
      this.renderer.addClass(document.body, 'no-padding');
    }
    ngOnDestroy(): void {
      this.renderer.removeClass(document.body, 'no-padding');
    }

    authService = inject(AuthService);
    router = inject(Router);

    logout() {
        this.authService.logout();
        this.router.navigate(['']);
    };

}
