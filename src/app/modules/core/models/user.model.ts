export interface BaseResponse{
    code: string;
    message: string;
    timestamp: Date;
}

export interface BaseResponseBoolean{
    code: string;
    message: boolean;
    timestamp: Date;
}

export interface UserDetails{
    uuid: string,
    firstname: string,
    lastname: string,
    email: string,
    department: string,
    status: boolean,
    phone: string;
    city: string;
    birthday: Date;
}

export interface UserEditData{
    uuid: string;
    firstName: string;
    lastName: string;
    phone: string;
    city: string;
    birthday: Date;
}

export interface Authority {
    authority: string;
}

export interface Financial{
    id: number;
    financialType: FinancialType;
    user: string;
    amount: number;
    comment: string;
    timestamp: Date;
}

export interface FinancialType{
    id: number;
    name: string;
}
