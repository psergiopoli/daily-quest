import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Provider } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SocialLoginModule, AuthServiceConfig , FacebookLoginProvider } from 'angularx-social-login';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';

import { environment } from 'src/environments/environment';
import { QuestComponent } from './quest/quest.component';
import { SocialLoginComponent } from './social-login/social-login.component';

import * as service from './service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

export const services: Provider[] = Object.values(service);
services.push([AngularFirestore, AngularFireAuth]);

export function getAuthServiceConfigs() {
  const config = new AuthServiceConfig(
      [
        {
          id: FacebookLoginProvider.PROVIDER_ID,
          provider: new FacebookLoginProvider(environment.facebookAppId),
        },
      ],
  );
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    QuestComponent,
    SocialLoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocialLoginModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    },
    ...services,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
