import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AngularFireAuth} from 'angularfire2/auth';
import {AngularFirestore, AngularFirestoreDocument} from 'angularfire2/firestore';
import {Router} from '@angular/router';
import * as firebase from 'firebase';
import {NotifyService} from './notify.service';


interface Firm {
  uid: string,
  email: string | null;
  name: string | null;
  desc ?: string,
  photoUrl ?: string
};

@Injectable()
export class AuthService {
  user: Observable<Firm>;

  constructor(private afAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private router: Router,
              public notify: NotifyService) {
    this.user = this.afAuth.authState
      .switchMap((firm) => {
        if (firm) {
          return this.afs.doc<Firm>(`firms/${firm.uid}`).valueChanges();
        } else {
          return Observable.of(null);
        }
      });

  }
  /// Methots

  ////// OAuth Methods /////

  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }

  githubLogin() {
    const provider = new firebase.auth.GithubAuthProvider();
    return this.oAuthLogin(provider);
  }

  facebookLogin() {
    const provider = new firebase.auth.FacebookAuthProvider();
    return this.oAuthLogin(provider);
  }

  twitterLogin() {
    const provider = new firebase.auth.TwitterAuthProvider();
    return this.oAuthLogin(provider);
  }

  private oAuthLogin(provider: firebase.auth.AuthProvider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        this.notify.update('Welcome to Firestarter!!!', 'success');
        return this.updateUserData(credential.user);
      })
  }

  //// Anonymous Auth ////

  anonymousLogin() {
    return this.afAuth.auth.signInAnonymously()
      .then((user) => {
        this.notify.update('Welcome to Firestarter!!!', 'success');
        return this.updateUserData(user); // if using firestore
      })

  }

  //// Email/Password Auth ////

  emailSignUp(email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((user) => {
        this.notify.update('Welcome to Firestarter!!!', 'success');
        console.log(email,password);
        return this.updateUserData(user); // if using firestore
      })

  }

  emailLogin(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        this.notify.update('Welcome to Firestarter!!!', 'success')
       // return this.updateUserData(user); // if using firestore
      })
      //.catch((error) => this.handleError(error) );
  }

  // Sends email allowing user to reset password
  resetPassword(email: string) {
    const fbAuth = firebase.auth();

    return fbAuth.sendPasswordResetEmail(email)
      .then(() => this.notify.update('Password update email sent', 'info'))
      //.catch((error) => this.handleError(error));
  }

  signOut() {
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['/']);
    });
  }


  // Sets user data to firestore after succesful login
  private updateUserData(firm: Firm) {

    const userRef: AngularFirestoreDocument<Firm> = this.afs.doc(`firms/${firm.uid}`);

    const data: Firm = {
      uid: firm.uid,
      email: firm.email || null,
      name: firm.name || 'nameless user',
      photoUrl: firm.photoUrl || 'https://goo.gl/Fz9nrQ',
    };
    return userRef.set(data);
  }



}
