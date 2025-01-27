import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ToGetPasswordRecoveryRequest } from 'src/app/modules/core/models/forms.model';
import { AuthService } from 'src/app/modules/core/services/auth.service';
import { FormService } from 'src/app/modules/core/services/form.service';

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.scss']
})
export class PasswordRecoveryComponent {

  passwordRecoveryForm: FormGroup<ToGetPasswordRecoveryRequest> = this.formService.initToGetPasswordRecoveryForm();
  errorMessage: string | null = null;

  constructor(private formService: FormService, private authService: AuthService){}

  getErrorMessage(email: FormControl<string>): string{
    return this.formService.getErrorMessage(email);
  }

  onPasswordRecovery() {
    this.authService.toResetPassword(this.passwordRecoveryForm.getRawValue()).subscribe({
      next: ()=>{
      }, error: (err) => {
        console.log(err);
      }
    })
  }

}
