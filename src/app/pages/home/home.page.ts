import { UsersService } from './../../services/users.service';
import { Users } from './../../interfaces/users';
import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  private loading: any;
  public users = new Array<Users>();
  private userSubscription: Subscription;

  constructor(
    private authService: AuthService,
    private usersService: UsersService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) {
    this.userSubscription = this.usersService.getUserss().subscribe(data => {
      this.users = data;
    });
        
  }

  ngOnInit() { }
 
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

}
