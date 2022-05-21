import { CashierService } from 'src/app/services/cashier.service';
import { Cashier } from 'src/app/interfaces/cashier';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { LoadingController, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Os } from 'src/app/interfaces/os';
import { AuthService } from 'src/app/services/auth.service';
import { OsService } from 'src/app/services/os.service';

@Component({
  selector: 'app-service-report',
  templateUrl: './service-report.page.html',
  styleUrls: ['./service-report.page.scss'],
})
export class ServiceReportPage implements OnInit {
  public dateReport: any;
  private loading: any;
  public oss = new Array<Os>();
  public cashiers = new Array<Cashier>();
  public osSubscription: Subscription;
  public cashierSubscription: Subscription;

  constructor(

    private authService: AuthService,
    private loadingController: LoadingController,
    private osService: OsService,
    public cashierService: CashierService,
    private toastController: ToastController
  ) {

    //this.afStore.collection("Order-of-Service", ref => ref.where("id", "in", this.oss)).valueChanges();

    this.osSubscription = this.osService.getOSs().subscribe(data => {
      this.oss = data;
    });
    
    this.cashierSubscription = this.cashierService.getCashiers().subscribe(data => {
      this.cashiers = data;
    });
  }  
  

  ngOnInit() { }

  ngOnDestroy() {
    this.osSubscription.unsubscribe();
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
