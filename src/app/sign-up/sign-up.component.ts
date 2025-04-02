import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AuthService, TgtgToken } from '../auth.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-sign-up',
  imports: [FormsModule, MatProgressBarModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})

export class SignUpComponent {

  userDetails = {
    email: '',
    password: '',
    name: ''
  };

  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);  

  register(form: any): void {

    console.log('Form submitted:', this.userDetails);
   
    this.router.navigate(['/loading'], { skipLocationChange: true });
  
    this.authService.fetchCredentials(this.userDetails.email).subscribe(
      { next: async (value) => {
        
        const tgtgToken = value.body as TgtgToken;
        const cookie = value.headers.get('cookie') ?? '';

        console.log(tgtgToken);
        console.log(cookie);

        if(tgtgToken) {
          console.log('Token found');

          const { data, error } = await this.authService.signUp(
            this.userDetails.email,
            this.userDetails.password,
            `User${Math.floor(10000 + Math.random() * 90000)}`,
            tgtgToken.access_token,
            tgtgToken.access_token_ttl_seconds,
            tgtgToken.refresh_token,
            cookie
          );

          console.log(data);
          error ? console.error(error) : console.log('Sign up successful');

          this.router.navigate(['item-dashboard']);
        }}
      } //TODO: implement on error?
    );
  }
  
  loginRedirect(): void {
    this.router.navigate(['login']);
  }
}

