import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AlertController, LoadingController, NavController, ToastController } from '@ionic/angular';
import { Observable, Subscription } from 'rxjs';
import { Os } from 'src/app/interfaces/os';
import { AuthService } from 'src/app/services/auth.service';
import { OsService } from 'src/app/services/os.service';

@Component({
  selector: 'app-os-list',
  templateUrl: './os-list.page.html',
  styleUrls: ['./os-list.page.scss'],
})
export class OsListPage implements OnInit {
  private loading: any;
  public oss = new Array<Os>();
  private osSubscription: Subscription;

  constructor(
    private afStore: AngularFirestore,    
    private authService: AuthService,
    private loadingController: LoadingController,
    private osService: OsService,
    private navController: NavController,
    public alertController: AlertController,
    private toastController: ToastController
  ) {

    //this.afStore.collection("Order-of-Service", ref => ref.where("id", "in", this.oss)).valueChanges();

    this.osSubscription = this.osService.getOSs().subscribe(data => {
      this.oss = data;

    });
  }  
  

  ngOnInit() { }

  ngOnDestroy() {
    this.osSubscription.unsubscribe();
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

  async deleteOs(id: string) {

    const alert = await this.alertController.create({
      cssClass: 'alt',
      header: 'ATENÇÃO!',
      message: 'Deseja excluir essa OS?',
      buttons: [
        {
          text: 'OK',
          role: 'cancel',
          cssClass: 'danger',
          handler: () => {
            this.osService.deleteOs(id);
            this.navController.navigateBack('/os-list/:id');            
          }
        }, {
          text: 'Cancelar',
          handler: () => {
            this.navController.navigateBack('/os-list/:id');
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
