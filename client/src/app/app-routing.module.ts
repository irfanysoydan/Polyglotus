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
    path: '',
    component: HomeComponent, canActivate: [AuthGuard],
  },
  {
    path: 'main',
    component: MainPageComponent,
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
    path: 'renew-password',
    component: RenewPasswordComponent
  },
  {
    path: 'admin',
    component: AdminComponent,
  },
  {
    path: 'deck',
    component: DeckComponent,
  },
  {
    path: 'work-deck',
    component: WorkDeckComponent,
  },
  {
    path: 'card',
    component: CardComponent,
  },
  {
    path: 'deck/create-card',
    component: CreateCardComponent,
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
