import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Customer } from 'src/app/interfaces/customer';
import { Os } from 'src/app/interfaces/os';
import { AuthService } from 'src/app/services/auth.service';
import { CustomerService } from 'src/app/services/customer.service';
import { OsService } from 'src/app/services/os.service';

@Component({
  selector: 'app-os-register',
  templateUrl: './os-register.page.html',
  styleUrls: ['./os-register.page.scss'],
})
export class OsRegisterPage implements OnInit {
  public os: Os = {};
  private loading: any;
  public customers = new Array<Customer>();
  public customer: any;
  public customersSubscription: Subscription;
  private osSubscription: Subscription;
  
  constructor(
    private osService: OsService,
    public navController: NavController,
    private authService: AuthService,
    private loadingController: LoadingController,
    private customerService: CustomerService,
    private toastController: ToastController, 
  ) {    
    this.customersSubscription = this.customerService.getCustomers().subscribe(data => {
      this.customers = data;
      });
  }
  ngOnInit() { }

  ngOnDestroy() {
    if (this.osSubscription) this.osSubscription.unsubscribe();
  }  

  async registerOs() {
    await this.presentLoading();
    this.os.userId = (await this.authService.getAuth().currentUser).uid;    
    
    try {
      await this.osService.addOs(this.os);
      await this.loading.dismiss();
      await this.navController.navigateBack('/os-list');
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