import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { BehaviorSubject, Subject } from 'rxjs';
import { TokenService } from '../token.service';
import { Usuario } from './usuario';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private usuarioSubject = new BehaviorSubject<Usuario>({});

  constructor(private tokeService: TokenService) {
    if (this.tokeService.possuiToken()) {
      this.decodificaJWT();
    }
  }

  private decodificaJWT() {
    const token = this.tokeService.retornaToken();
    const usuario = jwtDecode(token) as Usuario;
    this.usuarioSubject.next(usuario);
  }

  retornaUsuario() {
    return this.usuarioSubject.asObservable();
  }

  salvaToken(token: string) {
    this.tokeService.salvaToken(token);
    this.decodificaJWT();
  }

  logout(){
    this.tokeService.excluiToken();
  this.usuarioSubject.next({});
  }

  estaLogado(){
    return this.tokeService.possuiToken();
  }
}
