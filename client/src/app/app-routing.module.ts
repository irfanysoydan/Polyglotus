import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { AuthGuard } from './components/auth-guard/auth-guard';
import { CardComponent } from './components/card/card.component';
import { CreateCardComponent } from './components/create-card/create-card.component';
import { DeckComponent } from './components/deck/deck.component';
import { ForgotPassswordComponent } from './components/forgot-passsword/forgot-passsword.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RegisterComponent } from './components/register/register.component';
import { RenewPasswordComponent } from './components/renew-password/renew-password.component';
import { WorkDeckComponent } from './components/work-deck/work-deck.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent, canActivate: [AuthGuard],
  },
  {
    path: '',
    component: MainPageComponent
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'forgot-password',
    component: ForgotPassswordComponent
  },
  {
    path: 'resetPassword',
    component: RenewPasswordComponent
  },
  {
    path: 'admin',
    component: AdminComponent, canActivate: [AuthGuard]
  },
  {
    path: 'home/deck',
    component: DeckComponent, canActivate: [AuthGuard]
  },
  {
    path: 'home/work-deck',
    component: WorkDeckComponent, canActivate: [AuthGuard]
  },
  {
    path: 'home/card',
    component: CardComponent, canActivate: [AuthGuard]
  },
  {
    path: 'home/deck/create-card',
    component: CreateCardComponent, canActivate: [AuthGuard]
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
