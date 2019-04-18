import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth, User } from 'firebase/app';

@Component({
  selector: 'app-social-login',
  templateUrl: './social-login.component.html',
  styleUrls: ['./social-login.component.scss']
})
export class SocialLoginComponent implements OnInit {

  alreadyLogged = false;
  user: User;

  constructor(
    private angularFireAuth: AngularFireAuth,
  ) {}

  ngOnInit(): void {
    this.angularFireAuth.authState.subscribe((user: User) => {
      if (user) {
        this.alreadyLogged = true;
        this.user = user;
      } else {
        this.alreadyLogged = false;
      }
    });
  }

  public socialSignIn(socialPlatform: string) {
    let socialPlatformProvider;
    if (socialPlatform === 'facebook') {
      socialPlatformProvider = new auth.FacebookAuthProvider();
    }

    this.angularFireAuth.auth.signInWithPopup(socialPlatformProvider);
  }

  public socialLogout() {
    this.angularFireAuth.auth.signOut().then(() => {
      this.alreadyLogged = false;
      this.user = null;
    });
  }

}
