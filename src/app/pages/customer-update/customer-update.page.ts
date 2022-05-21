import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController, AlertController, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Customer } from 'src/app/interfaces/customer';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer-update',
  templateUrl: './customer-update.page.html',
  styleUrls: ['./customer-update.page.scss'],
})
export class CustomerUpdatePage implements OnInit {
  private customerId: string = null;
  public customer: Customer = {};
  private loading: any;
  private customerSubscription: Subscription;

  constructor(
    private customerService: CustomerService,
    private activatedRoute: ActivatedRoute,
    private navController: NavController,
    private loadingController: LoadingController,
    public alertController: AlertController,
    private toastController: ToastController
  ) {
    this.customerId = this.activatedRoute.snapshot.params['id'];

    if (this.customerId) this.loadCustomer();
  }

  ngOnInit() { }

  ngOnDestroy() {
    if (this.customerSubscription) this.customerSubscription.unsubscribe();
  }

  loadCustomer() {
    this.customerSubscription = this.customerService.getCustomer(this.customerId).subscribe(data => {
      this.customer = data;
    });
  }

  async updateCustomer() {  
    await this.presentLoading();
    try {
      await this.customerService.updateCustomer(this.customerId, this.customer);
      await this.loading.dismiss();
      this.navController.navigateBack('/customer-list');
    } catch (error) {
      this.loading.dismiss();
    }
  }
    
  async presentLoading() {
    this.loading = await this.loadingController.create({ message: 'Carregando...' });
    return this.loading.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({ message, duration: 2000 });
    toast.present();
  }
}
