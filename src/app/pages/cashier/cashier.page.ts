import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import * as Chart from "chart.js";

@Component({
  selector: 'app-cashier',
  templateUrl: './cashier.page.html',
  styleUrls: ['./cashier.page.scss'],
})
export class CashierPage implements OnInit {
  public dateCashier: any;
  private loading: any;
  public user: any = {};
  public cashierChart: Chart;

  constructor(
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private ref: ChangeDetectorRef
  ) { }

  ngOnInit() {

    this.ref.detectChanges();

    this.generateCharts();
  }

  async logout() {
    await this.presentLoading();

    try {
      await this.authService.logout();
    } catch (error) {
      console.error(error);
    } finally {
      this.loading.dismiss();
    }
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({ message: 'Carregando...' });
    return this.loading.present();
  }

 
  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 2000 });
    toast.present();
  }

  generateCharts(){
    const ctx = document.getElementById('cashier-chart');
    this.cashierChart = new Chart(ctx, {
    type: 'pie',
    data: {
        labels: ['Saída','Entrada'],
        datasets: [{
            data: [200, 350],
            backgroundColor: [
                'rgba(255, 0, 54, 0.8)',
                'rgba(0, 151, 92, 0.8)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
            ],
            borderWidth: 1
        }]
        
    },
    options: {
    }
    });
  }
}
