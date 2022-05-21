import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Users } from '../interfaces/users';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private usersCollection: AngularFirestoreCollection<Users>;

  constructor(private afStore: AngularFirestore) {
    this.usersCollection = this.afStore.collection<Users>('Users');
  }

  getUserss() {
    return this.usersCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;

          return { id, ...data };
        });
      })
    );
  }

  addUsers(users: Users) {
    return this.usersCollection.add(users);
  }

  getUsers(id: string) {
    return this.usersCollection.doc<Users>(id).valueChanges();
  }

  updateUsers(id: string, users: Users) {
    return this.usersCollection.doc<Users>(id).update(users);
  }

  deleteUsers(id: string) {
    return this.usersCollection.doc(id).delete();
  }
  getAuth() {
    return this.afStore;
  }
}
