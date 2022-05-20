import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetalheAnimalComponent } from './animais/detalhe-animal/detalhe-animal.component';
import { AutenticacaoGuard } from './autenticacao/autenticacao.guard';
import { LoginGuard } from './autenticacao/login.guard';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then((m) => m.HomeModule), canLoad: [LoginGuard] },
  { path: 'animais', loadChildren: () => import('./animais/animais.module').then((m) => m.AnimaisModule), canLoad: [AutenticacaoGuard] }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
