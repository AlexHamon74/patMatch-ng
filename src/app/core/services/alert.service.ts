import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
    providedIn: 'root'
})
export class AlertService {

    // Gestion des Toasts
    // ------------------
    successToast(message: string): void {
        Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'success',
            title: message,
            showConfirmButton: false,
            timer: 2500,
            timerProgressBar: true
        });
    }

    errorToast(message: string): void {
        Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'error',
            title: message,
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true
        });
    }

    // Gestion des Alert
    // -----------------
    confirmDialog(options: { title: string; text?: string }): Promise<boolean> {
        return Swal.fire({
            title: options.title,
            text: options.text,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Oui',
            cancelButtonText: 'Annuler',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33'
        }).then(result => result.isConfirmed);
    }

    errorAlert(title: string, text: string): void {
        Swal.fire({
            icon: 'error',
            title,
            text,
            confirmButtonColor: '#d33'
        });
    }

}
