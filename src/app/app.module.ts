import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccueilComponent } from './pages/accueil/accueil.component';
import { HeaderComponent } from './pages/shared/header/header.component';
import { FooterComponent } from './pages/shared/footer/footer.component';
import { ListeTestsComponent } from './pages/liste-tests/liste-tests.component';
import { TestComponent } from './pages/test/test.component';
import { ListeAbonnesComponent } from './pages/liste-abonnes/liste-abonnes.component';
import { ProfilComponent } from './pages/profil/profil.component';
import { ConnexionComponent } from './pages/connexion/connexion.component';

@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    HeaderComponent,
    FooterComponent,
    ListeTestsComponent,
    TestComponent,
    ListeAbonnesComponent,
    ProfilComponent,
    ConnexionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
