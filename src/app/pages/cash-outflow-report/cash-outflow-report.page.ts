import { Cashier } from './../../interfaces/cashier';
import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { CashierService } from 'src/app/services/cashier.service';

@Component({
  selector: 'app-cash-outflow-report',
  templateUrl: './cash-outflow-report.page.html',
  styleUrls: ['./cash-outflow-report.page.scss'],
})
export class CashOutflowReportPage implements OnInit {
  public dateReport: any;
  private loading: any;
  public cashiers = new Array<Cashier>();
  private cashierSubscription: Subscription;

  constructor(
    private authService: AuthService,
    private loadingController: LoadingController,
    private cashierService: CashierService,
    private toastController: ToastController
  ) {

    //this.afStore.collection("Order-of-Service", ref => ref.where("id", "in", this.oss)).valueChanges();

    this.cashierSubscription = this.cashierService.getCashiers().subscribe(data => {
      this.cashiers = data;

    });
  }  
  

  ngOnInit() { }

  ngOnDestroy() {
    this.cashierSubscription.unsubscribe();
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

  async onToast(message: string) {
    const toast = await this.toastController.create({ message, duration: 2000 });
    toast.present();
  }
}