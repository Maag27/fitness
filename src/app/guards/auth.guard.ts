import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' // Registro como servicio global
})
export class AuthGuard implements CanActivate {

  // Inyectamos el AuthService para verificar la autenticación y el Router para redireccionar
  constructor(private authService: AuthService, private router: Router) {}

  /**
   * Método para verificar si la ruta puede ser activada
   * @returns boolean | UrlTree - true si el usuario está autenticado, UrlTree de redirección al login en caso contrario
   */
  canActivate(): boolean | UrlTree {
    // Verificar si el usuario está autenticado
    const isAuthenticated = this.authService.isAuthenticated();

    if (isAuthenticated) {
      console.log('Acceso permitido: Usuario autenticado.');
      return true; // Permite el acceso a la ruta
    } else {
      console.warn('Acceso denegado. Usuario no autenticado, redirigiendo al login...');
      // Redirigir al login y retornar un UrlTree para evitar navegación no permitida
      return this.router.parseUrl('/login');
    }
  }
}
