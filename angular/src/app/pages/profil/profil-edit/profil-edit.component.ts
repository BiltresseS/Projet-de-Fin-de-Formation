import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { UserInterface } from 'src/app/interfaces/users-interface';

@Component({
  selector: 'app-profil-edit',
  templateUrl: './profil-edit.component.html',
  styleUrls: ['./profil-edit.component.scss']
})
export class ProfileEditComponent implements OnInit {
  userProfile!: any;
  oldPassword!: string;
  newPassword!: string;
  bioMaxLength : number = 1024
  imageChangedEvent: any = '';
  croppedImage: string|undefined|null;

  constructor(
    private http: HttpClient
    , private router: Router
  ) { }

  ngOnInit(): void {
    const userId = this.getUserIdFromToken();
    const url = `http://localhost:5000/api/users/${userId}`;

    this.http.get(url).subscribe((profile: any) => {
      this.userProfile = profile
      this.croppedImage = profile.avatar
    });
  }

  fileChangeEvent(event: any) {
    this.imageChangedEvent = event
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;

    this.userProfile.avatar = event.base64?.split(',')[1]
  }

  submitForm(): void {
    const modifiedProfile : any = {
      avatar: this.userProfile.avatar
      , login: this.userProfile.login
      , mail: this.userProfile.mail
      , mdp: this.oldPassword
      , bio: this.userProfile.bio
    };

    if (this.newPassword) {
      modifiedProfile.nmdp = this.newPassword;
    }
    
    const userId = this.getUserIdFromToken();
    const url = `http://localhost:5000/api/users/${userId}`;
    this.http.put(url, modifiedProfile).subscribe((response: any) => {
      // Gérer la réponse de l'API après la modification du profil

      // Rediriger vers la page de profil
      this.router.navigate(['/profil']);
    });
  }

  private getUserIdFromToken(): string {
    const token = localStorage.getItem('token');
    const tokenPayload = JSON.parse(this.decodeToken(token ?? ""));
    const userId = tokenPayload.sub;
    return userId;
  }

  private decodeToken(token: string): string {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const decodedToken = window.atob(base64);
    return decodedToken;
  }
}
