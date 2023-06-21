import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Vérifiez si la requête est pour la route spécifique
    if (req.url.includes('/reenable')) {
      // Récupérez le token d'authentification de votre source de données (par exemple, un service d'authentification)
      const token = localStorage.getItem('token')

      // Ajoutez le token dans l'en-tête de la requête
      const authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });

      return next.handle(authReq);
    }
    
    // Si la condition n'est pas satisfaite, renvoyez la requête d'origine sans la modifier
    return next.handle(req);
  }
}
