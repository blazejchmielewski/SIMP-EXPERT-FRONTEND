export interface ApiResponse<T> {
    code: number;
    message: T;
    timestamp: Date;
}
  

export interface Expertise{
    title: string;
    description: string;
    valuation: number;
    subCategoryName: string,
    expertiseUuid: string,
    ownerEmail: string;
    attributes: Attribute[];
}

export interface ExpertiseData{
    title: string;
    valuation: number;
    subCategoryName: string,
    expertiseUuid: string,
    ownerEmail: string;
    image: string;
}
export interface ExpertiseWithImage{
    title: string;
    valuation: number;
    subCategoryName: string,
    expertiseUuid: string,
    ownerEmail: string;
    image: string;
}

export interface ExpertiseDetails{
    title: string;
    description: string;
    valuation: number;
    subCategoryName: string,
    expertiseUuid: string,
    ownerEmail: string;
    attributes: Attribute[];
}
export interface CreateExpertise{
    title: string;
    description: string;
    valuation: number;
    subCategoryName: string;
    attributes: Attribute[];
}

export interface ExpertiseBaseData {
    title: string;
    description: string;
    categoryName: string;
    subCategoryName: string;
}
// -------------
export interface Category{
    id: number;
    name: string;
}

export interface Subcategory{
    id: number;
    name: string;
    categoryId: number;
}

export interface CreateCategory{
    name: string
}

export interface CreateSubCategory{
    name:string;
    categoryName: string;
}

// -------------
export interface Attribute {
    value: string;
    attributeTypeName: string;
    unitName: string;
}
export interface CreateAttributeType{
    attributeTypeName: string;
    unitTypeId: number;
}
export interface AttributeType{
    id: number;
    name:string;
}
// -------------
export interface Units{
    id: number;
    name:string;
}

export interface ImageModel {
    file: File;
    url: string
}

// ------------- MONEY
export interface Money{
    amount: number;
    currency: Currency;
}
export interface CurrencyRate{
    currency: string;
    code: string;
    mid: number
}
export interface ExchangeRate{
    id: number;
    currency: Currency;
    rate: number;
    timestamp: Date;
}
export interface Currency{
    id: number;
    code: string;
    name: string;
}
export interface Devaluation{
    id:number
    money: Money;
    devaluationCause: DevaluationCause;
}
export interface DevaluationCause {
    id: number;
    name: string;
    description: string;
}
