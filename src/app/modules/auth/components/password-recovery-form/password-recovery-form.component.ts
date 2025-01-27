import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PasswordRecoveryRequest } from 'src/app/modules/core/models/forms.model';
import { AuthService } from 'src/app/modules/core/services/auth.service';
import { FormService } from 'src/app/modules/core/services/form.service';

@Component({
  selector: 'app-password-recovery-form',
  templateUrl: './password-recovery-form.component.html',
  styleUrls: ['./password-recovery-form.component.scss']
})
export class PasswordRecoveryFormComponent {
  passwordRecoveryForm: FormGroup<PasswordRecoveryRequest> = this.formService.initPasswordRecoveryForm();
  uuid = '';
  errorMessage: null | string = null;

  constructor(private formService: FormService, 
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router){}

  get controls(){
    return this.passwordRecoveryForm.controls;
  }

  getErrorMessage(email: FormControl<string>): string{
    return this.formService.getErrorMessage(email);
  }

  onPasswordChange(){
    const {password, repeatedPassword} = this.passwordRecoveryForm.getRawValue();
    this.authService.changePassword({password, uuid: this.uuid}).subscribe({
      next: ()=> {
        this.router.navigate(['/logowanie'])
      }, error: (err)=> {
        this.errorMessage = err;
      }
    })
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (param) => {
        this.uuid = param.get('uuid') as string;
        console.log(param.get('uuid'));
      }
    })
  }
}
