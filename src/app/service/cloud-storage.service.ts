import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Data } from '../interface/quest';
import { environment } from 'src/environments/environment';
import { SocialUser } from 'angularx-social-login';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class CloudStorageService {

  constructor(
    private firestore: AngularFirestore,
    private angularFireAuth: AngularFireAuth,
  ) { }


  load() {
    this.angularFireAuth.authState.subscribe((user: User) => {
      if (user) {
        console.log(`${environment.firebaseDataCollection}/${user.uid}`);
        this.firestore.doc(`${environment.firebaseDataCollection}/${user.uid}`).get().subscribe(retorno => {
          console.log(retorno);
        });
      } else {
        console.log('User not Logged in');
      }
    });
  }

  save(data: Data) {
    const dataToPersist = Object.assign({}, data);
    this.angularFireAuth.authState.subscribe((user: User) => {
      if (user) {
        dataToPersist.uid = user.uid;
        dataToPersist.email = user.email;
        dataToPersist.providerData = user.providerData;
        this.firestore.collection(environment.firebaseDataCollection).doc(user.uid).set(dataToPersist);
      } else {
        console.log('User not Logged in');
      }
    });
  }
}
