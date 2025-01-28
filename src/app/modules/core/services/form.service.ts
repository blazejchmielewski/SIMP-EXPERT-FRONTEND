import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CreateAttibuteRequest, CreateAttibuteTypeRequest, CreateCategoryRequest, 
  CreateExpertiseRequest, 
  CreateSubCategoryRequest, 
  LoginRequest, 
  PasswordRecoveryRequest, RegisterRequest, ToGetPasswordRecoveryRequest, 
  UserUpdateRequest} from '../models/forms.model';
import { equivalentValidator } from '../../shared/validators/equivalent.validator';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor() { }

  initLoginForm(): FormGroup<LoginRequest>{
    return new FormGroup({
      email: new FormControl('', {
        validators: [
          Validators.required, 
          Validators.email],
        nonNullable: true,
      }),
      password: new FormControl('', {
        validators: [
          Validators.required, 
          Validators.minLength(8), 
          Validators.maxLength(30)],
        nonNullable: true,
      }),
    });
  }

  initRegisterForm(): FormGroup<RegisterRequest>{
    return new FormGroup({
      firstname: new FormControl('', {
        validators: [
          Validators.required, 
          Validators.minLength(3), 
          Validators.maxLength(30)],
        nonNullable: true,
      }),
      lastname: new FormControl('', {
        validators: [
          Validators.required, 
          Validators.minLength(3), 
          Validators.maxLength(30)],
        nonNullable: true,
      }),
      email: new FormControl('', {
        validators: [
          Validators.required, 
          Validators.email],
        nonNullable: true,
      }),
      password: new FormControl('', {
        validators: [
          Validators.required, 
          Validators.minLength(8), 
          Validators.maxLength(30)],
        nonNullable: true,
      }),
      repeatedPassword: new FormControl('', {
        validators: [
          Validators.required, 
          Validators.minLength(8), 
          Validators.maxLength(30)],
        nonNullable: true,
      }),
    });
  }

  // initEditUserForm(): FormGroup<EditUserRequest>{
  //   return new FormGroup({
  //     firstname: new FormControl('', {
  //       validators: [
  //         Validators.required],
  //       nonNullable: true,
  //     }),
  //     lastname: new FormControl('', {
  //       validators: [
  //         Validators.required],
  //       nonNullable: true,
  //     }),
  //     email: new FormControl('', {
  //       validators: [
  //         Validators.required, 
  //         Validators.email],
  //       nonNullable: true,
  //     }),
  //   });
  // }

initToGetPasswordRecoveryForm(): FormGroup<ToGetPasswordRecoveryRequest>{
    return new FormGroup({
      email: new FormControl('', {
        validators: [
          Validators.required, 
          Validators.email],
        nonNullable: true,
      }),
    });
  }

  initPasswordRecoveryForm(): FormGroup<PasswordRecoveryRequest>{
    return new FormGroup({
      password: new FormControl('', {
        validators: [
          Validators.required, 
          Validators.minLength(8), 
          Validators.maxLength(30)],
        nonNullable: true,
      }),
      repeatedPassword: new FormControl('', {
        validators: [
          Validators.required, 
          Validators.minLength(8), 
          Validators.maxLength(30)],
        nonNullable: true,
      }),
    }, {validators: [equivalentValidator('password','repeatedPassword')]});
  }

  initCreateExpertise(): FormGroup<CreateExpertiseRequest>{
    return new FormGroup({
      title: new FormControl('', {
        validators: [
          Validators.required,
          Validators.minLength(3), 
          Validators.maxLength(100)
        ], nonNullable: true,
      }),
      description: new FormControl('', {
        validators: [
          Validators.required,
          Validators.minLength(3), 
          Validators.maxLength(100)
        ], nonNullable: true,
      }),
      categoryName: new FormControl('', {
        validators: [
          Validators.required,
        ], nonNullable: true,
      }),
      subCategoryName: new FormControl('', {
        validators: [
          Validators.required,
        ], nonNullable: true,
      })
    })
  }

  initCreateCategory(): FormGroup<CreateCategoryRequest>{
    return new FormGroup({
      name: new FormControl('', {
        validators: [
          Validators.required
        ],  nonNullable: true,
      })
    })
  }
  
  initCreateSubCategory(): FormGroup<CreateSubCategoryRequest>{
    return new FormGroup({
      name: new FormControl('', {
        validators: [
          Validators.required,
        ], nonNullable: true,
      }),
      categoryName: new FormControl('', {
        validators: [
          Validators.required,
        ], nonNullable: true,
      }),
    })
  }

  initCreateAttribute():FormGroup<CreateAttibuteRequest>{
    return new FormGroup({
      value: new FormControl('', {
        validators: [
          Validators.required,
        ], nonNullable: true,
      }),
      attributeTypeName: new FormControl('', {
        validators: [
          Validators.required,
        ], nonNullable: true,
      }),
      unitName: new FormControl('', {
        validators: [
          Validators.required,
        ], nonNullable: true,
      }),
    })
  }

  initCreateAttributeType():FormGroup<CreateAttibuteTypeRequest>{
    return new FormGroup({
      attributeTypeName: new FormControl('', {
        validators: [
          Validators.required,
        ], nonNullable: true,
      }),
      unitTypeId: new FormControl(0, {
        validators: [
          Validators.required,
        ], nonNullable: true,
      }),
    })
  }

  initUserUpdateForm(): FormGroup<UserUpdateRequest> {
    return new FormGroup<UserUpdateRequest>({
      uuid: new FormControl('', {
        nonNullable: true, // zapewnia, że wartość nie będzie null
        validators: [Validators.required]
      }),
      firstname: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.minLength(2)]
      }),
      lastname: new FormControl('', {
        nonNullable: true,
        validators: [ Validators.minLength(2)]
      }),
      phone: new FormControl('', {
        nonNullable: true,
        validators: [
          Validators.pattern('^[0-9]{9,15}$')
        ]
      }),
      city: new FormControl('', {
        nonNullable: true,
        validators: []
      }),
      birthday: new FormControl(new Date, {
        nonNullable: true,
        validators: []
      }),
    });
  }

  getErrorMessage(control: FormControl): string{
    if((control.hasError('required') && control.touched)){
      return 'Ta kontrolka jest wymagana'
    }
    if(control.hasError('minlength') && control.touched){
      return `Minimalna ilość znaków: ${control.errors?.['minlength']?.requiredLength}.`;
    }
    if(control.hasError('maxlength') && control.touched){
      return `Maksymalna ilość znaków: ${control.errors?.['maxlength']?.requiredLength}.`;
    }
    if(control.hasError('email') && control.touched){
      return 'Nie poprawny email';
    }

    if(control.hasError('passwordNotEqual') && control.touched){
      return 'Hasła muszą być takie same';
    }
    return '';
  } 
}