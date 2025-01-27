import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { AuthService } from 'src/app/modules/core/services/auth.service';

@Component({
  selector: 'app-account-activation',
  templateUrl: './account-activation.component.html',
  styleUrls: ['./account-activation.component.scss']
})
export class AccountActivationComponent {

  errorMessage: string | null = null;

  constructor(
    private route: ActivatedRoute, 
    private authService: AuthService,
    private router: Router){}
  
  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => this.authService.activateAccount(params.get('uid') as string))
    ).subscribe({
      next: (response) => {
        this.router.navigate(['/logowanie'])
        console.log(response)
      }, error: (err)=> {
        this.errorMessage = err;
      }
    })
  }
}
