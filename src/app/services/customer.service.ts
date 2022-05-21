import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Customer } from '../interfaces/customer';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private customerCollection: AngularFirestoreCollection<Customer>;

  constructor(private afStore: AngularFirestore) {
    this.customerCollection = this.afStore.collection<Customer>('Customers');
  }

  getCustomers() {
    return this.customerCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;

          return { id, ...data };
        });
      })
    );
  }

  addCustomer(customer: Customer) {
    return this.customerCollection.add(customer);
  }

  getCustomer(id: string) {
    return this.customerCollection.doc<Customer>(id).valueChanges();
  }

  updateCustomer(id: string, customer: Customer) {
    return this.customerCollection.doc<Customer>(id).update(customer);
  }

  deleteCustomer(id: string) {
    return this.customerCollection.doc(id).delete();
  }
  getAuth() {
    return this.afStore;
  }
}
