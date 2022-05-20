import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Animal } from '../animais';
import { AnimaisService } from '../animais.service';

@Component({
  selector: 'app-detalhe-animal',
  templateUrl: './detalhe-animal.component.html',
  styleUrls: ['./detalhe-animal.component.css']
})
export class DetalheAnimalComponent implements OnInit {
  animalID!: number;
  animal$!: Observable<Animal>;
  constructor(private animaisService: AnimaisService, private acivatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.animalID = this.acivatedRoute.snapshot.params['animalId'];
    this.animal$ = this.animaisService.buscaPorId(this.animalID);
    console.log(this.animalID, this.animal$.subscribe((r) => console.log(r)))
  }
  curtir() {
    this.animaisService.curtir(this.animalID)
    .subscribe((curtida) => {
      if (curtida) {
        this.animal$ = this.animaisService.buscaPorId(this.animalID);
      }
    })
  }
  excluir() {
    this.animaisService.excluiAnimal(this.animalID)
      .subscribe(() => {
        this.router.navigate(['/animais/'])

      }, (error) => console.error(error))
  }
}
