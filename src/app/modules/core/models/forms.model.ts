import { FormControl } from "@angular/forms";

export interface ApiResponse{
    code: number;
    message: string;
    timestamp: Date;
}

export interface LoginRequest{
    email: FormControl<string>;
    password: FormControl<string>;
}

export interface RegisterRequest{
    firstname: FormControl<string>;
    lastname: FormControl<string>;
    email: FormControl<string>;
    password: FormControl<string>;
    repeatedPassword: FormControl<string>
}
/// TO DELETE SPRADZ CZY NIC NIE WYWALIŁo
// export interface EditUserRequest{
//     firstname: FormControl<string>;
//     lastname: FormControl<string>;
//     email: FormControl<string>
// }

export interface ToGetPasswordRecoveryRequest{
    email: FormControl<string>;
}

export interface PasswordRecoveryRequest{
    password: FormControl<string>;
    repeatedPassword: FormControl<string>
}

export interface CreateExpertiseRequest{
    title: FormControl<string>;
    description: FormControl<string>;
    subCategoryName: FormControl<string>;
}

export interface CreateCategoryRequest{
    name:FormControl<string>;
}

export interface CreateSubCategoryRequest{
    name: FormControl<string>;
    categoryName: FormControl<string>;
}

export interface CreateAttibuteRequest {
    value: FormControl<string>;
    attributeTypeName: FormControl<string>
    unitName: FormControl<string>
}

export interface CreateAttibuteTypeRequest {
    attributeTypeName: FormControl<string>;
    unitTypeId: FormControl<number>;
}

export interface UserUpdateRequest{
    uuid:       FormControl<string>,
    firstname:  FormControl<string>,
    lastname:   FormControl<string>,
    phone:      FormControl<string>;
    city:       FormControl<string>;
    birthday:   FormControl<Date>;
}