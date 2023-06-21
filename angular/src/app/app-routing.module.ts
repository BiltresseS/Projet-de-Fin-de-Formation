import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './pages/accueil/accueil.component';
import { ListeTestsComponent } from './pages/liste-tests/liste-tests.component';
import { ListeAbonnesComponent } from './pages/liste-abonnes/liste-abonnes.component';
import { ProfilComponent } from './pages/profil/profil.component';
import { ConnexionComponent } from './pages/connexion/connexion.component';
import { TestComponent } from './pages/liste-tests/test/test.component';
import { EnregistrementComponent } from './pages/connexion/enregistrement/enregistrement.component';
import { ProfileEditComponent } from './pages/profil/profil-edit/profil-edit.component';
import { AbonnesComponent } from './pages/liste-abonnes/abonnes/abonnes.component';

const routes: Routes = [
  {path : '', redirectTo : 'accueil', pathMatch : 'full'}
  , {path : 'accueil', component : AccueilComponent}
  , {path : 'liste-tests', component : ListeTestsComponent}
  , {path : 'test/:id', component : TestComponent}
  , {path : 'liste-abonnes', component : ListeAbonnesComponent}
  , {path : 'abonnes/:id', component : AbonnesComponent}
  , {path : 'profil', component : ProfilComponent}
  , { path: 'profile/edit', component: ProfileEditComponent }
  , {path : 'connexion', component : ConnexionComponent}
  , { path: 'enregistrement', component: EnregistrementComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes
    , {scrollPositionRestoration : 'enabled'}
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
