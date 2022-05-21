import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'bem-vindo',
    pathMatch: 'full'
  },
  {
    path: 'bem-vindo',
    loadChildren: () => import('./pages/bem-vindo/bem-vindo.module').then( m => m.BemVindoPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule), canActivate: [LoginGuard]
  },
  {
    path: 'register-user',
    loadChildren: () => import('./pages/register-user/register-user.module').then( m => m.RegisterUserPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule), canActivate: [AuthGuard]
  },
  {
    path: 'customer-register',
    loadChildren: () => import('./pages/customer-register/customer-register.module').then( m => m.CustomerRegisterPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'os-register',
    loadChildren: () => import('./pages/os-register/os-register.module').then( m => m.OsRegisterPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'print-os/:id',
    loadChildren: () => import('./pages/print-os/print-os.module').then( m => m.PrintOsPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'cashier',
    loadChildren: () => import('./pages/cashier/cashier.module').then( m => m.CashierPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'customer-list',
    loadChildren: () => import('./pages/customer-list/customer-list.module').then( m => m.CustomerListPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'customer-update/:id',
    loadChildren: () => import('./pages/customer-update/customer-update.module').then( m => m.CustomerUpdatePageModule), canActivate: [AuthGuard]
  },
  {
    path: 'os-update/:id',
    loadChildren: () => import('./pages/os-update/os-update.module').then( m => m.OsUpdatePageModule), canActivate: [AuthGuard]
  },
  {
    path: 'os-list',
    loadChildren: () => import('./pages/os-list/os-list.module').then( m => m.OsListPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'out-of-box',
    loadChildren: () => import('./pages/out-of-box/out-of-box.module').then( m => m.OutOfBoxPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'cash-outflow-report',
    loadChildren: () => import('./pages/cash-outflow-report/cash-outflow-report.module').then( m => m.CashOutflowReportPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'service-report',
    loadChildren: () => import('./pages/service-report/service-report.module').then( m => m.ServiceReportPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'question',
    loadChildren: () => import('./pages/question/question.module').then( m => m.QuestionPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'recover-password',
    loadChildren: () => import('./pages/recover-password/recover-password.module').then( m => m.RecoverPasswordPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
