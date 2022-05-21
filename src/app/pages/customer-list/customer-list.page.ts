import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { AlertController, LoadingController, NavController, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Customer } from 'src/app/interfaces/customer';
import { Os } from 'src/app/interfaces/os';
import { AuthService } from 'src/app/services/auth.service';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.page.html',
  styleUrls: ['./customer-list.page.scss'],  
})
export class CustomerListPage implements OnInit {
  private loading: any;
  public customers = new Array<Customer>();
  private customersSubscription: Subscription;

  constructor( 
    private authService: AuthService,
    private loadingController: LoadingController,
    private customerService: CustomerService,
    private navController: NavController,
    public alertController: AlertController,
    private toastController: ToastController
  ) {
    this.customersSubscription = this.customerService.getCustomers().subscribe(data => {
      this.customers = data;
    });
  }

  async customerFilter(customerSearch){
    let val = customerSearch.target.value.toLowerCase();
    if(val && val.trim() != ''){
      this.customers = this.customers.filter((customer) => { 
        return (customer.name.toLowerCase().indexOf(val) > -1);
      })
    } else {
      this.customersSubscription = this.customerService.getCustomers().subscribe(data => {
      this.customers = data;
      });
    }
  }

  ngOnInit() { }

  ngOnDestroy() {
    this.customersSubscription.unsubscribe();
  }

  async logout() {
    await this.onLoading();

    try {
      await this.authService.logout();
    } catch (error) {
      console.error(error);
    } finally {
      this.loading.dismiss();
    }
  }  

  async onLoading() {
    this.loading = await this.loadingController.create({ message: 'Carregando...' });
    return this.loading.present();
  }

  async deleteCustomer(id: string) {
    
    const alert = await this.alertController.create({
      cssClass: 'alt',
      header: 'ATENÇÃO!',
      message: 'Deseja excluir esse Cliente?',
      buttons: [
        {
          text: 'OK',
          role: 'cancel',
          cssClass: 'danger',
          handler: () => {
            this.customerService.deleteCustomer(id);
            this.navController.navigateBack('/customer-list');            
          }
        }, {
          text: 'Cancelar',
          handler: () => {
            this.navController.navigateBack('/customer-list');
          }
        }
      ]
    });
    await alert.present();    
  }
    

  async onToast(message: string) {
    const toast = await this.toastController.create({ message, duration: 2000 });
    toast.present();
  }
}
