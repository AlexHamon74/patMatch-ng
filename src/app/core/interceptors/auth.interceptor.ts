import { HttpEvent, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { AuthService } from "../services/auth.service";

/**
 * Intercepteur pour gérer l'authentification des requêtes HTTP.
 * - Ajoute le token au header si présent.
 * - Déconnecte l'utilisateur en cas d'erreur 401.
 */
export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
    const authService = inject(AuthService);
    const token = localStorage.getItem('token');

    if (token) {
        req = req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    return next(req).pipe(
        catchError(error => {
            if (error.status === 401) {
                authService.logout();
            }
            return throwError(error);
        })
    );
}