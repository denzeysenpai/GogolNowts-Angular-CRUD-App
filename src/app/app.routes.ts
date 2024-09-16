import { Routes } from '@angular/router';
import { LoginPageComponent } from '../components/login-page/login-page.component';
import { HomePageComponent } from '../components/home-page/home-page.component';

export const routes: Routes = [
  {
    path: "login",
    component: LoginPageComponent
  },
  {
    path: "",
    component: HomePageComponent
  }
];
