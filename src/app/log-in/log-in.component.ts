import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AuthService, TgtgToken } from '../auth.service';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-log-in',
  imports: [FormsModule, MatProgressBarModule],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css'
})

export class LogInComponent {
  userDetails = {
    email: '',
    password: ''
  };

  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);  

  login(form: any): void {

    console.log('Form submitted:', this.userDetails);
   
    this.router.navigate(['/loading'], { skipLocationChange: true });
  
    this.authService.login$(this.userDetails.email, this.userDetails.password).subscribe(
      { next: (value) => {
        const { data, error } = value;

        if(error) {
          this.router.navigate(['error']);
        }
        else if(data) {
          this.router.navigate(['item-dashboard']);
        }
        
      }}
    );
  }

  signupRedirect(): void {
    this.router.navigate(['signup']);
  }
}
