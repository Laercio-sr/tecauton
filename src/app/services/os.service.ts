import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Os } from '../interfaces/os';

import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root'
})
export class OsService {
  private osCollection: AngularFirestoreCollection<Os>;
  pdfObj = null;

  constructor(
    private afStore: AngularFirestore) {
    this.osCollection = this.afStore.collection<Os>('Order-of-Service');
  }

  getOss(idLogged: string) {
    return this.afStore.collection<Os>('Order-of-Service', ref => { return ref.where('id', '==', idLogged); }).snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;

          return { id, ...data };
        });
      })
    );
  }

  getOSs() {
    return this.osCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;

          return { id, ...data };
        });
      })
    );
  }

  addOs(os: Os) {
    return this.osCollection.add(os);
  }

  getOs(id: string) {
    return this.osCollection.doc<Os>(id).valueChanges();
  }

  updateOs(id: string, os: Os) {
    return this.osCollection.doc<Os>(id).update(os);
  }

  deleteOs(id: string) {
    return this.osCollection.doc(id).delete();
  }  
}
