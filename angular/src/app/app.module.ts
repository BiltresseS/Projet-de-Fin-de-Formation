import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccueilComponent } from './pages/accueil/accueil.component';
import { HeaderComponent } from './pages/shared/header/header.component';
import { FooterComponent } from './pages/shared/footer/footer.component';
import { ListeTestsComponent } from './pages/liste-tests/liste-tests.component';
import { ListeAbonnesComponent } from './pages/liste-abonnes/liste-abonnes.component';
import { ProfilComponent } from './pages/profil/profil.component';
import { ConnexionComponent } from './pages/connexion/connexion.component';
import { HttpClientModule } from '@angular/common/http';
import { TestComponent } from './pages/liste-tests/test/test.component';
import { AbonnesComponent } from './pages/liste-abonnes/abonnes/abonnes/abonnes.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EnregistrementComponent } from './pages/connexion/enregistrement/enregistrement.component';
import { ProfileEditComponent } from './pages/profil/profil-edit/profil-edit.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { DefaultImagePipe } from './pipes/default-image.pipe';

@NgModule({
  declarations: [
    AppComponent
    , AccueilComponent
    , HeaderComponent
    , FooterComponent
    , ListeTestsComponent
    , TestComponent
    , ListeAbonnesComponent
    , ProfilComponent
    , ConnexionComponent
    , AbonnesComponent
    , EnregistrementComponent
    , ProfileEditComponent, DefaultImagePipe
  ],
  imports: [
    BrowserModule
    , AppRoutingModule
    , HttpClientModule
    , FormsModule
    , ReactiveFormsModule
    , ImageCropperModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
