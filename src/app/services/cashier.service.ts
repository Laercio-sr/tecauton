import { Cashier } from './../interfaces/cashier';
import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CashierService {
  private cashierCollection: AngularFirestoreCollection<Cashier>;

  constructor(
    private afStore: AngularFirestore) {
    this.cashierCollection = this.afStore.collection<Cashier>('Cashier');
  }
  
  getCashiers() {
    return this.cashierCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;

          return { id, ...data };
        });
      })
    );
  }

  addCashier(cashier: Cashier) {
    return this.cashierCollection.add(cashier);
  }

  getCashier(id: string) {
    return this.cashierCollection.doc<Cashier>(id).valueChanges();
  }

  updateCashier(id: string, cashier: Cashier) {
    return this.cashierCollection.doc<Cashier>(id).update(cashier);
  }

  deleteCashier(id: string) {
    return this.cashierCollection.doc(id).delete();
  }
}
