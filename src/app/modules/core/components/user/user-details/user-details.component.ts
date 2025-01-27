import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { UserDetails } from '../../../models/user.model';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit{

  userDetails!: UserDetails;
  profileImagePath: string = '';
  constructor(private userService: UserService){}
  
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

}
