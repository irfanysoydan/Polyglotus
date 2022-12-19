import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { CardComponent } from './components/card/card.component';
import { DeckComponent } from './components/deck/deck.component';
import { AdminComponent } from './components/admin/admin.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { WorkDeckComponent } from './components/work-deck/work-deck.component';
import { CreateCardComponent } from './components/create-card/create-card.component';
import { ForgotPassswordComponent } from './components/forgot-passsword/forgot-passsword.component';
import { AuthGuard } from './components/auth-guard/auth-guard';
import { RenewPasswordComponent } from './components/renew-password/renew-password.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { ErrorComponent } from './components/error/error.component';
import { RoleGuardComponent } from './components/role-guard/role-guard.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    MainPageComponent,
    CardComponent,
    DeckComponent,
    AdminComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    NotFoundComponent,
    WorkDeckComponent,
    CreateCardComponent,
    ForgotPassswordComponent,
    RenewPasswordComponent,
    SpinnerComponent,
    ErrorComponent,
    RoleGuardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [AuthGuard, RoleGuardComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
