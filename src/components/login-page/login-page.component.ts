import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  Username = 'Username'
  Password = 'Password'

  private accountService : AccountService = inject(AccountService)

  loginEvent() {
    let userInput = document.getElementById('username-input') as HTMLInputElement
    let passInput = document.getElementById('password-input') as HTMLInputElement

    let b = this.accountService.LoginToAccount(userInput.value, passInput.value)
    if(b) console.log('successful')
  }
}
