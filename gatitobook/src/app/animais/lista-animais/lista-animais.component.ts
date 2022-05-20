import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { UsuarioService } from 'src/app/autenticacao/usuario/usuario.service';
import { Animais } from '../animais';
import { AnimaisService } from '../animais.service';

@Component({
  selector: 'app-lista-animais',
  templateUrl: './lista-animais.component.html',
  styleUrls: ['./lista-animais.component.css']
})
export class ListaAnimaisComponent implements OnInit {

  animais!: Animais;
  constructor(private activateroute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activateroute.params.subscribe(param => {
      this.animais = this.activateroute.snapshot.data['animais'];
    })
  }

}
