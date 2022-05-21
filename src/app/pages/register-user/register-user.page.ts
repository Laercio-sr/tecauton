import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from "@angular/fire/firestore";

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.page.html',
  styleUrls: ['./register-user.page.scss'],
})
export class RegisterUserPage implements OnInit {
  public user: any = {};

  constructor(private afAuth: AngularFireAuth, private afStore: AngularFirestore) { }

  ngOnInit() {
  }

  async register(){
    try {
      const newUser = await this.afAuth.createUserWithEmailAndPassword(this.user.email, this.user.password);
      await this.afStore.collection('Users').doc(newUser.user.uid).set(this.user);
    } catch (error) {
      console.error(error);      
    } 

  }

}
