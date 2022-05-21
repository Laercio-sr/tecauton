import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController, AlertController, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Os } from 'src/app/interfaces/os';
import { OsService } from 'src/app/services/os.service';


@Component({
  selector: 'app-os-update',
  templateUrl: './os-update.page.html',
  styleUrls: ['./os-update.page.scss'],
})
export class OsUpdatePage implements OnInit {
  private osId: string = null;
  public os: Os = {};
  private loading: any;
  private osSubscription: Subscription;

  constructor(
    private osService: OsService,
    private activatedRoute: ActivatedRoute,
    private navController: NavController,
    private loadingController: LoadingController,
    public alertController: AlertController,
    private toastController: ToastController
  ) {
    this.osId = this.activatedRoute.snapshot.params['id'];

    if (this.osId) this.loadOs();
  }

  ngOnInit() { }

  ngOnDestroy() {
    if (this.osSubscription) this.osSubscription.unsubscribe();
  }

  loadOs() {
    this.osSubscription = this.osService.getOs(this.osId).subscribe(data => {
      this.os = data;
    });
  }

  async updateOs() {
    await this.presentLoading();    
    
    try {
      await this.osService.updateOs(this.osId, this.os);
      await this.loading.dismiss();
      this.navController.navigateBack('/os-list');
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
