import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.page.html',
  styleUrls: ['./recover-password.page.scss'],
})
export class RecoverPasswordPage implements OnInit {

  constructor(
    public alertController: AlertController,
    private authServ: AuthService, 
    private toastCtr: ToastController, 
    private router: Router) {}

    ngOnInit() {
    }

  async resetPassword(email){    
    try {
      if(email)
        await this.authServ.recoverPassword(email.value);
        this.router.navigate(['/recover-password']);
        await this.showAlert();
    } catch (error) {
      
      let message: string;
      switch(error.code){
        case 'auth/user-not-found': message='Usuário não cadastrado!';
        break;
        case 'auth/invalid-email': message='Digite um email válido!';
        break;
        case 'auth/network-request-failed': message='Sem conexão!';
        break;
      }
      this.presentToast(message);
    }
  }

  async presentToast(message: string) {
    const toast = await this.toastCtr.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  async showAlert() {
    const alert = await this.alertController.create({
      header: 'Enviado com sucesso!',
      message: 'Um link de redefinição de senha foi enviado para o email informado.',
      buttons: ['OK']
    });
    await alert.present();  
    const result = await alert.onDidDismiss();  
    console.log(result);
  }
}
