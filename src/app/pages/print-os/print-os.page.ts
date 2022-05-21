import { Users } from 'src/app/interfaces/users';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Os } from 'src/app/interfaces/os';
import { OsService } from 'src/app/services/os.service';

import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { UsersService } from 'src/app/services/users.service';

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-print-os',
  templateUrl: './print-os.page.html',
  styleUrls: ['./print-os.page.scss'],
})
export class PrintOsPage implements OnInit {
  private osId: string = null;
  public users = new Array<Users>();
  public os: Os = {};
  private loading: any;
  private osSubscription: Subscription;
  private userSubscription: Subscription;
  pdfObj = null;

  constructor(
    private osService: OsService,
    private userService: UsersService,
    private activatedRoute: ActivatedRoute,
    private navController: NavController,
    private loadingController: LoadingController,
    private toastController: ToastController
  ) {
    this.userSubscription = this.userService.getUserss().subscribe(data => {
      this.users = data;
      });

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

  async printPDF(){
    await this.presentLoading()
    try {
      
      let dd = {
        pageSize: 'A6',
        pageMargins: [ 20, 10, 30, 1 ],
        content: [
          {
    
            table: {
              headerRows: 0,
              body: [
                [{text: '', style: 'subheader'}, {text: 'ORDEM DE SERVIÇO', style: 'subheader'}, {text: '', style: 'subheader'}],              
                ['', '', ''],              
              ]
            },
            layout: 'headerLineOnly'
          },
          {
      
            table: {
              headerRows: 0,
              body: [
                [{text: 'OS Nº:', style: 'header'}, {text: '', style: 'header'}, {text: '', style: 'header'}],              
                [{text: '001', style: 'tableHeader'}, '', ''],              
              ]
            },
            layout: 'headerLineOnly'
          },
          {
          
            table: {
              headerRows: 0,
              body: [                 
                [{text: 'DATA DE ENTRADA:', style: 'header'}, {text: '', style: 'header'}, {text: 'DATA DE SAÍDA:', style: 'header'}],
                [{text: '28/04/2022', style: 'tableHeader'}, '', {text: '28/04/2022', style: 'tableHeader'}],  
              ]
            },
            layout: 'headerLineOnly'
          },  
          {
         
            table: {
              headerRows: 0,
              body: [                 
                [{text: 'CLIENTE:', style: 'header'}, {text: '', style: 'header'}, {text: '', style: 'header'}],
                [{text: 'Maria Antônia Braga', style: 'tableHeader'}, '', ''], 
              ]
            },
            layout: 'headerLineOnly'
          },
          {
        
            table: {
              headerRows: 0,
              body: [                 
                [{text: 'EMAIL:', style: 'header'}, {text: '', style: 'header'}, {text: '', style: 'header'}],
                [{text: 'mariabraga@email.com', style: 'tableHeader'}, '', ''], 
              ]
            },
            layout: 'headerLineOnly'
          },
          {
        
            table: {
              headerRows: 0,
              body: [                 
                [{text: 'FONE:', style: 'header'}, {text: '', style: 'header'}, {text: '', style: 'header'}],
                [{text: '98877-5544', style: 'tableHeader'}, '', ''], 
              ]
            },
            layout: 'headerLineOnly'
          },
          {
          
            table: {
              headerRows: 0,
              body: [                 
                [{text: '', style: 'header'}, {text: '', style: 'header'}, {text: '', style: 'header'}],
                ['___________________________________________', '', ''], 
              ]
            },
            layout: 'headerLineOnly'
          },
          {
           
            table: {
              headerRows: 0,
              body: [
                [{text: 'MARCA:', style: 'header'}, {text: '', style: 'header'}, {text: 'MODELO:', style: 'header'}],              
                [{text:'Samsung', style: 'tableHeader'}, '', {text:'J5 Prime', style: 'tableHeader'}],              
                ['', '', ''],              
                [{text: 'N/S:', style: 'header'}, {text: '', style: 'header'}, {text: 'SITUAÇÃO:', style: 'header'}],
                [{text:'YTR675HGW89', style: 'tableHeader'}, '', {text:'Reparo/Devolução', style: 'tableHeader'}],
                ['', '', ''],              
                [{text: 'DEFEITO:', style: 'header'}, {text: '', style: 'header'}, {text: 'REPARO:', style: 'header'}],
                [{text:'Dispaly Quebrado', style: 'tableHeader'}, '', {text:'Substituição do display', style: 'tableHeader'}],
                ['', '', ''],              
                [{text: 'VALOR:', style: 'header'}, {text: '', style: 'header'}, {text: '', style: 'header'}],
                [{text:'350,00', style: 'tableHeader'}, '', ''],
              ]
            },
            layout: 'headerLineOnly'
          },
          {
         
            table: {
              headerRows: 0,
              body: [                 
                [{text: '', style: 'header'}, {text: '', style: 'header'}, {text: '', style: 'header'}],
                ['___________________________________________', '', ''], 
              ]
            },
            layout: 'headerLineOnly'
          },
          {          
            table: {
              headerRows: 0,
              body: [
                [{text: '', style: 'header'}, {text: '', style: 'header'}, {text: '', style: 'header'}],
                ['Laércio dos Santos Rodrigues', '', ''],
                ['98827-2303', '', ''],
                ['laerciotecnico@gmail.com', '', ''],
                
              ]
            },
            layout: 'headerLineOnly'
          },   
        ],
        styles: {
          header: {
            fontSize: 9,
            bold: true,
            color: 'blue',
          },
          subheader: {
            fontSize: 14,
            bold: true,
            color: 'blue',
          },     
          tableHeader: {
            bold: true,
            fontSize: 8,
            color: 'black'
          }
        },
        defaultStyle: {
        }
      }
      this.pdfObj = pdfMake.createPdf(dd).open(); 

      await this.loading.dismiss();     
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
