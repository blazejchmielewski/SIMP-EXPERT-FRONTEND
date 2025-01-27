import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { UserUpdateRequest } from 'src/app/modules/core/models/forms.model';
import { Financial, UserDetails, UserEditData } from 'src/app/modules/core/models/user.model';
import { AdminService } from 'src/app/modules/core/services/admin.service';
import { FormService } from 'src/app/modules/core/services/form.service';
import { UserService } from 'src/app/modules/core/services/user.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit{

  userUpdateForm: FormGroup<UserUpdateRequest> = this.formService.initUserUpdateForm();
  errorMsg: string | null = null;

  user: UserDetails | null = null;
  
  balance: number = 0;
  financials: Financial[] = [];

  constructor(
    private formService: FormService
    , private userService: UserService
    , private adminService: AdminService
    , private router: Router
  ){}

  ngOnInit(): void {
    this.user = this.userService.getUser();
    //this.getTestUser();
    if(this.user){
      this.getUserFinancials(this.user.uuid);
    }
  }

  onUserEdit(){
    const formData = this.userUpdateForm.value;
    if(this.user){
      const userEditData: UserEditData = {
        uuid: this.user.uuid || '',
        firstName: formData.firstname || '',
        lastName: formData.lastname || '',
        phone: formData.phone || '',
        city: formData.city || '',
        birthday: formData.birthday || new Date,
      }
      this.userService.editUser(userEditData).subscribe({
        next: (resp) => {
          this.backToAdminPanel();
        }, error: (err) => {this.errorMsg = err}
      });
    }
  }

  // getTestUser(){
  //   this.userService.getTestUser().subscribe({
  //     next: (resp)=> {
  //       this.user = resp;
        
  //     }, error: (err)=>{console.log(err)}
  //   });
  // }

  getUserFinancials(uuid: string){
    this.adminService.getUserFinancialsByUuid(uuid).subscribe({
      next: (resp) => {
        this.financials = resp;
        this.balance = this.calculateBalance();
      }, error: (err)=> console.log(err)
    })
  }

  calculateBalance(): number{
    const deposit = this.financials
    .filter((n)=> n.financialType.name === "DEPOSIT")
    .reduce((sum, finacial)=> sum + finacial.amount, 0)

    const debt = this.financials
    .filter((n)=> n.financialType.name === "DEBIT")
    .reduce((sum, financial) => sum + financial.amount, 0)
    
    return deposit + debt
  }

  backToAdminPanel(){
    this.router.navigate(['/admin/users'])
  }

  // TRANSLATORS
  translateFinancialType(name: string):string{
    switch(name){
      case 'DEPOSIT': 
        return 'Wpłata'
      case 'DEBIT': 
        return 'Obiążenie'
      case 'ADJUSTMENT': 
        return 'Korekta'
    }
    return '';
  }

  translateStatus(status: boolean):string{
    return status ? "Aktywny" : "Zablokowany"
  }
}
