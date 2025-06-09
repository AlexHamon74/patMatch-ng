import { Component, inject, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../../../core/services/auth.service';
import { UserService } from '../../../../../../core/services/user.service';

@Component({
    selector: 'app-photo-profil-customer',
    standalone: true,
    imports: [ReactiveFormsModule],
    templateUrl: './photo-profil-customer.component.html',
    styleUrl: '../../../register.component.css'
})
export class PhotoProfilCustomer implements OnInit, OnDestroy{
    // Propriétés
    isSubmitted = false;
    selectedFile?: File;

    // Services
    router = inject(Router);
    renderer = inject(Renderer2);
    authService = inject(AuthService);
    userService = inject(UserService);

    ngOnInit(): void {
        // Pré-remplis les champ si retour
        const savedData = this.authService.loadStepData('step5');
        if (savedData) {
            this.registerForm.patchValue(savedData);
        }

        this.renderer.addClass(document.body, 'no-padding');
    }
    ngOnDestroy(): void {
        this.renderer.removeClass(document.body, 'no-padding');
    }

    public registerForm: FormGroup = new FormGroup({
        photoProfilFile: new FormControl(),
    });

    // Fonction attachée au bouton précédent
    goBack() {
            this.authService.saveStepData('step5', this.registerForm.value);
        this.router.navigate(['register/customer/adoptionPreferences']);
    }

    onFileSelected(event: Event) {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files.length > 0) {
            this.selectedFile = input.files[0];
        }
    }

    // Soumission du formulaire
    onSubmit() {
        this.isSubmitted = true;
            const formData = this.registerForm.value;
            this.authService.saveStepData('step5', formData);

        if (!this.selectedFile) {
            this.router.navigate(['register/customer/engagement']);
            return;
        }

        const userId = this.authService.getRegisteringUserId();
        if (!userId) {
            console.error("User non trouvé. Impossible d'uploader l'image.");
            return;
        }

        this.userService.uploadPhotoProfil(userId, this.selectedFile).subscribe({
            next: () => {
                this.router.navigate(['register/customer/engagement']);
            },
            error: (err) => {
                console.error("Erreur lors de la modification de la photo de profil : " + err.message);
            }
        });
    }
}
