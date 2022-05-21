import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, ToastController, AlertController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Customer } from 'src/app/interfaces/customer';
import { AuthService } from 'src/app/services/auth.service';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer-register',
  templateUrl: './customer-register.page.html',
  styleUrls: ['./customer-register.page.scss'],
})
export class CustomerRegisterPage implements OnInit {
  public customer: Customer = {};
  private loading: any;
  private customerSubscription: Subscription;

  constructor(
    private customerService: CustomerService,
    private navController: NavController,
    private authService: AuthService,
    public alertController: AlertController,
    private toastController: ToastController
  ) {
  }

  ngOnInit() { }

  ngOnDestroy() {
    if (this.customerSubscription) this.customerSubscription.unsubscribe();
  }  

  async registerCustomer() {
    
    this.customer.userId = (await this.authService.getAuth().currentUser).uid;

    try {
      await this.customerService.addCustomer(this.customer);
      await this.loading.dismiss();
    } catch (error) {
    }    

    const alert = await this.alertController.create({
      cssClass: 'alt',
      header: 'ATENÇÃO!',
      message: 'Deseja cadastrar uma O.S?',
      buttons: [
        {
          text: 'OK',
          role: 'cancel',
          cssClass: 'danger',
          handler: () => {
            this.navController.navigateBack('/os-register');            
          }
        }, {
          text: 'Cancelar',
          handler: () => {
            this.navController.navigateBack('/home');
          }
        }
      ]
    });
    await alert.present();    
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({ message, duration: 2000 });
    toast.present();
  }
}
