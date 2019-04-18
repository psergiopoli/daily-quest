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


  load(): Promise<Data> {
    const promise: Promise<Data> = new Promise((res, rej) => {
      this.angularFireAuth.authState.subscribe((user: User) => {
        if (user) {
          this.firestore.doc(`${environment.firebaseDataCollection}/${user.uid}`).get().subscribe(userData => {
            if (userData.exists) {
              res(userData.data() as Data);
            } else {
              rej('No data found');
            }
          });
        } else {
          rej('User not Logged in');
        }
      }, err => rej(err));
    });

    return promise;
  }

  save(data: Data): Promise<any> {
    const promise: Promise<Data> = new Promise((res, rej) => {
      const dataToPersist = Object.assign({}, data);
      this.angularFireAuth.authState.subscribe((user: User) => {
        if (user) {
          dataToPersist.uid = user.uid;
          dataToPersist.email = user.email;
          dataToPersist.providerData = user.providerData;
          this.firestore.collection(environment.firebaseDataCollection).doc(user.uid).set(dataToPersist);
          res();
        } else {
          rej('User not Logged in');
        }
      }, err => rej(err));
    });

    return promise;
  }
}
