export interface BasicResponse{
    code: string;
    message: string;
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

export interface Category{
    id: number;
    name: string;
}

export interface Subcategory{
    id: number;
    name: string;
    categoryId: number;
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

export interface CreateCategory{
    name: string
}

export interface CreateSubCategory{
    name:string;
    categoryName: string;
}

export interface CreateAttributeType{
    attributeTypeName: string;
    unitTypeId: number;
}

//// 
export interface Attribute {
    value: string;
    attributeTypeName: string;
    unitName: string;
}

export interface AttributeType{
    id: number;
    name:string;
}

export interface Units{
    id: number;
    name:string;
}

export interface ImageModel {
    file: File;
    url: string
}

export interface Currency{
    name: string;
    value: number;
}