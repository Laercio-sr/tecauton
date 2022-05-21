import { CashierService } from './../../services/cashier.service';
import { Component, OnInit } from '@angular/core';
import { IonRouterOutlet, NavController, ToastController, AlertController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Cashier } from 'src/app/interfaces/cashier';
import { AuthService } from 'src/app/services/auth.service';
import { OsService } from 'src/app/services/os.service';
import { Os } from 'src/app/interfaces/os';

@Component({
  selector: 'app-out-of-box',
  templateUrl: './out-of-box.page.html',
  styleUrls: ['./out-of-box.page.scss'],
})
export class OutOfBoxPage implements OnInit {
  public cashier: Cashier = {};
  private loading: any;
  public cashiers = new Array<Cashier>();
  public oss = new Array<Os>();
  private cashierSubscription: Subscription;
  private osSubscription: Subscription;
  
  constructor(
    public routerOutlet: IonRouterOutlet,
    private osService: OsService,
    private cashierService: CashierService,
    public navController: NavController,
    private authService: AuthService,
    private toastController: ToastController,
  ) { 
    this.osSubscription = this.osService.getOSs().subscribe(data => {
      this.oss = data;
      });

    this.cashierSubscription = this.cashierService.getCashiers().subscribe(data => {
      this.cashiers = data;
      });
  }

  ngOnInit() { }

  ngOnDestroy() {
    if (this.osSubscription) this.osSubscription.unsubscribe();

    if (this.cashierSubscription) this.cashierSubscription.unsubscribe();
  } 
  
  async registerCashier() {    
    this.cashier.userId = (await this.authService.getAuth().currentUser).uid;

    try {
          await this.cashierService.addCashier(this.cashier);
          this.navController.navigateBack('/cash-outflow-report');
          await this.loading.dismiss();
    } catch (error) {
    }
  }  

  async presentToast(message: string) {
    const toast = await this.toastController.create({ message, duration: 2000 });
    toast.present();
  }
}
