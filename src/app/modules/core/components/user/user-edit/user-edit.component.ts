import { Component, OnInit } from '@angular/core';
import { UserDetails, UserEditData } from '../../../models/user.model';
import { UserService } from '../../../services/user.service';
import { FormService } from '../../../services/form.service';
import { UserUpdateRequest } from '../../../models/forms.model';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit{

  errorMsg: string | null = '';

    initUserUpdateForm: FormGroup<UserUpdateRequest> = this.formService.initUserUpdateForm();
    userDetails!: UserDetails;
    profileImagePath: string = '';
    userUpdateData: UserEditData | null = null

    constructor(
      private userService: UserService,
      private formService: FormService,
      private router: Router
    
    ){}
    
    ngOnInit(): void {
      this.getUserDetails();
    }
  
    getUserDetails(){
      this.userService.getUserDetails().subscribe({
        next: (resp)=>{
          if(resp){
            this.userDetails = resp
            this.setProfileImageBasedOnEmail(resp.email)
          }
        }, error: (err) => {
          console.log(err)
        }
      })
    }
  
    translateStatus(status: boolean){
      switch (status){
        case true: return 'Aktywny';
        case false: return 'Nie aktywny'
      }
    }
  
    setProfileImageBasedOnEmail(email: string) {
      const dotIndex = email.indexOf('.');
  
      if (dotIndex > 0 && email[dotIndex - 1] === 'a') {
        this.profileImagePath = '../../../../../../assets/avatar-woman.png';
      } else {
        this.profileImagePath = '../../../../../../assets/avatar-man.png';
      } 
    }

  onUserEdit(){
    const formData = this.initUserUpdateForm.value;
    const userEditData: UserEditData = {
      uuid: this.userDetails.uuid || '',
      firstName: formData.firstname || '',
      lastName: formData.lastname || '',
      phone: formData.phone || '',
      city: formData.city || '',
      birthday: formData.birthday || new Date,
    }
    this.userService.editUser(userEditData).subscribe({
      next: (resp) => {
        this.router.navigate(['/profile'])
      }, error: (err) => {this.errorMsg = err}
    });
  }
}
